import type { FC } from 'react';
import React from 'react';
import { Select, Form } from 'antd';
import { provinces } from 'xzl-web-shared/src/utils/consts';

const { Option } = Select;
const { Item } = Form;
const Province: FC = () => (
  <Item noStyle name="province">
    <Select placeholder="选择地区">
      <Option value="all">全部地区</Option>
      {provinces.map((val: any) => (
        <Option key={val.id} value={val.id.toString()} title={val.regionName}>
          {val.regionName}
        </Option>
      ))}
    </Select>
  </Item>
);
export default Province;
