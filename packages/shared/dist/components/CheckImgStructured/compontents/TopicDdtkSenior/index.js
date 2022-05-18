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
import './index.css';
import { isEmpty, cloneDeep } from 'lodash';
// import TopicAddBtn from '../TopicAddBtn';
import { formatTempDdtk } from '../utils';
import { searchHighLight } from '@/utils/utils';
import { Select } from 'antd';
import moment from 'moment';
var Option = Select.Option;
function DdtkSenior(props) {
    console.log('ddtkprops', props);
    var changeCallbackFns = props.changeCallbackFns, initData = props.initData, templateId = props.templateId, isShowEdit = props.isShowEdit, lightKeyWord = props.lightKeyWord;
    var _a = __read(useState([]), 2), qasGroups = _a[0], setQasGroups = _a[1];
    var _b = __read(useState([]), 2), valuableQas = _b[0], setValuableQas = _b[1];
    var handleSave = function () { return new Promise(function (resolve) {
        // resolve(fetchSubmitDataDdtk(questions, 1));
        resolve({
            data: qasGroups,
            groupInx: 1,
        });
    }); };
    useEffect(function () {
        if (initData) {
            var qaGroups = formatTempDdtk(initData);
            setQasGroups(cloneDeep(qaGroups));
            console.log('qaGroupsqaGroups', qaGroups);
            // 过滤出有填写答案的问题组
            var hasValWt = qaGroups.filter(function (qas) { return qas.find(function (qa) { return !isEmpty(qa.answer); }); });
            // 问题组中，多个问答，过滤掉没答案的item
            var qas_1 = [];
            hasValWt.map(function (item) {
                qas_1.push(item.filter(function (qa, inx) { return !isEmpty(qa.answer) || inx === 0; }));
            });
            console.log('=======qas', qas_1);
            setValuableQas(cloneDeep(qas_1));
        }
    }, [initData]);
    useEffect(function () {
        if (changeCallbackFns) {
            changeCallbackFns({
                type: 'COMPLETION_SENIOR',
                fn: handleSave,
            });
        }
    }, [qasGroups]);
    // 保存题（编辑问题或者添加）
    var handleSaveQuestion = function (data, actionType, editIndex) {
        console.log('save内容', data);
        console.log('edit add', actionType);
        console.log('如果是编辑，当前编辑项', editIndex);
        if (actionType === 'add') {
            setQasGroups(__spreadArray(__spreadArray([], __read(qasGroups)), [__spreadArray([], __read(data))]));
        }
        else if (actionType === 'edit' && editIndex !== undefined) {
            qasGroups[editIndex] = __spreadArray([], __read(data));
            setQasGroups(cloneDeep(qasGroups));
        }
    };
    // 删除整道题
    var handleDelQuestion = function (editIndex) {
        qasGroups.splice(editIndex, 1);
        setQasGroups(cloneDeep(qasGroups));
    };
    var handleChangeAnswer = function (e, groupInx, qaInx, type) {
        console.log('val111', e);
        var val = e;
        if (type === 'INLINE_DATE') {
            val = [moment(e).valueOf()];
        }
        else if (type === 'INLINE_RADIO') {
            val = [e];
        }
        else if (type === 'INLINE_COMPLETION') {
            val = [e.target.innerText];
        }
        console.log('val', val);
        qasGroups[groupInx][qaInx].answer = val;
    };
    var renderAnswerType = function (qaItem, quesIndex, qaInx) {
        var _a, _b;
        var t = qaItem.question_type;
        switch (t) {
            case 'INLINE_RADIO':
            case 'INLINE_CHECKBOX':
                return (qaItem.answer.map(function (ansItem, ansInx) { return React.createElement("span", { key: ansItem },
                    ansItem,
                    ansInx === qaItem.answer.length - 1 ? '' : '、'); }));
            case 'INLINE_DATE':
                return (React.createElement("span", null, moment(Number((_a = qaItem.answer) === null || _a === void 0 ? void 0 : _a[0])).format('YYYY-MM-DD')));
            default:
                return React.createElement("span", { className: 'edit_span no_border', contentEditable: false, suppressContentEditableWarning: true, onBlur: function (e) { return handleChangeAnswer(e, quesIndex, qaInx, t); } }, (_b = qaItem.answer) === null || _b === void 0 ? void 0 : _b[0]);
        }
    };
    var renderQuestion = useMemo(function () { return function (quesText) {
        return searchHighLight(quesText, lightKeyWord);
    }; }, [lightKeyWord]);
    console.log('------最新questionsddtk', qasGroups);
    console.log('valuableQas ddtk', valuableQas);
    var editProps = {
        templateId: templateId,
        handleDelQuestion: handleDelQuestion,
        handleSaveQuestion: handleSaveQuestion,
        isShowEdit: isShowEdit,
        topicType: 'COMPLETION_SENIOR',
    };
    return (React.createElement("div", { className: "mt-15" },
        React.createElement("div", { className: 'qa-wrap' }, (valuableQas).map(function (qas, quesIndex) { return (React.createElement("div", { className: "flex topic_title", style: { alignItems: 'flex-start' }, key: qas[0].question + qas[0].uuid },
            React.createElement("span", { className: 'mr-5 pt-5' },
                quesIndex + 1,
                "."),
            React.createElement("pre", { className: 'ddtk_senior', key: quesIndex }, qas.map(function (qaItem, qaInx) {
                return (React.createElement("span", { key: qaItem.question + qaItem.uuid, className: "mb-10" },
                    React.createElement("span", { className: 'mt-5 ques_span', dangerouslySetInnerHTML: { __html: renderQuestion(qaItem.question) } }),
                    React.createElement("span", { className: 'mx-8 px-3 border' }, renderAnswerType(qaItem, quesIndex, qaInx))));
            })))); }))));
}
export default DdtkSenior;
