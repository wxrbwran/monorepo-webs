import React, { FC, useEffect, useState } from 'react';
import { Button, InputNumber, Select, TimePicker } from 'antd';
// import * as api from '@/services/api';
import styles from './index.scss';
import { sendType } from '../util';
import moment from 'moment';
import ContentPopover from '../ContentPopover';
import { IList } from '../../../const';
import { cloneDeep } from 'lodash';



interface IFrequency {

  frequency: 'NONE' | 'LOOP' | 'CUSTOM',
  custom: { day: string, time: string, content: any[] },
}
interface IProps {

  initFrequency: IFrequency;
  onFrequencyChange: (frequency: IFrequency) => void;
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
    frequency.custom = [{ day: '', time: '', content: [] }];
    setFrequency(cloneDeep(frequency));
  };
  //添加发送频率
  const handleAddDayEdit = () => {
    frequency.custom.push({ day: '', time: '', content: [] });
    setFrequency(cloneDeep(frequency));
  };
  //修改发送频率
  const handleChangeCustomCycleDay = (e: any, index: number) => {

    console.log('============== e e', JSON.stringify(e));
    console.log('============== frequency', JSON.stringify(frequency));
    frequency.custom[index].day = e;
    setFrequency(cloneDeep(frequency));
  };
  //删除自定义发送频率
  const handleDeleteDay = (index: number) => {
    frequency.custom.splice(index, 1);
    setFrequency(cloneDeep(frequency));
  };
  //循环下发天数
  const handleChangeCycleDay = (day: number) => {
    frequency.custom = [{ day: day, time: '', content: [] }];
    setFrequency(cloneDeep(frequency));
  };

  const dateChange = (_val: any, str: string, index: number) => {

    frequency.custom[index].time = str;
    setFrequency(cloneDeep(frequency));
  };

  const onContentListAdd = (choices: IList[], frequencyIndex: number) => {

    console.log('============ frequency.custom ', !frequency.custom[frequencyIndex].contents);
    if (!frequency.custom[frequencyIndex].contents) {
      frequency.custom[frequencyIndex].contents = [];
    }
    frequency.custom[frequencyIndex].contents.push(...choices);
    console.log('============ frequency.custom ', JSON.stringify(frequency.custom[frequencyIndex].contents));
    setFrequency(cloneDeep(frequency));
  };

  const onContentsRemoveSuccess = (_item: any, _index: number, list: any[], frequencyIndex: number) => {
    console.log('================= onRemoveSuccess choicesSid', JSON.stringify(list));
    frequency.custom[frequencyIndex].contents = list;
    setFrequency(cloneDeep(frequency));
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
    <div className={styles.send_frequency}>
      <h2>
        <span className={styles.start}></span>发送频率：
      </h2>
      <div className={styles.send_type}>
        <Select style={{ width: 180 }} onChange={handleGetType} value={frequency.frequency}>
          {sendType.map((item) => (
            <Option value={item.key} key={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        {frequency.frequency === 'CUSTOM' && (
          <div className={styles.self}>
            首次发送给患者后
            <div className={styles.self_content}>
              {frequency.custom.map((item: any, index) => (
                <div className={styles.add_item} key={index}>
                  <div className={`${styles.add_item_left}`}>
                    <InputNumber
                      addonBefore={'第'}
                      addonAfter={'天'}
                      style={{ width: 120 }}
                      min={1}
                      max={9999}
                      value={item.day ?? null}
                      onChange={(e) => handleChangeCustomCycleDay(e, index)}
                    />
                  </div>
                  <div className={`ml-10 mr-10 ${styles.time}`}>
                    <TimePicker value={item.time ? moment(item.time, 'HH:mm') : null} format={'HH:mm'} onChange={(momentDate, dateString) => { dateChange(momentDate, dateString, index); }} />
                  </div>
                  发送一次
                  <div className='ml-10'>
                    {index === 0 ? (
                      <Button className={styles.addBtn} size="large" onClick={handleAddDayEdit}>
                        添加
                      </Button>
                    ) : (
                      <Button className={styles.deleteBtn} size="large" type='default' onClick={() => handleDeleteDay(index)}>
                        删除
                      </Button>
                    )}
                  </div>
                  <div className='ml-10'>
                    {
                      contentPopver(index)
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {
          frequency.frequency === 'LOOP' &&
          (
            <div className={styles.cycle}>
              <div className='mr-10 ml-10'>
                首次发送给患者后
              </div>
              <InputNumber
                addonBefore={'每'}
                addonAfter={'天'}
                style={{ width: 120 }}
                min={1}
                max={9999}
                value={frequency.custom[0].day}
                onChange={handleChangeCycleDay}
              />
              <div className={`ml-10 mr-10 ${styles.time}`}>
                <TimePicker value={frequency.custom[0].time ? moment(frequency.custom[0].time, 'HH:mm') : null} format={'HH:mm'} onChange={(momentDate, dateString) => { dateChange(momentDate, dateString, 0); }} />
              </div>
              发送一次
              <div className='ml-10'>
                {
                  contentPopver(0)
                }
              </div>

            </div>
          )
        }
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
