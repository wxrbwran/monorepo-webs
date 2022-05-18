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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useState, useMemo, useRef, useEffect, } from 'react';
import { Tabs, Popconfirm } from 'antd';
import { useDispatch } from 'umi';
import { CloseOutlined } from '@ant-design/icons';
// import AddEditDocument from '@/pages/Index_library/components/AddEditDocument';
// import SubType from '../SubType';
// import SearchHYD from '../SearchHYD';
import CustomIndex from '../CustomIndex';
import { getSource } from '../utils';
// import uuid from 'react-uuid';
import { isEmpty } from 'lodash';
import './index.css';
// 此组件具体到，化验单或检查单panel
var TabPane = Tabs.TabPane;
var StructuredDetailHydPanel = function (props) {
    var hydCallbackFns = props.hydCallbackFns, setHydCallbackFns = props.setHydCallbackFns, tabKey = props.tabKey, outType = props.outType, initData = props.initData;
    var activeType1 = useRef('');
    var initSubType = [];
    var initCheckTypes = [];
    if (!isEmpty(initData)) {
        initData.documentList.forEach(function (item) {
            var _a, _b, _c, _d;
            initSubType.push((_a = item.sampleFroms) === null || _a === void 0 ? void 0 : _a[0]);
            initCheckTypes.push(__assign(__assign({}, item), { sampleFrom: (_b = item.sampleFroms) === null || _b === void 0 ? void 0 : _b[0], firstIndex: (_d = (_c = item.indexList) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.indexId }));
        });
        initSubType = __spreadArray([], __read(new Set(initSubType)));
    }
    else {
        initSubType = ['血液'];
    }
    console.log('initSubType', initSubType);
    // 选择的【来源+单据来源】集合, tab使用
    var _a = __read(useState(initCheckTypes || []), 2), checkTypes = _a[0], setCheckTypes = _a[1];
    var _b = __read(useState(), 2), activeType = _b[0], setActiveType = _b[1];
    var _c = __read(useState(initSubType), 2), sampleFroms = _c[0], setSampleFroms = _c[1];
    var documentsCallbackFns = useRef({});
    var dispatch = useDispatch();
    var handleCurDocument = function (doc) {
        dispatch({
            type: 'document/setCurDocument',
            payload: doc,
        });
    };
    // 搜索框：点击下拉框的数据【来源+单据来源】, type === 'add'表示是新添加的大分类+指标
    var handleSelectTypeIndex = function (params, _type) {
        console.log('handleSelectTypeIndex', params, _type);
        // const newUuid: string = uuid();
        // console.log('checkTypes', checkTypes);
        var newCheckTypes = [];
        var isNew = true;
        // 唯一性根据这两个指标确定： 图片大分类+子分类
        checkTypes.forEach(function (item, index) {
            if (item.documentId === params.documentId) {
                // console.log(item);
                isNew = false;
                handleCurDocument(__assign(__assign({}, item), { id: item.documentId, name: item.documentName, sampleFrom: item.sampleFrom }));
                newCheckTypes = __spreadArray([], __read(checkTypes));
                if (params.type !== 'DOCUMENT') {
                    // 如果此分类已经存在，那修改下首行指标id
                    newCheckTypes[index] = __assign(__assign({}, item), { firstIndex: params.id, 
                        // 新勾选的指标数据，传递到指标列表组件，有则移位，无则视为添加
                        // 添加情况1：新添加的大分类+指标
                        // 添加情况2：此图片结构化保存后，又在这个分类下加了新指标，这会获取回显是没有新加的指标的，搜索到新指标并点击时的情况
                        // @ts-ignore
                        selectIndex: __assign(__assign({}, params), { indexId: params.id }) });
                }
            }
        });
        // 如果是新添加的大分类，则直接push进去
        if (isNew && _type !== 'copy') {
            newCheckTypes = __spreadArray(__spreadArray([], __read(checkTypes)), [
                __assign(__assign({}, params), { firstIndex: params.id }),
            ]);
            handleCurDocument(__assign(__assign({}, params), { id: params.documentId, name: params.documentName, sampleFrom: params.sampleFrom }));
        }
        else if (isNew && _type === 'copy') {
            // newCheckTypes = [...checkTypes, { ...params, tabKey: newUuid }];
        }
        // activeType1.current = newUuid;
        // setActiveType(newUuid);
        setCheckTypes(__spreadArray([], __read(newCheckTypes)));
    };
    useEffect(function () {
        // console.log('level1Type', tabKey);
        hydCallbackFns[tabKey] = function () { return new Promise(function (resolve) {
            Promise.all(Object.values(documentsCallbackFns.current)
                .map(function (fn) { return fn(); })).then(function (documentList) {
                // console.log('hospital', hospital);
                resolve({
                    documentList: documentList,
                    // imageId,
                    outType: outType,
                    operatorId: localStorage.getItem('xzl-web-doctor_sid'),
                    sid: window.$storage.getItem('patientSid'),
                    wcId: window.$storage.getItem('patientWcId'),
                });
            });
        }); };
        // hydCallbackFns浅拷贝，不执行下面setHydCallbackFns， 也可以。
        setHydCallbackFns(hydCallbackFns);
        return function () {
            // 删除掉此tab要delete掉此项
            delete hydCallbackFns[tabKey];
            setHydCallbackFns(hydCallbackFns);
        };
    }, []);
    // 获取所有大分类数据list
    var handleDocumentsCallbackFns = function (_a) {
        var type = _a.type, fn = _a.fn, action = _a.action;
        console.log('=====type', type);
        var fns = documentsCallbackFns.current;
        if (action === 'add') {
            fns[type] = fn;
        }
        else if (action === 'remove') {
            delete fns[type];
        }
        documentsCallbackFns.current = __assign({}, fns);
        // setDocumentsCallbackFns({ ...documentsCallbackFns });
    };
    function isMedicalIndexList(arg) {
        return arg.indexList !== undefined;
    }
    var getInitList = function (item) {
        // 有indexList表示是回显数据
        console.log('getInitList', item);
        if (isMedicalIndexList(item)) {
            var documentId_1 = item.documentId, documentName_1 = item.documentName;
            var list_1 = [];
            item.indexList.forEach(function (indexItem) { return (list_1.push(__assign(__assign({}, indexItem), { documentId: documentId_1,
                documentName: documentName_1, sampleFrom: item.sampleFroms[0], id: indexItem.indexId }))); });
            var commonList = list_1; //.filter((indexItem) => indexItem.common);
            // const noCommonList = list.filter((indexItem) => !indexItem.common);
            return {
                orgAndTime: {
                    orgId: item.orgId,
                    orgName: item.orgName,
                    measuredAt: item.measuredAt,
                    unknownReport: item.unknownReport,
                },
                commonItems: commonList,
                noCommonItems: [],
            };
        }
        return null;
    };
    var handleActiveTab = function (tab) {
        console.log('checkTypes111', checkTypes);
        // console.log('tab', tab);
        if (tab != 'deactivation') {
            activeType1.current = tab;
            console.log('tab1111', tab);
            setActiveType(tab);
            var doc = checkTypes.filter(function (c) { return tab === c.tabKey; })[0];
            handleCurDocument(__assign(__assign({}, doc), { id: doc.documentId, name: doc.documentName, sampleFrom: doc.sampleFrom }));
        }
    };
    var handleRemoveType = function (targetItem) {
        var targetKey = targetItem.tabKey;
        var newCheckTypes = checkTypes.filter(function (item) { return item.tabKey !== targetKey; });
        setCheckTypes(newCheckTypes);
        if (activeType1.current === targetKey && newCheckTypes.length > 0) {
            activeType1.current = newCheckTypes[0].documentId + newCheckTypes[0].sampleFrom;
            // setActiveType(newCheckTypes[0].tabKey);
            handleActiveTab(newCheckTypes[0].tabKey);
        }
    };
    console.log('checkTypes1212', checkTypes);
    var renderTabPane = useMemo(function () { return function () { return checkTypes.map(function (item) {
        console.log('item888', item);
        return (React.createElement(TabPane, { tab: React.createElement("span", { className: "flex items-center" },
                React.createElement("span", { dangerouslySetInnerHTML: { __html: getSource(item.source, item.sourceSid) } }),
                item.documentName), key: "" + item.tabKey, forceRender: true, closeIcon: React.createElement(Popconfirm, { title: "\u5173\u95ED\u540E\uFF0C\u6807\u7B7E\u5185\u5168\u90E8\u6307\u6807\u6570\u636E\u5C06\u6E05\u7A7A\uFF0C\u8BF7\u786E\u8BA4?", onConfirm: function () { return handleRemoveType(item); }, okText: "\u786E\u8BA4", cancelText: "\u53D6\u6D88" },
                React.createElement(CloseOutlined, null)) },
            React.createElement(CustomIndex, { handleDocumentsCallbackFns: handleDocumentsCallbackFns, formKey: "" + item.documentId + item.sampleFrom, level1Type: 'HYD', firstIndex: item.firstIndex, initList: getInitList(item), selectIndex: item === null || item === void 0 ? void 0 : item.selectIndex, 
                // 单据和来源等信息,加显时，接口返回的数组格式，需要处理取第一个元素即可，也只有一个元素
                apiParams: __assign(__assign({}, item), { sampleFrom: isMedicalIndexList(item) ? item.sampleFroms[0] : item.sampleFrom }) })));
    }); }; }, [checkTypes, initData]);
    return (React.createElement("div", { className: "structure_detail_item" }, sampleFroms.length > 0 && (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "hyd_tab_wrap" },
            checkTypes.length > 0 && (React.createElement(Tabs, { activeKey: activeType, onChange: function (tab) { return handleActiveTab(tab); }, type: "editable-card" }, renderTabPane())),
            isEmpty(checkTypes) && (React.createElement("div", { className: "empty_wrap" }, "\u6682\u65E0\u5316\u9A8C\u5355\uFF0C\u8BF7\u6DFB\u52A0")))))));
};
export default StructuredDetailHydPanel;
