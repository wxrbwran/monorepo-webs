import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import * as api from '@/services/api';
import { Role } from 'xzl-web-shared/dist/utils/role';
import ChatPersonItem from '../ChatPersonItem';
import styles from './index.scss';

const ChatPersonList: FC = () => {
  const dispatch = useDispatch();
  const currentPatientWcId = window.$storage.getItem('patientWcId');
  const currentPatientSid = window.$storage.getItem('patientSid');
  const [persons, setPersons] = useState<IPerson[]>([]);
  // 所有会话组
  const sessions = useSelector((state: IState) => state.im.sessions);

  useEffect(() => {
    if (sessions.length > 0) {
      // 过滤出患者所有会话
      // const currSession = sessions[0].wcl.filter((item) => item.roles[0].id === Role.PATIENT.id);
      let currSession:IPerson = {};
      sessions.forEach((session:IPerson) => {
        session.infos.forEach((item) => {
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
    if (currentPatientWcId) {
      api.im
        .getIMPersonGroup(currentPatientWcId, currentPatientSid)
        .then((res) => {
          const filterSessions = res.groups;
          setPersons(filterSessions);
          if (filterSessions.length > 0) {
            // 初始化会话列表
            dispatch({
              type: 'im/SET_SESSION_GROUP',
              payload: { sessions: filterSessions },
            });
            // 初始化当前会话id
            const payload = { type: 'init', sessionId: `p2p-${filterSessions[0].sessionId}` };
            dispatch({
              type: 'im/UPDATE_CURR_SESSION_ID',
              payload,
            });
            // 初始化当前消息列表
            // dispatch({
            //   type: 'im/UPDATE_CURR_SESSION_MSGS',
            //   payload,
            // });
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }, [currentPatientWcId]);

  return (
    <ul className={styles.persons}>
      {persons.map((person) => (
        <ChatPersonItem person={person} key={person.sessionId} />
      ))}
    </ul>
  );
};

export default ChatPersonList;
