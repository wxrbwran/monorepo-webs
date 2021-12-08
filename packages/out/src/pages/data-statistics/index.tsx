import React, { FC } from 'react';
import Layouts from '@/layouts';
import Main from './main';


const DataStatistics: FC = ({ location }) => {
  return (
    <Layouts props={location}>
      <Main />
    </Layouts>
  );
};

export default DataStatistics;
