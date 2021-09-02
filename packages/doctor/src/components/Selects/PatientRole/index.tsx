import React from 'react';
import { Select, Form } from 'antd';
import { Role } from '@/utils/role';

const { Option } = Select;
function PatientRole() {
  return (
    <Form.Item noStyle name="patientRole">
      <Select placeholder="全部级别">
        <Option value="">全部级别</Option>
        <Option value={Role.PATIENT.id}>普通患者</Option>
        <Option value={Role.PATIENT_VIP.id}>VIP</Option>
      </Select>
    </Form.Item>
  );
}
export default PatientRole;
