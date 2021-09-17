import React, { ReactElement, useEffect } from 'react';
import { Spin } from 'antd';
import { history } from 'umi';
import styles from './index.scss';

const Index = (): ReactElement => {
  const accessToken = window.$storage.getItem('access_token');
  useEffect(() => {
    if (accessToken) {
      history.push('/root_org');
    } else {
      history.push('/user/login');
    }
  }, []);
  return (
    <div className={styles.full}>
      <Spin />
    </div>
  );
};

export default Index;
