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
import React, { useEffect, useRef, useState } from 'react';
import TopicBaseInfo from '../TopicBaseInfo';
import TopicChoice from '../TopicChoice';
import TopicProblem from '../TopicProblem';
import TopicDdtk from '../TopicDdtk';
import TopicDdtkSenior from '../TopicDdtkSenior';
import './index.css';
import { cloneDeep } from 'lodash';
// import * as api from '@/services/api';
import { Spin } from 'antd';
var StructuredJcdTabItem = function (props) {
    console.log('gggprops', props);
    var initData = props.initData, jcdCallbackFns = props.jcdCallbackFns, setJcdCallbackFns = props.setJcdCallbackFns, outType = props.outType, refreshTabInx = props.refreshTabInx, tabInx = props.tabInx, groupId = props.groupId, images = props.images;
    var tabKey = initData.meta.tabKey;
    var _a = __read(useState(''), 2), lightKeyWord = _a[0], setlightKeyWord = _a[1];
    var _b = __read(useState({}), 2), partMethod = _b[0], setPartMethod = _b[1];
    var initEmptyData = { COMPLETION: [], CHOICE: [], TEXT: [], BASIC: [], COMPLETION_SENIOR: [] };
    var doctorSid = localStorage.getItem('xzl-web-doctor_sid');
    var fetchInitData = function (data) {
        var initD = cloneDeep(initEmptyData);
        data.forEach(function (item) {
            switch (item.question_type) {
                case 'TEXT':
                case 'BASIC':
                case 'COMPLETION':
                    initD[item.question_type].push(item);
                    break;
                case 'RADIO':
                case 'CHECKBOX':
                    initD.CHOICE.push(item);
                    break;
                case 'INLINE_COMPLETION':
                case 'INLINE_RADIO':
                case 'INLINE_CHECKBOX':
                case 'INLINE_DATE':
                    initD.COMPLETION_SENIOR.push(item);
                    break;
                default:
                    break;
            }
        });
        console.log('========initD', initD);
        return initD;
    };
    var _c = __read(useState(initData.data ? fetchInitData(initData.data) : cloneDeep(initEmptyData)), 2), initTopic = _c[0], setinitTopic = _c[1];
    var topicCallbackFns = useRef({});
    // const fetchData = () => {
    //   api.image.fetchImageTopicTemplate({ id: initData.meta.id }).then((res: any) => {
    //     // 接口原来数据格式没变，返回list数组，目前只取第一个即可 11.18 琳巍
    //     setinitTopic(res?.list?.[0] ? fetchInitData(res?.list?.[0]?.data) : cloneDeep(initEmptyData));
    //     // res?.list?.[0]?.meta.method  part
    //     setPartMethod({
    //       method: res?.list?.[0]?.meta?.method,
    //       part: res?.list?.[0]?.meta?.part,
    //     });
    //   });
    // };
    useEffect(function () {
        if (initData.data) {
            setinitTopic(fetchInitData(initData.data));
        }
        else {
            // fetchData();
        }
    }, [initData]);
    useEffect(function () {
        if (refreshTabInx === tabInx) {
            // fetchData();
        }
    }, [refreshTabInx]);
    useEffect(function () {
        jcdCallbackFns[tabKey] = function (clickSaveTime) { return new Promise(function (resolve) {
            Promise.all(Object.values(topicCallbackFns.current)
                .map(function (fn) { return fn(); })).then(function (topicList) {
                var _a;
                console.log('=======883883', topicList);
                var meta = initData.meta;
                if (meta.id) {
                    delete meta.id; // 结构化时不要回传id
                }
                var imgInfo = groupId ? { imgGroupId: groupId } : { imageId: (_a = images === null || images === void 0 ? void 0 : images[0]) === null || _a === void 0 ? void 0 : _a.imageId };
                resolve({
                    data: topicList,
                    meta: __assign(__assign(__assign(__assign({ 
                        // imageId,
                        title: outType }, meta), imgInfo), partMethod), { sid: window.$storage.getItem('patientSid'), creatorSid: initData.meta.creatorSid, createdTime: clickSaveTime }),
                });
            });
        }); };
        setJcdCallbackFns(jcdCallbackFns);
        return function () {
            // 删除掉此tab要delete掉此项
            delete jcdCallbackFns[tabKey];
            setJcdCallbackFns(jcdCallbackFns);
        };
    }, [partMethod]);
    var changeTopicCallbackFns = function (_a) {
        var type = _a.type, fn = _a.fn;
        var fns = topicCallbackFns.current;
        fns[type] = fn;
        topicCallbackFns.current = __assign({}, fns);
    };
    var subProps = {
        changeCallbackFns: changeTopicCallbackFns,
        lightKeyWord: lightKeyWord,
        templateId: initData.meta.id,
        meta: initData.meta,
        // 是否显示编辑按钮  1.如果有没有initData.data（首次编辑）并且模板创建人是自己
        isShowEdit: !initData.data && initData.meta.sid === doctorSid,
    };
    console.log('initTopic', initTopic);
    return (React.createElement("div", { className: 'topic_list' }, refreshTabInx !== tabInx ? (React.createElement(React.Fragment, null,
        React.createElement(TopicBaseInfo, __assign({ outType: outType, initData: initTopic.BASIC }, subProps)),
        React.createElement(TopicDdtk, __assign({ initData: initTopic.COMPLETION }, subProps)),
        React.createElement(TopicChoice, __assign({ initData: initTopic.CHOICE }, subProps)),
        React.createElement(TopicProblem, __assign({ initData: initTopic.TEXT }, subProps)),
        React.createElement(TopicDdtkSenior, __assign({ initData: initTopic.COMPLETION_SENIOR }, subProps)))) :
        (React.createElement("div", { className: "flex justify-center items-center" },
            React.createElement(Spin, { size: "large" })))));
};
export default StructuredJcdTabItem;
