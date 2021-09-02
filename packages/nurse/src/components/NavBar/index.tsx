import React from 'react';
import errorHandler from '@/components/Error/ErrorHandler';
import Logo from './components/Logo';
import MenuTab from './components/MenuTab';
import Setting from './components/Setting';
import styles from './index.scss';

function NavBar() {
  return (
    <header className={styles.nav_bar}>
      <div className={styles.left}>
        <Logo />
      </div>
      <MenuTab />
      <div className={`${styles.right} cursor-pointer`}>
        <Setting />
      </div>
    </header>
  );
}

export default errorHandler(NavBar);
