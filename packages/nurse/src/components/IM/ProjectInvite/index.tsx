/* eslint-disable no-param-reassign */
import React, { FC } from 'react';
import dayjs from 'dayjs';
import project from '@/assets/img/project.png';
import { defaultAvatar } from 'xzl-web-shared/dist/src/utils/consts';
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
  };
}
interface IContent {
  msg: string;
  content: {
    projectName: string;
    duration: number;
    inviterName: string;
    inviteTime: number;
  }
}

const ProjectInvite: FC<IMsg> = (props) => {
  const { msg } = props;
  const { content } = msg;
  const {
    projectName, duration, inviterName, inviteTime,
  } = content.content;

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
            <img src={project} alt="" />
            项目邀请
          </p>
          <p className="project_content">
            <span className="label">项目名称</span>
            <span>{projectName}</span>
          </p>
          <p className="project_content">
            <span className="label">项目周期</span>
            <span>
              {duration}
              天
            </span>
          </p>
          <p className="project_content">
            <span className="label">邀请人</span>
            <span>{inviterName || '无'}</span>
          </p>
          <div className="project_footer">
            {dayjs(inviteTime).format('YYYY/MM/DD')}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectInvite;
