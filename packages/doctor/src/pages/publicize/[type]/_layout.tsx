import React from 'react';
import ToogleSide from '../components/ToogleSide';
import SideMenu from './components/SideMenu';
import {  useLocation, useParams } from 'umi';

interface IProps {
  children: React.ReactElement[];
  location: {
    pathname: string;
    query: {
      groupId: string;
    };
  };
}
function Patients(props: IProps) {
  console.log('=====000', useLocation());
  const { pathname } = useLocation();
  console.log(1, useParams());
  return (
    <>
      {
        pathname.includes('create') ?  <div> {props.children} </div> : (
          <ToogleSide>
            <SideMenu location={props.location} />
            <div> {props.children} </div>
        </ToogleSide>
        )
      }
    </>

  );
}

export default Patients;
