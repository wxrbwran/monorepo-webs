import React from 'react';
import { Select, Form } from 'antd';

const { Option } = Select;
function Sex() {
  const commonSelectStyle = { width: 106, marginLeft: 10, height: 34, marginRight: 10 };
  return (
    <Form.Item noStyle name="sex">
      <Select
        placeholder="不限性别"
        style={commonSelectStyle}
        defaultValue={""}
      >
        <Option value="">不限性别</Option>
        <Option value="0">女</Option>
        <Option value="1">男</Option>
      </Select>
    </Form.Item>
  );
}
export default Sex;
