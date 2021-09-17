import React from 'react';
import { Select, Form } from 'antd';
var Option = Select.Option;
function Common() {
    var commonSelectStyle = {
        width: 106, marginLeft: 10, height: 34, marginRight: 10,
    };
    return (React.createElement(Form.Item, { noStyle: true, name: "common" },
        React.createElement(Select, { placeholder: "\u5168\u90E8\u72B6\u6001", style: commonSelectStyle },
            React.createElement(Option, { value: "" }, "\u5168\u90E8\u72B6\u6001"),
            React.createElement(Option, { value: "true" }, "\u5E38\u7528"),
            React.createElement(Option, { value: "false" }, "\u4E0D\u5E38\u7528"))));
}
export default Common;
