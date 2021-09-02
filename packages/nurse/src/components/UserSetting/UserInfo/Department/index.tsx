import React, { useEffect, useState } from 'react';
import {
  Form, Select, Input,
} from 'antd';

interface Iprops {
  setFieldsValue: (params: any) => void;
  nameKey: string;
  idKey: string;
  disabled: boolean;
}
export interface Ihospital {
  id: string;
  name: string;
}

const { Option } = Select;

function Department({
  setFieldsValue, nameKey, idKey, disabled,
}: Iprops) {
  const [department, setDepartment] = useState <Ihospital[]>([]);
  useEffect(() => {
    window.$api.base.fetchDepartments().then((res) => {
      setDepartment(res.departments);
    });
  }, []);
  const handleSelect = (value: string, option: any) => {
    setFieldsValue({
      [nameKey]: option.children,
      [idKey]: value,
    });
  };
  return (
    <>
      <Form.Item
        name={idKey}
        noStyle
      >
        <Input type="hidden" />
      </Form.Item>
      <Form.Item
        label="第一执业医院所在科室"
        name={nameKey}
        rules={[{
          required: true,
          message: '请输入第一执业医院所在科室!',
        }]}
      >
        <Select
          placeholder="第一执业医院所在科室"
          showArrow={false}
          filterOption={false}
          onSelect={handleSelect}
          style={{ width: '376px' }}
          disabled={disabled}
        >
          {department.map((medicine) => (
            <Option key={medicine.id} value={medicine.id}>
              {medicine.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
}

export default Department;
