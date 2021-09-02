import React, { FC } from 'react';
import ChatPersonList from './ChatPersonList';
import ChatList from './ChatList';
import ChatEditor from './ChatEditor';
import styles from './index.scss';

const IM: FC = () => (
  <div className={styles.im}>
    <ChatPersonList />
    <ChatList />
    <ChatEditor />
  </div>
);

export default IM;
