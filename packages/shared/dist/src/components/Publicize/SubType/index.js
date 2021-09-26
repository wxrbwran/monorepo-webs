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
import React from 'react';
import { Upload, message } from 'antd';
// import { UploadOutlined, FormOutlined } from '@ant-design/icons';
import request from 'umi-request';
import { history } from 'umi';
import { AcceptType, businessType } from '../const';
import './index.css';
function SubType(_a) {
    var _this = this;
    var name = _a.name, icon = _a.icon, type = _a.type, uploadPublicizeRequest = _a.uploadPublicizeRequest, filePrepareRequest = _a.filePrepareRequest;
    var addPublicize = function (params) { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uploadPublicizeRequest(params)];
                case 1:
                    res = _a.sent();
                    if (res) {
                        setTimeout(function () {
                            message.success('上传成功');
                        }, 200);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    // 上传
    var handleSubmit = function (rawUrl, file) {
        var params = {
            content: {
                address: rawUrl,
                cover: null,
                filename: file.name,
                text: null,
            },
            fromSid: window.$storage.getItem('orgSid'),
            type: type.toUpperCase(),
        };
        if (type === 'document') {
            params.content.size = file.size;
        }
        if (type !== 'audio') {
            addPublicize(__assign({}, params));
        }
        else {
            // 获取录音时长
            var url = URL.createObjectURL(file);
            var audioElement = new Audio(url);
            audioElement.addEventListener('loadedmetadata', function (_event) {
                params.content.duration = parseInt(_event.path[0].duration * 1000, 10);
                addPublicize(__assign({}, params));
            });
        }
    };
    var fetchUrlThenUpload = function (file) { return __awaiter(_this, void 0, void 0, function () {
        var res, accessId, encodePolicy, host_1, key_1, signature, formData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message.info({
                        content: '正在上传',
                    });
                    return [4 /*yield*/, filePrepareRequest({ businessType: businessType[type] })];
                case 1:
                    res = _a.sent();
                    if (res) {
                        console.log(432, res);
                        accessId = res.accessId, encodePolicy = res.encodePolicy, host_1 = res.host, key_1 = res.key, signature = res.signature;
                        formData = new FormData();
                        formData.set('name', file.name);
                        formData.set('key', "" + key_1 + file.name);
                        formData.set('policy', encodePolicy);
                        formData.set('OSSAccessKeyId', accessId);
                        formData.set('success_action_status', '200');
                        formData.set('callback', '');
                        formData.set('signature', signature);
                        formData.set('file', file);
                        console.log('host', host_1);
                        request
                            .post(host_1, {
                            data: formData,
                        })
                            .then(function () {
                            handleSubmit(host_1 + "/" + key_1 + file.name, file.name);
                        })
                            .catch(function (err) {
                            console.log('err', err);
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var stopPropagation = function (e) {
        e.stopPropagation();
    };
    var go2NewPage = function () {
        history.push("/education/list/" + type.toLowerCase());
    };
    var go2CreatePage = function (e) {
        e.stopPropagation(e);
        history.push("/education/" + type + "/create");
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "box", onClick: go2NewPage },
            React.createElement("div", { className: "upload" }, ['accompany', 'article'].includes(type) ? (React.createElement("p", { onClick: go2CreatePage, className: "btn" }, "\u521B\u5EFA")) : (React.createElement(Upload, { multiple: false, listType: "text", beforeUpload: fetchUrlThenUpload, showUploadList: false, accept: AcceptType[type], onClick: stopPropagation },
                React.createElement("span", null, "\u4E0A\u4F20")))),
            React.createElement("p", { className: "file" },
                React.createElement("img", { src: icon, alt: "" })),
            React.createElement("p", null, name))));
}
export default SubType;
