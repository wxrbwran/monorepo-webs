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
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
// import uuid from 'react-uuid';
import DragModal from '../DragModal';
// import * as api from '@/services/api';
import ImgWrap from './compontents/ImgWrap';
import StructuredDetail from './compontents/StructuredDetail';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { isEmpty } from 'lodash';
// 待审核进入，不需要获取图片详情，其余入口都要获取图片详情
// im聊天进入，需要根据imageInfo获取图片url
var CheckImgStructured = function (props) {
    var _a;
    var children = props.children, handleRefresh = props.handleRefresh, images = props.images, sid = props.sid;
    console.log('image232s', images);
    var _b = __read(useState(false), 2), showViewer = _b[0], setShowViewer = _b[1];
    var _c = __read(useState([]), 2), hydData = _c[0], setHydData = _c[1];
    var _d = __read(useState([]), 2), jcdData = _d[0], setJcdData = _d[1];
    var _e = __read(useState(images), 2), imgData = _e[0], setImgData = _e[1];
    var _f = __read(useState(false), 2), isLoaded = _f[0], setIsLoaded = _f[1];
    var handleStructured = function () {
        setShowViewer(true);
    };
    var hideViewer = function () {
        setShowViewer(false);
    };
    // 获取
    var fetchImageJcds = function (imageId, groupId) { return __awaiter(void 0, void 0, void 0, function () {
        var params, data;
        return __generator(this, function (_a) {
            params = { meta: { sid: sid } };
            // 有groupId就传imgGroupId(新数据),没有就传imageId(兼容老数据情况);
            if (groupId) {
                params.meta.imgGroupId = groupId;
            }
            else {
                params.meta.imageId = imageId;
            }
            data = window.$api.image.fetchImageJcdAndOther(params);
            return [2 /*return*/, data];
        });
    }); };
    var fetchImageIndexes = function (imageId, groupId) { return __awaiter(void 0, void 0, void 0, function () {
        var params, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        imageId: imageId,
                        groupId: groupId,
                        patientSid: sid,
                        operatorId: localStorage.getItem('xzl-web-doctor_sid'),
                        wcId: localStorage.getItem('xzl-web-doctor_wcId'),
                    };
                    if (groupId) {
                        params.groupId = groupId;
                    }
                    return [4 /*yield*/, window.$api.image.fetchImageIndexes(params)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    var fetchData = function (id, groupId) {
        Promise.all([fetchImageIndexes(id, groupId), fetchImageJcds(id, groupId)]).then(function (res) {
            var _a = __read(res, 2), hData = _a[0], jData = _a[1];
            setHydData(hData.list.map(function (item) {
                return (__assign({}, item));
            }));
            setJcdData(jData.list.map(function (item) {
                return (__assign(__assign({}, item), { meta: __assign({}, item.meta) }));
            }));
            setIsLoaded(true);
        });
    };
    useEffect(function () {
        var _a;
        if (showViewer) {
            setImgData(images);
            if (images.length > 0) {
                if (images[0].reviewStatus === 'REVIEW') {
                    //  已审核过的图片
                    fetchData(images[0].imageId, (_a = images[0]) === null || _a === void 0 ? void 0 : _a.groupId);
                }
                else {
                    // 待审核图片进入 ，直接审核图片
                    console.log('-----待审核');
                    setIsLoaded(true);
                }
            }
            // }
        }
        else {
            setHydData([]);
            setJcdData([]);
            setIsLoaded(false);
        }
    }, [showViewer, images]);
    console.log('---loading', isLoaded);
    return (React.createElement(React.Fragment, null,
        React.createElement("span", { onClick: handleStructured }, children),
        React.createElement(DragModal
        // wrapClassName="ant-modal-wrap-full"
        // zIndex={1010}
        , { 
            // wrapClassName="ant-modal-wrap-full"
            // zIndex={1010}
            style: { top: 0, height: '100vh' }, width: "100%", visible: showViewer, title: "", onCancel: hideViewer, footer: null, destroyOnClose: true },
            React.createElement("div", { className: 'shared-check-img-structured' },
                !isEmpty(imgData) ? (React.createElement("div", { className: "flex justify-start items-start mt-10", style: { minWidth: 1400 } },
                    React.createElement(ImgWrap, { handleClose: function () { return setShowViewer(false); }, images: imgData }),
                    isLoaded && (React.createElement(StructuredDetail, { hydData: hydData, jcdData: jcdData, jcdOriginIds: jcdData.map(function (item) { return item.meta.id; }), images: imgData, groupId: (_a = images === null || images === void 0 ? void 0 : images[0]) === null || _a === void 0 ? void 0 : _a.groupId, handleRefresh: handleRefresh, handleClose: function () { return setShowViewer(false); }, tempAll: {} })))) : (React.createElement("div", { className: "h-500 w-full flex items-center justify-center" },
                    React.createElement(Spin, { size: "large" }))),
                imgData && (React.createElement("div", { className: "pl-18 flex" },
                    React.createElement(ExclamationCircleFilled, { style: { color: '#FFCA4D', paddingTop: '4px' } }),
                    React.createElement("div", { className: "ml-3" },
                        React.createElement("p", null, "1.\u5982\u679C\u56FE\u7247\u5185\u542B\u591A\u5F20\u5355\u636E\uFF0C\u53EF\u901A\u8FC7\u641C\u7D22\u5355\u636E\u540D\u79F0\u8FDB\u884C\u6DFB\u52A0"),
                        React.createElement("p", null, "2.\u6DFB\u52A0\u65B0\u7684\u5355\u636E,\u6BCF\u4E00\u5F20\u5355\u636E\u7ED3\u6784\u5316\u540E\uFF0C\u4E00\u5E76\u4FDD\u5B58"))))))));
};
export default CheckImgStructured;
