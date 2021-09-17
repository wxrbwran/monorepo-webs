/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import {
  Select, Radio, InputNumber, message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RadioChangeEvent } from 'antd/lib/radio';
import moment from 'moment';
import { unitFlagRe } from '@/utils/tools';
import medicineManual from '@/assets/img/medicineManual.svg';
import MedicineManual from '@/components/MedicineManual';
import { verifyTimeAction, verifyCountAction } from '../formatData';
import { initPlanAction } from '../consts';
import DelPlans from '../DelPlans';
import times from './times';
import styles from './index.scss';

const { Option } = Select;
const RadioGroup = Radio.Group;
const { OptGroup } = Select;

interface IProps {
  allPlans: IRecord[];
  plansItem: IRecord;
  plansIndex: number;
  updateAllPlans: Function;
  updateDelPlans: Function;
  updateStrengthInfo: Function;
  plansAction: IPlansAction[];
}

function MedicinePlans({
  allPlans, plansItem, plansIndex, updateAllPlans,
  updateDelPlans, updateStrengthInfo, plansAction,
}: IProps) {
  const timeArray = ['morning', 'noon', 'evening'];
  const [afterAllPlans, setAfterAllPlans] = useState<IRecord[]>([]);
  const [alfterPlansAction, setAlfterPlansAction] = useState<IPlansAction[]>([]);
  const date = new Date();
  const day = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

  // 接收父级传过来的获取的服药计划
  useEffect(() => {
    setAfterAllPlans(JSON.parse(JSON.stringify(allPlans)));
    setAlfterPlansAction(JSON.parse(JSON.stringify(plansAction)));
  }, [allPlans]);

  // 添加某个药服药计划
  const addPlans = (idx: number) => {
    if (afterAllPlans[idx].plans.filter((item) => item.status !== 'DELETE').length === 4) {
      message.warning('最多选择4个服药时间！');
    } else {
      afterAllPlans[idx].plans.push({ boxCellNos: [0], cycleDays: [1] });
      alfterPlansAction[idx].plans.push({ ...initPlanAction });
      updateAllPlans([...afterAllPlans], [...alfterPlansAction]);
    }
  };
  // 改变每天、隔天
  const changeCycleDays = (e: RadioChangeEvent, idx: number) => {
    afterAllPlans[idx].plans.forEach((item) => {
      item.cycleDays = [e.target.value];
    });
    updateAllPlans([...afterAllPlans]);
  };
  // 改变用药时间
  const changeTime = (value: number, idx: number, pIndex: number) => {
    const filterEmptyTime = afterAllPlans[idx].plans.filter((item) => !!item.range);
    const takeTime = filterEmptyTime.map((item) => moment(item.range?.start).format('HH:mm'));
    const format = (t: any) => +t.split(':').join('');
    const valueNumber = [value].map(format)[0];
    const timeNumberArray = takeTime.map(format);
    // 过滤掉它自己，和除它本身之外的值依次作比较
    const filterArray = timeNumberArray.filter(
      (item, index) => { console.log(item); return index !== pIndex; },
    );
    const isGreatThreeHour = filterArray.every((t) => {
      const absTime = Math.abs(t - valueNumber);
      console.log('timeNumberArrayabs', absTime);
      return absTime >= 300 && absTime <= 2100;
    });
    if (isGreatThreeHour) {
      afterAllPlans[idx].plans[pIndex].range = {
        // start: 1600383600000,
        start: +new Date(`${day} ${value}`),
        end: +new Date(`${day} ${value}`) + 1800000,
      };
      const plansId = afterAllPlans[idx].plans[pIndex].planId;
      const result = verifyTimeAction(idx, pIndex, +new Date(`${day} ${value}`), plansId, plansAction, afterAllPlans);
      updateAllPlans([...afterAllPlans], [...result]);
    } else {
      message.warning('服药时间间隔3小时及以上！');
    }
  };
  // 改变剂量
  const changeInteger = (value: number, idx: number, pIndex: number, currPointer: number) => {
    const pointer = currPointer || 0;
    afterAllPlans[idx].plans[pIndex].count = Number(`${value + 0}.${pointer}`) * 1000;
    const plansId = afterAllPlans[idx].plans[pIndex].planId;
    const result = verifyCountAction(idx, pIndex, Number(`${value + 0}.${pointer}`), plansId, plansAction, afterAllPlans);
    updateAllPlans([...afterAllPlans], [...result]);
  };
  const changePointer = (value: number, idx: number, pIndex: number, currInteger: number) => {
    const integer = currInteger || 0;
    afterAllPlans[idx].plans[pIndex].count = Number(`${integer + 0}.${value}`) * 1000;
    const plansId = afterAllPlans[idx].plans[pIndex].planId;
    const result = verifyCountAction(idx, pIndex, Number(`${integer + 0}.${value}`), plansId, plansAction, afterAllPlans);
    updateAllPlans([...afterAllPlans], [...result]);
  };
  const propsVal = {
    afterAllPlans,
    alfterPlansAction,
    updateAllPlans,
    updateDelPlans,
    updateStrengthInfo,
  };
  const boxCellNos = plansItem.plans[0].boxCellNos[0];
  return (
    <>
      <RadioGroup
        onChange={(e) => changeCycleDays(e, plansIndex)}
        style={{ textAlign: 'left' }}
        value={plansItem.plans[0].cycleDays[0]}
        className={styles.cycle_days}
        disabled={!!boxCellNos}
      >
        <Radio value={1}>每天</Radio>
        <Radio value={2}>隔天</Radio>
      </RadioGroup>
      <div className={styles.code}>{boxCellNos ? `${boxCellNos}号仓` : '仓外'}</div>
      <MedicineManual
        medicineId={plansItem.medicine.medicineId}
      >
        <img src={medicineManual} alt="药品说明书" />
      </MedicineManual>
      <ul className={styles.list_item}>
        {plansItem.plans.map((plan, pIndex) => {
          const index = pIndex;
          const dosage = plansItem.medicine.dosage / 1000;
          const currInteger = plan.count ? parseInt(plan.count / 1000, 10) : undefined;
          // eslint-disable-next-line no-nested-ternary
          const currPointer = plan.count % 1000 ? Number(String((plan.count / 1000).toFixed(2)).split('.')[1]) : undefined;
          return (
            plan?.status !== 'DELETE' && (
            <li key={`${plansItem.medicine.medicineId}${index}`}>
              <div className={styles.adjust__time}>
                <Select
                  value={plan.range ? moment(plan.range.start).format('HH:mm') : ''}
                  style={{ width: 140 }}
                  dropdownClassName="adjust__time"
                  placeholder="请选择服药时间"
                  onChange={(value: number) => {
                    changeTime(value, plansIndex, pIndex);
                  }}
                  disabled={!allPlans[plansIndex].medicine.medicineId || !!boxCellNos}
                >
                  {timeArray.map((tItem) => (
                    <OptGroup
                      key={tItem}
                      label={
                        <h3 className="group__label">
                          <span>{times[`${tItem}Text`]}</span>
                        </h3>
                      }
                    >
                      {times[tItem].map((time: string) => (
                        <Option key={time} value={`${time}`} title={`${time}`}>
                          {time}
                        </Option>
                      ))}
                    </OptGroup>
                  ))}
                </Select>
              </div>
              <div className={styles.count}>
                <InputNumber
                  min={0}
                  style={{ width: 60 }}
                  value={currInteger}
                  onChange={(value) => changeInteger(value, plansIndex, pIndex, currPointer)}
                  disabled={!allPlans[plansIndex].medicine.medicineId || !!boxCellNos}
                />
                <span className={styles.point}>.</span>
                <InputNumber
                  min={0}
                  max={75}
                  step={25}
                  style={{ width: 60 }}
                  value={currPointer}
                  onChange={(value) => changePointer(value, plansIndex, pIndex, currInteger)}
                  disabled={!allPlans[plansIndex].medicine.medicineId || !!boxCellNos}
                />
                <span>{plansItem.medicine.dosageFormUnit}</span>
              </div>
                {dosage && plan.count ? (
                  <div className={styles.total}>
                    {Math.round((plan.count / 1000) * dosage * 100) / 100}
                    {unitFlagRe[plansItem.medicine.dosageUnitFlag]}
                  </div>) : '/'}
              <div className={`${styles.icons} ${boxCellNos ? styles.hidden : ''}`}>
                {pIndex === 0 && <PlusOutlined onClick={() => addPlans(plansIndex)} />}
                <DelPlans
                  {...propsVal}
                  plansIndex={plansIndex}
                  pIndex={pIndex}
                />
              </div>

            </li>)
          );
        })}
      </ul>
    </>
  );
}

export default MedicinePlans;
