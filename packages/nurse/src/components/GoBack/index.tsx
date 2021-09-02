import React from 'react';
import back from '@/assets/img/back.svg';
import { history } from 'umi';
import styles from './index.scss';

export default () => {
  const handleGoBack = () => {
    history.push('/patients');
  };
  return (
    <div className={styles.go_back} onClick={handleGoBack}>
      <img src={back} alt="返回上一页" />
      返回
    </div>
  );
};
