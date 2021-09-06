import React from 'react';
import { Select, Form } from 'antd';

const { Option } = Select;
function Common() {
  const commonSelectStyle = {
    width: 106, marginLeft: 10, height: 34, marginRight: 10,
  };
  return (
    <Form.Item noStyle name="common">
      <Select
        placeholder="全部状态"
        style={commonSelectStyle}
      >
        <Option value="">全部状态</Option>
        <Option value="true">常用</Option>
        <Option value="false">不常用</Option>
      </Select>
    </Form.Item>
  );
}
export default Common;
