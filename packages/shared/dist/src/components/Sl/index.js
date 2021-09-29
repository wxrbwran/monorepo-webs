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
import { Button, Select, message } from 'antd';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { useSelector } from 'react-redux';
import * as api from '@/services/api';
import { debounce } from 'lodash';
var Option = Select.Option;
function SelectGroup(props) {
    var _a = __read(useState(false), 2), isShowSelectGroup = _a[0], setIsShowSelectGroup = _a[1];
    var _b = __read(useState(''), 2), selectGroup = _b[0], setSelectGroup = _b[1];
    var projectNsId = useSelector(function (state) { return state.project.projDetail; }).projectNsId;
    var groupList = useSelector(function (state) { return state.project.objectiveGroup; });
    var handleShowGroup = function () {
        if (props.selectPatient.length === 0) {
            message.error('请勾选患者');
        }
        else {
            setIsShowSelectGroup(true);
        }
    };
    var handleSelectGroup = function (value) {
        setSelectGroup(value);
    };
    var handleJoinGroup = function () {
        if (!selectGroup) {
            message.error('请选择小组');
        }
        else {
            var params = {
                projectNsId: projectNsId,
                groupId: selectGroup,
                patientSIds: props.selectPatient,
                projectSid: window.$storage.getItem('projectSid'),
            };
            api.patientManage.postGroupPatient(params).then(function () {
                message.success('加入成功');
                setIsShowSelectGroup(false);
                props.refreshList();
            });
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { className: "send-btn-cro", type: "primary", onClick: handleShowGroup }, props.children),
        React.createElement(DragModal, { wrapClassName: "ant-modal-wrap-center", className: "select-group-modal", width: "800px", visible: isShowSelectGroup, title: '\u9009\u62E9\u5C0F\u7EC4', onCancel: function () { return setIsShowSelectGroup(false); }, footer: null },
            React.createElement("div", { className: "select-group" },
                React.createElement("span", { className: "tit" }, "\u5C0F\u7EC4\u540D\u79F0"),
                React.createElement(Select, { defaultValue: "\u4E0B\u62C9\u9009\u62E9\u5C0F\u7EC4", style: { width: 300 }, onChange: handleSelectGroup }, groupList.map(function (item) {
                    return (React.createElement(Option, { key: item.groupId, value: item.groupId }, item.groupName));
                })),
                React.createElement("div", { className: "submit-btn-style1" },
                    React.createElement(Button, { onClick: function () { return setIsShowSelectGroup(false); } }, " \u53D6\u6D88 "),
                    React.createElement(Button, { type: "primary", onClick: debounce(handleJoinGroup, 300) }, " \u786E\u5B9A "))))));
}
export default SelectGroup;
