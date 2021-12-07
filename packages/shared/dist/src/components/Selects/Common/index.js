import React from 'react';
import { Checkbox, Form } from 'antd';
function Common() {
    // const commonSelectStyle = {
    //   width: 106, marginLeft: 10, height: 34, marginRight: 10,
    // };
    return (React.createElement(Form.Item, { noStyle: true, name: "common" },
        React.createElement(Checkbox.Group, null,
            React.createElement(Checkbox, { value: "true" }, "\u5E38\u7528"),
            React.createElement(Checkbox, { value: "false" }, "\u4E0D\u5E38\u7528"))));
}
export default Common;
