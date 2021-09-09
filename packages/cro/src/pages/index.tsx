import React from 'react';
import { Link } from 'umi';
import styles from './index.scss';
// import { formatMessage } from 'umi-plugin-locale';
export default function () {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <li>
        <Link to="/home"> 首页 </Link>{' '}
      </li>
    </div>
  );
}
