import React, {
  FC, useEffect, useState, useRef, useMemo,
} from 'react';
import { Button, Tabs, message } from 'antd';
import { useDispatch } from 'umi';
import { IStructuredDetailProps, ITopicItemApi, ITopicQaItemApi } from 'typings/imgStructured';
import * as api from '@/services/api';
import StructuredDetailItem from '../StructuredDetailItem';
import StructuredDetailTopic from '../StructuredDetailTopic';
import Nodata from '../Nodata';
import { outTypes, formatJcdSubmitData } from '../utils';
import styles from './index.scss';
import { isEmpty } from 'lodash';

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
    hydData, jcdData, imageId, handleRefresh, handleClose, tempAll, templatePart, openTime,
  } = props;
  const sid = window.$storage.getItem('sid');
  const dispatch = useDispatch();
  const isRefreshParent = useRef(false);
  const fetchLevel1 = () => {
    const level1: string[] = [];
    hydData.forEach((hytItem, hydInx: number) => {
      level1.push(hytItem.outType + hydInx);
    });
    jcdData.forEach((jcdItem: ITopicItemApi, jcdInx) => {
      level1.push(jcdItem.meta.title + jcdInx);
    });
    return level1.length === 0 ? ['HYD0'] : level1;
  };
  // 一级分类 化验单、检查单、图片不清晰、非单据
  const [level1Types, setLevel1Types] = useState<string[]>(fetchLevel1());
  // 保存各个分类的方法队列 - 检查单、图片不清晰、非医学单据
  const [inspectionCallbackFns, setCallbackFns] = useState<CommonData>({});
  const [hydCallbackFns, setHydCallbackFns] = useState<CommonData>({});
  // // true仅查看 false编辑中
  const [isViewOnly, setisViewOnly] = useState(!isEmpty(hydData) || !isEmpty(jcdData));

  useEffect(() => {
    setLevel1Types(fetchLevel1());
    setisViewOnly(!isEmpty(hydData) || !isEmpty(jcdData));
    console.log('fifjeifje', !isEmpty(hydData) || !isEmpty(jcdData));
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
  };
  const fetchAllTypes = () => {
    const allTypes = level1Types.map(item => item.replace(/\d+/g, ''));
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
  const saveTemplate = (data: ITopicParams[], createdTime: number) => {
    const params = { data, meta: { imageId, sid, createdTime } };
    console.log('tmpppp', params);
    api.image.putImageTopicTemplate(params).then(() => {
      console.log('添加问题模板成功');
    }).catch(err => {
      console.log('添加问题模板失败：', err);
    });
  };
  const saveJcdData = (params: any) => {
    // jcdData
    params.originIds = jcdData.map(item => item.meta.id);
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
      if (level1Types[0]) {
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
            const { tempList, jcdList } = formatJcdSubmitData(list, timeSlotTemp, clickSaveTime);
            saveTemplate(tempList, clickSaveTime);
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
    setLevel1Types((prev) => prev.filter(item => item !== targetKey));
  };

  const handleAddLevel1 = (type: string) => {
    const inx = level1Types.filter(item => item.startsWith(type));
    setLevel1Types([...level1Types, `${type}${inx.length}`]);
  };
  const fetchHydInit = useMemo(() => (inx: number) => {
    return hydData?.[inx] || [];
  }, [hydData]);
  const fetchJcdInit = useMemo(() => (inx: number) => {
    const index = inx - hydData.length;
    return jcdData?.[index] || [];
  }, [jcdData]);
  const renderTabPane = useMemo(() => {
    return (type: string, level1Inx: number) => {
      let dom: any = null;
      const typeStart = type.replace(/\d+/g, ''); // HYD1->HYD
      const baseProps = {
        outType: typeStart,
        outTypeAndInx: type,
        imageId,
        isViewOnly,
      };
      switch (typeStart) {
        case 'HYD':
          dom = <StructuredDetailItem
            setCallbackFns={setCallbackFns}
            inspectionCallbackFns={inspectionCallbackFns}
            {...baseProps}
            initData={fetchHydInit(level1Inx)}
          />;
          break;
        case 'OTHER':
        case 'JCD':
          dom = <StructuredDetailTopic
            initData={fetchJcdInit(level1Inx)}
            templatePart={templatePart}
            hydCallbackFns={hydCallbackFns}
            setHydCallbackFns={setHydCallbackFns}
            tempAll={tempAll}
            openTime={openTime}
            {...baseProps}
          />;
          break;
        default:
          dom = <Nodata {...baseProps} inspectionCallbackFns={inspectionCallbackFns} />;
          break;
      }
      return dom;
    };
  }, [level1Types, isViewOnly]);
  return (
    <div className={`flex-1 mx-20 mt-10 ${styles.structrued} ${isViewOnly ? styles.disabled : ''}`}>
      <div className="flex justify-between items-center mb-25">
        <div className="flex items-center">
          {
            Object.keys(outTypes).map(outType =>
              <Button key={outType} className="mr-15" onClick={() => handleAddLevel1(outType)}>{outTypes[outType]}</Button>,
            )
          }
        </div>
        <Button className={styles.save_btn} type="primary" onClick={handleSaveClick}>
          {isViewOnly ? '修改结果' : '保存并退出'}
        </Button>
      </div>
      {
        level1Types.length > 0 && (
          <>
            <div className={`mt-15 ${styles.structured_content}`}>
              <Tabs type="editable-card" onEdit={handelTabsEdit} hideAdd>
                {
                  level1Types.map((level1Type: string, level1Inx) => (
                    <TabPane
                      tab={outTypes[level1Type.replace(/\d+/g, '')]}
                      key={level1Type}
                      forceRender={true}
                    >
                      {renderTabPane(level1Type, level1Inx)}
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
