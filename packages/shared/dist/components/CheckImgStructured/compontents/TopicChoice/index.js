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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useState, useEffect, useMemo } from 'react';
import { Checkbox, Divider } from 'antd';
import { isEmpty, cloneDeep } from 'lodash';
import { searchHighLight } from '@/utils/utils';
import './index.css';
// saveAddQa
function TopicChoice(props) {
    console.log('choiceProps', props);
    var changeCallbackFns = props.changeCallbackFns, initData = props.initData, templateId = props.templateId, isShowEdit = props.isShowEdit, lightKeyWord = props.lightKeyWord;
    var _a = __read(useState([]), 2), questions = _a[0], setQuestions = _a[1];
    var _b = __read(useState([]), 2), valuableQas = _b[0], setValuableQas = _b[1];
    var handleSave = function (a) { return new Promise(function (resolve) {
        console.log(a);
        // resolve(fetchSubmitData(questions, 2));
        resolve({
            data: questions.filter(function (item) { return !!item.question.trim(); }),
            groupInx: 2,
        });
    }); };
    useEffect(function () {
        if (initData && isEmpty(questions)) {
            setQuestions(initData);
            var hasVal = initData.filter(function (qaItem) { return !isEmpty(qaItem.answer); });
            setValuableQas(hasVal);
        }
    }, [initData]);
    useEffect(function () {
        if (changeCallbackFns) {
            changeCallbackFns({
                type: 'RADIO_CHECKED',
                fn: function (a) { return handleSave(a); },
            });
        }
    }, [questions]);
    // 勾选操作---显示状态勾选
    var handleChangeOptions = function (checkedValue, item, quesInx) {
        if (item.question_type === 'RADIO') {
            var curSelect = checkedValue.filter(function (v) { return !questions[quesInx].answer.includes(v); });
            questions[quesInx].answer = isEmpty(checkedValue) ? [] : curSelect;
        }
        else {
            questions[quesInx].answer = checkedValue;
        }
        setQuestions(__spreadArray([], __read(questions)));
    };
    var handleDelQuestion = function (editIndex) {
        questions.splice(editIndex, 1);
        setQuestions(cloneDeep(questions));
    };
    var handleSaveQuestion = function (data, actionType, editIndex) {
        if (actionType === 'add') {
            setQuestions(__spreadArray(__spreadArray([], __read(questions)), [data]));
        }
        else if (actionType === 'edit' && editIndex !== undefined) {
            questions[editIndex] = data;
            setQuestions(cloneDeep(questions));
        }
    };
    var renderQuestion = useMemo(function () { return function (quesText) {
        return searchHighLight(quesText, lightKeyWord);
    }; }, [lightKeyWord]);
    console.log('最新questions---choice', questions);
    var editProps = {
        templateId: templateId,
        handleDelQuestion: handleDelQuestion,
        handleSaveQuestion: handleSaveQuestion,
        isShowEdit: isShowEdit,
        topicType: 'RADIO',
    };
    return (React.createElement("div", { className: 'choice' },
        React.createElement(Divider, { dashed: true }),
        React.createElement("div", { className: "qa-wrap relative" },
            React.createElement("div", { className: 'mask' }),
            (valuableQas).map(function (item, quesIndex) { return (React.createElement("div", { key: item.question, className: "relative " },
                React.createElement("div", { className: "topic_title" },
                    React.createElement("span", null,
                        quesIndex + 1,
                        ". "),
                    React.createElement("span", { className: "mr-10", dangerouslySetInnerHTML: { __html: renderQuestion(item.question) } })),
                React.createElement("div", null,
                    React.createElement(Checkbox.Group, { className: item.question_type, options: item.options, onChange: function (e) { return handleChangeOptions(e, item, quesIndex); }, value: item.answer })))); })),
        React.createElement(Divider, { dashed: true })));
}
export default TopicChoice;
