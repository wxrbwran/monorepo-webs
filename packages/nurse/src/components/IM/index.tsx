import React, { FC } from 'react';
import ChatPersonList from './ChatPersonList';
import ChatList from './ChatList';
import ChatEditor from './ChatEditor';
import styles from './index.scss';

const IM: FC = () => (
  <div className={styles.im}>
    <div className={styles.left}>
      <ChatPersonList />
    </div>
    <div className={styles.right}>
      <ChatList />
      <ChatEditor />
    </div>
  </div>
);

export default IM;
