import React from 'react';
import { isEmpty } from 'lodash';
import { unitFlagRe } from '@/utils/tools';
import styles from '../DiffTable/index.scss';

interface IProps {
  simple: boolean;
  plan: IAdjustPlan;
  medicine: {
    unit: number;
    status: string;
  };
}
function DiffItem(props: IProps) {
  const { simple, plan, medicine } = props;
  const { unit, status } = medicine;
  return (
    <div className={`${styles.plan_item} ${styles[plan.status]}`}>
      <div className={styles.dosage}>
        {
          !simple && plan.status === 'EDIT' && plan.originDosage && (
            `${plan.originDosage} ${unitFlagRe[unit]} →`
          )
        }
        {plan.dosage}
        {unitFlagRe[unit]}
      </div>
      <div className={styles.time}>
        {
          !simple && plan.status === 'EDIT' && !isEmpty(plan.originTakeTime)
          && (
            <div>
              {
                (plan.originTakeTime as string[]).map((t) => <span key={t}>{t}</span>)
              }
              →
            </div>
          )
        }
        {
          plan.takeTime.map((t) => <span key={t}>{t}</span>)
        }
      </div>
      <div className={styles.add_text}>
        {status === 'ADD' && '【新增用药】'}
        {status === 'NONE' && plan.status === 'ADD' && '【新增用量】'}
      </div>
    </div>
  );
}

export default DiffItem;
