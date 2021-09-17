import React, { FC, useState } from 'react';
import { Empty } from 'antd';
import MsgItem from '../components/MsgItem';
import data from './mock';
import styles from './index.scss';

const MsgHistoryList: FC = () => {
  const [list] = useState<IGroupMsg[]>(data);
  return (
    <div className={styles.group_msg}>
      {list.length > 0 ? (
        <ul className="" id="MMH_LISTS">
          {list.map((info) => (
            <MsgItem info={info} key={info.id} />
          ))}
        </ul>
      ) : (
        <Empty />
      )}
    </div>
  );
};

MsgHistoryList.title = '历史消息列表';

export default MsgHistoryList;
