import React from 'react';
import { Select, Form } from 'antd';
export var titleList = ['主任医师', '副主任医师', '主治医师', '住院医师'];
var Option = Select.Option;
var Item = Form.Item;
var Title = function () { return (React.createElement(Item, { noStyle: true, name: "title" },
    React.createElement(Select, { placeholder: "\u8BF7\u9009\u62E9\u804C\u79F0", style: { width: 120, marginRight: 15 } },
        React.createElement(Option, { value: "" }, "\u5168\u90E8\u804C\u79F0"),
        Object.keys(titleList).map(function (t) { return (React.createElement(Option, { key: t, value: titleList[t], title: titleList[t] }, titleList[t])); })))); };
export default Title;
