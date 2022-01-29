import React, { useState, useEffect, FC } from 'react';
import { DatePicker, InputNumber, Select, TimePicker } from 'antd';
// import * as api from '@/services/api';
// import styles from './index.scss';
import './index.css';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { IModel } from '../util';

interface IProps {
  choiceModelChange: (choiceModel: IModel) => void;
  popverContent: React.ReactNode;
  choiceModelSource: any;
}
const { Option } = Select;

const FirstSendTime: FC<IProps> = ({ choiceModelChange, popverContent, choiceModelSource }: IProps) => {

  const [choiceModel, setChoiceModel] = useState<IModel>({});

  const handleChangeType = (val: any, currentItem: IModel) => {
    currentItem.choiceModel = currentItem.childItem?.filter((item) => item.description == val)[0];
    setChoiceModel({ ...choiceModel });
    choiceModelChange(choiceModel);
  };

  useEffect(() => {
    if (choiceModelSource && !isEmpty(choiceModelSource)) {
      setChoiceModel(choiceModelSource);
    }
  }, [choiceModelSource]);

  const dateChange = (_val: any, str: string, choiceItem: IModel) => {

    if (choiceItem.childItemType == 'diy') {
      choiceItem.inputHM = str;
    } else if (choiceItem.childItemType == 'time') {
      choiceItem.inputTime = str;
    }
    setChoiceModel({ ...choiceModel });
    choiceModelChange(choiceModel);
  };

  const dayChange = (val: any, choiceItem: IModel) => {

    if (choiceItem.childItemType == 'diy') {
      choiceItem.inputDay = val;
    }
    setChoiceModel({ ...choiceModel });
    choiceModelChange(choiceModel);
  };

  const getReactEle = (choiceItem: IModel) => {

    return ([
      <>
        {
          choiceItem.firstchildReact ?
            choiceItem.firstchildReact(choiceItem.inputDes)
            : <div></div>
        }
      </>,
      <>
        {
          choiceItem.childItemType == 'select' &&
          <Select className='mr-10' onChange={(val) => { handleChangeType(val, choiceItem); }} value={choiceItem?.choiceModel?.description ?? ''}>
            {
              choiceItem?.childItem &&
              choiceItem.childItem.map((it) => (
                <Option value={it.description} key={it.description}>
                  {it.description}
                </Option>
              ))
            }
          </Select>
        }
      </>,
      <>
        {
          choiceItem.childItemType == 'diy' &&
          [
            <>
              <div className={'mr-10 diy'}>
                <InputNumber
                  addonBefore={'第'}
                  addonAfter={'天'}
                  style={{ width: 120 }}
                  min={1}
                  max={9999}
                  onChange={(val) => { dayChange(val, choiceItem); }}
                  value={choiceItem.inputDay}
                />
              </div>
            </>,
            <>
              <div className='hm'>
                <TimePicker className='mr-10' value={choiceItem?.inputHM ? moment(choiceItem.inputHM, 'HH:mm') : null} format={'HH:mm'} onChange={(momentDate, dateString) => { dateChange(momentDate, dateString, choiceItem); }} />
              </div>
            </>,
          ]
        }
      </>,
      <>
        {
          choiceItem.childItemType == 'time' &&
          <div className='time'>
            <DatePicker showTime={{ format: 'HH:mm' }} value={choiceItem?.inputTime ? moment(choiceItem.inputTime, 'YYYY-MM-DD HH:mm') : null} onChange={(momentDate, dateString) => { dateChange(momentDate, dateString, choiceItem); }} format={'YYYY-MM-DD HH:mm'} />
          </div>
        }
      </>,
      <>
        {
          choiceItem.lastChildReact ?
            choiceItem.lastChildReact(choiceItem.inputDes)
            : <div></div>
        }
      </>,
      <>
        {
          choiceItem?.choiceModel &&
          getReactEle(choiceItem.choiceModel)
        }
      </>,

    ]);
  };


  return (
    <div className='send'>
      <h2>
        <span className='start'>*</span>首次发送时间：
      </h2>
      <div className='shard_rule_first_send_time'>
        {
          choiceModel &&
          getReactEle(choiceModel)
        }
        {
          popverContent
        }
      </div>
    </div>
  );
};

export default FirstSendTime;
