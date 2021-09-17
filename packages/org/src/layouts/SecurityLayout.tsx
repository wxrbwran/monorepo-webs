import React, { FC, ReactChild } from 'react';
import Navbar from '@/components/Navbar';
// import { useSelector } from 'umi';
import styles from './index.scss';

interface SecurityLayoutProps {
  children: ReactChild;
}

const SecurityLayout: FC<SecurityLayoutProps> = (props) => {
  const { children } = props;
  return (
    <div className={styles.layout}>
      <Navbar />
      {children}
    </div>
  );
};

export default SecurityLayout;
