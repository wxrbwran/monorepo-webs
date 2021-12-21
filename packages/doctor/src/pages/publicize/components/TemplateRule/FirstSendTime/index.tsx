import React, { useState, useEffect, FC } from 'react';
import { DatePicker, InputNumber, Select, TimePicker } from 'antd';
// import * as api from '@/services/api';
import styles from './index.scss';
import moment from 'moment';
import { cloneDeep, isEmpty } from 'lodash';
import { IModel, FirstTimeModel } from '../util';

interface IProps {

  // contentListDragModal: (children: React.ReactNode) => React.ReactNode; // 会将+号作为children传递给该组件
  // contentListVisible: boolean;
  // onVisibleChange: (visible: boolean) => void;

  choiceModelChange: (choiceModel: IModel) => void;
  popverContent: React.ReactNode;
  choiceModelSource?: any;
}
const { Option } = Select;

const FirstSendTime: FC<IProps> = ({ choiceModelChange, popverContent, choiceModelSource }: IProps) => {

  const [choiceModel, setChoiceModel] = useState<IModel>({ childItemType: 'select', choiceModel: cloneDeep(FirstTimeModel), description: 'first' });
  // const [contentList, setContentList] = useState<any[]>([]);

  const handleChangeType = (val: any, currentItem: IModel) => {
    currentItem.choiceModel = currentItem.childItem?.filter((item) => item.description == val)[0];
    setChoiceModel({ ...choiceModel });
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
  };

  const dayChange = (val: any, choiceItem: IModel) => {

    if (choiceItem.childItemType == 'diy') {
      choiceItem.inputDay = val;
    }
    setChoiceModel({ ...choiceModel });
  };

  const getReactEle = (choiceItem: IModel) => {

    return ([
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
              <div className={`mr-10 ${styles.diy}`}>
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
              <div className={styles.hm}>
                <TimePicker className='mr-10' value={choiceItem?.inputHM ? moment(choiceItem.inputHM, 'HH:mm') : null} format={'HH:mm'} onChange={(momentDate, dateString) => { dateChange(momentDate, dateString, choiceItem); }} />
              </div>

            </>,
          ]
        }
      </>,
      <>
        {
          choiceItem.childItemType == 'time' &&
          <div className={styles.time}>
            <DatePicker showTime={{ format: 'HH:mm' }} value={choiceItem?.inputTime ? moment(choiceItem.inputTime, 'YYYY-MM-DD HH:mm') : null} onChange={(momentDate, dateString) => { dateChange(momentDate, dateString, choiceItem); }} format={'YYYY-MM-DD HH:mm'} />
          </div>
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

  useEffect(() => {

    choiceModelChange(choiceModel);
  }, [choiceModel]);

  return (
    <div className={styles.send}>
      <h2>
        <span className={styles.start}>*</span>首次发送时间：
      </h2>
      <div className={styles.send_time}>
        {
          choiceModel?.choiceModel &&
          getReactEle(choiceModel.choiceModel)
        }
        {
          popverContent
        }
      </div>
    </div>
  );
};

export default FirstSendTime;
