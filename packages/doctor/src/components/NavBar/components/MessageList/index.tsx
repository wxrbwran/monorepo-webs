import React, { useEffect, useState } from 'react';
import { Pagination, Button } from 'antd';
import { history } from 'umi';
import * as api from '@/services/api';
import styles from './index.scss';

interface IMsg {
  body: {
    msg: string;
    sid: string;
  };
  state: number;
  type: number;
  id: string;
  fromSid: string;
}

export interface IApiData {
  total: number;
  records: IMsg[];
  hasRead: boolean;
}

interface IProps {
  fetchMessage: (pageAt: number) => void;
  data: IApiData;
}
function Message({ fetchMessage, data }: IProps) {
  console.log('data222', data);
  const [msgList, setMsgList] = useState<IMsg[]>(data.records);
  const [total, setTotal] = useState(data.total);
  const [current, setCurrent] = useState(1);
  const stateText = ['待处理', '已接受', '已拒绝', '已处理', '已失效', '知道了'];
  // state 状态 0待处理 1已接受 2已拒绝 3已处理 4已失效 5知道了
  useEffect(() => {
    setMsgList(data.records);
    setTotal(data.total);
  }, [data]);
  const handleChangePage = (pageAtNum: number) => {
    setCurrent(pageAtNum);
    fetchMessage(pageAtNum);
  };

  const handleUpdateState = (id: string, state: number) => {
    const params = {
      id,
      state,
    };
    api.issue.patchSysState(params).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  };
  const getMsgItem = (msg: IMsg) => {
    let returnDom = null;
    const {
      type, state, id, body, fromSid,
    } = msg;
    returnDom = (
      <div className={styles.item} key={id}>
        {type === 110 ? (
          <div
            className={styles.tit}
            onClick={() => {
              history.push(`/patient_panel/${fromSid}`);
            }}
          >
            {body?.msg}
          </div>
        ) : (
          <div className={styles.tit}>{body?.msg}</div>
        )}
        <div className={styles.handle_btn}>
          {state === 0 ? (
            <Button type="primary" ghost onClick={() => handleUpdateState(id, 5)}>
              知道了
            </Button>
          ) : (
            stateText[state]
          )}
        </div>
      </div>
    );
    return returnDom;
  };
  return (
    <div className={styles.message}>
      {msgList.length > 0 ? msgList.map((item) => getMsgItem(item)) : <div>暂无消息</div>}
      <Pagination
        current={current}
        total={total}
        pageSize={10}
        hideOnSinglePage
        showSizeChanger={false}
        onChange={handleChangePage}
      />
    </div>
  );
}

export default Message;
