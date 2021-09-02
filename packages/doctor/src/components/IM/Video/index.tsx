// 语音视频通话记录显示通话操作详情或时长
import React, { FC } from 'react';
import { defaultAvatar } from '@/utils/consts';
import phoneGray from '@/assets/img/im/phone_gray.svg';
import phoneWhite from '@/assets/img/im/phone_white.svg';
import videoGray from '@/assets/img/im/video_gray.svg';
import videoWhite from '@/assets/img/im/video_white.svg';
import errorHandler from '@/components/Error/ErrorHandler';
import './index.scss';

/* eslint-disable */
interface IMsg {
  msg: {
    content: {
      content: string;
      type: number;
    };
    fromNick: string;
    from: string;
    avatar: string;
    flow: string;
    custom: {
      fromUser: {
        role: string;
      };
    };
  };
}
interface IContent {
  msg: string;
  type: string;
  netcallType: number;
  duration: number;
}
const getNetcallDurationText = (allSeconds: number) => {
  let result = '';
  let hours;
  let minutes;
  let seconds;
  if (allSeconds >= 3600) {
    hours = parseInt(allSeconds / 3600);
    result += `${`00${hours}`.slice(-2)} : `;
  }
  if (allSeconds >= 60) {
    minutes = parseInt((allSeconds % 3600) / 60);
    result += `${`00${minutes}`.slice(-2)} : `;
  } else {
    result += '00 : ';
  }
  seconds = parseInt((allSeconds % 3600) % 60);
  result += `00${seconds}`.slice(-2);
  return result;
};
const Video: FC<IMsg> = (props) => {
  const { msg } = props;
  const content: IContent = JSON.parse(msg.content.content);

  const transText = () => {
    const isOut = msg.flow === 'out'; // out表示主动拨打，in表示被叫
    switch (content.type) {
      case 'netcallMiss':
        return isOut ? '已取消' : '对方已取消';
      // return '未接听';
      case 'netcallBill':
        return `通话时长${getNetcallDurationText(content.duration)}`;
      case 'cancelNetcallBeforeAccept':
        // return '无人接听';
        return isOut ? '已取消' : '对方已取消';
      // noResponse 自己定义的类型（由于无应答和主动取消都是调用 的hungup区分不出是无应答还是取消。所以特殊处理了一下，云信官方使用的是本地数据库存储此类消息）
      case 'noResponse':
        return isOut ? '对方无应答' : '对方已取消';
      case 'rejectNetcall':
        return '已拒绝';
      case 'netcallRejected':
        return '对方已拒绝';
      default:
        return '未知音视频消息';
    }
  };
  return (
    <div className="chat__item chat__doctor">
      <div className="chat__item-avatar">
        <img className="icon u-circle" alt="" src={msg.avatar || defaultAvatar} />
      </div>
      <div className="chat__item-content">
        <div className={`item-video msg-text ${msg.flow}`}>
          {msg.flow === 'in' && (
            <img src={content.netcallType === 1 ? phoneGray : videoGray} alt="" />
          )}
          <span>{transText()}</span>
          {msg.flow === 'out' && (
            <img src={content.netcallType === 1 ? phoneWhite : videoWhite} alt="" />
          )}
        </div>
      </div>
    </div>
  );
};
export default errorHandler(Video);
