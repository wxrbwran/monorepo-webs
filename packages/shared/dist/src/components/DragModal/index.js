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
/**
 * Created by wuxiaoran on 2019/1/28.
 */
import React, { useState } from 'react';
import { Modal } from 'antd';
import Draggable from 'react-draggable';
// import 'antd/dist/antd.min.css';
import 'antd/lib/modal/style/index.css';
/* eslint-disable */
var AntdModalDrag = function (props) {
    var title = props.title, children = props.children;
    var _a = __read(useState(true), 2), disabled = _a[0], setDisabled = _a[1];
    var titleNode = (React.createElement("div", { style: {
            width: '100%',
            cursor: 'move',
        }, onMouseOver: function () {
            if (disabled) {
                setDisabled(false);
            }
        }, onMouseOut: function () {
            setDisabled(true);
        }, 
        // fix eslintjsx-a11y/mouse-events-have-key-events
        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
        onFocus: function () { }, onBlur: function () { } }, title));
    return (React.createElement(Modal, __assign({ destroyOnClose: true }, props, { title: titleNode, modalRender: function (modal) { return (React.createElement(Draggable, { disabled: disabled }, modal)); } }), children));
};
export default AntdModalDrag;
