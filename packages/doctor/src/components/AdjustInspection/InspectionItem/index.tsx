import React from 'react';
import { InputNumber } from 'antd';
import styles from '../index.scss';

interface Iprops {
  data: {
    name: string;
    customizedReferenceMax: number;
    customizedReferenceMin: number;
    spliceSymbol: string;
    unifiedReference: string;
    abbreviation: string;
  };
  handleChange: (abbreviation: string, type:string, val:number) => void;
}
function InspectionItem({ data, handleChange }: Iprops) {
  const changeVal = (e: React.FocusEvent<HTMLInputElement>, type: string) => {
    handleChange(data.abbreviation, type, Number(e.target.value));
  };
  let maxNumber = 10;
  let minNumber = 0;
  let step = 1;
  switch (data.abbreviation) {
    case 'BP': // 血压
      maxNumber = 220;
      minNumber = 40;
      break;
    case 'HEART-RATE': // 心率
      maxNumber = 399;
      minNumber = 20;
      break;
    case 'GLU_BEFORE_BREAKFAST': // 空腹血糖
      maxNumber = 30;
      minNumber = 1;
      step = 0.1;
      break;
    case 'UA': // 尿酸
      maxNumber = 1000;
      break;
    case 'TC': // 总胆固醇
    case 'TG': // 甘油三酯
    case 'LDL_C':
      maxNumber = 9999;
      minNumber = 0;
      step = 0.1;
      break;
    default:
      maxNumber = 9999;
      minNumber = 0;
  }
  const maxInput = (
    <InputNumber
      min={minNumber}
      max={maxNumber}
      defaultValue={data.customizedReferenceMax}
      onBlur={(e) => changeVal(e, 'customizedReferenceMax')}
      step={step}
    />
  );
  const minInput = (
    <InputNumber
      min={minNumber}
      max={maxNumber}
      defaultValue={data.customizedReferenceMin}
      onBlur={(e) => changeVal(e, 'customizedReferenceMin')}
      step={step}
    />
  );
  return (
    <li className={styles.item}>
      <div className={styles.item_name}>{data.name}</div>
      <div className={styles.item_standart}>
        {data.name === '血压' ? maxInput : minInput}
        <span className={styles.line}>
          {' '}
          {data.spliceSymbol}
          {' '}
        </span>
        {data.name === '血压' ? minInput : maxInput}
      </div>
      {/* <div className={styles.item_advice}>{data.unifiedReference}</div> */}
    </li>
  );
}

export default InspectionItem;
