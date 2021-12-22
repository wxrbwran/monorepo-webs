import React from 'react';
import { Select, Form } from 'antd';
import { provinces } from '../../../utils/consts';
var Option = Select.Option;
function Address() {
    return (React.createElement(Form.Item, { noStyle: true, name: "address" },
        React.createElement(Select, { placeholder: "\u5168\u90E8\u5730\u533A" },
            React.createElement(Option, { value: "" }, "\u5168\u90E8\u5730\u533A"),
            provinces.map(function (val) { return (React.createElement(Option, { key: val.id, value: "" + val.regionName, title: val.regionName }, val.regionName)); }))));
}
export default Address;
