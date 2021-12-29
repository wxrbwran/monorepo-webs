import React from 'react';
import { Select, Form } from 'antd';
var Option = Select.Option;
function Source() {
    var commonSelectStyle = {
        width: 106, marginLeft: 10, height: 34, marginRight: 10,
    };
    return (React.createElement(Form.Item, { noStyle: true, name: "source" },
        React.createElement(Select, { placeholder: "\u5168\u90E8\u6765\u6E90", style: commonSelectStyle },
            React.createElement(Option, { value: "" }, "\u5168\u90E8\u6765\u6E90"),
            React.createElement(Option, { value: "SYSTEM" }, "\u7CFB\u7EDF\u6DFB\u52A0"),
            React.createElement(Option, { value: "DOCTOR" }, "\u81EA\u5DF1\u6DFB\u52A0"))));
}
export default Source;
