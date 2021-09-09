import React from 'react';
import { Select, Form } from 'antd';
import { projectInviteStatus } from '../../../utils/consts';

const { Option } = Select;
interface IOrg {
  name: string;
  orgId: string;
}
function InviteStatus() {
  return (
    <Form.Item noStyle name="status">
      <Select placeholder="账号状态" style={{ width: 106 }}>
        <Option value={0}>全部</Option>
        {
          Object.keys(projectInviteStatus).map(code =>
            <Option key={code} value={+code}>{projectInviteStatus[code]}</Option>
          )
        }
      </Select>
    </Form.Item>
  );
}
export default InviteStatus;
