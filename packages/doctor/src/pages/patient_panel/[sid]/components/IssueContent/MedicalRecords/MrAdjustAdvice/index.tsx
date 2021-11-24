import React from 'react';
import { Input } from 'antd';
import styles from '../index.scss';

interface IProps {
  changeNote: (val: string, sendRole: string) => void;
  remind: string;
}
function MrAdjustAdvice({ changeNote, remind }: IProps) {
  const role = window.$storage.getItem('role') || '';

  return (
    <div className={styles.records_content}>
      {
        ['LOWER_DOCTOR', 'UPPER_DOCTOR'].includes(role) && (
          <div>
            <h3 className={styles.tit_wrap}>
              {role === 'LOWER_DOCTOR' ? '调整建议（发给主管医生）' : '主管医生的评价与指导（发给医生助手）'}
            </h3>
            <Input.TextArea
              rows={3}
              onChange={(e) => changeNote(e.target.value, 'doctor')}
            />
          </div>
        )
      }
      <div>
        <h3 className={styles.tit_wrap}>医生提醒（发给患者）</h3>
        <Input.TextArea
          defaultValue={remind}
          rows={3}
          onChange={(e) => changeNote(e.target.value, 'patient')}
        />
      </div>
    </div>
  );
}

export default MrAdjustAdvice;
