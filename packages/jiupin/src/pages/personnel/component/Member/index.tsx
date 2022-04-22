import React, { FC, useState } from 'react';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
import { name, tel } from '@/utils/columns';
import config from '@/config/index';

interface IParams {
  sid: string;
  sRole: string;
  viewRole: string;
  pageAt: number;
  pageSize: number;
}
const Member: FC = () => {
  const sid = window.$storage.getItem('sid');
  const sRole = window.$storage.getItem('role');
  const [tableOptions, setOptions] = useState<IParams>({ sid, sRole, pageAt: 1, pageSize: config.TABLE_PAGESIZE, viewRole: 'test.YWLRAe' });
  const columns = [
    name,
    tel,
    {
      title: '操作',
      dataIndex: 'sid',
      align: 'center',
      render: (text: string, record: any) => (
        <div className='text-blue-500 cursor-pointer'>查看详情</div>
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
