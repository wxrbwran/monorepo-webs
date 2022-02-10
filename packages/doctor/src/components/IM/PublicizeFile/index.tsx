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
    <div className="chat__item chat__doctor">
      <div className="chat__item-avatar">
        <img className="icon u-circle" alt="" src={msg.avatar || defaultAvatar} />
      </div>
      <div className="chat__item-content">
        <p className="msg-user">
          {`${msg.fromNick} (${getRoles(msg.custom)})`}
        </p>
        <div className="msg-content project">
          <div className='text-left'>
              <a
                href={msg.content.content.address}
                target="_blank"
                className='w-full inline-block p-10'
              >
                <div className='text-blue-400'>{msg.content.content.filename}</div>
                <span className='flex justify-end mt-10'>
                  <span className='file-desc mr-20'> {msg.content.content.description} </span>
                  <img className='w-60 h-60' src={msg.content.content.cover} />
                </span>
              </a>
            </div>
        </div>
      </div>
    </div>
  );
};
export default Scale;
