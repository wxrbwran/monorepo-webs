import React, { FC, useState } from 'react';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
import { name, tel } from '@/utils/columns';
import MemberDetail from '../MemberDetail';
import config from '@/config/index';
import { Role } from 'xzl-web-shared/dist/utils/role';

interface IParams {
  sid: string;
  viewRole?: string;
  pageAt: number;
  pageSize: number;
  roleTagId?: string;
}
const Member: FC = () => {
  const sid = window.$storage.getItem('sid');
  const [tableOptions, setOptions] = useState<IParams>(
    {
      sid,
      pageAt: 1,
      pageSize: config.TABLE_PAGESIZE,
      viewRole: Role.NINE_MEMBER.id, // 写死，长期的
    },
  );
  const columns = [
    name,
    tel,
    {
      title: '操作',
      dataIndex: 'sid',
      align: 'center',
      render: (text: string, record: any) => (
        <MemberDetail wcId={record?.wcId}>
         <div className='text-blue-500 cursor-pointer'>查看详情</div>
        </MemberDetail>
      ),
    },
  ];
  const handleCallback = () => {

  };
  return (
    <div className='pt-10'>
      <XzlTable
        dataKey="teams"
        category='jp-personnel'
        columns={columns}
        request={window.$api.personnel.getPersonnel}
        tableOptions={{ rowSelection: undefined }}
        depOptions={tableOptions}
        handleCallback={handleCallback}
      />
    </div>
  );
};

export default Member;
