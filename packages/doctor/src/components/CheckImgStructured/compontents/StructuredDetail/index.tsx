import React, {
  FC, useEffect, useState, useRef, useMemo,
} from 'react';
import { Button, Tabs, message } from 'antd';
import { useDispatch } from 'react-redux';
import { IStructuredDetailProps, ITopicItemApi, IApiDocumentList } from 'typings/imgStructured';
import * as api from '@/services/api';
import StructuredDetailHydPanel from '../StructuredDetailHydPanel';
import StructuredDetailJcdPanel from '../StructuredDetailJcdPanel';
import { outTypes } from '../utils';
import styles from './index.scss';
import { isEmpty, cloneDeep, debounce } from 'lodash';
import { CloseOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const StructuredDetail: FC<IStructuredDetailProps> = (props) => {
  const { hydData, jcdData, imageId, handleRefresh, handleClose, // jcdOriginIds,
  } = props;
  console.log('hydData232', hydData);
  console.log('jcdData', jcdData);
  const initTypeTabs = () => {
    const jcdTabs = jcdData.map((jctItem: ITopicItemApi) => {
      return {  ...jctItem, outType: jctItem.meta.title };
    });
    const hydTab = hydData.map((hydItem: IApiDocumentList) => {
      return { ...hydItem, outType: hydItem.outType };
    });
    const datas = [...hydTab, ...jcdTabs];
    return isEmpty(datas) ? [{ outType: 'JCD' }] : datas;
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
    const tabs = initTypeTabs();
    setTypeTabs(tabs);
    setActiveType(tabs[0].outType);
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
    api.image.putImageImageIndexes(params).then(() => {
      setSaveSuccess(prev => prev + 1);
    }).catch((err: any) => {
      message.error(err?.result || '保存失败');
    });
  };
  // const saveJcdData = (params: any) => {
  //   // 1.原ids不为空，表示有修改。2.list不为空，表示有修改（ids存在）/新添加(ids为空)
  //   if (!isEmpty(jcdOriginIds) ||  !isEmpty(params.list)) {
  //     params.originIds = jcdOriginIds;
  //     api.image.putImageJcdAndOther(params).then(() => {
  //       console.log('添加检查单成功');
  //       setSaveSuccess(prev => prev + 1);
  //     }).catch((err: any) => {
  //       console.log('添加检查单失败', err);
  //     });
  //   } else {
  //     setSaveSuccess(prev => prev + 1);
  //   }
  // };

  const handleSaveClick = async () => {
    if (isViewOnly) {
      setisViewOnly(false);
    } else {
      setSaveSuccess(0);
      const clickSaveTime = new Date().getTime();
      if (!isEmpty(typeTabs)) {
        const apiParams: CommonData = {
          imageId,
          allTypes: typeTabs.map(item => item.outType),
          operatorId: sid,
          sid: window.$storage.getItem('patientSid'),
          wcId:window.$storage.getItem('patientWcId'),
          list: [],
        };
        // 化验单
        Promise.all(Object.values(hydCallbackFns)
          .map((fn) => fn()))
          .then((documentList) => {
            apiParams.list = [...documentList];
            saveHydData(apiParams);
          }).catch((err) => {
            console.log('请完善化验单后提交！err', err);
            message.error('请完善化验单后提交！');
          });
        // 检查单、其它单据
        Promise.all(Object.values(jcdCallbackFns)
          .map((fn) => fn(clickSaveTime)))
          .then((list) => {
            console.log('=====jcdlist', list.flat(5));
            // const { tempList, jcdList } = formatJcdSubmitData(list, clickSaveTime);
            // saveJcdData(jcdList);
          }).catch((err) => {
            console.log('请完善检查单后提交！err', err);
            message.error('请完善检查单后提交！');
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

  const fetInitData = (inx: number) => {
    console.log(34333, inx);
    console.log('typeTabs', typeTabs);
    // 化验单是 documentList， 检查单是data
    if (typeTabs[inx]?.documentList || typeTabs[inx]?.data) {
      return typeTabs?.[inx];
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
        imageId,
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
        // case 'JCD':
        //   dom = <StructuredJcdTabItem
        //     jcdCallbackFns={jcdCallbackFns}
        //     setJcdCallbackFns={setJcdCallbackFns}
        //     tempAll={tempAll}
        //     initData={fetInitData(inx)}
        //     {...baseProps}
        //   />;
        //   break;
        // default:
        //   dom = <Nodata {...baseProps} hydCallbackFns={hydCallbackFns} />;
        //   break;
        default:
          dom = <div>无数据</div>;
          break;
      }
      return dom;
    };
  }, [isViewOnly, typeTabs]);
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
                  typeTabs.filter(typeItem => !['NOT_CLEAR', 'NOT_HYD_JCD'].includes(typeItem.outType))
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
    </div>
  );
};
export default StructuredDetail;
