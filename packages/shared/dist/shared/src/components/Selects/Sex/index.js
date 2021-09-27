import React from 'react';
import { Select, Form } from 'antd';
var Option = Select.Option;
function Sex() {
    return (React.createElement(Form.Item, { noStyle: true, name: "sex" },
        React.createElement(Select, { placeholder: "\u4E0D\u9650\u6027\u522B" },
            React.createElement(Option, { value: "" }, "\u4E0D\u9650\u6027\u522B"),
            React.createElement(Option, { value: "0" }, "\u5973"),
            React.createElement(Option, { value: "1" }, "\u7537"))));
}
export default Sex;
