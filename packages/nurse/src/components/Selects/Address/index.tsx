import React from 'react';
import { Select, Form } from 'antd';
import { provinces } from '@/utils/tools';

const { Option } = Select;
function Address() {
  return (
    <Form.Item noStyle name="address">
      <Select placeholder="全部地区" style={{ width: 130 }}>
        <Option value="">全部地区</Option>
        {provinces.map((val) => (
          <Option
            key={val.id}
            value={`${val.regionName}`}
            title={val.regionName}
          >
            {val.regionName}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
}
export default Address;
