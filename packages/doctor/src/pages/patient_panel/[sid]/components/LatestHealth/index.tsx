import React, { useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useParams, useDispatch, useSelector } from 'umi';
import AdjustInspection from '@/components/AdjustInspection';
import Title from '../Title';
import MedicalChart from '../MedicalChart';
import LatestHealthHistory from '../LatestHealthHistory';
// import LatestHealthUpload from '../LatestHealthUpload';
import styles from './index.scss';

interface IProps {
  iOnlyShow?: boolean;
}
export default function LatestHealth({ iOnlyShow }: IProps) {
  const medicalList: IMedicalList[] = useSelector(
    (state: IState) => state.currentPatient.medicalLast,
  );
  const { sid } = useParams<{ sid: string }>();
  const [medicalIndexList, setMedicalIndexList] = useState<IMedicalList[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'currentPatient/fetchMedicalLast',
      payload: { sid },
    });
  }, [sid]);

  useEffect(() => {
    setMedicalIndexList(medicalList);
  }, [medicalList]);

  return (
    <div className={styles.health}>
      {!iOnlyShow && (
        <div className="flex justify-between mb-10">
          <Title text="用药达标" />
          <div className={styles.item}>
            <LatestHealthHistory>
              <span className={`${styles.edit_btn} text-center`} style={{ marginRight: 10 }}>
                结构化数据
              </span>
            </LatestHealthHistory>
            {/* <LatestHealthUpload>
              <span className={`${styles.edit_btn} text-center`}>
                采集指标
              </span>
            </LatestHealthUpload> */}
          </div>
        </div>
      )}
      <div className={styles.item}>
        <div className={styles.name}>&nbsp;</div>
        <div className={styles.actual}>实际值</div>
        <div className={styles.standard}>
          {
            iOnlyShow ? '达标值' : (
              <AdjustInspection>
                <span className={`${styles.edit_btn} patientEditBtn`}>
                  <EditOutlined style={{ fontSize: 12, marginRight: 3 }} />
                  达标值
                </span>
              </AdjustInspection>
            )
          }
        </div>
        {/* <div className={styles.advice}>建议值</div> */}
      </div>
      {
        medicalIndexList.map((item) => (
          <div className={styles.item} key={item.name}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.actual}>
              <span className={item.value ? item.color : ''}>{item.value || '暂无信息'}</span>
              {
                item.measuredAt && <MedicalChart data={item} />
              }
            </div>
            <div className={styles.standard}>
              {item.name === '血压' ? item.customizedReferenceMax : item.customizedReferenceMin}
              {item.spliceSymbol}
              {item.name === '血压' ? item.customizedReferenceMin : item.customizedReferenceMax}
            </div>
            {/* <div className={styles.advice}>{item.unifiedReference}</div> */}
          </div>
        ))
      }
    </div>
  );
}
