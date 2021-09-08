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
import { useSelector, useDispatch } from 'umi';
import { Select, Form } from 'antd';
var Option = Select.Option;
function Organization() {
    var filterOrgs = useSelector(function (state) { return state.user.filterOrgs; });
    var _a = __read(useState(filterOrgs), 2), selectOrgList = _a[0], setSelectOrgList = _a[1];
    var dispatch = useDispatch();
    useEffect(function () {
        dispatch({
            type: 'user/getUserOrganizations',
            payload: {},
        });
    }, []);
    useEffect(function () {
        if (filterOrgs) {
            setSelectOrgList(filterOrgs);
        }
    }, [filterOrgs]);
    return (React.createElement(Form.Item, { noStyle: true, name: "organization" },
        React.createElement(Select, { placeholder: "\u5168\u90E8\u673A\u6784" },
            React.createElement(Option, { value: "" }, "\u5168\u90E8\u673A\u6784"),
            selectOrgList.map(function (_a) {
                var nsId = _a.nsId, name = _a.name, wcId = _a.wcId;
                return (React.createElement(Option, { value: nsId, title: name, key: wcId }, name));
            }))));
}
export default Organization;
