import React from 'react';
import { useSelector } from 'umi';
import { Spin } from 'antd';
import IM from '@/components/IM';
import styles from './index.scss';

const Communicate = () => {
  const { connected } = useSelector((state: IState) => state.im);
  console.log('connected111', connected );
  return (
    <div className={styles.communicate}>
      {
        connected ? (
          <div className={styles.content}>
            <IM />
          </div>
        ) : <Spin />
      }
    </div>
  );
};

export default Communicate;
