import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import * as api from '@/services/api';
import { Role } from 'xzl-web-shared/src/utils/role';
import ChatPersonItem from '../ChatPersonItem';
import styles from './index.scss';

const ChatPersonList: FC = () => {
  const dispatch = useDispatch();
  const currentPatientWcId = window.$storage.getItem('patientWcId');
  const currentPatientSid = window.$storage.getItem('patientSid');
  const [persons, setPersons] = useState<IPersonNew>({ members: [] });
  // 所有会话组
  const sessions = useSelector((state: IState) => state.im.sessions);
  const { currLoginDoctorInfo } = useSelector((state: IState) => state.currentPatient);
  useEffect(() => {
    if (sessions.length > 0) {
      // 过滤出患者所有会话
      // const currSession = sessions[0].wcl.filter((item) => item.roles[0].id === Role.PATIENT.id);
      let currSession:IPerson = {};
      sessions.forEach((session:IPerson) => {
        session.members.forEach((item) => {
          if ([Role.PATIENT.id, Role.PATIENT_VIP.id].includes(item.role)) {
            currSession = { ...session };
          }
          return false;
        });
      });
      // 得到 sessionId
      window.$storage.setItem('toSessionId', currSession.sessionId);
    }
  }, [sessions]);

  useEffect(() => {
    if (currentPatientWcId && currLoginDoctorInfo?.wcId) {
      const otherRole = window.$storage.getItem('patientRoleId');
      const params = {
        otherRole, // 患者角色
        otherSid: currentPatientSid, // 患者SID
        fromWcId: currLoginDoctorInfo.wcId, // members里匹配出与当前登录者sid相同的医生的wcId
      };
      api.im
        .getPickSessionGroup(params)
        .then((res) => {
          const filterSessions = res;
          setPersons(filterSessions);
          // 初始化会话列表
          dispatch({
            type: 'im/SET_SESSION_GROUP',
            payload: { sessions: [filterSessions] },
          });
          // 初始化当前会话id
          const payload = { type: 'init', sessionId: `p2p-${res.sessionId}` };
          dispatch({
            type: 'im/UPDATE_CURR_SESSION_ID',
            payload,
          });
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }, [currLoginDoctorInfo]);

  console.log('persons', persons);
  return (
    <ul className={styles.persons}>
      <ChatPersonItem person={persons.members} sessionId={persons.sessionId} />
    </ul>
  );
};

export default ChatPersonList;
