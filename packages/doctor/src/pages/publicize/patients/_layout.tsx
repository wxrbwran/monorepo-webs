import React from 'react';
import ToogleSide from '../components/ToogleSide';
import SideMenu from '../components/SideMenu';

interface IProps {
  children: React.ReactElement[];
  location: {
    pathname: string;
  };
}
function Patients(props: IProps) {
  return (
    <ToogleSide>
      <SideMenu />
        <div>
          {props.children}
        </div>
    </ToogleSide>
  );
}

export default Patients;
