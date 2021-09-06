import React from 'react';
import Logo from './components/Logo';
import Setting from './components/Setting';
import styles from './index.scss';

function NavBar() {
  return (
    <header className={styles.nav_bar}>
      <div className={styles.left}>
        <Logo />
      </div>
      <div className={styles.right}>
        <Setting />
      </div>
    </header>
  );
}

export default NavBar;
