import React, { useState, useEffect } from 'react';
import './index.scss';
import ToogleSide from '@/components/ToogleSide';
import SideMenu from './components/side_menu';

interface IProps {
  children: React.ReactElement[];
  location: {
    pathname: string;
    query: object;
  };
}
function PatientManage(props: IProps) {
  return (
    <ToogleSide>
      <SideMenu location={props.location} />
        <div>
          {props.children}
        </div>
    </ToogleSide>
  )
}

export default PatientManage;