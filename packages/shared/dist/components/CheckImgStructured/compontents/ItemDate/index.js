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
import React, { useState } from 'react';
// import Calendar from '@/components/Calendar';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import moment from 'moment';
import './index.css';
function ItemDate(props) {
    var initReportTime = props.initReportTime, isUnknownTime = props.isUnknownTime, type = props.type, style = props.style, label = props.label;
    console.log('initReportTime', initReportTime, type);
    var _a = __read(useState(isUnknownTime), 2), unknownTime = _a[0], setUnknownTime = _a[1];
    var year = '';
    var month = '';
    var day = '';
    // 回显
    if (initReportTime) {
        year = dayjs(initReportTime).format('YYYY');
        month = dayjs(initReportTime).format('MM');
        day = dayjs(initReportTime).format('DD');
    }
    // 点击时间不详
    var handleTimeUnkown = function () {
        setUnknownTime(!unknownTime);
    };
    var dateFormat = 'YYYY/MM/DD';
    var disabledDate = function (current) { return current && current > moment().endOf('day'); };
    return (React.createElement("div", { className: "flex justify-end" },
        // 编辑时  ||  查看时且时间不详为false
        (!unknownTime) && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "text-sm ml-17 font-medium w-70 text-right", style: { lineHeight: '32px' } },
                label || '采样时间',
                "\uFF1A"),
            React.createElement(DatePicker, { disabledDate: disabledDate, defaultValue: initReportTime ? moment(year + "/" + month + "/" + day, dateFormat) : null, format: dateFormat, size: "large", disabled: unknownTime, allowClear: false, style: style }))),
        // 编辑时  ||  查看时且时间不详为true
        (unknownTime) && (React.createElement("div", { className: "ml-10 date_button " + (unknownTime ? 'selected' : ''), onClick: handleTimeUnkown }, "\u65F6\u95F4\u4E0D\u8BE6"))));
}
export default ItemDate;
