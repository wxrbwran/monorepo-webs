/* eslint-disable no-param-reassign */
import React, { FC, useState, useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { defaultAvatar } from 'xzl-web-shared/dist/src/utils/consts';
import { BloodType } from '@/utils/tools';
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
  type: number;
  title: string;
  content: {
    bpContent: {
      high: number;
      low: number;
      measuredAt: number,
      heartRate: number,
    }
    bgContent: {
      value: number;
      bgType: string;
    }
  }
}

const BloodCustom: FC<IMsg> = (props) => {
  const { msg } = props;
  const [isRisk, setIsRisk] = useState<boolean>(false);
  const { content } = msg;
  const { bpContent, bgContent } = content.content;
  useEffect(() => {
    if (bpContent) {
      const { high, low, heartRate } = bpContent;
      if (high < 80 || high > 180 || low < 50 || low > 120 || heartRate < 40 || heartRate > 150) {
        setIsRisk(true);
      }
    }
    if (bgContent) {
      if (bgContent.value < 3) {
        setIsRisk(true);
      }
    }
  }, []);
  return (
    <div className="chat__item chat__doctor">
      <div className="chat__item-avatar">
        <img className="icon u-circle" alt="" src={msg.avatar || defaultAvatar} />
      </div>
      <div className="chat__item-content">
        <p className="msg-user">
          {`${msg.fromNick} (${getRoles(msg.custom)})`}
        </p>
        <div className="msg-content blood">
          {
            isRisk && (
            <p className="risk">
              <ExclamationCircleOutlined />
              {`患者${content.type === 110 ? '血压/心率' : '血糖'}处于异常状态！`}
            </p>
            )
          }
          <div className="blood-top">
            <span>
              上传
              {content.type === 110 ? '血压/心率' : '血糖'}
            </span>
            <span>
              {content.type === 110
                ? dayjs(bpContent?.measuredAt).format('YYYY-MM-DD HH:mm')
                : dayjs(bpContent?.measuredAt).format('YYYY-MM-DD')}
            </span>
          </div>
          {content.type === 110 ? (
            <div className="blood-btm">
              <div className="blood-item">
                <span className="title">血压</span>
                <span className="num">
                  {bpContent?.high}
                  /
                  {bpContent?.low}
                </span>
              </div>
              <div className="blood-item">
                <span className="title">心率</span>
                <span className="num">{bpContent?.heartRate}</span>
              </div>
            </div>
          ) : (
            <div className="blood-btm">
              <div className="blood-item">
                <span className="title">{BloodType[bgContent.bgType]}</span>
                <span className="num">{bgContent.value}</span>
                <span className="unit">mmol/L</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BloodCustom;
