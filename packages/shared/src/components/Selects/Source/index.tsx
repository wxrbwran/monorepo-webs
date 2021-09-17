import React from 'react';
import { Select, Form } from 'antd';

const { Option } = Select;
function Source() {
  const commonSelectStyle = {
    width: 106, marginLeft: 10, height: 34, marginRight: 10,
  };
  return (
    <Form.Item noStyle name="source">
      <Select
        placeholder="全部来源"
        style={commonSelectStyle}
      >
        <Option value="">全部来源</Option>
        <Option value="SYSTEM">系统添加</Option>
        <Option value="DOCTOR">自己添加</Option>
      </Select>
    </Form.Item>
  );
}
export default Source;
