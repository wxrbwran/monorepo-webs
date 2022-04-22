import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
// @ts-ignore
import events from 'xzl-web-shared/dist/utils/events/eventEmitter';
import DatePicker from './DatePicker';

interface Iprops {
  year?: string | number,
  month?: string | number,
  day?: string | number,
  onChange: (dateString: string) => void, // 返回时间为时间戳格式
  disabled?: boolean,
  needInit?: boolean,
  value?: any,
}
/* 注解
   日期显示优先级 needInit > value  > year month day
   1.如果有needInit为true则初始化为当前时间
   2.如果有value(初始时间是个时间戳)
   3.年月日分别传入
   理论来说三者不会交叉存在。根据不同情况，传其中一种即可
*/

function Calendar1(props: Iprops) {
  console.log(events);
  const {
    year, month, day, disabled, value, needInit, onChange,
  } = props;
  const [yearVal, setYearVal] = useState(year || '');
  const [monthVal, setMonthVal] = useState(month || '');
  const [dayVal, setDayVal] = useState(day || '');
  const curDate = new Date();
  useEffect(() => {
    if (value) {
      console.log(55555555);
      setYearVal(dayjs(value).year());
      setMonthVal(dayjs(value).month() + 1);
      setDayVal(dayjs(value).date());
    }
    if (needInit) {
      // 初始化时间为当前年月日
      const curYear = curDate.getFullYear();
      const curMonth = curDate.getMonth() + 1;
      const curDay = curDate.getDate();
      setYearVal(curYear);
      setMonthVal(curMonth);
      setDayVal(curDay);
      const dateString = `${curYear}/${curMonth}/${curDay}`;
      onChange(dateString);
    }
  }, []);
  const handleChangeDate = (y: number, m: number, d: number) => {
    const dateString = `${y}/${m}/${d}`;
    onChange(dateString);
  };
  const endYear = curDate.getFullYear();
  const yearList = [endYear, 1929];
  return (
    <DatePicker
      yearV={yearVal}
      monthV={monthVal}
      dayV={dayVal}
      yearListV={yearList}
      disabled={!!disabled}
      callback={handleChangeDate}
    />
  );
}
export default Calendar1;
