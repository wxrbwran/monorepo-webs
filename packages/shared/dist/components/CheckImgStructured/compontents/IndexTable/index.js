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
import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import HiddenItems from '../HiddenItems';
import RenderItem from './components/RenderItem';
import './index.css';
var IndexTable = function (props) {
    var apiData = props.apiData, subName = props.subName, form = props.form, lightKeyWord = props.lightKeyWord;
    var _a = __read(useState(true), 2), showAll = _a[0], setshowAll = _a[1];
    var _b = __read(useState(apiData), 2), record = _b[0], setRecord = _b[1];
    useEffect(function () {
        setRecord(apiData);
    }, [apiData]);
    var handleChangeRecord = function (param) {
        // console.log('param', param);
        // console.log('record', record);
        var isCommon = param.common;
        var tmp = __assign({}, record);
        // const changedItem = [...tmp.commonItems, ...tmp.noCommonItems]
        //   .filter((i: TIndexItem) => i.id === param.id);
        // console.log('changedItem', changedItem);
        var commonItems = tmp.commonItems.filter(function (i) { return i.id !== param.id; });
        // console.log('commonItems', commonItems);
        var noCommonItems = tmp.noCommonItems.filter(function (i) { return i.id !== param.id; });
        // console.log('noCommonItems', noCommonItems);
        if (isCommon) {
            commonItems.push(param);
        }
        else {
            noCommonItems.push(param);
        }
        console.log('{ commonItems, noCommonItems }', { commonItems: commonItems, noCommonItems: noCommonItems });
        setRecord({ commonItems: commonItems, noCommonItems: noCommonItems });
    };
    var renderItem = function (type) {
        // 有subName的是有子分类的情况，inx是为了索引唯一使用
        return record[type].map(function (item, _index) {
            var _a;
            // 如果存在originReferences字段，表明是回显
            if (((_a = item === null || item === void 0 ? void 0 : item.originReferences) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                item.references = item.originReferences.map(function (r) {
                    r.id = r.referenceId;
                    return r;
                });
            }
            if ((item === null || item === void 0 ? void 0 : item.referenceList.length) === 0
                || !(item === null || item === void 0 ? void 0 : item.referenceList.find(function (r) { return r.indexValue !== undefined; }))) {
                return null;
            }
            return (React.createElement("div", { key: item.formIndex },
                React.createElement(RenderItem, { item: item, lightKeyWord: lightKeyWord, form: form, onSuccess: handleChangeRecord }),
                subName && (React.createElement(Form.Item, { name: item.formIndex + "_subCategoryName", noStyle: true },
                    React.createElement(Input, { type: "hidden" }))),
                React.createElement(HiddenItems, { inx: item.formIndex })));
        });
    };
    return (React.createElement("div", { className: 'structured-edit-wrap hyd_form' },
        renderItem('commonItems'),
        React.createElement("div", { style: { display: showAll ? 'block' : 'none' } }, renderItem('noCommonItems'))));
};
export default IndexTable;
