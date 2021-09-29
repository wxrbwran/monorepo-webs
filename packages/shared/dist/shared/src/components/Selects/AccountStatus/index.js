import React from 'react';
import { accountStatus } from '../../../utils/consts';
import { Select, Form } from 'antd';
var Option = Select.Option;
var Item = Form.Item;
var AccountStatus = function () { return (React.createElement(Item, { noStyle: true, name: "status" },
    React.createElement(Select, { placeholder: "\u8D26\u53F7\u72B6\u6001", style: { width: 120 }, allowClear: true },
        React.createElement(Option, { value: "" }, "\u5168\u90E8\u72B6\u6001"),
        Object.keys(accountStatus).map(function (t) { return (React.createElement(Option, { key: t, value: t, title: accountStatus[t] }, accountStatus[t])); })))); };
export default AccountStatus;
