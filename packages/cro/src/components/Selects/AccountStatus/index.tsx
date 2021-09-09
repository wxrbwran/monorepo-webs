import React from 'react';
import { Select, Form } from 'antd';
import { accountStatus } from '@/utils/consts';

const { Option } = Select;
interface IOrg {
  name: string;
  orgId: string;
}
function AccountStatus() {
  return (
    <Form.Item noStyle name="status">
      <Select placeholder="账号状态" style={{ width: 106 }}>
        <Option value={0}>全部</Option>
        {
          Object.keys(accountStatus).map(code =>
            <Option key={code} value={+code}>{accountStatus[code]}</Option>
          )
        }
      </Select>
    </Form.Item>
  );
}
export default AccountStatus;
