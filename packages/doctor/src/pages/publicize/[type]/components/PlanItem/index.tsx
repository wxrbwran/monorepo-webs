import React, { FC, useEffect, useState } from 'react';
import ReplyDetail from '../../../components/reply_detail';
import time from '@/assets/img/suifang/time.svg';
// import condition from '@/assets/img/suifang/condition.svg';
import frequency from '@/assets/img/suifang/frequency.svg';
import groupIcon from '@/assets/img/suifang/group.svg';
import ListItem from '../../../components/ListItem';
import openIcon from '@/assets/img/icon_open.png';
import { ProfileOutlined } from '@ant-design/icons';
import SendCalendar from '../SendCalendar';
import { useParams } from 'umi';
import { Button, Popconfirm, message } from 'antd';
import { MinusCircleOutlined, FormOutlined, CalendarOutlined } from '@ant-design/icons';
import styles from './index.scss';
import { getConditionDescriptionFromConditionss, getStartTimeDescriptionFromConditionss } from '../../../components/TemplateRule/util';

interface IProps {
  data: any;
  status?: string;
  stopSendSuccess: () => void;
}
const PlanItem: FC<IProps> = ({ data, status, stopSendSuccess }) => {
  const { type } = useParams<{ type: string }>();
  const [open, setopen] = useState(false);
  console.log('======121', data);
  const [conditionDescription, setConditionDescription] = useState();
  const [firstTimeStr, setFirstTimeStr] = useState();

  useEffect(() => {

    if (data) {
      const conditionDes = getConditionDescriptionFromConditionss(data.chooseValues.choseConditions);
      setConditionDescription(conditionDes);
      const firstTime = getStartTimeDescriptionFromConditionss(data.chooseValues.firstTime);
      setFirstTimeStr(firstTime);
    }
  }, [data]);


  // rule: rule,
  //           chooseValues: chooseValues,
  //           status: 'close',

  const fileType = {
    1: 'video',
    2: 'document',
    3: 'article',
    4: 'picture',
    6: 'audio',
  };
  const content = [
    {
      'inSchedule': true,
      'edit': false,
      'del': false,
      'id': 152,
      'type': 4,
      'content': {
        'filename': 'avatar_doctor.jpg',
        'address': 'https://xzl-user-avatar.oss-cn-hangzhou.aliyuncs.com/test/0/f3b663b3-5439-42ba-adae-8528307150a8avatar_doctor.jpg',
        'size': 9038,
        'convertAddress': 'https://xzl-user-avatar.oss-cn-hangzhou.aliyuncs.com/test/0/f3b663b3-5439-42ba-adae-8528307150a8avatar_doctor.jpg',
      },
    },
  ];
  const handleStopSend = () => {
    // q4tHa30BPHeunwv_quPK
    window.$api.education.delPublicizRule(data.rule.id).then(() => {
      message.success('操作成功');
      // 这里需要刷新下列表
      stopSendSuccess();
    });
  };
  return (
    <div className={`${styles.card} ${open ? styles.h_auto : ''}`}>
      <div className={styles.btn_wrap}>
        {type === 'suifang' && (
          <ReplyDetail id={data.rule.id}>
            <Button type="link" icon={<ProfileOutlined />}>回复详情</Button>
          </ReplyDetail>
        )}
        {
          status === 'stop' ? (<div className={styles.stop}>已停止</div>) : (
            <>
              <Button type="link" icon={<FormOutlined />}>修改</Button>
              <SendCalendar ruleId={data.rule.id}>
                <div className={styles.calendar}> <Button type="link" icon={<CalendarOutlined />}>发送日历</Button></div>
              </SendCalendar>
              <Popconfirm
                placement="topLeft"
                title={<span className="text-base font-bold">停止发送?</span>}
                onConfirm={handleStopSend}
                onCancel={() => { }}
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
        <div className="ml-20 mb-20">{firstTimeStr}</div>
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
        <div className={`${styles.tit} flex center`}>
          <img src={frequency} alt="" />
          <p className="text-gray-900 text-base ml-5">发送频率:</p>
        </div>
        {data.chooseValues.frequency && <div className="ml-20 mb-20">首次发送给患者后{data.chooseValues.frequency.frequency == 'CUSTOM' ? '第' : '每'}{data.chooseValues.frequency.custom.map((item) => item.day).join()}天{data.chooseValues.frequency.custom.map((item) => item.time).join()}发送一次</div>}
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
        {
          conditionDescription && (conditionDescription.age || conditionDescription.sex || conditionDescription.disease || conditionDescription.treatment) &&
          <div className={`${styles.tit} flex center`}>
            <img src={frequency} alt="" />
            <p className="text-gray-900 text-base ml-5">发送条件:</p>
          </div>
        }
        {(conditionDescription &&
          <div className='mb-20'>
            {conditionDescription.age && <p>{conditionDescription.age}</p>}
            {conditionDescription.sex && <p>{conditionDescription.sex}</p>}
            {conditionDescription.disease && <p>{conditionDescription.disease}</p>}
            {conditionDescription.treatment && <p>{conditionDescription.treatment}</p>}
          </div>
        )}
        <div className={styles.item}>
          {/* <div className="text-gray-900 text-base font-bold">
            <img src={groupIcon} alt="" /> 发送对象:
          </div> */}
          <div className={`${styles.tit} flex center`}>
            <img src={groupIcon} alt="" />
            <p className="text-gray-900 text-base ml-5"> 发送对象:</p>
          </div>
          <p className={styles.con}>
            {
              data?.chooseValues &&
              data.chooseValues.choseScope.map(item => item.description).join(',')
            }
          </p>
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
