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
import React, { useState, useEffect, } from 'react';
import { Table } from 'antd';
import { handleTableDataSource, handleTableRowKey } from './util';
import { pageSize } from '../../utils/consts';
var XzlTable = function (props) {
    console.log('this is table shared~111');
    var columns = props.columns, request = props.request, dataKey = props.dataKey, depOptions = props.depOptions, tableOptions = props.tableOptions, handleCallback = props.handleCallback, handleCallbackSelectKeys = props.handleCallbackSelectKeys, category = props.category, noPagination = props.noPagination;
    console.log(category, handleCallbackSelectKeys);
    var _a = __read(useState(pageSize), 2), size = _a[0], setSize = _a[1];
    var _b = __read(useState(0), 2), total = _b[0], setTotal = _b[1];
    var _c = __read(useState(0), 2), current = _c[0], setCurrent = _c[1];
    var _d = __read(useState([]), 2), dataSource = _d[0], setDataSource = _d[1];
    var _e = __read(useState([]), 2), selectedRowKeys = _e[0], setRowKeys = _e[1];
    var _f = __read(useState(false), 2), loading = _f[0], setLoading = _f[1];
    var _g = __read(useState({}), 2), callbackStore = _g[0], setCBStore = _g[1];
    var handleCallBackStore = function (data) {
        var newStore = __assign(__assign({}, callbackStore), data);
        setCBStore(newStore);
        if (handleCallback) {
            handleCallback(newStore);
        }
    };
    var onSelectChange = function (keys) {
        setRowKeys(keys);
        handleCallBackStore({ selectedRowKeys: keys });
    };
    var rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
    };
    var fetchTableDataSource = function (query) {
        if (query === void 0) { query = {}; }
        return __awaiter(void 0, void 0, void 0, function () {
            var params, res, handledData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        console.log('query', query);
                        params = __assign(__assign({ pageAt: 1, pageSize: size }, depOptions), query);
                        // 处理不分页的api请求
                        if (noPagination) {
                            delete params.pageAt;
                            delete params.pageSize;
                        }
                        console.log('fetchTableDataSource params', params);
                        return [4 /*yield*/, request(params)];
                    case 1:
                        res = _a.sent();
                        console.log('fetchTableDataSource res', res);
                        setCurrent(params.pageAt);
                        setSize(params.pageSize);
                        setTotal(res.total);
                        handledData = handleTableDataSource(dataKey, res[dataKey] || res.list, category || res.category);
                        handleCallBackStore({ dataSource: handledData, currentPage: params.pageAt });
                        console.log('handledData*****', handledData);
                        setDataSource(handledData);
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    useEffect(function () {
        console.log('depOptions', depOptions);
        fetchTableDataSource({});
    }, [depOptions]);
    var handlePagerChange = function (page, changedSize) {
        console.log('handlePagerChange', page);
        console.log('handlePagerChange', changedSize);
        var params = { pageAt: page };
        if (changedSize) {
            params.pageSize = changedSize;
        }
        if (!(tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.handlePagerChange)) {
            var data = { pageAt: page };
            fetchTableDataSource(data);
        }
        // fetchTableDataSource(params);
    };
    /* eslint-disable react/jsx-props-no-spreading */
    return (React.createElement(Table, __assign({ loading: loading, rowKey: function (record) { return handleTableRowKey(dataKey, record); }, rowSelection: rowSelection, columns: columns, dataSource: dataSource, pagination: {
            pageSize: size,
            showQuickJumper: true,
            current: current,
            total: total,
            onChange: handlePagerChange,
            showSizeChanger: false,
            hideOnSinglePage: true,
        } }, tableOptions)));
};
XzlTable.defaultProps = {
    depOptions: {},
    tableOptions: {},
};
export default XzlTable;
