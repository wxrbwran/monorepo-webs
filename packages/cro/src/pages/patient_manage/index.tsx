import React, { useEffect } from 'react';
import { history } from 'umi';
// import styles from './index.scss';
import { hasPermissions } from '@/utils/utils';
import { useSelector } from 'react-redux';

export default () => {

  const teamMembers = useSelector((state: IState) => state.project.teamMembers);

  useEffect(() => {

    if (hasPermissions(teamMembers)) {
      history.replace('/patient_manage/patient');
    } else {
      history.replace('/patient_manage/patient_cro');
    }
  },
  []);
  return (
    <div> </div>
  );
};
