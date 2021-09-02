import React, { FC } from 'react';
import DiffItem from '../DiffItem';
import styles from './index.scss';

interface IProps {
  newMedicine: IAdjustMedicinePlan[];
  simple: boolean;
}
const DiffTable: FC<IProps> = (props) => {
  const { newMedicine, simple } = props;
  const getMedicine = () => {
    if (simple) {
      return newMedicine.filter((m) => m.medicine.status !== 'DELETE');
    }
    return newMedicine;
  };
  const getPlans = (plans:IAdjustPlan[]) => {
    if (simple) {
      return plans.filter((plan) => plan.status !== 'DELETE');
    }
    return plans;
  };
  return (
    <div className={`${styles.diff_table} ${styles.border_line}`}>
      <div className={styles.medicine_item} style={{ color: '#000' }}>
        <div className={styles.name}>药名</div>
        <div className={styles.dosage}>剂量</div>
        <div className={styles.time}>用药时间</div>
      </div>
      {
        getMedicine().map((m: IAdjustMedicinePlan, index: number) => (
          <div
            className={`${styles.medicine_item} ${styles[m.medicine.status]}`}
            key={m.medicine.medicineId}
          >
            <div className={styles.name}>
              {index + 1}
              .
              {m.medicine.name}
            </div>
            <div className={styles.plans}>
              {
                getPlans(m.plans).map((plan) => (
                  <DiffItem
                    key={plan.dosage}
                    simple={simple}
                    plan={plan}
                    medicine={m.medicine}
                  />
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default DiffTable;
