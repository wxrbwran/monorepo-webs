import React from 'react';
import logo from '@/assets/img/nav_bar/logo_white.png';
import { Link, history, useDispatch } from 'umi';
import styles from '../../index.scss';

function Logo() {
  const dispatch = useDispatch();
  const handleBack = () => {
    dispatch({
      type: 'org_menu/changeOrgMenu',
      payload: {
        type: 'org',
        department: {},
        group: '',
      },
    });
    history.push('/root_org');
  };
  return (
    <div className={styles.logo}>
      <Link to="/root_org" onClick={handleBack}>
        <img src={logo} alt="logo" />
      </Link>
    </div>
  );
}

export default Logo;
