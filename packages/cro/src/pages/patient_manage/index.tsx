import React, { useEffect } from 'react';
import { history } from 'umi';
// import styles from './index.scss';
import { hasPermissions } from '@/utils/utils';
import { useSelector, useDispatch } from 'umi';

export default () => {

  const teamMembers = useSelector((state: IState) => state.project.teamMembers);
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch({
      type: 'project/fetchGroupList',
      payload: projectNsId,
    });
    if (hasPermissions(teamMembers)) {
      history.replace('/patient_manage/patient');
    } else {
      history.replace('/patient_manage/patient_cro');
    }
  }, []);
  return (
    <div> </div>
  );
};
