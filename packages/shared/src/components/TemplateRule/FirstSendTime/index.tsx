import React, { useRef } from 'react';
import { Select } from 'antd';
// import * as api from '@/services/api';
import styles from './index.scss';

interface IModel {
  itemType: 'select' | 'day' | 'hm' | 'content' | 'time';
  nextModel?: IModel;
  options?: string[]; // 只在itemType是select时有值
  childItem?: IModel[];
  description?: string;
}
interface Iprops {

}
// const { Option } = Select;
function FirstSendTime({ }: Iprops) {

  const choiceModel = useRef<IModel>({ itemType: 'select' });

  // 患者与我绑定日期后
  const model: IModel = {

    itemType: 'select',
    options: ['患者与我绑定日期后', '选择特定日期', '计划创建成功后立即发送'],
    description: '首次发送时间',
    childItem: [
      {
        itemType: 'select',
        options: ['自定义', '立即发送'],
        description: '患者与我绑定日期后',
        childItem: [
          {
            itemType: 'select',
            options: ['自定义', '立即发送'],
            description: '自定义',
            childItem: [
              {
                itemType: 'day',
              },
            ],
          },
          {
            itemType: 'select',
            options: ['自定义', '立即发送'],
            description: '立即发送',
          },
        ],
      },
      {
        itemType: 'select',
        options: ['患者与我绑定日期后', '选择特定日期', '计划创建成功后立即发送'],
        description: '首次发送时间',
      },
    ],
  };

  const handleChangeType = () => {

  };

  // const getReactEle = (choiceItem: IModel) => {

  //   return (<div className={styles.send_time}>
  //     {
  //       choiceItem.itemType == 'select' &&
  //       <Select onChange={handleChangeType} value={choiceItem?.description ?? ''}>
  //         {
  //           choiceItem?.childItem &&
  //           choiceItem.childItem.map((it) => (
  //             <Option value={it?.description ?? ''} key={it?.description}>
  //               {it.description}
  //             </Option>
  //           ))
  //         }
  //       </Select>
  //     }
  //     {
  //       choiceItem?.childItem && 
  //     }
  //   </div>
  //   );
  // };

  return (
    <div>
      <h2>
        <span className={styles.start}>*</span>首次发送时间：
      </h2>
      <div className={styles.send_time}>
        {
          model.itemType == 'select' &&
          <Select onChange={handleChangeType} value={choiceModel?.current?.description ?? ''}>
            {/* {startTimeKey.items &&
              startTimeKey.items.map((item) => (
                <Option value={item.name} key={item.name}>
                  {item.description}
                </Option>
              ))} */}
          </Select>
        }
      </div>
    </div>
  );
}

export default FirstSendTime;
