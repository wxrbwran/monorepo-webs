/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-param-reassign */
import React, { FC } from 'react';
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
    filename: string;
    description: string;
    cover: string;
    address: string;
  }
  title: string;
  msg: string;
  type: number;
}

const PublicizeFile: FC<IMsg> = (props) => {
  const { msg } = props;
  const { filename, description, cover, address } = msg.content.content;

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
                href={address}
                target="_blank"
                className='w-full inline-block p-10'
              >
                <div className='text-blue-400'>{filename}</div>
                <span className='flex justify-end mt-10'>
                  <span className='file-desc mr-20'> {description} </span>
                  <img className='w-60 h-60' src={cover} />
                </span>
              </a>
            </div>
        </div>
      </div>
    </div>
  );
};
export default PublicizeFile;
