import React, { FC, useState } from 'react';
import {
  Form, Select, Input, message,
} from 'antd';
import styles from '../index.scss';
import times from '../times';

const { Option } = Select;
const { OptGroup } = Select;
interface IPlan {
  dosage: string;
  originDosage: string;
  status: string;
  originTakeTime: string[];
  takeTime: string[];
}
interface IProps {
  parent: number;
  subIndex: number;
  disabled: boolean;
  handleSetField: (key: string, val: any, render?: boolean) => void;
  initSelect: string[];
  getFieldValue: (name: string) => string | IPlan;
  medicineStatus: string;
  planQueue: number[];
}
const MedicineTime: FC<IProps> = (props) => {
  const {
    parent, subIndex, disabled, handleSetField, initSelect, getFieldValue,
    medicineStatus, planQueue,
  } = props;
  const [timeArr, setTimeArr] = useState<string[]>([...initSelect]);

  const setTime = (takeTime: string[]) => {
    setTimeArr(takeTime);
    handleSetField(`plan_${parent}_${subIndex}`, { takeTime });
  };

  // 根据时间的添加与删除，判断此条计划的状态为NONE还是EDIT。
  const verifyTimeStatus = (val: string[]) => {
    const currentPlan = (getFieldValue(`plan_${parent}_${subIndex}`) as IPlan);
    const {
      originTakeTime, status, originDosage,
    } = currentPlan;
    if (medicineStatus === 'NONE' && ['NONE', 'EDIT'].includes(status)) {
      if (!originTakeTime) {
        handleSetField(`plan_${parent}_${subIndex}`, {
          ...currentPlan,
          originTakeTime: timeArr,
          status: 'EDIT',
        });
      } else if (originTakeTime.sort().toString() === val.sort().toString()) {
        handleSetField(`plan_${parent}_${subIndex}`, {
          ...currentPlan,
          originTakeTime: null,
          status: originDosage ? 'EDIT' : 'NONE',
        });
      }
    }
  };

  const handleSelectTime = (value: string) => {
    const format = (t: string) => +t.split(':').join('');
    const valueNumber = [value].map(format)[0]; // '01:30' -> 130
    let timeArrAll: string[] = [];
    // 一个药的所有计划时间，做限制
    planQueue.forEach((sIndex: number) => {
      const curTakeTime: string[] = (getFieldValue(`plan_${parent}_${sIndex}`) as IPlan).takeTime;
      if (curTakeTime) {
        timeArrAll = [...timeArrAll, ...curTakeTime];
      }
    });
    const timeNumberArray = timeArrAll.map(format); // ['03:30', '10:00'] -> [330, 1000]
    const isGreatThreeHour = timeNumberArray
      .every((t) => {
        const absTime = Math.abs(t - valueNumber);
        return absTime >= 300 && absTime <= 2100;
      });
    const newTimeArr = [...timeArr];
    const index = timeArr.indexOf(value);
    if (index > -1) {
      newTimeArr.splice(index, 1);
      verifyTimeStatus([...newTimeArr]); // 删除后最新的时间
      setTime(newTimeArr);
    } else if (timeArrAll.length === 4) {
      message.warning('一个药品最多选择4个服药时间！');
    } else if (isGreatThreeHour) {
      newTimeArr.push(value);
      verifyTimeStatus(newTimeArr);
      setTime(newTimeArr);
    } else {
      message.warning('服药时间间隔3小时及以上！');
    }
  };

  const timeArray = ['morning', 'noon', 'evening'];
  return (
    <div className={styles.time}>
      <Form.Item
        name={[`plan_${parent}_${subIndex}`, 'originTakeTime']}
        noStyle
      >
        <Input type="hidden" />
      </Form.Item>
      <Form.Item
        name={[`plan_${parent}_${subIndex}`, 'takeTime']}
        noStyle
      >
        <Input type="hidden" />
      </Form.Item>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        dropdownClassName={styles.adjust_plan_time}
        placeholder="请选择该剂量服药时间,可多选"
        onSelect={handleSelectTime}
        onDeselect={handleSelectTime}
        disabled={disabled}
        maxTagCount={4}
        value={timeArr}
        virtual={false}
        listHeight={350}
      >
        {timeArray.map((timeItem) => (
          <OptGroup
            key={timeItem}
            label={
              <h3 className="group__label">
                <span>{times[`${timeItem}Text`]}</span>
              </h3>
            }
          >
            {times[timeItem].map((time: number) => (
              <Option
                key={time}
                value={`${time}`}
                title={`${time}`}
              >
                {time}
              </Option>))}
          </OptGroup>
        ))}
      </Select>

    </div>
  );
};

export default MedicineTime;
