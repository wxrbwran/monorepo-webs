import React, { useState, useEffect } from 'react';
import { InputNumber } from 'antd';

interface Iprops {
  months: number;
  disabled: boolean;
  // eslint-disable-next-line react/require-default-props
  onChange?: Function;
}
function DateInput({ months, disabled, onChange }:Iprops) {
  console.log('month', months);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);

  useEffect(() => {
    if (months) {
      setYear(~~(months / 12));
      setMonth(~~(months % 12));
    }
  }, []);

  const handleChangeDate = (type:string, val) => {
    let totalMonth = 0;
    switch (type) {
      case 'year':
        totalMonth = val * 12 + month;
        setYear(val);
        break;
      default:
      case 'month':
        totalMonth = year * 12 + val;
        setMonth(val > 12 ? 12 : val);
        break;
    }
    // if(type === 'month' && val){
    //   setMonth(12);
    // }else{
    //   setYear(val);
    // }
    if (onChange) onChange(totalMonth);
  };
  const inputStyle = {
    width: 100,
    verticalAlign: 'middle',
  };
  const inputProps = {
    min: 0,
    max: 99,
    step: 1,
    precision: 0,
  };
  return (
    <>
      <InputNumber
        disabled={disabled}
        value={year}
        onChange={(val) => handleChangeDate('year', val)}
        style={inputStyle}
        {...inputProps}
      />
      &nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;
      <InputNumber
        disabled={disabled}
        value={month}
        max={12}
        onChange={(val) => handleChangeDate('month', val)}
        style={inputStyle}
        {...inputProps}
      />
      <span className="month">&nbsp;&nbsp;月</span>
    </>
  );
}

export default DateInput;
