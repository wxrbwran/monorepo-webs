import React, { FC, useState, useEffect, useRef } from 'react';
import AddEditDiagnose from '@/components/AddEditDiagnose/index';
import AddEditTreatment from '@/components/AddEditTreatment/index';
import RelatedHistory from '@/components/RelatedHistory';
import DiagnosesToView from './compontents/DiagnosesToView';
import RelatedHistoryToView from './compontents/RelatedHistoryToView';
import TreatmentToView from './compontents/TreatmentToView';
import event from 'xzl-web-shared/dist/utils/events/eventEmitter';
import { Button } from 'antd';
import { useParams } from 'umi';
import { DeleteOutlined } from '@ant-design/icons';
import { isEmpty, cloneDeep } from 'lodash';
import styles from './index.scss';
import { IdiagnosisItem, IpreviousHistory, ITreatmentDataItem } from 'typings/imgStructured';

interface IProps {
  isViewOnly: boolean;
  initData: IpreviousHistory;
}
interface IPreviousData {
  treatmentDataList: ITreatmentDataItem[];
  diagnosisList: IdiagnosisItem[];
  integratedHistory: CommonData;
}
const StructuredDetailPreviousHistory: FC<IProps> = (props) => {
  const { isViewOnly, initData } = props;
  console.log('StructuredDetailPreviousHistoryinitData', initData);
  const initPreviousData = { diagnosisList: [], treatmentDataList:[], integratedHistory:{} };
  const [diagnoses, setDiagnoses] = useState<number[]>([]);
  const [treatments, setTreatments] = useState<number[]>([]);
  // 这个是通过event返回的数据，拿这里的数据和diagnoses，treatments的数量 做比较，如果一致，表示所有监听器都已返回最新数据
  const previousData = useRef<IPreviousData>(cloneDeep(initPreviousData));
  // 这个是初始的数据。仅用做回显初始化使用
  const initD = useRef<IPreviousData>(cloneDeep(initPreviousData));
  const { sid } = useParams<{ sid: string }>();
  const patientWcid = window.$storage.getItem('patientWcId');

  useEffect(() => {
    if (initData && !isEmpty(initData)) {
      const treatmentDataList = initData?.treatmentInfoList[3]?.treatmentDataList || [];
      const dKeys = initData?.diagnosisList?.map((item, inx) => new Date().getTime() + inx);
      const tKeys = treatmentDataList.map((item, inx) => new Date().getTime() + inx);
      setDiagnoses(dKeys);
      setTreatments(tKeys);
      initD.current = {
        treatmentDataList,
        diagnosisList: initData.diagnosisList,
        integratedHistory: initData.integrateHistory,
      };
      console.log('=============2', {
        treatmentDataList,
        diagnosisList: initData.diagnosisList,
        integratedHistory: initData.integrateHistory,
      });
      console.log('tKeys', tKeys);
    }
  }, [initData]);
  useEffect(() => {
    const Listener = (type: string, data: any) => {
      const saveData = { ...previousData.current };
      console.log('1==========', { ...previousData.current });
      console.log('typeee', type, data);
      if (type === 'disagnose') {
        saveData.diagnosisList.push(data);
      } else if (type === 'treatment') {
        saveData.treatmentDataList.push(data);
      } else if (type === 'integratedHistory') {
        saveData.integratedHistory = data;
      }
      const { diagnosisList, treatmentDataList, integratedHistory } = saveData;
      console.log('previousData', saveData);
      console.log('=====1',  diagnosisList.length === diagnoses.length);
      console.log('=====2',  treatmentDataList.length === treatments.length);
      console.log('treatmentDataList', treatmentDataList);
      console.log('=====3',  !isEmpty(integratedHistory));
      previousData.current = { ...saveData };
      if (!!(
        diagnosisList.length === diagnoses.length &&
        treatmentDataList.length === treatments.length &&
        !isEmpty(integratedHistory)
      )) {
        console.log('fetchPreviousHistoryData');
        event.emit('fetchPreviousHistoryData', {
          ...saveData,
          treatmentInfoList: {
            wcId: patientWcid,
            sid,
            roleType: window.$storage.getItem('roleId'),
            treatmentInfo: {
              category: 'DIAGNOSIS_TREATMENT',
              treatmentDataList,
            },
          },
        });
        previousData.current = cloneDeep(initPreviousData); // 只要点过提交了就重置
      }
    };
    event.addListener('fetchStructuredPreviousHistory', Listener);
    return () => {
      event.removeListener('fetchStructuredPreviousHistory', Listener);
    };
  }, [diagnoses, treatments]);

  const handleDelDiagnose = (key: number, inx: number) => {
    console.log('=========_____', diagnoses.filter(item => item !== key));
    setDiagnoses(diagnoses.filter(item => item !== key));
    const d = initD.current;
    d.diagnosisList.splice(inx, 1);
    console.log('======3333d', d);
    initD.current = { ...d };
  };
  const handleDelTreatments = (key: number, inx: number) => {
    setTreatments(treatments.filter(item => item !== key));
    const d = initD.current;
    d.treatmentDataList.splice(inx, 1);
    initD.current = { ...d };
  };
  console.log('++++++++++++5', diagnoses);
  return (
    <div className={styles.previous_history}>
      <div className='box-shadow p-10 mt-20'>
        <div className='flex justify-between border-b border-gray-200 border-solid pb-8 mb-20'>
          <div className={styles.tit}>诊断</div>
          {
            !isViewOnly && (
              <span className={styles.add_btn}
                onClick={() => setDiagnoses([...diagnoses, new Date().getTime()])}
              >添加</span>
            )
          }
        </div>
        {
          diagnoses.map((item, inx) => {
            const initItemD = initD.current.diagnosisList?.[inx];
            return (
              <div className={styles.item} key={item}>
                {
                  isViewOnly ? <DiagnosesToView initData={initItemD} /> : (
                    <>
                      <AddEditDiagnose
                        type={initItemD ? 'edit' : 'add'}
                        refreshList={() => {}}
                        initData={initItemD ? initItemD : null}
                      />
                      <span className='absolute right-10 bottom-10' onClick={() => handleDelDiagnose(item, inx)}>
                        <Button type="link" size='large' icon={<DeleteOutlined />}>删除</Button></span>
                    </>
                  )
                }
              </div>
            );
          })
        }
        { isEmpty(diagnoses) && <div className='text-gray-400'>
          {isViewOnly ? '诊断数据为空' : '点击右上角添加诊断'}
        </div> }
      </div>
      <div className='box-shadow p-10 mt-20'>
        <div className='flex justify-between border-b border-gray-200 border-solid pb-8 mb-20'>
          <div className={styles.tit}>治疗</div>
          {
            !isViewOnly && (
              <span className={styles.add_btn}
            onClick={() => setTreatments([...treatments, new Date().getTime()])}
          >添加</span>
            )
          }
        </div>
        {
          treatments.map((item, inx) => {
            const initItemD = initD.current.treatmentDataList?.[inx];
            return (
              <div className={styles.item} key={item}>
                {
                  isViewOnly ? <TreatmentToView initData={initItemD} /> : (
                    <>
                      <AddEditTreatment
                        type={initItemD ? 'edit' : 'add'}
                        refresh={() => {}}
                        initData={initItemD ? initD.current.treatmentDataList?.[inx] : undefined}
                      />
                      <span className='absolute right-10 bottom-10' onClick={() => handleDelTreatments(item, inx)}>
                        <Button type="link" size='large' icon={<DeleteOutlined />}>删除</Button></span>
                    </>
                  )
                }
              </div>
            );
          })
        }
        { isEmpty(treatments) && <div className='text-gray-400'>
          {isViewOnly ? '治疗数据为空' : '点击右上角添加治疗'}
        </div> }
      </div>
      <div className='box-shadow py-20 pl-20 mt-20 w-full modal'>
        {
          isViewOnly ? <RelatedHistoryToView /> : <RelatedHistory />
        }
      </div>
    </div>
  );
};

export default StructuredDetailPreviousHistory;
