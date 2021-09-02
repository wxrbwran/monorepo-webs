import React, { useState, useEffect } from 'react';
import { Popover, Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
// import * as api from '@/services/api';
import * as api from '@/services/api';
import MessageList, { IApiData } from '../MessageList';
import styles from '../../index.scss';

function Message() {
  const initMsg = {
    records: [],
    total: 0,
    hasRead: false,
  };
  const [hasRead, setHasRead] = useState<boolean>(true);
  const [msgData, setMsgData] = useState<IApiData>(initMsg);
  const fetchMessage = (pageAt?: number) => {
    const params = {
      pageAt: pageAt || 1,
      pageSize: 10,
    };
    api.issue.fetchSysMessage(params).then((res: IApiData) => {
      setHasRead(res.hasRead);
      setMsgData(res);
    });
  };
  useEffect(() => {
    fetchMessage();
  }, []);
  const handleClickRead = () => {
    if (!hasRead) {
      api.issue.patchSysReadAt().then(() => {
        fetchMessage();
      });
    }
  };
  return (
    <Popover
      content={
        <MessageList data={msgData} fetchMessage={fetchMessage} />
      }
      trigger="click"
      placement="bottomRight"
    >
      <div className={styles.message} onClick={handleClickRead}>
        <Badge dot={!hasRead}>
          <BellOutlined />
          {/* <div>消息</div> */}
        </Badge>
      </div>
    </Popover>
  );
}

export default Message;
