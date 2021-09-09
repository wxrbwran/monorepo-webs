import React from 'react';
import ToogleSide from '@/components/ToogleSide';
import SideMenu from './compontents/side_menu';
import styles from './index.scss';

interface IProps {
  children: React.ReactElement[];
  location: {
    pathname: string;
  };
}
function Researcher(props: IProps) {
  return (
    <div className={styles.researcher}>
      {
        <ToogleSide>
          <SideMenu location={props.location}/>
          <div>
            {props.children}
          </div>
        </ToogleSide>
      }
    </div>

  )
}

export default Researcher;
