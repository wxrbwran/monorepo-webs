import React, {
  FC, useEffect, useState, useRef, useMemo,
} from 'react';
import {
  Radio, Checkbox, Button, Tabs, message,
} from 'antd';
import { useDispatch } from 'umi';
import { isArray } from 'lodash';
import { IApiDocumentItem, IStructuredDetailProps } from 'typings/imgStructured';
import SearchHospital from '@/components/SearchHospital';
import * as api from '@/services/api';
import ItemDate from '../ItemDate';
import StructuredDetailItem from '../StructuredDetailItem';
import styles from './index.scss';
// 此组件区分是化验单还是检查单分类
interface IInitList {
  HYD?: IApiDocumentItem[];
  JCD?: IApiDocumentItem[];
}
const { TabPane } = Tabs;
const StructuredDetail: FC<IStructuredDetailProps> = (props) => {
  const {
    data, imageId, handleRefresh, handleClose,
  } = props;
  const dispatch = useDispatch();
  const isRefreshParent = useRef(false);
  const initLevel1 = data?.outType === 'HYD_JCD' ? ['HYD', 'JCD'] : [data?.outType];
  const initOrg = { hospitalId: data?.orgId, hospitalName: data?.orgName };
  // 一级分类 化验单、检查单、图片不清晰、非单据
  const [level1Types, setLevel1Types] = useState<string[]>(data?.outType ? initLevel1 : ['']);
  const [inspectionCallbackFns, setCallbackFns] = useState<CommonData>({}); // 保存各个分类的方法队列
  const [hospital, setHospital] = useState(initOrg);
  const [reportTime, setreporttime] = useState<number>(data?.reportTime || new Date().getTime());
  const [unknownReport, setunknownReport] = useState(data?.unknownReport); // 采样时间是否不详
  const fetchInitFormat = useMemo(() => () => {
    if (data.documentList.length > 0) {
      const initHyd: IApiDocumentItem[] = [];
      const initJcd: IApiDocumentItem[] = [];
      data.documentList.forEach((item: IApiDocumentItem) => {
        if (item.documentType === 'HYD') {
          initHyd.push(item);
        } else {
          initJcd.push(item);
        }
      });
      return { HYD: initHyd, JCD: initJcd };
    }
    return {};
  }, [data]);
  const initList:IInitList = fetchInitFormat(); // 获取init数据
  useEffect(() => () => {
    // 在组件销毁时判断：如果保存成功了，刷新下单据列表，更新数据
    if (isRefreshParent.current && handleRefresh) {
      handleRefresh();
    }
  }, []);
  const saveData = (params: any) => {
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
  const handleSaveClick = () => {
    if (level1Types[0]) {
      let apiParams: CommonData = {
        imageId,
        unknownReport,
        reportTime: unknownReport ? null : reportTime,
        operatorId: window.$storage.getItem('sid'),
        sid: window.$storage.getItem('patientSid'),
        wcId: window.$storage.getItem('patientWcId'),
        outType: level1Types.length > 1 ? 'HYD_JCD' : level1Types[0],
      };
      // 化验检查单
      if (level1Types.includes('HYD') || level1Types.includes('JCD')) {
        Promise.all(Object.values(inspectionCallbackFns)
          .map((fn) => fn()))
          .then((documentList) => {
            if (documentList.length > 0) {
              apiParams = {
                ...apiParams,
                documentList,
                orgId: hospital?.hospitalId,
                orgName: hospital?.hospitalName,
              };
              saveData(apiParams);
            } else {
              message.warning('请选择具体化验单或检查单');
            }
          }).catch((err) => {
            console.log('err', err);
            message.error('请完善检查单后提交！');
          });
      } else {
        apiParams.documentList = [];
        saveData(apiParams);
      }
    } else {
      message.error('请选择图片类型');
    }
  };
  // 切换一级分类
  const handleChangeType = (e: any) => {
    if (isArray(e)) {
      setLevel1Types(e);
    } else {
      setLevel1Types([e.target.value]);
    }
  };

  const handleSetHospital = (key: string, val: any) => {
    console.log(key);
    setHospital({ ...val });
  };

  const imgTypeOption = [{ label: '化验单', value: 'HYD' }, { label: '检查单', value: 'JCD' }];
  const radioStyle = { fontSize: 14 };
  const level1Tabs: CommonData = {
    HYD: { label: '化验单: 组织体液化验的结果' },
    JCD: { label: '检查单: 器官结构和功能检查的结果' },
  };
  return (
    <div className={`flex-1 mx-20 mt-10 ${styles.structrued}`}>
      <div className="flex justify-between items-center mb-25">
        <div className="flex items-center">
          <Checkbox.Group
            options={imgTypeOption}
            onChange={(e) => handleChangeType(e)}
            value={level1Types}
          />
          <Radio.Group onChange={handleChangeType} value={level1Types[0]} style={{ display: 'flex' }}>
            <Radio style={radioStyle} value="NOT_CLEAR"> 图片不清晰 </Radio>
            <Radio style={radioStyle} value="NOT_HYD_JCD"> 非化验检查单 </Radio>
          </Radio.Group>
        </div>
        <Button className={styles.save_btn} type="primary" onClick={handleSaveClick}>保存并退出</Button>
      </div>
      {
        (level1Types.includes('HYD') || level1Types.includes('JCD')) && (
          <>
            <div className="flex text-sm items-center">
              <div className="font-medium mr-5"> 检查机构: </div>
              <SearchHospital
                placeholder="请输入检查机构"
                callback={handleSetHospital}
                fieldName="hospital"
                style={{ flex: 1 }}
                defaultValue={initOrg?.hospitalId ? initOrg : undefined}
              />
              <ItemDate
                setReporttime={(time: number | null) => setreporttime(time)}
                setUnknow={(isUnknown: boolean) => setunknownReport(isUnknown)}
                // 如果是回显，就直接取回显的时间，没有就设置当前时间
                initReportTime={reportTime}
                isUnknownTime={data?.unknownReport}
              />
            </div>
            <div id="structured_content" className="mt-15">
              <Tabs type="card">
                {
                  level1Types.map((level1Type: string) => (
                    <TabPane tab={level1Tabs[level1Type].label} key={level1Type}>
                      <StructuredDetailItem
                        inspectionCallbackFns={inspectionCallbackFns}
                        setCallbackFns={setCallbackFns}
                        level1Type={level1Type}
                        imageId={imageId}
                        initData={initList[level1Type]}
                      />
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
