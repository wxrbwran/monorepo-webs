import React, { FC, useState } from 'react';
import ReplyDetail from '../../../components/reply_detail';
import time from '@/assets/img/suifang/time.svg';
import condition from '@/assets/img/suifang/condition.svg';
import frequency from '@/assets/img/suifang/frequency.svg';
import groupIcon from '@/assets/img/suifang/group.svg';
import ListItem from '../../../components/ListItem';
import openIcon from '@/assets/img/icon_open.png';
import { ProfileOutlined } from '@ant-design/icons';
import SendCalendar from '../SendCalendar';
import { useParams } from 'umi';
import { Button, Popconfirm } from 'antd';
import { MinusCircleOutlined, FormOutlined, CalendarOutlined } from '@ant-design/icons';
import styles from './index.scss';

interface IProps {
  data: any;
  status?: string;
}
const PlanItem: FC<IProps> = ({ data, status }) => {
  const { type } = useParams<{ type: string }>();
  const [open, setopen] = useState(false);
  console.log('======121', data);
  const item = data.localRules[0];
  const { frequencyType, custom, content, group } = item;
  const diagnosisArr = item.conditions.filter((i) => i.type === 'diagnosis');
  const treatmentArr = item.conditions.filter((i) => i.type === 'treatment');
  const fileType = {
    1: 'video',
    2: 'document',
    3: 'article',
    4: 'picture',
    6: 'audio',
  };

  return (
    <div className={`${styles.card} ${open ? styles.h_auto : ''}`}>
      <div className={styles.btn_wrap}>
        {type === 'suifang' && (
          <ReplyDetail id={data.id}>
            <Button type="link" icon={<ProfileOutlined />}>回复详情</Button>
          </ReplyDetail>
        )}
        {
          status === 'stop' ? ( <div className={styles.stop}>已停止</div> ) : (
            <>
              <Button type="link" icon={<FormOutlined />}>修改</Button>
              <SendCalendar>
                <div className={styles.calendar}> <Button type="link" icon={<CalendarOutlined />}>发送日历</Button></div>
              </SendCalendar>
              <Popconfirm
                placement="topLeft"
                title={<span className="text-base font-bold">停止发送?</span>}
                onConfirm={() => {}}
                onCancel={() => {}}
                okText="确定"
                cancelText="取消"
              >
                <Button type="link" icon={<MinusCircleOutlined />}>停止发送</Button>
              </Popconfirm>
            </>
          )
        }
      </div>
      <div>
        <div className={`${styles.tit} flex center`}>
          <img src={time} alt="" />
          <p className="text-gray-900 text-base ml-5">首次发送时间:</p>
        </div>
        <div className="ml-20 mb-20">患者与医院内医生绑定后 第二天上午九点</div>
        <div className="flex ml-20">
          <span>发送：</span>
          <div className={`${styles.block} flex justify-start  items-end flex-wrap`}>
            {content &&
              content.map((con) => (
                <ListItem
                  key={con.id}
                  type={fileType[con?.type] || 'accompany'}
                  item={con}
                  location={location}
                />
              ))}
          </div>
        </div>
        <div className={styles.item}>
          <div className="text-gray-900 text-base font-bold">
            <img src={groupIcon} alt="" /> 发送对象:
          </div>
          <p className={styles.con}>
            {group.includes('PATIENT_ALL') ? '全部患者' : group.join()}
          </p>
        </div>
      </div>
      <div className={`${styles.content} flex justify-start items-start flex-wrap`}>
        <div className={styles.item}>
          <p>
            <img src={frequency} alt="" /> 发送频率
          </p>
          <p className={styles.con}>
            {frequencyType === 'once' ? '第' : '每'}
            {custom.join()}天发送一次
          </p>
        </div>
        <div className={styles.item}>
          <p>
            <img src={condition} alt="" /> 发送条件
          </p>
          {item.conditions.map((i) => (
            <>
              {i.type === 'age' && (
                <p className={styles.con}>
                  年龄：{i.min}-{i.max}
                </p>
              )}
              {i.type === 'sex' && <p className={styles.con}>性别：{i.value}</p>}
            </>
          ))}
          {!!diagnosisArr?.length && (
            <p className={styles.con}>
              诊断：{diagnosisArr.map((i) => i.value).join(', ')}
            </p>
          )}
          {!!treatmentArr?.length && (
            <p className={styles.con}>
              处理：{treatmentArr.map((i) => i.value).join(', ')}
            </p>
          )}
        </div>
      </div>
      <div
        className="flex justify-center items-center absolute left-0 bottom-0 w-55 cursor-pointer w-full bg-white pb-11"
        onClick={() => setopen(prev => !prev)}
      >
        <span>{open ? '收起' : '展开'}</span>
        <img src={openIcon} style={{ transform: `rotate(${open ? 180 : 0}deg)` }} className="w-14 h-14" />
      </div>
    </div>
  );
};

export default PlanItem;
