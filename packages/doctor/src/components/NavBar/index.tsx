import React from 'react';
// import { useSelector } from 'umi';
import ErrorHandler from 'xzl-web-shared/dist/components/Error/ErrorHandler';
import Logo from './components/Logo';
import MenuTab from './components/MenuTab';
// import WorkingTime from './components/WorkingTime';
import Message from './components/Message';
import Setting from './components/Setting';
import styles from './index.scss';

function NavBar() {
  // const { userInfo } = useSelector((state:IState) => state.user);
  return (
    <header className={styles.nav_bar}>
      <div className={styles.left}>
        <Logo />
        <MenuTab />
      </div>
      <div className={styles.right}>
        {/* <WorkingTime /> */}
        <Message />
        <Setting />
      </div>
    </header>
  );
}

export default ErrorHandler(NavBar);
