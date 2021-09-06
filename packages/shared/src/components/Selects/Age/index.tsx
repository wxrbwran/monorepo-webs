import React from 'react';
import { Select, Form } from 'antd';

const { Option } = Select;
function Age() {
  return (
    <Form.Item noStyle name="age">
      <Select placeholder="全部年龄">
        <Option value="">全部年龄</Option>
        <Option value="64">65以下</Option>
        <Option value="65">65及以上</Option>
      </Select>
    </Form.Item>
  );
}
export default Age;
