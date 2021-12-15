import React, { FC } from 'react';
import { useSelector, useDispatch } from 'umi';
import { defaultAvatar } from 'xzl-web-shared/dist/src/utils/consts';
import { getRole } from '@/utils/utils';
import styles from './index.scss';

interface IProps {
  person: IPerson;
}

const ChatPersonItem: FC<IProps> = (props) => {
  const { person } = props;
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
  return (
    <li
      className={`${styles.item} ${im.currSessionId === `p2p-${person.sessionId}` ? styles.active : ''}`}
      onClick={() => handleUpdateSessionId(person.sessionId)}
    >
      <div className={styles.team}>
        <div className={styles.avatars}>
          {
            person.infos.map((item) => (
              <img src={item.avatarUrl || defaultAvatar} alt="avatar" key={item.wcId} />
            ))
          }
        </div>
        <div className={styles.names}>
          {
            person.infos.map((item) => (
              <span key={item.wcId} className={styles.name}>{`${item.name} (${getRole(item.role)})`}</span>
            ))
          }
        </div>
      </div>
    </li>
  );
};

export default ChatPersonItem;
