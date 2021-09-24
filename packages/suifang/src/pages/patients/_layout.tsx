import React from 'react';
import ToogleSide from '@/components/ToogleSide';
import SideMenu from './components/SideMenu';

interface IProps {
  children: React.ReactElement[];
  location: {
    pathname: string;
    query: object;
  };
}
function Patients(props: IProps) {
  return (
    <ToogleSide>
      <SideMenu location={props.location} />
        <div>
          {props.children}
        </div>
    </ToogleSide>
  );
}

export default Patients;
