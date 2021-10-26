import React, { useState } from 'react';
import {
  Form, Select, Spin, Input,
} from 'antd';
import debounce from 'lodash/debounce';

interface Iprops {
  setFieldsValue: (params: any) => void;
  getFieldValue: (params: any) => void;
  nameKey: string;
  idKey: string;
  request: (params: any) => Promise<any>;
  disabled: boolean;
  field: any;
}
export interface Ihospital {
  id: string;
  name: string;
}

const { Option } = Select;

function Hospitial(props: Iprops) {
  const {
    setFieldsValue, getFieldValue, nameKey, idKey, request, field,
  } = props;
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
    const practiceAreas = getFieldValue('practiceAreas');
    practiceAreas[field.name] = {
      ...practiceAreas[field.name],
      [nameKey]: option.children,
      [idKey]: value,
    };
    setFieldsValue({ practiceAreas });
  };
  return (
    <>
      <Form.Item
        name={[field.name, idKey]}
        noStyle
      >
        <Input type="hidden" />
      </Form.Item>
      <Form.Item
        label={field.name === 0 ? '执业医院和科室' : ' '}
        name={[field.name, nameKey]}
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
          style={{ width: '285px' }}
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
