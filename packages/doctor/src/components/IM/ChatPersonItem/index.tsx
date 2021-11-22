import React, { FC, useMemo } from 'react';
import { useSelector, useDispatch } from 'umi';
import { defaultAvatar } from 'xzl-web-shared/src/utils/consts';
import { Role, fetchRolePropValue } from 'xzl-web-shared/src/utils/role';
import IconMore from '@/assets/img/icon_more.png';
import { Dropdown } from 'antd';
import styles from './index.scss';

interface IProps {
  person: IPerson;
  sessionId: string;
}

const ChatPersonItem: FC<IProps> = (props) => {
  const { person, sessionId } = props;
  const dispatch = useDispatch();
  const im = useSelector((state: IState) => state.im);
  const handleUpdateSessionId = (id: string) => {
    if (im.currSessionId !== `p2p-${id}`) {
      // 更新当前会话id
      const payload = { type: 'init', sessionId: `p2p-${id}` };
      dispatch({
        type: 'im/UPDATE_CURR_SESSION_ID',
        payload,
      });
      // 更新当前消息列表
      console.log(999992);
      dispatch({
        type: 'im/UPDATE_CURR_SESSION_MSGS',
        payload,
      });
    }
  };
  const getRole = (role: string) => {
    switch (role) {
      case Role.NURSE.id:
        return '护士';
      case Role.PATIENT.id:
      case Role.PATIENT_VIP.id:
        return '患者';
      case Role.UPPER_DOCTOR.id:
        return '主管医生';
      case Role.ALONE_DOCTOR.id:
        return '独立医生';
      case Role.LOWER_DOCTOR.id:
        return '医助';
      case Role.RESEARCH_PROJECT_DOCTOR.id:
        return '研究者';
      default:
        return fetchRolePropValue(role, 'desc');
    }
  };
  // 各角色排序优先级
  // 患者 > 独立管理 > 护士 > 研究者 > PM > CRA > CRC
  // 患者 > 主管医生 > 医生助手 > 营养师 > 护士 > 研究者 > PM > CRA > CRC
  const orderId: string[] = [
    Role.PATIENT.id,
    Role.PATIENT_VIP.id,
    Role.ALONE_DOCTOR.id,
    Role.UPPER_DOCTOR.id,
    Role.LOWER_DOCTOR.id,
    Role.DIETITIAN.id,
    Role.NURSE.id,

    Role.RESEARCH_PROJECT_DOCTOR.id, // 科研项目医生  31
    // Role.PROJECT_RESEARCHER.id, // 研究者  36只有在组织架构里有存在，其余出现，均为31角色
    Role.CRO_PM.id,
    Role.CRO_CRA.id,
    Role.CRO_CRC.id,
  ];
  const compare = (obj1: IInfos, obj2: IInfos) => (
    orderId.indexOf(obj1.role) - orderId.indexOf(obj2.role)
  );
  console.log('perso3232n', person);

  const personList = useMemo(() => (
    person.sort(compare).map((item) => (
      <div key={item.role} className="flex justify-start items-center">
        <img className="w-40 h-40 my-8" src={item.avatarUrl || defaultAvatar} alt="" key={item.wcId} />
        <div key={item.wcId} className={styles.name}>
          <div className={styles.role}>{getRole(item.role)}</div>
          <div>{item.name}</div>
        </div>
      </div>
    ))
  ), [person]);
  return (
    <li
      className={`${styles.item} ${im.currSessionId === `p2p-${person.sessionId}` ? styles.active : ''}`}
      onClick={() => handleUpdateSessionId(sessionId)}
    >
      <div className={styles.team}>
        <div className={styles.names}>
          { personList }
        </div>
        <Dropdown
          overlay={<div className={`${styles.team} ${styles.dropdown}`}>{personList}</div>}
          placement="bottomRight"
          arrow
          trigger={['click']}
        >
          <img className="w-20 h-20 mt-15" src={IconMore} />
        </Dropdown>
      </div>
    </li>
  );
};

export default ChatPersonItem;
