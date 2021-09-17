import React from 'react';
import { history } from 'umi';
import styles from './index.scss';

interface IProps {
  toAddress: string
}
function PatientEducation({ toAddress }: IProps) {

  return (
    <div className={styles.create_new} onClick={() => history.push(toAddress)}>
      创建
    </div>
  )
}

export default PatientEducation;
