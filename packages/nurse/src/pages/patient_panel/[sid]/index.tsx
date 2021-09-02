import React, { useEffect } from 'react';
import { useDispatch } from 'umi';
import GoBack from '@/components/GoBack';
import ControlLineX from './components/ControlLineX';
import ControlLineY from './components/ControlLineY';
import Operation from './components/Operation';
import LatestHealth from './components/LatestHealth';
import BaseInfos from './components/BaseInfos';
import CheckImages from './components/CheckImages';
import ActionPanel from './components/ActionPanel';
import Related from './components/Related';
import CurrentMedicine from './components/CurrentMedicine';
import styles from './index.scss';

function PatientPanel() {
  const dispatch = useDispatch();
  const patientSid = window.$storage.getItem('patientSid');
  useEffect(() => {
    dispatch({
      type: 'detail/fetchMedicalRecord',
      payload: patientSid,
    });
  }, []);
  return (
    <div className={styles.patient_panel}>
      <div className={styles.left_wrap} id="leftPanel">
        <div>
          <BaseInfos />
        </div>
        <div className={styles.wrap_two}>
          <div className={styles.operation_wrap}>
            <Operation />
          </div>
          <div className={styles.outer_wrap}>
            <div className={styles.health_wrap}>
              <LatestHealth />
            </div>
            <div className={styles.gutter} />
            <div className={styles.related_wrap}>
              <Related />
            </div>
          </div>
        </div>
        <div className={styles.wrap_two}>
          <CheckImages />
        </div>
      </div>
      <ControlLineX />
      <div className={styles.right_wrap} id="rightPanel">
        <div id="medicineContent" className={styles.medicine_cont} style={{ flex: '0 1 auto', maxHeight: '250' }}>
          <CurrentMedicine />
        </div>
        <ControlLineY />
        <ActionPanel />
      </div>
      <GoBack />
    </div>
  );
}
PatientPanel.title = '患者详情';
export default PatientPanel;
