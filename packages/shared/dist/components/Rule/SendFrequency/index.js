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
import React, { useEffect, useState } from 'react';
import { Button, InputNumber, Select, TimePicker } from 'antd';
// import * as api from '@/services/api';
import './index.css';
import { sendType } from '../util';
import moment from 'moment';
import { cloneDeep } from 'lodash';
var Option = Select.Option;
var SendFrequency = function (_a) {
    var onFrequencyChange = _a.onFrequencyChange, initFrequency = _a.initFrequency;
    var _b = __read(useState(initFrequency), 2), frequency = _b[0], setFrequency = _b[1]; //发送频率
    useEffect(function () {
        setFrequency(initFrequency);
    }, [initFrequency]);
    useEffect(function () {
        onFrequencyChange(frequency);
    }, [frequency]);
    //改变发送频率类型
    var handleGetType = function (value) {
        frequency.frequency = value;
        frequency.custom = [{ day: '', time: '', content: [] }];
        setFrequency(cloneDeep(frequency));
    };
    //添加发送频率
    var handleAddDayEdit = function () {
        frequency.custom.push({ day: '', time: '', content: [] });
        setFrequency(cloneDeep(frequency));
    };
    //修改发送频率
    var handleChangeCustomCycleDay = function (e, index) {
        console.log('============== e e', JSON.stringify(e));
        console.log('============== frequency', JSON.stringify(frequency));
        frequency.custom[index].day = e;
        setFrequency(cloneDeep(frequency));
    };
    //删除自定义发送频率
    var handleDeleteDay = function (index) {
        frequency.custom.splice(index, 1);
        setFrequency(cloneDeep(frequency));
    };
    //循环下发天数
    var handleChangeCycleDay = function (day) {
        frequency.custom = [{ day: day, time: '', content: [] }];
        setFrequency(cloneDeep(frequency));
    };
    var dateChange = function (_val, str, index) {
        frequency.custom[index].time = str;
        setFrequency(cloneDeep(frequency));
    };
    // const onContentListAdd = (choices: IList[], frequencyIndex: number) => {
    //   console.log('============ frequency.custom ', !frequency.custom[frequencyIndex].contents);
    //   if (!frequency.custom[frequencyIndex].contents) {
    //     frequency.custom[frequencyIndex].contents = [];
    //   }
    //   frequency.custom[frequencyIndex].contents.push(...choices);
    //   console.log('============ frequency.custom ', JSON.stringify(frequency.custom[frequencyIndex].contents));
    //   setFrequency(cloneDeep(frequency));
    // };
    // const onContentsRemoveSuccess = (_item: any, _index: number, list: any[], frequencyIndex: number) => {
    //   console.log('================= onRemoveSuccess choicesSid', JSON.stringify(list));
    //   frequency.custom[frequencyIndex].contents = list;
    //   setFrequency(cloneDeep(frequency));
    // };
    return (React.createElement("div", { className: 'shard_rule_send_frequency' },
        React.createElement("h2", null,
            React.createElement("span", { className: 'start' }),
            "\u53D1\u9001\u9891\u7387\uFF1A"),
        React.createElement("div", { className: 'send_type' },
            React.createElement(Select, { style: { width: 180 }, onChange: handleGetType, value: frequency.frequency }, sendType.map(function (item) { return (React.createElement(Option, { value: item.key, key: item.key }, item.value)); })),
            frequency.frequency === 'CUSTOM' && (React.createElement("div", { className: 'self' },
                "\u9996\u6B21\u53D1\u9001\u7ED9\u60A3\u8005\u540E",
                React.createElement("div", { className: 'self_content' }, frequency.custom.map(function (item, index) {
                    var _a;
                    return (React.createElement("div", { className: 'add_item', key: index },
                        React.createElement("div", { className: 'add_item_left' },
                            React.createElement(InputNumber, { addonBefore: '第', addonAfter: '天', style: { width: 120 }, min: 1, max: 9999, value: (_a = item.day) !== null && _a !== void 0 ? _a : null, onChange: function (e) { return handleChangeCustomCycleDay(e, index); } })),
                        React.createElement("div", { className: 'ml-10 mr-10 time' },
                            React.createElement(TimePicker, { value: item.time ? moment(item.time, 'HH:mm') : null, format: 'HH:mm', onChange: function (momentDate, dateString) {
                                    dateChange(momentDate, dateString, index);
                                } })),
                        "\u53D1\u9001\u4E00\u6B21",
                        React.createElement("div", { className: "ml-10" }, index === 0 ? (React.createElement(Button, { className: 'addBtn', size: "large", onClick: handleAddDayEdit }, "\u6DFB\u52A0")) : (React.createElement(Button, { className: 'deleteBtn', size: "large", type: "default", onClick: function () { return handleDeleteDay(index); } }, "\u5220\u9664")))));
                })))),
            frequency.frequency === 'LOOP' && (React.createElement("div", { className: 'cycle' },
                React.createElement("div", { className: "mr-10 ml-10" }, "\u9996\u6B21\u53D1\u9001\u7ED9\u60A3\u8005\u540E"),
                React.createElement(InputNumber, { addonBefore: '每', addonAfter: '天', style: { width: 120 }, min: 1, max: 9999, value: frequency.custom[0].day, onChange: handleChangeCycleDay }),
                React.createElement("div", { className: 'ml-10 mr-10 time' },
                    React.createElement(TimePicker, { value: frequency.custom[0].time ? moment(frequency.custom[0].time, 'HH:mm') : null, format: 'HH:mm', onChange: function (momentDate, dateString) {
                            dateChange(momentDate, dateString, 0);
                        } })),
                "\u53D1\u9001\u4E00\u6B21")))));
};
SendFrequency.defaultProps = {
    initFrequency: {
        frequency: 'CUSTOM',
        custom: [''],
    },
};
export default SendFrequency;
