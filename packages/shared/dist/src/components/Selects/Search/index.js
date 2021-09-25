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
import React, { useEffect, useState, useRef } from 'react';
import { Input, Form } from 'antd';
var Item = Form.Item;
var Search = function (props) {
    var placeholder = props.placeholder, form = props.form, searchKey = props.searchKey, value = props.value, focus = props.focus, width = props.width, float = props.float;
    var _a = __read(useState(value), 2), wordKey = _a[0], setWordKey = _a[1];
    var inputRef = useRef(null);
    var formDispatch = form.getInternalHooks('RC_FORM_INTERNAL_HOOKS')
        .dispatch;
    useEffect(function () {
        if (wordKey !== value) {
            setWordKey(value);
        }
        if (focus) {
            inputRef.current.focus();
        }
    }, [value]);
    var handleSearchKey = function (word) {
        console.log(word);
        formDispatch({
            type: 'updateValue',
            namePath: searchKey,
            value: word,
        });
        form.setFieldsValue({
            word: word,
        });
    };
    var handleChangeKey = function (e) {
        setWordKey(e.target.value);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Item, { noStyle: true, name: searchKey },
            React.createElement(Input, { type: "hidden" })),
        React.createElement(Input.Search, { placeholder: placeholder, value: wordKey, style: { width: width || 160, float: float || 'right', marginBottom: 15, marginRight: 10 }, onSearch: handleSearchKey, onChange: handleChangeKey, ref: inputRef })));
};
Search.defaultProps = { placeholder: '请输入关键词搜索', value: '' };
export default Search;
