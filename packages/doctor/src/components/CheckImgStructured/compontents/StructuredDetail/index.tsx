import React, {
  FC, useEffect, useState, useRef, useMemo,
} from 'react';
import { Button, Tabs, message } from 'antd';
import { useDispatch } from 'react-redux';
import { IStructuredDetailProps, ITopicQaItemApi, ITopicItemApi, IApiDocumentList } from 'typings/imgStructured';
import * as api from '@/services/api';
import StructuredDetailHydPanel from '../StructuredDetailHydPanel';
import StructuredDetailTopic from '../StructuredDetailTopic';
import Nodata from '../Nodata';
import { outTypes, formatJcdSubmitData } from '../utils';
import styles from './index.scss';
import { isEmpty, cloneDeep, debounce } from 'lodash';
import { CloseOutlined } from '@ant-design/icons';

interface ITopicParams {
  data: ITopicQaItemApi[];
  meta: {
    imageId: string;
    sid: string;
    createdTime: number;
    title?: string;
  }
}
const { TabPane } = Tabs;
const StructuredDetail: FC<IStructuredDetailProps> = (props) => {
  const {
    hydData, jcdData, imageId, handleRefresh, handleClose, tempAll,
    jcdOriginIds,
  } = props;
  console.log('hydData232', hydData);
  console.log('jcdData', jcdData);
  const sid = window.$storage.getItem('sid');
  const dispatch = useDispatch();
  const isRefreshParent = useRef(false);
  const fetchLevel1 = () => {
    const jcdTabs = jcdData.map((jctItem: ITopicItemApi) => {
      return {  ...jctItem, outType: jctItem.meta.title };
    });
    const hydTab = hydData.map((hydItem: IApiDocumentList) => {
      return { ...hydItem, outType: hydItem.outType };
    });
    const datas = [...hydTab, ...jcdTabs];
    return isEmpty(datas) ? [{ outType: 'HYD' }] : datas;
  };
  // 保存各个分类的方法队列 - 检查单、图片不清晰、非医学单据
  const [hydCallbackFns, setHydCallbackFns] = useState<CommonData>({});
  const [jcdCallbackFns, setJcdCallbackFns] = useState<CommonData>({});
  // // true仅查看 false编辑中
  const [isViewOnly, setisViewOnly] = useState(!isEmpty(hydData) || !isEmpty(jcdData));
  const [typeTabs, setTypeTabs] = useState <any[]>(fetchLevel1());
  const [activeType, setActiveType] = useState(fetchLevel1()[0]);
  // 1表示检查单接口或化验单接口其中一个保存成功，2表示两个都成功，此时关闭弹框
  const [saveSuccess, setSaveSuccess] = useState(0);

  useEffect(() => {
    const tabs = fetchLevel1();
    setTypeTabs(tabs);
    setActiveType(tabs[0].outType);
    setisViewOnly(!isEmpty(hydData) || !isEmpty(jcdData));
  }, [hydData, jcdData]);
  useEffect(() => () => {
    // 在组件销毁时判断：如果保存成功了，刷新下单据列表，更新数据
    if (isRefreshParent.current && handleRefresh) {
      handleRefresh();
    }
    setSaveSuccess(0);
    dispatch({
      type: 'structured/saveAddQa',
      payload: {
        currEditData: {},
      },
    });
  }, []);
  useEffect(() => {
    console.log('saveSuccess', saveSuccess);
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
  const fetchAllTypes = () => {
    const allTypes = typeTabs.map(item => {
      return item.outType;
    });
    return [...new Set(allTypes)];
  };
  const saveHydData = (params: any) => {
    api.image.putImageImageIndexes(params).then(() => {
      setSaveSuccess(prev => prev + 1);
    }).catch((err: any) => {
      message.error(err?.result || '保存失败');
    });
  };
  const saveTemplate = (list: ITopicParams[]) => {
    if (!isEmpty(list)) {
      const params = { list };
      api.image.putImageTopicTemplate(params).then(() => {
        console.log('添加问题模板成功');
      }).catch((err: any) => {
        console.log('添加问题模板失败：', err);
      });
    }
  };
  const saveJcdData = (params: any) => {
    // 1.原ids不为空，表示有修改。2.list不为空，表示有修改（ids存在）/新添加(ids为空)
    if (!isEmpty(jcdOriginIds) ||  !isEmpty(params.list)) {
      params.originIds = jcdOriginIds;
      api.image.putImageJcdAndOther(params).then(() => {
        console.log('添加检查单成功');
        setSaveSuccess(prev => prev + 1);
      }).catch((err: any) => {
        console.log('添加检查单失败', err);
      });
    } else {
      setSaveSuccess(prev => prev + 1);
    }
  };

  const handleSaveClick = async () => {
    if (isViewOnly) {
      setisViewOnly(false);
    } else {
      setSaveSuccess(0);
      const clickSaveTime = new Date().getTime();
      if (!isEmpty(typeTabs)) {
        const apiParams: CommonData = {
          imageId,
          allTypes: fetchAllTypes(),
          operatorId: sid,
          sid: window.$storage.getItem('patientSid'),
          wcId:window.$storage.getItem('patientWcId'),
          list: [],
        };
        // 化验、图片不清晰、非医学单据
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
            const { tempList, jcdList } = formatJcdSubmitData(list, clickSaveTime);
            saveTemplate(tempList);
            saveJcdData(jcdList);
          }).catch((err) => {
            console.log('请完善检查单后提交！err', err);
            message.error('请完善检查单后提交！');
          });
      } else {
        message.error('请选择图片类型');
      }
    }
  };

  const handelTabsEdit = (targetOutType: string) => {
    const newTabs = typeTabs.filter(item => item.outType !== targetOutType);
    if (targetOutType === activeType) {
      setActiveType(newTabs?.[newTabs?.length - 1]);
    }
    setTypeTabs(cloneDeep(newTabs));
  };

  const handleAddLevel1 = (type: string) => {
    const tabsTitle = typeTabs.map(item => item.outType);
    if (!tabsTitle.includes(type)) {
      typeTabs.push({ outType: type });
      setTypeTabs(cloneDeep(typeTabs));
      console.log('typeTab1212s', typeTabs);
      if (!['NOT_CLEAR', 'NOT_HYD_JCD'].includes(type)) {
        setActiveType(typeTabs?.[typeTabs.length - 1].outType);
      }
    }
  };
  const handleDelLevel1 = (type: string) => {
    const newTabs = typeTabs.filter(item => item.outType !== type);
    setTypeTabs(newTabs);
  };

  const fetInitData = (inx: number) => {
    console.log(34333, inx);
    console.log('typeTabs', typeTabs);
    if (typeTabs[inx]?.documentList || typeTabs[inx]?.data) {
      console.log('-------2', typeTabs?.[inx]);
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
      };
      switch (typeStart) {
        case 'HYD':
          dom = <StructuredDetailHydPanel
            setHydCallbackFns={setHydCallbackFns}
            hydCallbackFns={hydCallbackFns}
            {...baseProps}
            initData={fetInitData(inx)}
          />;
          break;
        case 'OTHER':
        case 'JCD':
          dom = <StructuredDetailTopic
            jcdCallbackFns={jcdCallbackFns}
            setJcdCallbackFns={setJcdCallbackFns}
            tempAll={tempAll}
            initData={fetInitData(inx)}
            {...baseProps}
          />;
          break;
        default:
          dom = <Nodata {...baseProps} hydCallbackFns={hydCallbackFns} />;
          break;
      }
      return dom;
    };
  }, [isViewOnly, typeTabs]);
  console.log('typeTabs21', typeTabs);
  console.log('outTypes', outTypes);
  const typeTabsText = typeTabs.map(typeItem => typeItem.outType);
  // typeTabs
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
                  onClick={() => handleAddLevel1(outType)}
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
