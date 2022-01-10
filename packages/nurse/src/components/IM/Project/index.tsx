/* eslint-disable no-param-reassign */
import React, { FC } from 'react';
import project from '@/assets/img/project.png';
import { defaultAvatar } from 'xzl-web-shared/dist/utils/consts';
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
  msg: string;
  content: {
    projectName: string;
  }
}

const ProjectInvite: FC<IMsg> = (props) => {
  const { msg } = props;
  const { content } = msg;
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
            <img src={project} alt="" />
            {content.msg}
          </p>
          <p className="project_content">
            <span className="label">项目名称</span>
            <span>{projectName}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProjectInvite;
