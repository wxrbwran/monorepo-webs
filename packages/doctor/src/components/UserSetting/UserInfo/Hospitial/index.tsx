import React, { useState } from 'react';
import {
  Form, Select, Spin, Input,
} from 'antd';
import debounce from 'lodash/debounce';

interface Iprops {
  setFieldsValue: (params: any) => void;
  nameKey: string;
  idKey: string;
  request: (params: any) => Promise<any>;
  disabled: boolean;
}
export interface Ihospital {
  id: string;
  name: string;
}

const { Option } = Select;

function Hospitial({
  setFieldsValue, nameKey, idKey, request,
}: Iprops) {
  const [hospitals, setHospitals] = useState <Ihospital[]>([]);
  const [fetching, setFetching] = useState(false);
  const fetchHospitals = (value: string) => {
    if (value) {
      setFetching(true);
      const params = {
        name: value,
      };
      request(params).then((res) => {
        setHospitals(res.organizationInfos);
        setFetching(false);
      });
    }
  };
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
        label="第一执业医院"
        name={nameKey}
        rules={[{
          required: true,
          message: '请输入第一执业医院!',
        }]}
      >
        <Select
          showSearch
          placeholder="第一执业医院"
          showArrow={false}
          filterOption={false}
          onSearch={debounce((value) => {
            fetchHospitals(value);
          }, 500)}
          onSelect={handleSelect}
          notFoundContent={fetching ? <Spin size="small" /> : null}
          style={{ width: '376px' }}
          // disabled={disabled}
        >
          {hospitals.map((medicine) => (
            <Option key={medicine.id} value={medicine.id}>
              {medicine.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
}

export default Hospitial;
