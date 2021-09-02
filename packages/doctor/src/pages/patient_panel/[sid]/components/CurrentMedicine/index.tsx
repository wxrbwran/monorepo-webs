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
        <MedicineHistory><span className={styles.btn}>服药历史</span></MedicineHistory>
        <AdjustMedicine><span className={styles.btn}>调整用药</span></AdjustMedicine>
        <LifeStandard><span className={styles.btn}>生活达标</span></LifeStandard>
        <EndEvent><span className={styles.btn}>终点事件</span></EndEvent>
      </div>
    </div>
  );
}

export default CurrentMedicine;
