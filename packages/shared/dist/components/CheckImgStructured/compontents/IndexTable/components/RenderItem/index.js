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
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Space, Form, Input, Select } from 'antd';
import { ProFormDependency } from '@ant-design/pro-form';
import { getReferenceTitle } from '../../../../../../utils/tool';
// import { searchHighLight } from '@/utils/utils';
import { yinYang } from '../../../../../../utils/consts';
var Option = Select.Option;
var RenderItem = function (props) {
    var item = props.item, form = props.form, onSuccess = props.onSuccess, lightKeyWord = props.lightKeyWord;
    var _a = __read(useState([]), 2), list = _a[0], setList = _a[1];
    var _b = __read(useState(item), 2), indexItem = _b[0], setIndexItem = _b[1];
    var countRef = useRef([0]);
    useEffect(function () {
        console.log('====22221', form.getFieldValue(indexItem.formIndex + "_referenceList"));
        // const
        // console.log('RenderItem', indexItem);
        if (indexItem.referenceList) {
            var initCount_1 = [];
            setList(indexItem.referenceList.map((function (iRefItem, inx) {
                initCount_1.push(inx);
                return __assign(__assign({}, iRefItem), { formIndex: inx });
            })));
            countRef.current = initCount_1;
            // [`${formIndex}_valueCount`]: referenceList ? referenceList.map((item, inx) => inx) : [0],
        }
        else {
            // 用于初始化一个空组件
            setList(function (prev) { return __spreadArray(__spreadArray([], __read(prev)), [{ value: '', key: +new Date(), formIndex: 0 }]); });
        }
    }, [indexItem.referenceList]);
    var handleEditIndex = function (param) {
        var _a;
        setIndexItem(function (prev) { return (__assign(__assign({}, prev), param)); });
        form.setFieldsValue((_a = {},
            _a[indexItem.formIndex + "_name"] = param.name,
            _a[indexItem.formIndex + "_abbreviation"] = param.abbreviation,
            _a[indexItem.formIndex + "_referenceList"] = param.references,
            _a));
        var defaultRefer = param.references ? param.references.filter(function (i) { return i.isDefault; })[0].id : null;
        if (defaultRefer) {
            var formValues = form.getFieldsValue();
            Object.keys(formValues).forEach(function (formKey) {
                var _a;
                if (formKey.endsWith('reference') && Number(formKey.split('_')[0]) === indexItem.formIndex) {
                    form.setFieldsValue((_a = {},
                        _a[formKey] = defaultRefer,
                        _a));
                }
            });
        }
        onSuccess(__assign(__assign({}, indexItem), param));
    };
    var formatOption = function (reference) {
        if (reference.type === 'RADIO') {
            return (reference.note || '') + " \u9634\u9633";
        }
        else {
            return (reference.note || '') + " " + getReferenceTitle(reference) + " " + (reference.unit || '');
        }
    };
    console.log('=====indexItem', indexItem);
    var renderName = useMemo(function () { return function (name) {
        return name;
    }; }, [lightKeyWord]);
    return (React.createElement("div", { className: "flex w-full" },
        React.createElement(Form.Item, { initialValue: indexItem.name, name: indexItem.formIndex + "_name" },
            React.createElement(Input, { readOnly: true, type: "hidden" })),
        React.createElement("span", { style: { flex: '1 0 100px', maxWidth: '300px' }, className: "truncate", dangerouslySetInnerHTML: { __html: renderName(item.name) } }),
        React.createElement("div", { className: "mx-10" },
            React.createElement(Form.Item, { initialValue: indexItem.abbreviation, name: indexItem.formIndex + "_abbreviation", style: { width: 75 } },
                React.createElement(Input, { readOnly: true }))),
        React.createElement("div", null, list.map(function (_item, index) {
            var _a, _b;
            return (React.createElement(Form.Item, { noStyle: true, key: "" + _item.key },
                React.createElement(Space, { align: "baseline", style: { display: 'flex' } },
                    React.createElement(ProFormDependency, { name: [indexItem.formIndex + "_" + _item.formIndex + "_reference"] }, function (deps) {
                        var _a, _b, _c;
                        // console.log('deps', deps);
                        var referenceId = deps[indexItem.formIndex + "_" + _item.formIndex + "_reference"];
                        var disabled = true;
                        if (!(indexItem === null || indexItem === void 0 ? void 0 : indexItem.references) || ((_a = indexItem === null || indexItem === void 0 ? void 0 : indexItem.references) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                            disabled = false;
                        }
                        if (((_b = indexItem === null || indexItem === void 0 ? void 0 : indexItem.references) === null || _b === void 0 ? void 0 : _b.length) > 0 && referenceId) {
                            disabled = false;
                        }
                        var curReference = (_c = item.references) === null || _c === void 0 ? void 0 : _c.filter(function (r) { return r.id === referenceId; })[0];
                        if ((curReference === null || curReference === void 0 ? void 0 : curReference.type) === 'RADIO') {
                            return (React.createElement(Form.Item, { name: indexItem.formIndex + "_" + _item.formIndex + "_indexValue", noStyle: true },
                                React.createElement(Select, { style: { width: 90 }, placeholder: "\u8BF7\u9009\u62E9", disabled: disabled }, yinYang.map(function (yy) { return (React.createElement(Option, { key: yy.value, value: yy.value }, yy.label)); }))));
                        }
                        return (React.createElement(Form.Item, { name: indexItem.formIndex + "_" + _item.formIndex + "_indexValue", style: { width: 90 } },
                            React.createElement(Input, { placeholder: "\u8BF7\u8F93\u5165\u6570\u503C", disabled: disabled })));
                    }),
                    ((_a = indexItem === null || indexItem === void 0 ? void 0 : indexItem.references) === null || _a === void 0 ? void 0 : _a.length) > 0 ? (React.createElement(React.Fragment, null,
                        React.createElement(Form.Item, { name: indexItem.formIndex + "_" + _item.formIndex + "_reference" },
                            React.createElement(Select, { style: { width: 203 }, placeholder: "\u8BF7\u9009\u62E9\u53C2\u8003\u503C\u7C7B\u578B" }, (_b = indexItem.references) === null || _b === void 0 ? void 0 : _b.map(function (reference) { return (React.createElement(Option, { key: indexItem.formIndex + "_" + reference.id, value: reference.id, title: formatOption(reference) }, formatOption(reference))); }))))) : React.createElement("div", { style: { width: 203 } }),
                    React.createElement("div", { className: "w-0 h-0" },
                        React.createElement(Form.Item, { name: indexItem.formIndex + "_valueCount" },
                            React.createElement(Input, { type: "hidden" })),
                        React.createElement(Form.Item, { name: indexItem.formIndex + "_referenceList" },
                            React.createElement(Input, { type: "hidden" }))))));
        }))));
};
export default RenderItem;
