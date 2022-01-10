import React from 'react';
import MedicineHistory from './MedicineHistory';
import styles from './index.scss';
import PlansDetail from './PlansDetail';
import LifeStandard from '../LifeStandard';

function CurrentMedicine() {
  return (
    <div className={styles.adjust_medicine}>
      <div className={styles.left_block}>
        <div className={styles.mp_title}>
          <span className={styles.title_content}>目前用药</span>
        </div>
        <PlansDetail />
      </div>
      <div className={styles.right_block}>
        <MedicineHistory><span className={styles.btn}>服药历史</span></MedicineHistory>
        <LifeStandard><span className={styles.btn}>生活达标</span></LifeStandard>
      </div>
    </div>
  );
}

export default CurrentMedicine;
