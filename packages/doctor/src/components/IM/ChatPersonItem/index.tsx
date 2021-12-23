import React, { FC, useMemo } from 'react';
import { useSelector } from 'umi';
import { defaultAvatar } from 'xzl-web-shared/dist/utils/consts';
import IconMore from '@/assets/img/icon_more.png';
import { getRole } from '@/utils/utils';
import { imRoleOrder } from '@/utils/tools';
import { Dropdown } from 'antd';
import styles from './index.scss';

interface IProps {
  person: IPerson;
  sessionId: string;
}

const ChatPersonItem: FC<IProps> = (props) => {
  const { person } = props;
  // const dispatch = useDispatch();
  const im = useSelector((state: IState) => state.im);
  // const handleUpdateSessionId = (id: string) => {
  //   if (im.currSessionId !== `p2p-${id}`) {
  //     // 更新当前会话id
  //     const payload = { type: 'init', sessionId: `p2p-${id}` };
  //     dispatch({
  //       type: 'im/UPDATE_CURR_SESSION_ID',
  //       payload,
  //     });
  //     // 更新当前消息列表
  //     console.log(999992);
  //     dispatch({
  //       type: 'im/UPDATE_CURR_SESSION_MSGS',
  //       payload,
  //     });
  //   }
  // };

  const compare = (obj1: IInfos, obj2: IInfos) => (
    imRoleOrder.indexOf(obj1.role) - imRoleOrder.indexOf(obj2.role)
  );
  // console.log('perso3232n', person);

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
      // onClick={() => handleUpdateSessionId(sessionId)}
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
