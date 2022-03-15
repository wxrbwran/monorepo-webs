import React, {
  FC, useEffect, useState, useRef, useMemo,
} from 'react';
import { Button, Tabs, message } from 'antd';
import { useDispatch } from 'react-redux';
import * as api from '@/services/api';
import StructuredDetailHydPanel from '../StructuredDetailHydPanel';
import StructuredDetailJcdPanel from '../StructuredDetailJcdPanel';
import StructuredDetailPreviousHistory from '../StructuredDetailPreviousHistory';
import { outTypes, formatJcdSubmitData } from '../utils';
import styles from './index.scss';
import { isEmpty, cloneDeep, debounce } from 'lodash';
import EmptyIcon from '@/assets/img/jgh_empty.png';
import { CloseOutlined } from '@ant-design/icons';
import { IApiDocumentList, IStructuredDetailProps } from 'typings/imgStructured';
import event from 'xzl-web-shared/dist/utils/events/eventEmitter';

const { TabPane } = Tabs;
const StructuredDetail: FC<IStructuredDetailProps> = (props) => {
  const { indexesData, jcdData, images, handleRefresh, handleClose, jcdOriginIds, groupId,
  } = props;
  const { hydData, previousHistory } = indexesData;
  console.log('indexesData232', indexesData);
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
    if (!isEmpty(previousHistory)) {
      datas.push({ outType: 'JWS', initData: previousHistory });
    }
    return isEmpty(datas) ? [] : datas;
  };
  const sid = window.$storage.getItem('sid');
  const dispatch = useDispatch();
  const isRefreshParent = useRef(false);
  console.log('======previousHistory', previousHistory);
  // 保存各个分类的方法队列 - 检查单、图片不清晰、非医学单据
  const [hydCallbackFns, setHydCallbackFns] = useState<CommonData>({});
  const [jcdCallbackFns, setJcdCallbackFns] = useState<CommonData>({});
  const [isViewOnly, setisViewOnly] = useState(!isEmpty(hydData) || !isEmpty(jcdData) || !isEmpty(previousHistory)); // true仅查看 false编辑中
  const [typeTabs, setTypeTabs] = useState <any[]>(initTypeTabs());
  const [activeType, setActiveType] = useState(initTypeTabs()[0]);
  const [loading, setLoading] = useState(false);
  // 1：检查单或化验单中某一个保存成功，2表示两个都成功，此时关闭弹框
  const [saveSuccess, setSaveSuccess] = useState(0);
  const apiParams: CommonData = useRef({
    imageIds:images.map(item => item.imageId),
    operatorId: sid,
    sid: window.$storage.getItem('patientSid'),
    wcId:window.$storage.getItem('patientWcId'),
    list: [],
    ...(groupId ? { groupId } : {} ),
  });

  useEffect(() => {
    const tabs: any[] = initTypeTabs();
    setTypeTabs(tabs);
    setActiveType(tabs.filter(item => !['NOT_CLEAR', 'NOT_HYD_JCD'].includes(item.outType))?.[0]?.outType);
    setisViewOnly(!isEmpty(hydData) || !isEmpty(jcdData) || !isEmpty(previousHistory));
  }, [hydData, jcdData, previousHistory]);

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
    console.log('saveSuccess', saveSuccess);
    const params = apiParams.current;
    params.allTypes =  typeTabs.map(item => item.outType);
    // 既往史是通过event监听实现的，如果包含既往史，且saveSuccess没有累加到3，说明必填字段没有输入。
    const isPass = params.allTypes.includes('JWS') ? saveSuccess === 3 : saveSuccess === 2;
    console.log('1111112', params.allTypes.includes('JWS'));
    console.log('111111223', saveSuccess);
    if (isPass) {
      console.log('params111', apiParams.current);
      if (
        isEmpty(params?.imageJCD?.list) &&
        isEmpty(params.list) &&
        !params.allTypes.includes('JWS') &&
        !params.allTypes.includes('NOT_CLEAR') &&
        !params.allTypes.includes('NOT_HYD_JCD') ) {
        // 1检查单数据为空，2并且化验单数据为空，3并且类型不包括不清晰、4非化验单检查单时，要提示内容为空
        message.error('单据内容为空！');
        setLoading(false);
      } else {
        setLoading(false);
        console.log('====11+++++++++++保存单据内容', params);
        api.image.putImageImageIndexes(params).then(() => {
          if (saveSuccess === 3) {
            // 表示存在既往史，触发event，患者详情监听到后刷新诊断处理
            event.emit('refreshPreviousHistory');
          }
          message.success('保存成功');
          setLoading(false);
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
        }).catch((err: any) => {
          message.error(err?.result || '保存失败');
          setSaveSuccess(0);
        });
      }
    }
  }, [saveSuccess]);

  // 监听既往史抛回的数据（点击保存后）
  useEffect(() => {
    const PreviousHistoryListener = (data) => {
      console.log('handleSavePreviousHistory', data);
      if (data.diagnosisList.find((item: any) => item === 'error')) {
        message.error('诊断内容为空！');
        setLoading(false);
      } else if (data.treatmentInfoList.treatmentInfo.treatmentDataList.find((item: any) => item === 'error')) {
        message.error('治疗内容为空！');
        setLoading(false);
      } else {
        apiParams.current = { ...apiParams.current, ...data };
        setSaveSuccess(prev => prev + 1);
      }
    };
    event.addListener('fetchPreviousHistoryData', PreviousHistoryListener);
    return () => {
      event.removeListener('fetchPreviousHistoryData', PreviousHistoryListener);
    };
  }, []);

  const handleSaveHyd = () => {
    Promise.all(Object.values(hydCallbackFns)
      .map((fn) => fn()))
      .then((documentData: any) => {
        console.log('documentList', documentData);
        // tab没有选择化验单类型，直接验证通过
        if (isEmpty(documentData)) {
          setSaveSuccess(prev => prev + 1);
        } else {
          // 验证1：选择了化验单tab，但没有选择任何单据
          if (isEmpty(documentData[0].documentList)) {
            message.error('化验单内容为空，请填写!');
            setLoading(false);
          } else {
            // 验证2：校验某个单据下面如果一个指标都没有，要提示错误
            const errDocument = documentData[0].documentList.filter((item: any) => isEmpty(item.indexList));
            if (isEmpty(errDocument)) {
              apiParams.current = { ...apiParams.current, list: [...documentData] };
              setSaveSuccess(prev => prev + 1);
            } else {
              message.error(`【${errDocument[0].documentName}】单据不存在指标！`);
              setLoading(false);
            }
          }
        }
      }).catch((err) => {
        console.log('请完善化验单后提交！err', err);
        setLoading(false);
        message.error('请完善化验单后提交！');
      });

  };

  // 把准备好的化验单数据，传给检查单，当检查单查验自己也无误后，再统一调用接口
  const handleSaveJcd = () => {
    const clickSaveTime = new Date().getTime();
    // 检查单、其它单据
    Promise.all(Object.values(jcdCallbackFns)
      .map((fn) => fn(clickSaveTime)))
      .then((list) => {
        const { jcdList } = formatJcdSubmitData(list, clickSaveTime);
        console.log('jcdList', jcdList);
        apiParams.current = {
          ...apiParams.current,
          imageJCD: {
            ...jcdList,
            originIds: jcdOriginIds,
          },
        };
        setSaveSuccess(prev => prev + 1);
      }).catch((err) => {
        console.log('请完善检查单后提交！err', err);
        message.error('请完善检查单后提交！');
      });
  };
  const handleSaveClick = async () => {
    setLoading(true);
    if (isViewOnly) {
      setisViewOnly(false);
      setLoading(false);
    } else {
      console.log('typeTabs', typeTabs);
      setSaveSuccess(0);
      if (!isEmpty(typeTabs)) {
        // 化验单
        handleSaveHyd();
        handleSaveJcd();
        event.emit('saveStructured');
      } else {
        message.error('请选择图片类型');
        setLoading(false);
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
    console.log('showTypeTabs', showTypeTabs);
    // 化验单是 documentList， 检查单和既往史是initData
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
        images,
        groupId,
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
        case 'JWS':
          dom = <StructuredDetailPreviousHistory  {...baseProps} />;
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
        <Button className={styles.save_btn} type="primary" onClick={debounce(handleSaveClick, 800)} loading={loading}>
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
