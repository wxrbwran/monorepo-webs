import React from 'react';
import AdjustMedicine from '@/components/AdjustMedicine';
import EndEvent from '@/components/EndEvent';
// import { useSelector } from 'umi';
// import PlansModal from './PlansModal';
import MedicineHistory from './MedicineHistory';
import styles from './index.scss';
import PlansDetail from './PlansDetail';
import LifeStandard from '../LifeStandard';

function CurrentMedicine() {
  // const { isYlPatient } = useSelector((state: IState) => state.currentPatient);
  return (
    <div className={styles.adjust_medicine}>
      <div className={styles.left_block}>
        <div className={styles.mp_title}>
          <span className={styles.title_content}>目前用药</span>
          {/* {
            isYlPatient === 2 && (
              <PlansModal>
                <span className={`${styles.btn} patientEditBtn`}>帮患者修改服药计划</span>
              </PlansModal>
            )
          } */}
        </div>
        <PlansDetail />
      </div>
      <div className={styles.right_block}>
        <LifeStandard>
          <div className={styles.btn}>宣教课程</div>
        </LifeStandard>
        <div className={styles.btn}>饮食疗法</div>
        <div className={styles.btn}>运动训练</div>
        <div className={styles.btn}>认知训练</div>
        {/* <EndEvent>
          <span className={styles.btn}>终点事件</span>
        </EndEvent> */}
      </div>
    </div>
  );
}

export default CurrentMedicine;
