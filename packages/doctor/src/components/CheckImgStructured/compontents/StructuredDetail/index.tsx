import React, {
  FC, useEffect, useState, useRef, useMemo,
} from 'react';
import { Button, Tabs, message } from 'antd';
import { useDispatch } from 'react-redux';
import * as api from '@/services/api';
import StructuredDetailHydPanel from '../StructuredDetailHydPanel';
import StructuredDetailJcdPanel from '../StructuredDetailJcdPanel';
import { outTypes, formatJcdSubmitData } from '../utils';
import styles from './index.scss';
import { isEmpty, cloneDeep, debounce } from 'lodash';
import EmptyIcon from '@/assets/img/jgh_empty.png';
import { CloseOutlined } from '@ant-design/icons';
import { IStructuredDetailProps } from 'typings/imgStructured';

const { TabPane } = Tabs;
const StructuredDetail: FC<IStructuredDetailProps> = (props) => {
  const { hydData, jcdData, images, handleRefresh, handleClose, jcdOriginIds, groupId,
  } = props;
  console.log('hydData232', hydData);
  console.log('jcdData', jcdData);
  const initTypeTabs = () => {
    let jctAndOther = [];
    const jcdD = jcdData.filter(item => item.meta.title === 'JCD');
    const otherD = jcdData.filter(item => item.meta.title === 'OTHER');
    if (!isEmpty(jcdD)) {
      jctAndOther.push({ outType: 'JCD', initData: jcdD });
    }
    if (!isEmpty(otherD)) {
      jctAndOther.push({ outType: 'OTHER', initData: otherD });
    }
    const hydTab = hydData.map((hydItem: IApiDocumentList) => {
      return { ...hydItem, outType: hydItem.outType };
    });
    const datas = [...hydTab, ...jctAndOther];
    return isEmpty(datas) ? [] : datas;
  };
  const sid = window.$storage.getItem('sid');
  const dispatch = useDispatch();
  const isRefreshParent = useRef(false);
  // 保存各个分类的方法队列 - 检查单、图片不清晰、非医学单据
  const [hydCallbackFns, setHydCallbackFns] = useState<CommonData>({});
  const [jcdCallbackFns, setJcdCallbackFns] = useState<CommonData>({});
  const [isViewOnly, setisViewOnly] = useState(!isEmpty(hydData) || !isEmpty(jcdData)); // true仅查看 false编辑中
  const [typeTabs, setTypeTabs] = useState <any[]>(initTypeTabs());
  const [activeType, setActiveType] = useState(initTypeTabs()[0]);
  // 1：检查单或化验单中某一个保存成功，2表示两个都成功，此时关闭弹框
  const [saveSuccess, setSaveSuccess] = useState(0);

  useEffect(() => {
    const tabs: any[] = initTypeTabs();
    setTypeTabs(tabs);
    setActiveType(tabs.filter(item => !['NOT_CLEAR', 'NOT_HYD_JCD'].includes(item.outType))?.[0]?.outType);
    setisViewOnly(!isEmpty(hydData) || !isEmpty(jcdData));
  }, [hydData, jcdData]);

  useEffect(() => () => {
    // 在组件销毁时判断：如果保存成功了，刷新下单据列表，更新数据
    if (isRefreshParent.current && handleRefresh) { handleRefresh(); }
    setSaveSuccess(0);
    dispatch({
      type: 'structured/saveAddQa',
      payload: { currEditData: {} },
    });
  }, []);

  useEffect(() => {
    if (saveSuccess === 2) {
      message.success('保存成功');
      // im进入的没有刷新函数，此时直接调用redux里的更新化验单/检查单接口
      if (handleRefresh) {
        isRefreshParent.current = true;
      } else {
        dispatch({
          type: 'image/fetchImageCount',
          payload: {},
        });
      }
      handleClose();
    }
  }, [saveSuccess]);

  const saveHydData = (params: any) => {
    console.log('params111', params);
    if (
      isEmpty(params?.imageJCD?.list) &&
      isEmpty(params.list) &&
      !params.allTypes.includes('NOT_CLEAR') &&
      !params.allTypes.includes('NOT_HYD_JCD') ) {
      // 1检查单数据为空，2并且化验单数据为空，3并且类型不包括不清晰、4非化验单检查单时，要提示内容为空
      message.error('单据内容为空！');
    } else {
      api.image.putImageImageIndexes(params).then(() => {
        setSaveSuccess(prev => prev + 2);
      }).catch((err: any) => {
        message.error(err?.result || '保存失败');
      });
    }
  };

  // 把准备好的化验单数据，传给检查单，当检查单查验自己也无误后，再统一调用接口
  const handleSaveJcd = (hydDataParams) => {
    const clickSaveTime = new Date().getTime();
    // 检查单、其它单据
    Promise.all(Object.values(jcdCallbackFns)
      .map((fn) => fn(clickSaveTime)))
      .then((list) => {
        console.log('=====jcdlist', list.flat(5));
        const { jcdList } = formatJcdSubmitData(list, clickSaveTime);
        console.log('jcdList', jcdList);
        saveHydData({
          ...hydDataParams,
          imageJCD: {
            ...jcdList,
            originIds: jcdOriginIds,
          },
        });
        // saveJcdData(jcdList);
      }).catch((err) => {
        console.log('请完善检查单后提交！err', err);
        message.error('请完善检查单后提交！');
      });
  };
  const handleSaveClick = async () => {
    if (isViewOnly) {
      setisViewOnly(false);
    } else {
      setSaveSuccess(0);
      if (!isEmpty(typeTabs)) {
        const apiParams: CommonData = {
          imageIds:images.map(item => item.imageId),
          allTypes: typeTabs.map(item => item.outType),
          operatorId: sid,
          sid: window.$storage.getItem('patientSid'),
          wcId:window.$storage.getItem('patientWcId'),
          list: [],
        };
        if (groupId) {
          apiParams.groupId = groupId;
        }
        // 化验单
        Promise.all(Object.values(hydCallbackFns)
          .map((fn) => fn()))
          .then((documentData: any) => {
            apiParams.list = [...documentData];
            console.log('documentList', documentData);
            // tab没有选择化验单类型
            if (isEmpty(documentData)) {
              handleSaveJcd(apiParams);
            } else {
              // 选择了化验单tab，但没有选择任何单据
              if (isEmpty(documentData[0].documentList)) {
                message.error('化验单内容为空，请填写!');
              } else {
                const errDocument = documentData[0].documentList.filter(item => isEmpty(item.indexList));
                // 选择的化验单据，没有填写任何指标（有且仅有一个化验单据，且没填写任何指标数值，直接保存会导致图片丢失，这里拦截一下）
                if (isEmpty(errDocument)) {
                  handleSaveJcd(apiParams);
                } else {
                  message.error(`【${errDocument[0].documentName}】单据未填写内容！`);
                }
              }
            }
          }).catch((err) => {
            console.log('请完善化验单后提交！err', err);
            message.error('请完善化验单后提交！');
          });
      } else {
        message.error('请选择图片类型');
      }
    }
  };

  // 删除页签的回调
  const handelTabsEdit = (deleteType: string) => {
    const newTabs = typeTabs.filter(item => item.outType !== deleteType);
    if (deleteType === activeType && !(isEmpty(newTabs))) {
      setActiveType(newTabs?.[newTabs?.length - 1].outType);
    }
    setTypeTabs(cloneDeep(newTabs));
  };

  const handleAddTypeTab = (addType: string) => {
    const curTabs = typeTabs.map(item => item.outType);
    if (!curTabs.includes(addType)) {
      if (!['NOT_CLEAR', 'NOT_HYD_JCD'].includes(addType)) {
        setActiveType(addType);
      }
      setTypeTabs([...typeTabs, { outType: addType }]);
    }
  };
  const handleDelLevel1 = (type: string) => {
    const newTabs = typeTabs.filter(item => item.outType !== type);
    setTypeTabs(newTabs);
  };

  const showTypeTabs = typeTabs.filter(typeItem => !['NOT_CLEAR', 'NOT_HYD_JCD'].includes(typeItem.outType));
  const fetInitData = (inx: number) => {
    // 化验单是 documentList， 检查单是initData
    if (showTypeTabs[inx]?.documentList) {
      return showTypeTabs?.[inx];
    } else if (showTypeTabs[inx]?.initData) {
      return showTypeTabs[inx]?.initData;
    }
    return [];
  };
  const renderTabPane = useMemo(() => {
    return (itemTabType: any, inx: number) => {
      let dom: any = null;
      const typeStart = itemTabType;
      const baseProps = {
        outType: typeStart,
        tabKey: itemTabType,
        // imageId,
        isViewOnly,
        initData: fetInitData(inx),
      };
      switch (typeStart) {
        case 'HYD':
          dom = <StructuredDetailHydPanel
            setHydCallbackFns={setHydCallbackFns}
            hydCallbackFns={hydCallbackFns}
            {...baseProps}
          />;
          break;
        case 'OTHER':
        case 'JCD':
          dom = <StructuredDetailJcdPanel
            jcdCallbackFns={jcdCallbackFns}
            setJcdCallbackFns={setJcdCallbackFns}
            {...baseProps}
          />;
          break;
        default:
          dom = <div>无数据</div>;
          break;
      }
      return dom;
    };
  }, [isViewOnly, typeTabs]);
  console.log('typeTabs909', typeTabs);
  const typeTabsText = typeTabs.map(typeItem => typeItem.outType);
  return (
    <div className={`flex-1 mx-20 mt-10 ${styles.structrued} ${isViewOnly ? styles.disabled : ''}`}>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          {
            !isViewOnly && (
              Object.keys(outTypes).map(outType =>
                <Button
                  key={outType}
                  className={`mr-15 ${typeTabsText.includes(outType) ? styles.active_btn : ''}`}
                  onClick={() => handleAddTypeTab(outType)}
                >
                  <span>{outTypes[outType]}</span>
                  {
                    ['NOT_CLEAR', 'NOT_HYD_JCD'].includes(outType) && typeTabsText.includes(outType) &&
                    <CloseOutlined style={{ fontSize: 14 }} onClick={() => handleDelLevel1(outType)} />
                  }
                </Button>,
              )
            )
          }
        </div>
        <Button className={styles.save_btn} type="primary" onClick={debounce(handleSaveClick, 500)}>
          {isViewOnly ? '修改结果' : '保存并退出'}
        </Button>
      </div>
      {
        typeTabs.length > 0 && (
          <>
            <div className={`mt-15 ${styles.structured_content}`}>
              <Tabs
                type="editable-card"
                onEdit={handelTabsEdit}
                hideAdd
                activeKey={activeType}
                onChange={(tab: string) => setActiveType(tab)}
              >
                {
                  showTypeTabs
                    .map((itemTab: any, inx) => (
                    <TabPane
                      tab={outTypes?.[itemTab.outType]}
                      key={itemTab.outType}
                      forceRender={true}
                    >
                      {renderTabPane(itemTab.outType, inx)}
                    </TabPane>
                    ))
                }
              </Tabs>
            </div>
          </>
        )
      }
      {
        isEmpty(typeTabs) && (
          <div className={styles.no_tab}>
            <img className="w-100 h-66" src={EmptyIcon} alt="请选择图片类型" />
            <div className="mt-10">请选择图片类型</div>
          </div>
        )
      }
    </div>
  );
};
export default StructuredDetail;
