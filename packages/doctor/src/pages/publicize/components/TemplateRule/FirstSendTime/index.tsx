import React, { useState, useEffect, FC } from 'react';
import { DatePicker, InputNumber, Select, TimePicker } from 'antd';
// import * as api from '@/services/api';
import styles from './index.scss';
import moment from 'moment';
import { cloneDeep, isEmpty } from 'lodash';

interface IProps {

  // contentListDragModal: (children: React.ReactNode) => React.ReactNode; // 会将+号作为children传递给该组件
  // contentListVisible: boolean;
  // onVisibleChange: (visible: boolean) => void;

  choiceModelChange: (choiceModel: IModel) => void;
  popverContent: React.ReactNode;
  choiceModelSource?: any;
}
const { Option } = Select;
export interface IModel {
  childItemType: 'select' | 'diy' | 'time' | 'none';
  childItem?: IModel[];
  description: string;
  choiceModel?: IModel;
  inputDay?: number; // 当childItemType是diy时，会有输入day组件，此时才可能有值
  inputHM?: string; // 当childItemType是diy时，会有输入时间组件，此时才可能有值
  inputTime?: string; // 当childItemType是time时，会有输入年月日时间组件，此时才可能有值
}
const model: IModel = {

  childItemType: 'select',
  description: '首次发送时间',
  childItem: [
    {
      childItemType: 'select',
      description: '患者与我绑定日期后',
      childItem: [
        {
          childItemType: 'diy',
          description: '自定义',

        },
        {
          childItemType: 'none',
          description: '立即发送',
        },
      ],
    },
    {
      childItemType: 'time',
      description: '选择特定日期',
    },
    {
      childItemType: 'none',
      description: '计划创建成功后立即发送',
    },
  ],
};


const FirstSendTime: FC<IProps> = ({ choiceModelChange, popverContent, choiceModelSource }: IProps) => {

  const [choiceModel, setChoiceModel] = useState<IModel>({ childItemType: 'select', choiceModel: cloneDeep(model), description: 'first' });
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
              <div className={`ml-10 mr-10 ${styles.diy}`}>
                第
                <InputNumber
                  style={{ width: 50 }}
                  min={1}
                  onChange={(val) => { dayChange(val, choiceItem); }}
                  value={choiceItem.inputDay}
                  max={9999}
                />
                天
              </div>
            </>,
            <>
              <div className={styles.hm}>
                <TimePicker className='ml-10 mr-10' value={choiceItem?.inputHM ? moment(choiceItem.inputHM, 'HH:mm') : null} format={'HH:mm'} onChange={(momentDate, dateString) => { dateChange(momentDate, dateString, choiceItem); }} />
              </div>

            </>,
          ]
        }
      </>,
      <>
        {
          choiceItem.childItemType == 'time' &&
          <div className={styles.time}>
            <DatePicker showTime={{ format: 'HH:mm' }} onChange={(momentDate, dateString) => { dateChange(momentDate, dateString, choiceItem); }} format={'YYYY-MM-DD HH:mm'} />
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

  // const onRemoveSuccess = (_item: any, _index: number, list: any[]) => {

  //   setContentList(list);
  // };

  useEffect(() => {

    choiceModelChange(choiceModel);
  }, [choiceModel]);

  return (
    <div>
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
