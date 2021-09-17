import type { FC } from 'react';
import React from 'react';
import { Select, Form } from 'antd';

const { Option } = Select;
const { Item } = Form;
const Age: FC = () => (
  <Item noStyle name="age">
    <Select placeholder="选择性别">
      <Option value="all">全部年龄</Option>
      <Option value="1">65以下</Option>
      <Option value="2">65及以上</Option>
    </Select>
  </Item>
);
export default Age;
