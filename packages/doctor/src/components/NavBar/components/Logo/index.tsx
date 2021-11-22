import React from 'react';
import { Link } from 'umi';
import logo from '@/assets/img/icon.svg';
import styles from '../../index.scss';

function Logo() {
  return (
    <div className={styles.logo}>
      <Link to="/doctor/patients/alone_doctor">
        <img src={logo} alt="" />
      </Link>
    </div>
  );
}

export default Logo;
