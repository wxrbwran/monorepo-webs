import React, { FC, useEffect, useState } from 'react';
import { Button, InputNumber, Select, TimePicker } from 'antd';
// import * as api from '@/services/api';
import './index.css';
import moment from 'moment';
import { cloneDeep } from 'lodash';



interface IFrequency {

  frequency: 'NONE' | 'LOOP' | 'CUSTOM' | 'ADD',
  custom: { day: string, time?: string, content: any[], hour?: string, min?: string },
  // 对于'LOOP' | 'CUSTOM' 有day: string, time?: string
  // 对于'ADD'， 有day: string,hour?: string, min?: string
}
interface IProps {

  frequencySource: { key: 'NONE' | 'LOOP' | 'CUSTOM' | 'ADD', value: string }[];
  initFrequency: IFrequency;
  onFrequencyChange: (frequency: IFrequency) => void;
}
const { Option } = Select;

const SendFrequency: FC<IProps> = ({ onFrequencyChange, initFrequency, frequencySource }: IProps) => {


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
  //删除发送频率
  const handleDeleteDay = (index: number) => {
    frequency.custom.splice(index, 1);
    setFrequency(cloneDeep(frequency));
  };

  //修改发送频率
  const handleChangeDay = (e: any, index: number) => {
    frequency.custom[index].day = e;
    setFrequency(cloneDeep(frequency));
  };

  const handleChangeHour = (e: any, index: number) => {
    frequency.custom[index].hour = e;
    setFrequency(cloneDeep(frequency));
  };

  const handleChangeMin = (e: any, index: number) => {
    frequency.custom[index].min = e;
    setFrequency(cloneDeep(frequency));
  };

  const dateChange = (_val: any, str: string, index: number) => {

    frequency.custom[index].time = str;
    setFrequency(cloneDeep(frequency));
  };

  return (
    <div className='shard_rule_send_frequency'>
      <h2>
        <span className='start'></span>发送频率：
      </h2>
      <div className='send_type'>
        <Select style={{ width: 180 }} onChange={handleGetType} value={frequency.frequency}>
          {frequencySource.map((item) => (
            <Option value={item.key} key={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        {frequency.frequency === 'CUSTOM' && (
          <div className={'self'}>
            首次发送给受试者后
            <div className={'self_content'}>
              {frequency.custom.map((item: any, index) => (
                <div className={'add_item'} key={index}>
                  <div className={'add_item_left'}>
                    <InputNumber
                      addonBefore={'第'}
                      addonAfter={'天'}
                      style={{ width: 120 }}
                      min={1}
                      max={9999}
                      value={item.day ?? null}
                      onChange={(e) => handleChangeDay(e, index)}
                    />
                  </div>
                  <div className={'ml-10 mr-10 time'}>
                    <TimePicker
                      value={item.time ? moment(item.time, 'HH:mm') : null}
                      format={'HH:mm'}
                      onChange={(momentDate, dateString) => {
                        dateChange(momentDate, dateString, index);
                      }}
                    />
                  </div>
                  发送一次
                  <div className="ml-10">
                    {index === 0 ? (
                      <Button className={'addBtn'} size="large" onClick={handleAddDayEdit}>
                        添加
                      </Button>
                    ) : (
                      <Button
                        className={'deleteBtn'}
                        size="large"
                        type="default"
                        onClick={() => handleDeleteDay(index)}
                      >
                        删除
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {frequency.frequency === 'LOOP' && (
          <div className='cycle'>
            <div className="mr-10 ml-10">首次发送给受试者后</div>
            <InputNumber
              addonBefore={'每'}
              addonAfter={'天'}
              style={{ width: 120 }}
              min={1}
              max={9999}
              value={frequency.custom[0].day}
              onChange={(e) => handleChangeDay(e, 0)}
            />
            <div className={'ml-10 mr-10 time'}>
              <TimePicker
                value={frequency.custom[0].time ? moment(frequency.custom[0].time, 'HH:mm') : null}
                format={'HH:mm'}
                onChange={(momentDate, dateString) => {
                  dateChange(momentDate, dateString, 0);
                }}
              />
            </div>
            发送一次
          </div>
        )}
        {frequency.frequency === 'ADD' && (

          <div className={'self'}>
            <div className={'self_content'}>
              {frequency.custom.map((item: any, index) => (
                <div className={'add_item'} key={index}>
                  <InputNumber
                    className={'ml-10'}
                    addonAfter={'天'}
                    style={{ width: 100 }}
                    min={0}
                    max={9999}
                    value={item.day ?? null}
                    onChange={(e) => handleChangeDay(e, index)}
                  />
                  <InputNumber
                    className={'ml-10'}
                    addonAfter={'小时'}
                    style={{ width: 100 }}
                    min={0}
                    max={9999}
                    value={item.hour ?? null}
                    onChange={(e) => handleChangeHour(e, index)}
                  />
                  <InputNumber
                    className={'ml-10 mr-10'}
                    addonAfter={'分'}
                    style={{ width: 100 }}
                    min={0}
                    max={9999}
                    value={item.min ?? null}
                    onChange={(e) => handleChangeMin(e, index)}
                  />
                  发送一次
                  <div className="ml-10">
                    {index === 0 ? (
                      <Button className={'addBtn'} size="large" onClick={handleAddDayEdit}>
                        添加
                      </Button>
                    ) : (
                      <Button
                        className={'deleteBtn'}
                        size="large"
                        type="default"
                        onClick={() => handleDeleteDay(index)}
                      >
                        删除
                      </Button>
                    )}
                  </div>
                </div>
              ))}
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
