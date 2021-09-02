import React from 'react';
import SideMenu from './components/SideMenu';
import styles from './index.scss';

interface Iprops {
  children: React.ReactElement[];
  location: {
    pathname: string;
  };
}
function Patiens({ children, location }: Iprops) {
  return (
    <div className={styles.patients}>
      <SideMenu location={location} />
      {children}
    </div>
  );
}

export default Patiens;
