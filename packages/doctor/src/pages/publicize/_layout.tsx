import React, { useEffect } from 'react';
import { history } from 'umi';
import NavBar from './components/NavBar';
import CommonTab from './components/CommonTab';
interface IProps {
  children: React.ReactElement[];
  location: {
    pathname: string;
    query: {
      groupId: string;
    }
  };
}

function Suifang(props: IProps) {

  useEffect(()=> {
    history.push('/publicize/patients');
  }, []);

  return (
    <>
      <NavBar />
      <CommonTab />
      <div>
        {props.children}
      </div>
    </>
  );
}

export default Suifang;
