import React from 'react';
import { Select, Form } from 'antd';

const { Option } = Select;
function Status() {

  const commonSelectStyle = { width: 106, marginLeft: 10, height: 34 };
  return (
    <Form.Item noStyle name="status">
      <Select
        defaultValue={""}
        style={commonSelectStyle}
      >
        <Option value="">全部状态</Option>
        <Option value={1003}>结束</Option>
        <Option value={1002}>进行中</Option>
      </Select>
    </Form.Item>
  );
}
export default Status;
