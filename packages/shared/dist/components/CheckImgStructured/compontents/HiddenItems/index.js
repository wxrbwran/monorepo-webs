import React from 'react';
import { Form, Input } from 'antd';
function HiddenItems(_a) {
    var inx = _a.inx;
    var getItem = function (name) { return (React.createElement(Form.Item, { name: inx + "_" + name, noStyle: true },
        React.createElement(Input, { type: "hidden" }))); };
    return (React.createElement(React.Fragment, null,
        getItem('indexId'),
        getItem('name'),
        getItem('sourceSid'),
        getItem('source')));
}
export default HiddenItems;
