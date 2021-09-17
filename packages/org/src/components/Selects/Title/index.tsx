import React, { FC } from 'react';
import { titleList } from 'xzl-web-shared/src/utils/consts';
import { Select, Form } from 'antd';

const { Option } = Select;
const { Item } = Form;
const Title: FC = () => (
  <Item noStyle name="title">
    <Select placeholder="请选择职称" style={{ width: 120, marginRight: 15 }}>
      <Option value="">全部职称</Option>
      {Object.keys(titleList).map((t) => (
        <Option key={t} value={titleList[t]} title={titleList[t]}>
          {titleList[t]}
        </Option>
      ))}
    </Select>
  </Item>
);
export default Title;
