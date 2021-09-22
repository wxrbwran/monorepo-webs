import type { FC } from 'react';
import React, { useState } from 'react';
import { Form, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Search } from 'xzl-web-shared/src/components/Selects';
import XzlTable from '@/components/XzlTable';
import {
  organizationNameOut,
  adminName,
  organizationCode,
  deptCount,
  doctorCount,
  nurseCount,
  patientCount,
} from 'xzl-web-shared/src/utils/columns';
import AddOrg from '../components/addOrg';
import { Role } from 'xzl-web-shared/src/utils/role';
import { debounce } from 'lodash';
import * as api from '@/services/api';

interface IOption {
  viewRole: string;
  orgName?: string;
}
const Organization: FC<ILocation> = ({ location }) => {
  const [form] = Form.useForm();
  const { getFieldValue } = form;
  console.log(333, Role.UPPER_ORG);
  const isUpper = location.pathname.includes('superior');
  const viewRole = isUpper ? Role.UPPER_ORG.id : Role.LOWER_ORG.id;
  const [depOptions, setOptions] = useState<IOption>({ viewRole });
  const levelText = isUpper ? '上级机构' : '下级机构';

  const handleSelectChange = (changedValues: { searchByName: string }, allValues: object) => {
    console.log('changedValues', changedValues, allValues);
    setOptions({
      ...depOptions,
      orgName: changedValues.searchByName,
      // pageAt: 1,
    });
  };
  const refresh = () => {
    setOptions({ ...depOptions });
  };
  const handleUnBind = (data: any) => {
    console.log(data);
    const params = {
      orgSid: data.sid,
      roleId: viewRole,
    };
    api.org.unbindOrg(params).then(() => {
      message.success('🎉🎉🎉 解绑成功');
      refresh();
    });
  };
  const columns = [
    organizationNameOut({
      level: levelText,
    }),
    adminName,
    organizationCode,
    deptCount,
    doctorCount,
    nurseCount,
    patientCount,
    {
      title: '操作',
      dataIndex: 'operate',
      width: 100,
      align: 'center',
      className: 'action',
      render: (_text: string, record: { id: string }) => (
        <Popconfirm
          placement="topRight"
          overlayClassName="delete__pop-confirm"
          title="确定要解绑该医院吗?"
          onConfirm={debounce(() => handleUnBind(record), 300)}
        >
          <div
            className="cursor-pointer w-62 h-32 ml-5"
            style={{
              border: '1px solid #3588FD',
              textAlign: 'center',
              lineHeight: '30px',
              cursor: 'pointer',
            }}
          >
            解绑
          </div>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <div className="text-lg font-bold">{levelText}</div>
      <div className="flex justify-end items-center mb-20">
        <AddOrg title={`添加${levelText}`} addRoleId={viewRole} refresh={refresh}>
          <div className="mr-20 cursor-pointer linkColor">
            <PlusOutlined />
            <span className="ml-2">添加{levelText}</span>
          </div>
        </AddOrg>
        <Form form={form} onValuesChange={handleSelectChange}>
          <Search form={form} searchKey="searchByName" value={getFieldValue('searchByName')} />
        </Form>
      </div>
      <XzlTable
        columns={columns}
        dataKey="results"
        // category="inviteMemberList"
        request={window.$api.org.getOrgUnionStats}
        depOptions={depOptions}
        tableOptions={{
          rowSelection: false,
        }}
      />
    </div>
  );
};

export default Organization;
