import React, { useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import {Tabs} from 'antd';
import * as api from '@/services/api';
import MsgItem from './components/msgItem';
import styles from './index.scss';

interface IProps {
  children: React.ReactElement;
}
const { TabPane } = Tabs;
function MessageBell({ children }: IProps) {
  const [showModal, setShowModal] = useState(false);
  const [msgList, setMsgList] = useState<navBarIMsg[]>([]);
  const [inviteMsgList, setInviteMsgList] = useState<navBarIMsg[]>([]);
  // type: 1000邀请科研医生 1001 系统提示消息
  useEffect(() => {
    if (showModal) {
      const params = {
        pageAt: 1,
        pageSize: 9999,
        type: 1000,
      }
      api.research.fetchSysMessage(params).then((res: {sysMessages: navBarIMsg[]}) => {
        setMsgList(res.sysMessages)
        const inviteList = res.sysMessages.filter(item => item.type === 1000);
        setInviteMsgList(inviteList);
      })
    }
  }, [showModal])

  const msgType = [
    {
      title: '全部消息',
      msgList: msgList
    }, {
      title: '项目邀请',
      msgList: inviteMsgList,
    }
  ];

  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShowModal(!showModal)}>{children}</div>
			{showModal && (
        <DragModal
          visible={showModal}
          title={''}
          width={764}
          wrapClassName="ant-modal-wrap-center bell_modal"
          onCancel={() => setShowModal(false)}
          maskClosable
          footer={null}
        >
					<div className={styles.message}>
            <Tabs
              tabPosition='top'
              animated={false}
            >
              {msgType.map(item => (
                <TabPane
                  tab={item.title}
                  key={item.title}
                  className={styles.wrapper}
                >
                  <MsgItem msgList={item.msgList} />
                </TabPane>
              ))}
            </Tabs>
          </div>
        </DragModal>
      ) }
    </>
  )
}

export default MessageBell;
