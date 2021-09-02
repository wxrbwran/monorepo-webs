/* eslint-disable no-param-reassign */
import React, { FC } from 'react';
import { defaultAvatar } from '@/utils/consts';
import { getRole } from '@/utils/utils';
import './index.scss';

interface IMsg {
  msg: {
    content: IContent;
    fromNick: string;
    from: string;
    avatar: string;
    custom: {
      fromUser: {
        role: string;
      }
    };
  };
}
interface IContent {
  msg: string,
  type: number,
}

const DoctorTip: FC<IMsg> = (props) => {
  const { msg } = props;
  const { content } = msg;
  return (
    <div className="chat__item chat__doctor doctor__tip">
      <div className="chat__item-avatar">
        <img className="icon u-circle" alt="" src={msg.avatar || defaultAvatar} />
      </div>
      <div className="chat__item-content">
        <p className="msg-user">
          {`${msg.fromNick} (${getRole(msg.custom.fromUser?.role)})`}
        </p>
        <p
          className={`msg-doctor patient-group-msg ${
            content.type === 101 ? 'warn' : ''
          }`}
        >
          {content.type === 101 ? '医生通知' : '医生提醒'}
        </p>
        <p className="msg-text patient-group-msg">{content.msg}</p>
      </div>
    </div>
  );
};
export default DoctorTip;
