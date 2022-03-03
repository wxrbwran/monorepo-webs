import React, { FC } from 'react';
import { getRoles } from '@/utils/utils';
import { defaultAvatar } from 'xzl-web-shared/dist/utils/consts';
import dayjs from 'dayjs';

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
const WeightCustom: FC<IMsg> = ({ msg }) => {
  console.log('msgmsgmsg', msg);
  const unit: CommonData = {
    WEIGHT: 'KG',
  };
  const { title, content: { bgContent: { value, bgType, measuredAt } } } = msg.content;
  return (
    <div className="chat__item chat__doctor">
      <div className="chat__item-avatar">
        <img className="icon u-circle" alt="" src={msg.avatar || defaultAvatar} />
      </div>
      <div className="chat__item-content">
        <p className="msg-user">
          {`${msg.fromNick} (${getRoles(msg.custom)})`}
        </p>
        <div className='w-180 h-60 bg-white border px-12 text-gray-600'>
          <div>
            {title}
            <span className='red_num'>{value}</span>
          {unit[bgType]}</div>
          <div className='text-gray-400 text-xs pt-3' style={{ borderTop: '1px solid #E0E0E0' }}>{dayjs(measuredAt).format('YYYY-MM-DD HH:mm')}</div>
        </div>
      </div>
    </div>
  );
};

export default WeightCustom;
