import React, { FC, useEffect, useState } from 'react';
import { Button, InputNumber, Select, TimePicker } from 'antd';
// import * as api from '@/services/api';
import styles from './index.scss';
import { sendType } from '../util';
import moment from 'moment';
import ContentPopover from '../ContentPopover';
import { IList } from '../../../const';


interface IProps {

  initFrequency: any;
  onFrequencyChange: (frequency: any) => void;
  type: 'crf' | 'education' | 'suifang';
}
const { Option } = Select;

const SendFrequency: FC<IProps> = ({ onFrequencyChange, initFrequency, type }: IProps) => {


  const [frequency, setFrequency] = useState(initFrequency); //发送频率


  useEffect(() => {
    setFrequency(initFrequency);
  }, [initFrequency]);

  useEffect(() => {
    onFrequencyChange(frequency);
  }, [frequency]);


  //改变发送频率类型
  const handleGetType = (value: string) => {
    frequency.frequency = value;
    frequency.custom = [''];
    setFrequency({ ...frequency });
  };
  //添加发送频率
  const handleAddDayEdit = () => {
    frequency.custom.push({ day: '', time: '' });

    setFrequency({ ...frequency });
  };
  //修改发送频率
  const handleChangeCustomCycleDay = (e: any, index: number) => {
    frequency.custom[index].day = e;
    setFrequency({ ...frequency });
  };
  //删除自定义发送频率
  const handleDeleteDay = (index: number) => {
    frequency.custom.splice(index, 1);
    setFrequency({ ...frequency });
  };
  //循环下发天数
  const handleChangeCycleDay = (day: number) => {
    frequency.custom = [{ day: day, time: '' }];
    setFrequency({ ...frequency });
  };

  const dateChange = (_val: any, str: string, index: number) => {

    frequency.custom[index].time = str;
    setFrequency({ ...frequency });
  };

  const onContentListAdd = (choicesSid: IList[], frequencyIndex: number) => {

    console.log('============ frequency.custom ', JSON.stringify(frequency.custom), frequencyIndex);
    frequency.custom[frequencyIndex].contents = choicesSid;
    setFrequency({ ...frequency });
  };

  const onContentsRemoveSuccess = (_item: any, _index: number, list: any[], frequencyIndex: number) => {
    console.log('================= onRemoveSuccess choicesSid', JSON.stringify(list));
    frequency.custom[frequencyIndex].contents = list;
    setFrequency({ ...frequency });
  };

  const contentPopver = (frequencyIndex: number) => {

    const getContentList = () => {
      return frequency.custom[frequencyIndex]?.contents ?? [];
    };

    return (
      <ContentPopover contentListsources={getContentList()}
        onRemoveSuccess={(item: any, index: number, list: any[]) => { onContentsRemoveSuccess(item, index, list, frequencyIndex); }}
        onSaveChoices={(choices) => onContentListAdd(choices, frequencyIndex)} type={type} />
    );
  };

  return (
    <div className='mt-20'>
      <h2>
        <span className={styles.start}>*</span>发送频率：
      </h2>
      <div className={styles.send_type}>
        <Select style={{ width: 180 }} onChange={handleGetType} value={frequency.frequency}>
          {sendType.map((item) => (
            <Option value={item.key} key={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        {frequency.frequency === 'CUSTOM' ? (
          <div className={styles.self}>
            <div className={styles.self_content}>
              {frequency.custom.map((item: any, index) => (
                <div className={styles.add_item} key={index}>
                  <div className={`${styles.add_item_left} w-120`}>
                    <span>第</span>
                    <InputNumber
                      style={{ width: 50 }}
                      min={1}
                      max={9999}
                      value={item.day}
                      onChange={(e) => handleChangeCustomCycleDay(e, index)}
                    />
                    <span className={styles.info}>天</span>
                  </div>
                  <div className={`ml-20 mr-20 ${styles.time}`}>
                    <TimePicker className='ml-10 mr-10' value={item.time ? moment(item.time, 'HH:mm') : null} format={'HH:mm'} onChange={(momentDate, dateString) => { dateChange(momentDate, dateString, index); }} />
                  </div>
                  <div className={styles.self_add}>
                    {index === 0 ? (
                      <Button size="large" onClick={handleAddDayEdit}>
                        添加更多
                      </Button>
                    ) : (
                      <Button size="large" onClick={() => handleDeleteDay(index)}>
                        删除
                      </Button>
                    )}
                  </div>
                  <div className='ml-20'>
                    {
                      contentPopver(index)
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.cycle}>

            <div className='mr-5'>
              每
            </div>
            <InputNumber
              style={{ width: 50 }}
              min={1}
              max={9999}
              value={frequency.custom[0].day}
              onChange={handleChangeCycleDay}
            />
            <div className='ml-5'>
              天下发一次
            </div>
            <div className='ml-20'>
              {
                contentPopver(0)
              }
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

SendFrequency.defaultProps = {

  initFrequency: {
    frequency: 'CUSTOM',
    custom: [''],
  },
};

export default SendFrequency;
