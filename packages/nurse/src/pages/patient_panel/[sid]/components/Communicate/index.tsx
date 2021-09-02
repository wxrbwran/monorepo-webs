import React from 'react';
import IM from '@/components/IM';
import { useSelector } from 'umi';
import { Spin } from 'antd';
import styles from './index.scss';

const Communicate = () => {
  const { connected } = useSelector((state: IState) => state.im);
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
