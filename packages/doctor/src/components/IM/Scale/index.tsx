/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-param-reassign */
import React, { FC } from 'react';
import dayjs from 'dayjs';
import scale from '@/assets/img/scale.png';
import { defaultAvatar } from 'xzl-web-shared/dist/utils/consts';
import { getRoles } from '@/utils/utils';
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
  msg: string;
  type: number;
}

const Scale: FC<IMsg> = (props) => {
  const { msg } = props;
  const { content, time } = msg;
  const { projectName } = content.content;

  return (
    <>
      {
        msg.flow === 'in' && content.type === 114 ? <div className="tip">患者填写了主观量表，请在手机上查看</div>
          : <div className="chat__item chat__doctor">
            <div className="chat__item-avatar">
              <img className="icon u-circle" alt="" src={msg.avatar || defaultAvatar} />
            </div>
            <div className="chat__item-content">
              <p className="msg-user">
                {`${msg.fromNick} (${getRoles(msg.custom)})`}
              </p>
              <div className="msg-content project">
                <p className="project_status flex">
                  <img className='w-18 h-18' src={scale} alt="" />
                  {content.type === 115 ? <span dangerouslySetInnerHTML={{ __html: content.msg }}></span> : content.title}
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
      }
    </>
  );
};
export default Scale;
