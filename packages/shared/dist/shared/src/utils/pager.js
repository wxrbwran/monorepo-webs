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
import React from 'react';
export var itemRender = function (current, type, originalElement) {
    console.log(current);
    if (type === 'prev') {
        return React.createElement("span", null, "\u4E0A\u4E00\u9875");
    }
    if (type === 'next') {
        return React.createElement("span", null, "\u4E0B\u4E00\u9875");
    }
    return originalElement;
};
export var pageRender = function (pagination) {
    if (!pagination.total || pagination.total <= pagination.pageSize) {
        return false;
    }
    return (__assign(__assign({}, pagination), { current: pagination.pageAt, showQuickJumper: true, itemRender: itemRender }));
};
