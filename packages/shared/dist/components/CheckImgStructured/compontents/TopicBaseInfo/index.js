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
import React, { useEffect, useState, useRef } from 'react';
import ItemDate from '../ItemDate';
import { Form, Input, Row, Col, message } from 'antd';
import { baseField } from '../utils';
import './index.css';
var TopicBaseInfo = function (props) {
    var initData = props.initData, changeCallbackFns = props.changeCallbackFns;
    var _a = __read(Form.useForm(), 1), form = _a[0];
    var validateFields = form.validateFields, setFieldsValue = form.setFieldsValue;
    var timeRef = useRef(null); // 存一下日期上的时间，当点击时间不详时，存起来，取消时间不详时，恢复此值到measure_at
    var fetchInit = function () {
        var initObj = { measured_at: new Date().getTime() };
        initData.forEach(function (item) {
            var ans = item.answer[0];
            switch (item.question) {
                case '检查机构':
                    initObj.orgName = ans;
                    break;
                case '时间':
                    timeRef.current = !!ans ? Number(ans) : new Date().getTime();
                    initObj.measured_at = ans === null ? null : Number(ans);
                    break;
                default:
                    break;
            }
        });
        return initObj;
    };
    var _b = __read(useState(fetchInit()), 2), initialValues = _b[0], setInitVals = _b[1];
    var handleSave = function () { return new Promise(function (resolve, reject) {
        validateFields().then(function (values) {
            console.log('基本信息', values);
            var questions = [];
            Object.keys(values).forEach(function (item) {
                questions.push({
                    question: baseField[item].text,
                    answer: !!values[item] ? [values[item]] : [],
                    question_type: 'BASIC',
                    group: "0-" + baseField[item].inx,
                    sid: localStorage.getItem('xzl-web-doctor_sid'),
                });
            });
            resolve({
                data: questions,
                groupInx: 0,
            });
            console.log('questions', questions);
        }).catch(function (err) {
            console.log('基本信息err', err);
            message.error({
                content: '请输入检查部位和检查方法',
                maxCount: 1,
            });
            message.config({
                maxCount: 1,
            });
            reject(err);
        });
    }); };
    useEffect(function () {
        setInitVals(fetchInit());
    }, [initData]);
    useEffect(function () {
        if (changeCallbackFns) {
            changeCallbackFns({
                type: 'BASIC',
                fn: handleSave,
            });
        }
    }, []);
    var handleChangeTime = function (time) {
        setFieldsValue({ measured_at: time });
        timeRef.current = time;
    };
    var handleChangeUnKonwTime = function (isUnKonw) {
        console.log('isUnKonw', isUnKonw);
        setFieldsValue({ measured_at: isUnKonw ? null : timeRef.current });
    };
    console.log('initialValues', initialValues);
    return (React.createElement("div", { className: 'topic_base structured-edit-wrap' },
        React.createElement(Form, { name: "topicBaseInfo", form: form, initialValues: initialValues },
            React.createElement(Row, null, React.createElement(Col, { span: 13 },
                React.createElement(Form.Item, { name: "measured_at", noStyle: true },
                    React.createElement(Input, { type: "hidden" })),
                React.createElement(ItemDate
                // 如果是回显，就直接取回显的时间，没有就设置当前时间
                , { 
                    // 如果是回显，就直接取回显的时间，没有就设置当前时间
                    initReportTime: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.measured_at) || new Date().getTime(), setReporttime: function (time) { return handleChangeTime(time); }, setUnknow: handleChangeUnKonwTime, isUnknownTime: !(initialValues === null || initialValues === void 0 ? void 0 : initialValues.measured_at), style: { width: 'calc(100% - 168px)' }, label: "\u68C0\u67E5\u65F6\u95F4" }))))));
};
export default TopicBaseInfo;
