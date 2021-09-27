import React from 'react';
import { Select, Form } from 'antd';
var Option = Select.Option;
function Status() {
    var commonSelectStyle = { width: 106, marginLeft: 10, height: 34 };
    return (React.createElement(Form.Item, { noStyle: true, name: "status" },
        React.createElement(Select, { defaultValue: "", style: commonSelectStyle },
            React.createElement(Option, { value: "" }, "\u5168\u90E8\u72B6\u6001"),
            React.createElement(Option, { value: 1003 }, "\u7ED3\u675F"),
            React.createElement(Option, { value: 1002 }, "\u8FDB\u884C\u4E2D"))));
}
export default Status;
