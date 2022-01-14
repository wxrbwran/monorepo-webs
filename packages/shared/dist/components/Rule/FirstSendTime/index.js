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
import { DatePicker, InputNumber, Select, TimePicker } from 'antd';
// import * as api from '@/services/api';
// import styles from './index.scss';
import './index.css';
import moment from 'moment';
import { isEmpty } from 'lodash';
var Option = Select.Option;
var FirstSendTime = function (_a) {
    var choiceModelChange = _a.choiceModelChange, popverContent = _a.popverContent, choiceModelSource = _a.choiceModelSource;
    var _b = __read(useState({ childItemType: 'select', choiceModel: choiceModelSource, description: 'first' }), 2), choiceModel = _b[0], setChoiceModel = _b[1];
    // const [contentList, setContentList] = useState<any[]>([]);
    var handleChangeType = function (val, currentItem) {
        var _a;
        currentItem.choiceModel = (_a = currentItem.childItem) === null || _a === void 0 ? void 0 : _a.filter(function (item) { return item.description == val; })[0];
        setChoiceModel(__assign({}, choiceModel));
    };
    useEffect(function () {
        if (choiceModelSource && !isEmpty(choiceModelSource)) {
            setChoiceModel(choiceModelSource);
        }
    }, [choiceModelSource]);
    var dateChange = function (_val, str, choiceItem) {
        if (choiceItem.childItemType == 'diy') {
            choiceItem.inputHM = str;
        }
        else if (choiceItem.childItemType == 'time') {
            choiceItem.inputTime = str;
        }
        setChoiceModel(__assign({}, choiceModel));
    };
    var dayChange = function (val, choiceItem) {
        if (choiceItem.childItemType == 'diy') {
            choiceItem.inputDay = val;
        }
        setChoiceModel(__assign({}, choiceModel));
    };
    var getReactEle = function (choiceItem) {
        var _a, _b;
        return ([
            React.createElement(React.Fragment, null, choiceItem.childReact ?
                choiceItem.childReact()
                : React.createElement("div", null)),
            React.createElement(React.Fragment, null, choiceItem.childItemType == 'select' &&
                React.createElement(Select, { className: 'mr-10', onChange: function (val) { handleChangeType(val, choiceItem); }, value: (_b = (_a = choiceItem === null || choiceItem === void 0 ? void 0 : choiceItem.choiceModel) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : '' }, (choiceItem === null || choiceItem === void 0 ? void 0 : choiceItem.childItem) &&
                    choiceItem.childItem.map(function (it) { return (React.createElement(Option, { value: it.description, key: it.description }, it.description)); }))),
            React.createElement(React.Fragment, null, choiceItem.childItemType == 'diy' &&
                [
                    React.createElement(React.Fragment, null,
                        React.createElement("div", { className: 'mr-10 diy' },
                            React.createElement(InputNumber, { addonBefore: '第', addonAfter: '天', style: { width: 120 }, min: 1, max: 9999, onChange: function (val) { dayChange(val, choiceItem); }, value: choiceItem.inputDay }))),
                    React.createElement(React.Fragment, null,
                        React.createElement("div", { className: 'hm' },
                            React.createElement(TimePicker, { className: 'mr-10', value: (choiceItem === null || choiceItem === void 0 ? void 0 : choiceItem.inputHM) ? moment(choiceItem.inputHM, 'HH:mm') : null, format: 'HH:mm', onChange: function (momentDate, dateString) { dateChange(momentDate, dateString, choiceItem); } }))),
                ]),
            React.createElement(React.Fragment, null, choiceItem.childItemType == 'time' &&
                React.createElement("div", { className: 'time' },
                    React.createElement(DatePicker, { showTime: { format: 'HH:mm' }, value: (choiceItem === null || choiceItem === void 0 ? void 0 : choiceItem.inputTime) ? moment(choiceItem.inputTime, 'YYYY-MM-DD HH:mm') : null, onChange: function (momentDate, dateString) { dateChange(momentDate, dateString, choiceItem); }, format: 'YYYY-MM-DD HH:mm' }))),
            React.createElement(React.Fragment, null, (choiceItem === null || choiceItem === void 0 ? void 0 : choiceItem.choiceModel) &&
                getReactEle(choiceItem.choiceModel)),
        ]);
    };
    useEffect(function () {
        choiceModelChange(choiceModel);
    }, [choiceModel]);
    console.log('================= choiceModel , ', JSON.stringify(choiceModel));
    return (React.createElement("div", { className: 'send' },
        React.createElement("h2", null,
            React.createElement("span", { className: 'start' }, "*"),
            "\u9996\u6B21\u53D1\u9001\u65F6\u95F4\uFF1A"),
        React.createElement("div", { className: 'shard_rule_first_send_time' },
            choiceModel &&
                getReactEle(choiceModel),
            popverContent)));
};
export default FirstSendTime;
