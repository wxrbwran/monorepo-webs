import type { FC } from 'react';
import React from 'react';
import { Role } from '@/utils/role';
import { Select, Form } from 'antd';

const { Option } = Select;
const { Item } = Form;
const PatientLevel: FC = () => {
  const patients = ['PATIENT', 'PATIENT_VIP'];
  const patientList = Object.keys(Role)
    .filter((role) => patients.includes(role))
    .map((role) => Role[role]);
  return (
    <Item noStyle name="s_role">
      <Select placeholder="患者级别" style={{ width: 120, marginRight: 15 }}>
        <Option value="">全部患者</Option>
        {patientList.map((role) => (
          <Option key={role.id} value={role.id} title={role.desc}>
            {role.desc}
          </Option>
        ))}
      </Select>
    </Item>
  );
};
export default PatientLevel;
