import React, { FC } from 'react';
import styles from './index.scss';

const GroupLayout: FC = (props) => {
  const { children } = props;
  return <div className={styles.layout}>{children}</div>;
};

export default GroupLayout;
