import React, { useState, useEffect } from 'react';
import { Select, message } from 'antd';

const { Option } = Select;
interface Iprops {
  yearV: string | number | undefined,
  monthV: string | number | undefined,
  dayV: string | number | undefined,
  disabled: boolean,
  yearListV: number[],
  callback: (value: any, month:any, day:any) => void,
}
function DatePicker(props: Iprops) {
  const {
    yearV, monthV, dayV, disabled, yearListV,
  } = props;
  const yearList = yearListV || [2000, 2020];
  const [year, setYear] = useState(yearV);
  const [month, setMonth] = useState(monthV);
  const [day, setDay] = useState(dayV);
  const [dayList, setDayList] = useState(31);
  const [daysMonth, setDaysMonth] = useState([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth() + 1;
  const curDay = new Date().getDate();
  useEffect(() => {
    setYear(yearV);
    setMonth(monthV);
    setDay(dayV);
  }, [yearV, monthV, dayV]);
  const handelChangeVerify = (name: string, value: any) => {
    const currentTime = new Date().getTime();
    let changeFlag = true;
    let changeTime = 0;
    if (name === 'year') {
      changeTime = new Date(`${Number(value)}/${month}/${day} 00:00:00`).getTime();
    }
    if (name === 'month') {
      changeTime = new Date(`${year}/${Number(value)}/${day} 00:00:00`).getTime();
    }
    if (name === 'day') {
      changeTime = new Date(`${year}/${month}/${Number(value)} 00:00:00`).getTime();
    }
    if (changeTime > currentTime) {
      changeFlag = false;
    }
    return changeFlag;
  };
  const handelChangeYear = (name: string, value: any) => {
    if (handelChangeVerify(name, value)) {
      const yearVal = value;
      const monthIndex = Number(month) - 1;
      // ????????????
      if ((yearVal % 4 === 0 && yearVal % 100 !== 0) || yearVal % 400 === 0) {
        daysMonth[1] = 29;
        setDaysMonth(daysMonth);
      }
      // ????????????
      const dayListVal = daysMonth[monthIndex];
      setYear(value);
      setDayList(dayListVal);
      props.callback(value, month, day);
      if (month === 2 && day > 28) {
        setDay(28);
      }
    } else {
      props.callback(null, month, day);
      setYear(null);
      message.error('请选择正确的日期');
    }
  };

  const handelChangeMonth = (name: string, value: any) => {
    if (handelChangeVerify(name, value)) {
      const monthIndex = value - 1;
      if ((Number(year) % 4 === 0 && (Number(year)) % 100 !== 0) || Number(year) % 400 === 0) {
        daysMonth[1] = 29;
        setDaysMonth(daysMonth);
      }
      const dayListVal = daysMonth[monthIndex];
      setMonth(value);
      setDayList(dayListVal);

      props.callback(year, value, day);

      if (value === 2 && day > 28) {
        setTimeout(() => {
          setDay(daysMonth[1]);
        });
      }

      if (day > 30 && ([4, 6, 9, 11].includes(value))) {
        setDay(30);
      }
    } else {
      props.callback(year, null, day);
      setMonth(null);
      message.error('请选择正确的日期');
    }
  };

  const handelChangeDay = (name: string, value: any) => {
    if (handelChangeVerify(name, value)) {
      setDay(value);
      props.callback(year, month, value);
    } else {
      props.callback(year, month, null);
      setYear(null);
      setMonth(null);
      setDay(null);
      message.error('请选择正确的日期');
    }
  };

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const list = [];
  const listYear = [];
  // @ts-ignore
  for (let j = yearList[0]; j > yearList[1]; j--) {
    listYear.push(j);
  }
  for (let i = 1; i <= dayList; i++) {
    list.push(i);
  }
  const style = { style: { width: 100, textAlign: 'center', marginRight: '5px' } };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }} className="calendar">
      <div>
        <Select
          name="year"
          disabled={disabled}
          value={year}
          onChange={(value) => handelChangeYear('year', value)}
          className="year"
          placeholder="请选择"
          {...style}
        >
          {
            listYear.map((item) => (
              <Option
                key={item}
                title={`${item}`}
                value={`${item}`}
              >
                {item}
              </Option>
            ))
          }
        </Select>
        年
      </div>
      <div>
        <Select
          name="month"
          disabled={disabled}
          value={month}
          onChange={(value) => handelChangeMonth('month', value)}
          className="month"
          placeholder="请选择"
          {...style}
        >
          {months.map((m) => (
            <Option
              key={m}
              title={`${m}`}
              value={`${m}`}
              disabled={Number(year) >= curYear && m > curMonth}
            >
              {m}
            </Option>
          ))}
        </Select>
        月
      </div>
      <div>
        <Select
          name="day"
          disabled={disabled}
          value={day}
          onChange={(value) => handelChangeDay('day', value)}
          className="day"
          placeholder="请选择"
          {...style}
        >
          {
            list.map((d) => (
              <Option
                key={d}
                title={`${d}`}
                value={`${d}`}
                disabled={Number(year) >= curYear && Number(month) >= curMonth && d > curDay}
              >
                {d}
              </Option>
            ))
          }
        </Select>
        日
      </div>
    </div>
  );
}
export default DatePicker;
