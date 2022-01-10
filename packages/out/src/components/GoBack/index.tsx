import React from 'react';
import { history, useDispatch } from 'umi';
import back from '@/assets/img/back.svg';
import styles from './index.scss';

export default () => {
  const dispatch = useDispatch();
  const handleGoBack = () => {
    history.goBack();
    dispatch({
      type: 'currentPatient/savePatientDetails',
      payload: {
        isYlPatient: 3, // 未知，恢复初始状态
      },
    });
  };
  return (
    <div className={styles.go_back} onClick={handleGoBack}>
      <img src={back} alt="返回上一页" />
      返回
    </div>
  );
};
