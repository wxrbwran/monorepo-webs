var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import React, { useState } from 'react';
import { Button, Select, message } from 'antd';
import DragModal from '../DragModal';
import { debounce } from 'lodash';
import './index.css';
var Option = Select.Option;
function SelectGroup(props) {
    var _this = this;
    var _a = __read(useState(false), 2), isShowSelectGroup = _a[0], setIsShowSelectGroup = _a[1];
    var _b = __read(useState(''), 2), selectGroup = _b[0], setSelectGroup = _b[1];
    var handleShowGroup = function () {
        // if (props.selectPatient.length === 0) {
        //   message.error('请勾选患者');
        // } else {
        //   setIsShowSelectGroup(true);
        // }
        setIsShowSelectGroup(true);
    };
    var handleSelectGroup = function (value) {
        setSelectGroup(value);
    };
    var handleJoinGroup = function () { return __awaiter(_this, void 0, void 0, function () {
        var params, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!selectGroup) return [3 /*break*/, 1];
                    message.error('请选择小组');
                    return [3 /*break*/, 3];
                case 1:
                    params = {
                        // projectNsId,
                        groupId: selectGroup,
                        patientSIds: props.selectPatient,
                        projectSid: window.$storage.getItem('projectSid'),
                    };
                    return [4 /*yield*/, props.request(params)];
                case 2:
                    res = _a.sent();
                    if (res) {
                        message.success('加入成功');
                        setIsShowSelectGroup(false);
                        props.refreshList();
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { className: "send-btn-cro", type: "primary", onClick: handleShowGroup }, props.children),
        React.createElement(DragModal, { wrapClassName: "ant-modal-wrap-center", className: "select-group-modal", width: "800px", visible: isShowSelectGroup, title: '\u9009\u62E9\u5C0F\u7EC4', onCancel: function () { return setIsShowSelectGroup(false); }, footer: null },
            React.createElement("div", { className: "select-group" },
                React.createElement("span", { className: "tit" }, "\u5C0F\u7EC4\u540D\u79F0"),
                React.createElement(Select, { defaultValue: "\u4E0B\u62C9\u9009\u62E9\u5C0F\u7EC4", style: { width: 300 }, onChange: handleSelectGroup }, props.groupList.map(function (item) {
                    return (React.createElement(Option, { key: item.groupId, value: item.groupId }, item.groupName));
                })),
                React.createElement("div", { className: "submit-btn-style1" },
                    React.createElement(Button, { onClick: function () { return setIsShowSelectGroup(false); } }, " \u53D6\u6D88 "),
                    React.createElement(Button, { type: "primary", onClick: debounce(handleJoinGroup, 300) }, " \u786E\u5B9A "))))));
}
export default SelectGroup;
