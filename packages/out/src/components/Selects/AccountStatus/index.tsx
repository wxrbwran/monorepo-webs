import type { FC } from 'react';
import React from 'react';
import { accountStatus } from 'xzl-web-shared/src/utils/consts';
import { Select, Form } from 'antd';

const { Option } = Select;
const { Item } = Form;
const AccountStatus: FC = () => (
  <Item noStyle name="status">
    <Select placeholder="账号状态" style={{ width: 120 }} allowClear>
      <Option value="">全部状态</Option>
      {Object.keys(accountStatus).map((t) => (
        <Option key={t} value={t} title={accountStatus[t]}>
          {accountStatus[t]}
        </Option>
      ))}
    </Select>
  </Item>
);
export default AccountStatus;
