import React, { useEffect } from 'react';
import { useDispatch } from 'umi';
import { Role } from 'xzl-web-shared/src/utils/role';
import * as api from '@/services/api';
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

  useEffect(() => {
    dispatch({
      type: 'detail/fetchMedicalRecord',
      payload: window.$storage.getItem('patientSid'),
    });
    // 获取角色列表
    api.base
      .getCurrUserRole(window.$storage.getItem('patientWcId'), window.$storage.getItem('patientSid'))
      .then((res) => {
        const yanglao = res.members.filter(
          (item) => [Role.PATIENT_YL.id, Role.PATIENT_YL_VIP.id].includes(item.role),
        );
        dispatch({
          type: 'currentPatient/savePatientDetails',
          payload: {
            isYlPatient: yanglao?.length > 0 ? 1 : 2, // 1养老患者 2非养老患者
          },
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);
  // 隐藏患者详情页面编辑按钮 通过css样式统一隐藏
  // <div className={`${styles.patient_panel} ${styles.hide_edit}`}>
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
            {/* <div className={styles.gutter} /> */}
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
