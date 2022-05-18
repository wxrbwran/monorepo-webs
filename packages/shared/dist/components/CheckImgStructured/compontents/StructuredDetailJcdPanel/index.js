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
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Tabs } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
// import uuid from 'react-uuid';
import { isEmpty, cloneDeep } from 'lodash';
import StructuredJcdTabItem from '../StructuredJcdTabItem';
// import * as api from '@/services/api';
import { getSource } from '../utils';
import './index.css';
var TabPane = Tabs.TabPane;
var StructuredDetailJcdPanel = function (props) {
    var outType = props.outType, setJcdCallbackFns = props.setJcdCallbackFns, initData = props.initData, jcdCallbackFns = props.jcdCallbackFns, groupId = props.groupId, images = props.images;
    // const topicPanelCallbackFns = useRef({});
    // const addJcdNum = useRef();
    var _a = __read(useState(initData || []), 2), jcdList = _a[0], setJcdList = _a[1]; // 检查单tab list
    var _b = __read(useState(), 2), activeTabKey = _b[0], setActiveTabKey = _b[1]; // 检查单tab 当前选中项
    var _c = __read(useState(false), 2), showAddJctBtn = _c[0], setShowAddJctBtn = _c[1]; // 显示添加检查单按钮
    var _d = __read(useState(), 2), partMethod = _d[0], setPartMethod = _d[1]; // 部位+方法，添加检查单时使用
    var _e = __read(useState(0), 2), createJcdNum = _e[0], setCreateJcdNum = _e[1]; // 添加新检查单累加器，searchJcd监听此参数，若变化，更新搜索列表
    var _f = __read(useState(null), 2), refreshTabInx = _f[0], setRefreshTsbInx = _f[1];
    var timer = useRef(null);
    console.log(setJcdList, setActiveTabKey);
    var doctorSid = localStorage.getItem('xzl-web-doctor_sid');
    var handleRemoveType = function (targetItem) {
        var newJcdList = jcdList.filter(function (item) { return item.meta.tabKey !== targetItem.meta.tabKey; });
        if (targetItem.meta.tabKey === activeTabKey && !isEmpty(newJcdList)) {
            setActiveTabKey(newJcdList[0].meta.tabKey);
        }
        setJcdList(newJcdList);
    };
    var handleAddJcdTab = function (newTabData) {
        console.log('newTabData', newTabData);
        var tabKey = uuid();
        setJcdList(__spreadArray(__spreadArray([], __read(jcdList)), [{ meta: __assign(__assign({}, newTabData), { tabKey: tabKey }) }]));
        setActiveTabKey(tabKey);
    };
    // 即时更新用户输入的部位+方法 添加检查单时使用
    var changePartMethod = function (data) {
        setPartMethod(data);
    };
    var updateCreateJcdNum = function () {
        setCreateJcdNum(function (prev) { return prev + 1; });
    };
    var handleEditJcdNameSuccess = function (jcdInfo) {
        console.log('jcdInfo', jcdInfo);
        jcdList.forEach(function (item) {
            if (item.meta.id === jcdInfo.id) {
                item.meta.jcdName = jcdInfo.jcdName;
            }
        });
        setJcdList(cloneDeep(jcdList));
    };
    useEffect(function () {
        return function () {
            clearTimeout(timer.current);
        };
    }, []);
    var handleRefresh = function (inx) {
        setRefreshTsbInx(inx);
        timer.current = setTimeout(function () {
            setRefreshTsbInx(null);
        }, 1000);
    };
    var handelTabsEdit = function (deleteTabKey, action) {
        if (action === 'remove') {
            // 删除页签
            var newTabs = jcdList.filter(function (item) { return item.meta.tabKey !== deleteTabKey; });
            if (deleteTabKey === activeTabKey && !(isEmpty(newTabs))) {
                setActiveTabKey(newTabs === null || newTabs === void 0 ? void 0 : newTabs[(newTabs === null || newTabs === void 0 ? void 0 : newTabs.length) - 1].meta.tabKey);
            }
        }
    };
    console.log('====jcdLis11t', jcdList);
    var renderTabPane = useMemo(function () { return function () { return jcdList.map(function (item, inx) { return (React.createElement(TabPane, { tab: React.createElement("span", null,
            !item.data && React.createElement("span", { className: "mr-5", onDoubleClick: function () { return handleRefresh(inx); } },
                React.createElement(SyncOutlined, null)),
            // item.meta.creatorSid === doctorSid ? (
            //   <CreateJcd
            //     actionType="edit"
            //     initData={{ part: item.meta.part, method: item.meta.method, jcdName: item.meta.jcdName }}
            //     templateId={item.meta.id}
            //     onSuccess={handleEditJcdNameSuccess}
            //     updateCreateJcdNum={updateCreateJcdNum}
            //     outType={outType}
            //   >
            //     <span>
            //       <span className="relative -top-1" dangerouslySetInnerHTML={{ __html: getSource(item.meta.source, item.meta.creatorSid) }}></span>
            //       {item.meta.jcdName}
            //     </span>
            //   </CreateJcd>
            // ) :
            (React.createElement("span", { className: "relative -top-2" },
                React.createElement("span", { dangerouslySetInnerHTML: { __html: getSource(item.meta.source, item.meta.creatorSid) } }),
                item.meta.jcdName))), key: "" + item.meta.tabKey, forceRender: true },
        React.createElement("div", { className: 'jcd_panel_item' },
            React.createElement("div", { className: 'flex absolute right-0' }, !item.data && item.meta.creatorSid !== doctorSid && React.createElement("div", { className: 'copy_temp' }, "\u590D\u5236\u5E76\u4FEE\u6539\u5355\u636E")),
            React.createElement(StructuredJcdTabItem, { initData: item, 
                // imageId={imageId}
                images: images, groupId: groupId, outType: outType, jcdCallbackFns: jcdCallbackFns, setJcdCallbackFns: setJcdCallbackFns, refreshTabInx: refreshTabInx, tabInx: inx })))); }); }; }, [jcdList, initData, refreshTabInx]);
    console.log('****initDatainitData', initData);
    console.log('*******jcdList', jcdList);
    // const searchJcdProps = {
    //   outType,
    //   createJcdNum,
    //   changePartMethod,
    //   handleAddJcdTab,
    //   handleShowAddJctBtn: (isShow: boolean) => setShowAddJctBtn(isShow),
    // };
    return (React.createElement("div", null,
        React.createElement("div", { className: 'tab_wrap' },
            jcdList.length > 0 && (React.createElement(Tabs, { onEdit: handelTabsEdit, activeKey: activeTabKey, onChange: function (tab) { return setActiveTabKey(tab); }, type: "editable-card" }, renderTabPane())),
            isEmpty(jcdList) && (React.createElement("div", { className: 'empty_wrap' }, "\u6682\u65E0\u68C0\u67E5\u5355\uFF0C\u8BF7\u6DFB\u52A0")))));
};
export default StructuredDetailJcdPanel;
