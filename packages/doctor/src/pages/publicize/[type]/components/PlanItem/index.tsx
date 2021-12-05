import React, { FC, useEffect, useState } from 'react';
import ReplyDetail from '../../../components/reply_detail';
import time from '@/assets/img/suifang/time.svg';
// import condition from '@/assets/img/suifang/condition.svg';
import frequency from '@/assets/img/suifang/frequency.svg';
import groupIcon from '@/assets/img/suifang/group.svg';
import ListItem from '../../../components/ListItem';
import openIcon from '@/assets/img/icon_open.png';
import { DeleteOutlined, ProfileOutlined } from '@ant-design/icons';
import SendCalendar from '../SendCalendar';
import { useParams } from 'umi';
import { Button, Popconfirm, message } from 'antd';
import { MinusCircleOutlined, FormOutlined, CalendarOutlined } from '@ant-design/icons';
import styles from './index.scss';
import { getConditionDescriptionFromConditionss, getStartTimeDescriptionFromConditionss } from '../../../components/TemplateRule/util';

interface IProps {
  data: any;
  status: 'sending' | 'stop' | 'add';
  stopSendSuccess?: () => void;
  onEditClick?: () => void;
  remove?: () => void;
}
const PlanItem: FC<IProps> = ({ data, status, stopSendSuccess, onEditClick, remove }) => {
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

  const handleStopSend = () => {
    // q4tHa30BPHeunwv_quPK
    window.$api.education.delPublicizRule(data.rule.id).then(() => {
      message.success('操作成功');
      // 这里需要刷新下列表
      if (stopSendSuccess) {
        stopSendSuccess();
      }
    });
  };

  return (
    <div className={`${styles.card} ${open ? styles.h_auto : ''}`}>
      <div className={styles.btn_wrap}>
        {(type === 'suifang' || type == 'crf_scale') && (
          <ReplyDetail rule={data.rule} chooseValues={data.chooseValues}>
            <Button type="link" icon={<ProfileOutlined />}>回复详情</Button>
          </ReplyDetail>
        )}
        {
          status === 'stop' && (<div className={styles.stop}>已停止</div>)
        }
        {
          status === 'sending' && (
            <>
              <Button type="link" icon={<FormOutlined />} onClick={onEditClick}>编辑</Button>
              <SendCalendar rule={data.rule}>
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
        {
          status === 'add' && (
            <>
              <Button type="link" icon={<FormOutlined />} onClick={onEditClick}>编辑</Button>
              <Button type="link" icon={<DeleteOutlined />} onClick={remove}>删除</Button>
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
          <span className='w-50 flex-shrink-0'>发送：</span>
          <div className={`${styles.block} flex justify-start  items-end flex-wrap`}>
            {data?.chooseValues?.firstTime?.choiceContents &&
              data?.chooseValues?.firstTime?.choiceContents.map((con) => (
                <ListItem
                  key={con.id}
                  type={con.extraFileType.type}
                  item={con}
                  location={location}
                />
              ))}
          </div>
        </div>
        {
          data.chooseValues.frequency.frequency != 'NONE' && (
            <div className={`${styles.tit} flex center`}>
              <img src={frequency} alt="" />
              <p className="text-gray-900 text-base ml-5">发送频率:</p>
            </div>
          )
        }
        {data.chooseValues.frequency.frequency != 'NONE' &&
          <div className="ml-20 mb-20">
            {
              data.chooseValues.frequency.custom.map((item) => {

                return (
                  <>
                    首次发送给患者后
                    {data.chooseValues.frequency.frequency == 'CUSTOM' ? '    第' : '    每'}
                    {item.day}天{item.time}

                    <div className="flex mt-20">
                      <span className='w-50 flex-shrink-0'>发送：</span>
                      <div className={`${styles.block} flex justify-start  items-end flex-wrap`}>
                        {item?.contents &&
                          item?.contents.map((con) => (
                            <ListItem
                              key={con.id}
                              type={con.extraFileType.type}
                              item={con}
                              location={location}
                            />
                          ))}
                      </div>
                    </div>
                  </>


                );
              })
            }
          </div>
        }

        {
          conditionDescription && (conditionDescription.age || conditionDescription.sex || conditionDescription.disease || conditionDescription.treatment) &&
          <div className={`${styles.tit} flex center`}>
            <img src={frequency} alt="" />
            <p className="text-gray-900 text-base ml-5">发送条件:</p>
          </div>
        }
        {(conditionDescription &&
          <div className='ml-20 mb-20'>
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
