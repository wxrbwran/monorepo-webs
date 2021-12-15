import React from 'react';
import { Select, Form } from 'antd';
import { projectInviteStatus } from '../../../utils/consts';
var Option = Select.Option;
function InviteStatus() {
    return (React.createElement(Form.Item, { noStyle: true, name: "status" },
        React.createElement(Select, { placeholder: "\u8D26\u53F7\u72B6\u6001", style: { width: 106 } },
            React.createElement(Option, { value: 0 }, "\u5168\u90E8"),
            Object.keys(projectInviteStatus).map(function (code) {
                return React.createElement(Option, { key: code, value: +code }, projectInviteStatus[code]);
            }))));
}
export default InviteStatus;
