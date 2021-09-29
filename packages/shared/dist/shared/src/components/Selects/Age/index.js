import React from 'react';
import { Select, Form } from 'antd';
var Option = Select.Option;
function Age() {
    return (React.createElement(Form.Item, { noStyle: true, name: "age" },
        React.createElement(Select, { placeholder: "\u5168\u90E8\u5E74\u9F84" },
            React.createElement(Option, { value: "" }, "\u5168\u90E8\u5E74\u9F84"),
            React.createElement(Option, { value: "64" }, "65\u4EE5\u4E0B"),
            React.createElement(Option, { value: "65" }, "65\u53CA\u4EE5\u4E0A"))));
}
export default Age;
