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
import { Input } from 'antd';
import { isEmpty, cloneDeep } from 'lodash';
// import TopicAddBtn from '../TopicAddBtn';
import { searchHighLight } from '@/utils/utils';
var TextArea = Input.TextArea;
function TopicProblem(props) {
    var changeCallbackFns = props.changeCallbackFns, initData = props.initData, templateId = props.templateId, isShowEdit = props.isShowEdit, lightKeyWord = props.lightKeyWord;
    console.log('initDatatext', initData);
    var _a = __read(useState([]), 2), questions = _a[0], setQuestions = _a[1];
    var _b = __read(useState([]), 2), valuableQas = _b[0], setValuableQas = _b[1];
    var handleSave = function () { return new Promise(function (resolve) {
        resolve({
            data: questions.filter(function (item) { return !!item.question.trim(); }),
            groupInx: 3,
        });
    }); };
    useEffect(function () {
        if (initData && isEmpty(questions)) {
            setQuestions(initData);
            setValuableQas(initData.filter(function (qaItem) { return !isEmpty(qaItem.answer); }));
        }
    }, [initData]);
    useEffect(function () {
        if (changeCallbackFns) {
            changeCallbackFns({
                type: 'TEXT',
                fn: handleSave,
            });
        }
    }, [questions]);
    var handleSaveAnswer = function (ev, quesIndex) {
        ev.stopPropagation();
        questions[quesIndex].answer = [ev.target.value];
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
    var editProps = {
        templateId: templateId,
        isShowEdit: isShowEdit,
        handleDelQuestion: handleDelQuestion,
        handleSaveQuestion: handleSaveQuestion,
        topicType: 'TEXT',
    };
    console.log('最新question text', questions);
    console.log('valuableQas text', valuableQas);
    return (React.createElement("div", null, (valuableQas).map(function (item, quesIndex) {
        var _a;
        return (React.createElement("div", { className: "mb-15", key: item.question, onClick: function (e) { return e.stopPropagation(); } },
            React.createElement("div", { className: "topic_title" },
                React.createElement("span", null,
                    quesIndex + 1,
                    ". "),
                React.createElement("span", { className: "mr-10", dangerouslySetInnerHTML: { __html: renderQuestion(item.question) } })),
            React.createElement("div", { className: "answer-wrap" }, React.createElement("span", null, (_a = item.answer) === null || _a === void 0 ? void 0 : _a[0]))));
    })));
}
export default TopicProblem;
