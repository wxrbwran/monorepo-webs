import React from 'react';
import { Select, Form } from 'antd';

const { Option } = Select;
function Event() {
  const commonSelectStyle = { width: 120, marginLeft: 10, height: 34 };
  return (
    <Form.Item noStyle name="type">
      <Select
        placeholder="全部事件"
        style={commonSelectStyle}
        defaultValue={""}
      >
        <Option value="">全部事件</Option>
        <Option value="1">主要终点事件</Option>
        <Option value="2">次要终点事件</Option>
        <Option value="3">不良事件</Option>
        <Option value="4">严重不良事件</Option>
      </Select>
    </Form.Item>
  );
}
export default Event;
