/* eslint-disable no-param-reassign */
import React, { FC } from 'react';
import scale from '@/assets/img/scale.png';
import { defaultAvatar } from '@/utils/consts';
import dayjs from 'dayjs';
import { getRole } from '@/utils/utils';
import '../Project/index.scss';

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
    time: number;
  };
}
interface IContent {
  content: {
    projectName: string;
  }
  title: string;
}

const Scale: FC<IMsg> = (props) => {
  const { msg } = props;
  console.log('msg666', msg);
  const { content, time } = msg;
  const { projectName } = content.content;

  return (
    <div className="chat__item chat__doctor">
      <div className="chat__item-avatar">
        <img className="icon u-circle" alt="" src={msg.avatar || defaultAvatar} />
      </div>
      <div className="chat__item-content">
        <p className="msg-user">
          {`${msg.fromNick} (${getRole(msg.custom.fromUser?.role)})`}
        </p>
        <div className="msg-content project">
          <p className="project_status">
            <img src={scale} alt="" />
            {content.title}
          </p>
          <p className="project_content">
            <span className="label">项目名称</span>
            <span>{projectName}</span>
          </p>
          <div className="project_footer">
            {dayjs(time).format('YYYY/MM/DD')}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Scale;
