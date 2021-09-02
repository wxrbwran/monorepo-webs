import React, { useState } from 'react';
import { Button, message } from 'antd';
import * as api from '@/services/api';
import MedicineHistory from './MedicineHistory';
import styles from './index.scss';
import PlansDetail from './PlansDetail';

function CurrentMedicine() {
  const [documentStatus, setDocumentStatus] = useState(window.$storage.getItem('recordCount') === '0');
  const patientSid = window.$storage.getItem('patientSid');
  const handleFinishReview = () => {
    api.doctor.compeleteOrder({ sid: patientSid, type: 'RECORD' }).then(() => {
      message.success('完成建档');
      setDocumentStatus(true);
      window.$storage.setItem('recordCount', 0);
    })
      .catch((err) => {
        console.log('err', err);
      });
  };
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
        <div className="text-right mb-20">
          <Button
            type="primary"
            onClick={handleFinishReview}
            className="text-sm"
            disabled={documentStatus}
          >
            完成建档
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CurrentMedicine;
