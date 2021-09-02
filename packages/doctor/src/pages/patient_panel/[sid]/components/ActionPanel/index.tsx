import React, { useState, useEffect } from 'react';
// import { Tabs, Badge } from 'antd';
import { useSelector } from 'umi';
import { IState } from 'typings/model';
import Communicate from '../Communicate';
// import IssueContent from '../IssueContent';
// import IssueHistory from '../IssueHistory';
import styles from './index.scss';

// const { TabPane } = Tabs;
function ActionPanel() {
  const defaultActive = useSelector((state: IState) => state.currentPatient.actionType);
  const { imMsgCount, issueCount } = useSelector((state:IState) => state.currentPatient);
  const [activeKey, setActiveKey] = useState('im');
  const [imUnRead, setImUnRead] = useState(imMsgCount);
  const [issueUnRead, setIssueUnRead] = useState(issueCount);
  // const role = window.$storage.getItem('role') || '';

  useEffect(() => {
    setActiveKey(defaultActive);
  }, [defaultActive]);

  // function callback(key: string) {
  //   setActiveKey(key);
  // }
  // event_type : 0-IM消息，1-待审核问题消息
  const handleDelUnRead = (event_type: number) => {
    const params = {
      from_sid: window.$storage.getItem('patientWcId'),
      event_type,
    };
    window.$api.user.delReadMsg(params).then(() => {
      if (event_type === 0) {
        setImUnRead(0);
      } else if (event_type === 1) {
        setIssueUnRead(0);
      }
    });
  };
  useEffect(() => {
    if (activeKey === 'im' && imUnRead) {
      handleDelUnRead(0);
    }
    if (activeKey === 'issue' && issueUnRead) {
      handleDelUnRead(1);
    }
  }, [activeKey]);
  return (
    <div
      id="actionPanel"
      className={styles.action_panel}
      style={{ bottom: '0' }}
    >
      <Communicate />
      {/* <Tabs
        onChange={callback}
        centered
        activeKey={activeKey}
      >
        <TabPane
          key="im"
          tab={
            <Badge overflowCount={99} count={imUnRead}> 医患对话 </Badge>
          }
        >
          <Communicate />
        </TabPane>

        <TabPane
          key="issue"
          tab={
            <Badge overflowCount={99} count={issueUnRead}>
              {role === 'UPPER_DOCTOR' ? '下级医生的请求' : '待审核问题'}
            </Badge>
          }
        >
          <IssueContent />
        </TabPane>

        <TabPane tab={role === 'LOWER_DOCTOR' ? '上级的审核' : '操作历史'} key="history">
          <IssueHistory />
        </TabPane>
        <TabPane tab="会诊" key="consultation">
          Content of Tab Pane 4
        </TabPane>
      </Tabs> */}
    </div>
  );
}

export default ActionPanel;
