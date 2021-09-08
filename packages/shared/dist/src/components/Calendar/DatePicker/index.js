var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { Select, message } from 'antd';
var Option = Select.Option;
function DatePicker(props) {
    var yearV = props.yearV, monthV = props.monthV, dayV = props.dayV, disabled = props.disabled, yearListV = props.yearListV;
    var yearList = yearListV || [2000, 2020];
    var _a = __read(useState(yearV), 2), year = _a[0], setYear = _a[1];
    var _b = __read(useState(monthV), 2), month = _b[0], setMonth = _b[1];
    var _c = __read(useState(dayV), 2), day = _c[0], setDay = _c[1];
    var _d = __read(useState(31), 2), dayList = _d[0], setDayList = _d[1];
    var _e = __read(useState([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]), 2), daysMonth = _e[0], setDaysMonth = _e[1];
    useEffect(function () {
        setYear(yearV);
        setMonth(monthV);
        setDay(dayV);
    }, [yearV, monthV, dayV]);
    var handelChangeVerify = function (name, value) {
        var currentTime = new Date().getTime();
        var changeFlag = true;
        var changeTime = 0;
        if (name === 'year') {
            changeTime = new Date(Number(value) + "/" + month + "/" + day + " 00:00:00").getTime();
        }
        if (name === 'month') {
            changeTime = new Date(year + "/" + Number(value) + "/" + day + " 00:00:00").getTime();
        }
        if (name === 'day') {
            changeTime = new Date(year + "/" + month + "/" + Number(value) + " 00:00:00").getTime();
        }
        if (changeTime > currentTime) {
            changeFlag = false;
        }
        return changeFlag;
    };
    var handelChangeYear = function (name, value) {
        if (handelChangeVerify(name, value)) {
            var yearVal = value;
            var monthIndex = Number(month) - 1;
            // ????????????
            if ((yearVal % 4 === 0 && yearVal % 100 !== 0) || yearVal % 400 === 0) {
                daysMonth[1] = 29;
                setDaysMonth(daysMonth);
            }
            // ????????????
            var dayListVal = daysMonth[monthIndex];
            setYear(value);
            setDayList(dayListVal);
            props.callback(value, month, day);
            if (month === 2 && day > 28) {
                setDay(28);
            }
        }
        else {
            message.error('请选择正确的日期');
        }
    };
    var handelChangeMonth = function (name, value) {
        if (handelChangeVerify(name, value)) {
            var monthIndex = value - 1;
            if ((Number(year) % 4 === 0 && (Number(year)) % 100 !== 0) || Number(year) % 400 === 0) {
                daysMonth[1] = 29;
                setDaysMonth(daysMonth);
            }
            var dayListVal = daysMonth[monthIndex];
            setMonth(value);
            setDayList(dayListVal);
            props.callback(year, value, day);
            if (value === 2 && day > 28) {
                setTimeout(function () {
                    setDay(daysMonth[1]);
                });
            }
            if (day > 30 && ([4, 6, 9, 11].includes(value))) {
                setDay(30);
            }
        }
        else {
            message.error('请选择正确的日期');
        }
    };
    var handelChangeDay = function (name, value) {
        if (handelChangeVerify(name, value)) {
            setDay(value);
            props.callback(year, month, value);
        }
        else {
            message.error('请选择正确的日期');
        }
    };
    var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var list = [];
    var listYear = [];
    // @ts-ignore
    for (var j = yearList[0]; j > yearList[1]; j--) {
        listYear.push(j);
    }
    for (var i = 1; i <= dayList; i++) {
        list.push(i);
    }
    var style = { style: { width: 100, textAlign: 'center', marginRight: '5px' } };
    return (React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between' }, className: "calendar" },
        React.createElement("div", null,
            React.createElement(Select, __assign({ name: "year", disabled: disabled, value: "" + year, onChange: function (value) { return handelChangeYear('year', value); }, className: "year" }, style), listYear.map(function (item) { return (React.createElement(Option, { key: item, title: "" + item, value: "" + item }, item)); })),
            "\u5E74"),
        React.createElement("div", null,
            React.createElement(Select, __assign({ name: "month", disabled: disabled, value: month, onChange: function (value) { return handelChangeMonth('month', value); }, className: "month" }, style), months.map(function (m) { return (React.createElement(Option, { key: m, title: "" + m, value: "" + m }, m)); })),
            "\u6708"),
        React.createElement("div", null,
            React.createElement(Select, __assign({ name: "day", disabled: disabled, value: day, onChange: function (value) { return handelChangeDay('day', value); }, className: "day" }, style), list.map(function (d) { return (React.createElement(Option, { key: d, title: "" + d, value: "" + d }, d)); })),
            "\u65E5")));
}
export default DatePicker;
