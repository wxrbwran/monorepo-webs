var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
// @ts-ignore
import events from '@/utils/events/eventEmitter';
import DatePicker from './DatePicker';
/* 注解
   日期显示优先级 needInit > value  > year month day
   1.如果有needInit为true则初始化为当前时间
   2.如果有value(初始时间是个时间戳)
   3.年月日分别传入
   理论来说三者不会交叉存在。根据不同情况，传其中一种即可
*/
function Calendar1(props) {
    console.log(events);
    var year = props.year, month = props.month, day = props.day, disabled = props.disabled, value = props.value, needInit = props.needInit, onChange = props.onChange;
    var _a = __read(useState(year || ''), 2), yearVal = _a[0], setYearVal = _a[1];
    var _b = __read(useState(month || ''), 2), monthVal = _b[0], setMonthVal = _b[1];
    var _c = __read(useState(day || ''), 2), dayVal = _c[0], setDayVal = _c[1];
    var curDate = new Date();
    useEffect(function () {
        if (value) {
            console.log(55555555);
            setYearVal(dayjs(value).year());
            setMonthVal(dayjs(value).month() + 1);
            setDayVal(dayjs(value).date());
        }
        if (needInit) {
            // 初始化时间为当前年月日
            var curYear = curDate.getFullYear();
            var curMonth = curDate.getMonth() + 1;
            var curDay = curDate.getDate();
            setYearVal(curYear);
            setMonthVal(curMonth);
            setDayVal(curDay);
            var dateString = curYear + "/" + curMonth + "/" + curDay;
            onChange(dateString);
        }
    }, []);
    var handleChangeDate = function (y, m, d) {
        var dateString = y + "/" + m + "/" + d;
        onChange(dateString);
    };
    var endYear = curDate.getFullYear();
    var yearList = [endYear, 1929];
    return (React.createElement(DatePicker, { yearV: yearVal, monthV: monthVal, dayV: dayVal, yearListV: yearList, disabled: !!disabled, callback: handleChangeDate }));
}
export default Calendar1;
