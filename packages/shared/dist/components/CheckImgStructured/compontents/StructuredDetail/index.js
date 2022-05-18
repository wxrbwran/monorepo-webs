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
import React, { useEffect, useState, useRef, useMemo, } from 'react';
import { Tabs } from 'antd';
import StructuredDetailHydPanel from '../StructuredDetailHydPanel';
import StructuredDetailJcdPanel from '../StructuredDetailJcdPanel';
import { outTypes } from '../utils';
import './index.css';
import { isEmpty, cloneDeep } from 'lodash';
import EmptyIcon from '@/assets/img/jgh_empty.png';
var TabPane = Tabs.TabPane;
var StructuredDetail = function (props) {
    var hydData = props.hydData, jcdData = props.jcdData, images = props.images, handleRefresh = props.handleRefresh, handleClose = props.handleClose, jcdOriginIds = props.jcdOriginIds, groupId = props.groupId;
    console.log('hydData232', hydData);
    console.log('jcdData', jcdData);
    var initTypeTabs = function () {
        var jctAndOther = [];
        var jcdD = jcdData.filter(function (item) { return item.meta.title === 'JCD'; });
        var otherD = jcdData.filter(function (item) { return item.meta.title === 'OTHER'; });
        if (!isEmpty(jcdD)) {
            jctAndOther.push({ outType: 'JCD', initData: jcdD });
        }
        if (!isEmpty(otherD)) {
            jctAndOther.push({ outType: 'OTHER', initData: otherD });
        }
        var hydTab = hydData.map(function (hydItem) {
            return __assign(__assign({}, hydItem), { outType: hydItem.outType });
        });
        var datas = __spreadArray(__spreadArray([], __read(hydTab)), __read(jctAndOther));
        return isEmpty(datas) ? [] : datas;
    };
    var isRefreshParent = useRef(false);
    // 保存各个分类的方法队列 - 检查单、图片不清晰、非医学单据
    var _a = __read(useState({}), 2), hydCallbackFns = _a[0], setHydCallbackFns = _a[1];
    var _b = __read(useState({}), 2), jcdCallbackFns = _b[0], setJcdCallbackFns = _b[1];
    var _c = __read(useState(!isEmpty(hydData) || !isEmpty(jcdData)), 2), isViewOnly = _c[0], setisViewOnly = _c[1]; // true仅查看 false编辑中
    var _d = __read(useState(initTypeTabs()), 2), typeTabs = _d[0], setTypeTabs = _d[1];
    var _e = __read(useState(initTypeTabs()[0]), 2), activeType = _e[0], setActiveType = _e[1];
    useEffect(function () {
        var _a, _b;
        var tabs = initTypeTabs();
        setTypeTabs(tabs);
        setActiveType((_b = (_a = tabs.filter(function (item) { return !['NOT_CLEAR', 'NOT_HYD_JCD'].includes(item.outType); })) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.outType);
    }, [hydData, jcdData]);
    useEffect(function () { return function () {
        // 在组件销毁时判断：如果保存成功了，刷新下单据列表，更新数据
        if (isRefreshParent.current && handleRefresh) {
            handleRefresh();
        }
    }; }, []);
    // 删除页签的回调
    var handelTabsEdit = function (deleteType) {
        var newTabs = typeTabs.filter(function (item) { return item.outType !== deleteType; });
        if (deleteType === activeType && !(isEmpty(newTabs))) {
            setActiveType(newTabs === null || newTabs === void 0 ? void 0 : newTabs[(newTabs === null || newTabs === void 0 ? void 0 : newTabs.length) - 1].outType);
        }
        setTypeTabs(cloneDeep(newTabs));
    };
    var showTypeTabs = typeTabs.filter(function (typeItem) { return !['NOT_CLEAR', 'NOT_HYD_JCD'].includes(typeItem.outType); });
    var fetInitData = function (inx) {
        var _a, _b, _c;
        // 化验单是 documentList， 检查单是initData
        if ((_a = showTypeTabs[inx]) === null || _a === void 0 ? void 0 : _a.documentList) {
            return showTypeTabs === null || showTypeTabs === void 0 ? void 0 : showTypeTabs[inx];
        }
        else if ((_b = showTypeTabs[inx]) === null || _b === void 0 ? void 0 : _b.initData) {
            return (_c = showTypeTabs[inx]) === null || _c === void 0 ? void 0 : _c.initData;
        }
        return [];
    };
    var renderTabPane = useMemo(function () {
        return function (itemTabType, inx) {
            var dom = null;
            var typeStart = itemTabType;
            var baseProps = {
                outType: typeStart,
                tabKey: itemTabType,
                // imageId,
                images: images,
                groupId: groupId,
                initData: fetInitData(inx),
            };
            switch (typeStart) {
                case 'HYD':
                    dom = React.createElement(StructuredDetailHydPanel, __assign({ setHydCallbackFns: setHydCallbackFns, hydCallbackFns: hydCallbackFns }, baseProps));
                    break;
                case 'OTHER':
                case 'JCD':
                    dom = React.createElement(StructuredDetailJcdPanel, __assign({ jcdCallbackFns: jcdCallbackFns, setJcdCallbackFns: setJcdCallbackFns }, baseProps));
                    break;
                default:
                    dom = React.createElement("div", null, "\u65E0\u6570\u636E");
                    break;
            }
            return dom;
        };
    }, [isViewOnly, typeTabs]);
    console.log('typeTabs909', typeTabs, isViewOnly);
    var typeTabsText = typeTabs.map(function (typeItem) { return typeItem.outType; });
    return (React.createElement("div", { className: 'flex-1 mx-20 mt-10 structrued disabled' },
        typeTabs.length > 0 && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'mt-15 structured_content' },
                React.createElement(Tabs, { type: "editable-card", onEdit: handelTabsEdit, hideAdd: true, activeKey: activeType, onChange: function (tab) { return setActiveType(tab); } }, showTypeTabs
                    .map(function (itemTab, inx) { return (React.createElement(TabPane, { tab: outTypes === null || outTypes === void 0 ? void 0 : outTypes[itemTab.outType], key: itemTab.outType, forceRender: true }, renderTabPane(itemTab.outType, inx))); }))))),
        isEmpty(typeTabs) && (React.createElement("div", { className: "no_tab" },
            React.createElement("img", { className: "w-100 h-66", src: EmptyIcon, alt: "\u8BF7\u9009\u62E9\u56FE\u7247\u7C7B\u578B" }),
            React.createElement("div", { className: "mt-10" }, "\u8BF7\u9009\u62E9\u56FE\u7247\u7C7B\u578B")))));
};
export default StructuredDetail;
