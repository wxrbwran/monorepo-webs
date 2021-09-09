import React, { FC, useEffect, useState } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { message } from 'antd';
import invite from '@/assets/img/invite.png';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import styles from '../index.scss';

interface IProps {
  msgList: navBarIMsg[];
}
const MsgItem: FC<IProps> = ({ msgList }) => {
  const [msgDetail, setMsgDetail] = useState<navBarIMsg>(msgList[0]);
  const changeInfo = (item: navBarIMsg) => {
    setMsgDetail(item)
  }
  useEffect(() => {
    setMsgDetail(msgList[0])
  }, [msgList])
  const handleUpdateState = (state: number) => {
    const {inviterName, projectNsId, inviterSid } = msgDetail.body.content;
    const params = {
      doctorName: inviterName,
      id: msgDetail.id,
      projectNsId,
      receiverSid: inviterSid,
      state,
    }
    window.$api.research.patchSysMessageStatus(params).then(() => {
      message.success('操作成功');
      window.location.reload();
    })
  }
  const stateText = ['待处理', '已同意', '已拒绝', '已处理', '已失效', '知道了'];
  return (
    <>
      <ul>
        {
          msgList.map((item, index)=>(
            <li key={index} onClick={() => changeInfo(item)}>
              <div className={styles.info}>
                <img src={invite} />
                <div>
                  <p>{item.body.msg}</p>
                  <p className={styles.subtitle}>
                    {dayjs(item.updatedAt).format('YYYY年MM月DD日 HH:mm')}
                  </p>
                </div>
              </div>
              {/* <DeleteOutlined /> */}
            </li>
          ))
        }
      </ul>
      {
        !isEmpty(msgDetail) && (
          <div className={styles.detail}>
            {/* <h3>{msgDetail.body.msg}</h3> */}
            <p>{`${msgDetail?.body?.content?.inviterName}邀请您加入${msgDetail?.body?.content?.projectName},是否同意？`}</p>
            {
              msgDetail.state === 0 ?
              <div className={styles.btn}>
                <p onClick={() => handleUpdateState(1)}><CheckCircleOutlined />同意</p>
                <p onClick={() => handleUpdateState(2)}><CloseCircleOutlined />拒绝</p>
              </div> : <span style={{color: '#999', marginTop: 10}}>{stateText[msgDetail.state]}</span>
            }
          </div>
        )
      }
    </>
  )
}

export default MsgItem;
