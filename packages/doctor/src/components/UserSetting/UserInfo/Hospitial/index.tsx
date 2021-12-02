import React from 'react';
import { Form, Input } from 'antd';
import SearchHospital from '@/components/SearchHospital';

interface Iprops {
  setFieldsValue: (params: any) => void;
  getFieldValue: (params: any) => void;
  nameKey: string;
  idKey: string;
  disabled: boolean;
  field: any;
}
export interface Ihospital {
  id: string;
  name: string;
}

function Hospitial(props: Iprops) {
  const {
    setFieldsValue, getFieldValue, nameKey, idKey, field,
  } = props;
  const handleSelect = (value: string, option: any) => {
    console.log('====1', value);
    console.log(option);
    const practiceAreas = getFieldValue('practiceAreas');
    practiceAreas[field.name] = {
      ...practiceAreas[field.name],
      [nameKey]: option.hospitalName,
      [idKey]: option.hospitalId,
    };
    setFieldsValue({ practiceAreas });
  };
  const initShowOrg = getFieldValue('practiceAreas')[field.name];
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
      >
        <SearchHospital
          placeholder='请输入医院名称'
          callback={handleSelect}
          fieldName="hospital"
          style={{ width: '285px' }}
          allowClear={true}
          defaultValue={{
            hospitalId: initShowOrg?.standardId,
            hospitalName: initShowOrg?.name,
          }}
        />
      </Form.Item>
    </>
  );
}

export default Hospitial;
