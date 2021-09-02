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
  // type 601  患者主动绑定医生   602患者主动解绑医生 110血压/心率属于紧急情况
  useEffect(() => {
    setMsgList(data.records);
    setTotal(data.total);
  }, [data]);
  const handleChangePage = (pageAtNum: number) => {
    setCurrent(pageAtNum);
    fetchMessage(pageAtNum);
  };
  // const patientPage = () => {
  //   console.log('调接口，进入患者详情页面');
  // };
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
    console.log(3332, msg);
    switch (type) {
      case 601:
      case 602:
      case 110:
      case 619:
      case 620:
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
        break;
      default:
        break;
    }
    return returnDom;
  };
  return (
    <div className={styles.message}>
      {msgList.length > 0 ? msgList.map((item) => getMsgItem(item)) : <div>暂无消息</div>}
      {/* <div className={styles.item}>
        <div className={styles.tit} onClick={patientPage}>您有金牛座医院一名新患者韩中睿需要被管理</div>
        <div className={styles.handled}>知道了</div>
      </div>
      <div className={styles.item}>
        <div className={styles.tit}>XXX机构XX医生邀请您加入其上/下级医生团队，协助其管理患者。</div>
        <div className={styles.handle_btn}>
          <Button>同意</Button>
          <Button className={styles.refused}>拒绝</Button>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.tit}>患者小明已与您解绑</div>
        <div className={styles.handle_btn}>
          <Button>知道了</Button>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.tit}>
          患者
          <span>a061111111</span>
          的档案信息已被
          <span>运营人员</span>
          于
          <span>2020年06月29日</span>
          修改，请知晓。
        </div>
      </div> */}
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
