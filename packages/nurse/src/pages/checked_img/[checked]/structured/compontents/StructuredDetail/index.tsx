import React, {
  FC, useEffect, useState, useRef, useMemo,
} from 'react';
import { Button, Tabs, message } from 'antd';
import { useDispatch } from 'umi';
import { IStructuredDetailProps } from 'typings/imgStructured';
import * as api from '@/services/api';
import StructuredDetailItem from '../StructuredDetailItem';
import StructuredDetailTopic from '../StructuredDetailTopic';
import Nodata from '../Nodata';
import { outTypes, formatJcdSubmitData } from '../../utils';
import styles from './index.scss';
import { isEmpty, cloneDeep, debounce } from 'lodash';
import uuid from 'react-uuid';

const { TabPane } = Tabs;
const StructuredDetail: FC<IStructuredDetailProps> = (props) => {
  const {
    hydData, jcdData, imageId, handleRefresh, handleClose, tempAll, templatePart,
    openTime, jcdOriginIds,
  } = props;
  console.log('hydData232', hydData);
  console.log('jcdData', jcdData);
  const sid = window.$storage.getItem('sid');
  const dispatch = useDispatch();
  const isRefreshParent = useRef(false);
  const fetchLevel1 = () => {
    const datas = [...hydData, ...jcdData];
    return isEmpty(datas) ? [{ outType: 'HYD', key: uuid() }] : datas;
  };
  // 保存各个分类的方法队列 - 检查单、图片不清晰、非医学单据
  const [inspectionCallbackFns, setCallbackFns] = useState<CommonData>({});
  const [hydCallbackFns, setHydCallbackFns] = useState<CommonData>({});
  // // true仅查看 false编辑中
  const [isViewOnly, setisViewOnly] = useState(!isEmpty(hydData) || !isEmpty(jcdData));
  const [typeTabs, setTypeTabs] = useState <any[]>(fetchLevel1());

  useEffect(() => {
    setTypeTabs(fetchLevel1());
    setisViewOnly(!isEmpty(hydData) || !isEmpty(jcdData));
  }, [hydData, jcdData]);
  useEffect(() => () => {
    // 在组件销毁时判断：如果保存成功了，刷新下单据列表，更新数据
    if (isRefreshParent.current && handleRefresh) {
      handleRefresh();
    }
  }, []);
  // 获取打开的时间 到点击保存时间段内新增的模板
  const fetchTimeSlotTemplate =  (to: number) => {
    const params = { from: openTime,  to };
    const data = api.image.fetchImageTopicTemplate(params);
    return data;
    // return tmpppppList.list;
  };
  const fetchAllTypes = () => {
    const allTypes = typeTabs.map(item => {
      return item?.meta?.title || item.outType;
    });
    return [...new Set(allTypes)];
  };
  const saveHydData = (params: any) => {
    api.image.putImageImageIndexes(params).then(() => {
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
    }).catch((err) => {
      message.error(err?.result || '保存失败');
    });
  };
  // const saveTemplate = (list: ITopicParams[]) => {
  //   const params = { list };
  //   console.log('tmpppp', params);
  //   api.image.putImageTopicTemplate(params).then(() => {
  //     console.log('添加问题模板成功');
  //   }).catch(err => {
  //     console.log('添加问题模板失败：', err);
  //   });
  // };
  const saveJcdData = (params: any) => {
    params.originIds = jcdOriginIds;
    api.image.putImageJcdAndOther(params).then(() => {
      console.log('添加检查单成功');
    }).catch(err => {
      console.log('添加检查单失败', err);
    });
  };

  const handleSaveClick = async () => {
    if (isViewOnly) {
      setisViewOnly(false);
    } else {
      const clickSaveTime = new Date().getTime();
      const timeSlotTemp = await fetchTimeSlotTemplate(clickSaveTime);
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
        Promise.all(Object.values(inspectionCallbackFns)
          .map((fn) => fn()))
          .then((documentList) => {
            apiParams.list = [...documentList];
            saveHydData(apiParams);
          }).catch((err) => {
            console.log('err', err);
            message.error('请完善化验单后提交！');
          });
        // 检查单、其它单据
        console.log('clickSaveTime', clickSaveTime);
        Promise.all(Object.values(hydCallbackFns)
          .map((fn) => fn(clickSaveTime)))
          .then((list) => {
            const { jcdList } = formatJcdSubmitData(list, timeSlotTemp, clickSaveTime);
            // saveTemplate(tempList);
            saveJcdData(jcdList);
          }).catch((err) => {
            console.log('err', err);
            message.error('请完善检查单后提交！');
          });
      } else {
        message.error('请选择图片类型');
      }
    }
  };

  const handelTabsEdit = (targetKey: string) => {
    const newTabs = typeTabs.filter(item => item.key !== targetKey);
    setTypeTabs(cloneDeep(newTabs));
  };

  const handleAddLevel1 = (type: string) => {
    if (['JCD', 'OTHER'].includes(type)) {
      typeTabs.push({ meta: { title: type }, key: uuid() });
    } else {
      typeTabs.push({ outType: type, key: uuid() });
    }
    setTypeTabs(cloneDeep(typeTabs));
  };

  const fetInitData = (inx: number) => {
    if (typeTabs[inx]?.documentList || typeTabs[inx]?.data) {
      return typeTabs?.[inx];
    }
    return [];
  };
  const renderTabPane = useMemo(() => {
    return (itemTab: any, inx: number) => {
      let dom: any = null;
      const typeStart = itemTab?.outType || itemTab?.meta?.title;
      const baseProps = {
        outType: typeStart,
        outTypeAndInx: itemTab.key,
        imageId,
        isViewOnly,
      };
      switch (typeStart) {
        case 'HYD':
          dom = <StructuredDetailItem
            setCallbackFns={setCallbackFns}
            inspectionCallbackFns={inspectionCallbackFns}
            {...baseProps}
            initData={fetInitData(inx)}
          />;
          break;
        case 'OTHER':
        case 'JCD':
          dom = <StructuredDetailTopic
            initData={fetInitData(inx)}
            templatePart={templatePart}
            hydCallbackFns={hydCallbackFns}
            setHydCallbackFns={setHydCallbackFns}
            tempAll={tempAll}
            {...baseProps}
          />;
          break;
        default:
          dom = <Nodata {...baseProps} inspectionCallbackFns={inspectionCallbackFns} />;
          break;
      }
      return dom;
    };
  }, [isViewOnly, typeTabs]);
  console.log('typeTabs21', typeTabs);
  return (
    <div className={`flex-1 mx-20 mt-10 ${styles.structrued} ${isViewOnly ? styles.disabled : ''}`}>
      <div className="flex justify-between items-center mb-25">
        <div className="flex items-center">
          {
            !isViewOnly && (
              Object.keys(outTypes).map(outType =>
                <Button key={outType} className="mr-15" onClick={() => handleAddLevel1(outType)}>{outTypes[outType]}</Button>,
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
              <Tabs type="editable-card" onEdit={handelTabsEdit} hideAdd>
                {
                  typeTabs.map((itemTab: any, inx) => (
                    <TabPane
                      tab={outTypes?.[itemTab?.outType || itemTab?.meta?.title]}
                      key={itemTab.key}
                      forceRender={true}
                    >
                      {renderTabPane(itemTab, inx)}
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
