import React, { FC } from 'react';
import { Select, Form } from 'antd';

const { Option } = Select;
const { Item } = Form;
const Sex: FC = () => (
  <Item noStyle name="sex">
    <Select placeholder="选择性别">
      <Option value="all">不限性别</Option>
      <Option value="1">男</Option>
      <Option value="0">女</Option>
    </Select>
  </Item>
);
export default Sex;
