/* eslint-disable no-param-reassign */
import React, { FC } from 'react';
import { defaultAvatar } from 'xzl-web-shared/dist/utils/consts';
import { getRoles } from '@/utils/utils';
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
}

const BindCustom: FC<IMsg> = (props) => {
  const { msg } = props;
  const { content } = msg;
  return (
    <div className="chat__item chat__doctor">
      <div className="chat__item-avatar">
        <img className="icon u-circle" alt="" src={msg.avatar || defaultAvatar} />
      </div>
      <div className="chat__item-content">
        <p className="msg-user">
          {`${msg.fromNick} (${getRoles(msg.custom)})`}
        </p>
        <p className="msg-text">{content.msg}</p>
      </div>
    </div>
  );
};
export default BindCustom;
