import React, { FC, useState } from 'react';
import { ServiceRole } from '@/components/Selects';
import { Button, Form } from 'antd';
import { serviceRoleTags, name, tel } from '@/utils/columns';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
import AddServicePersonnel from '../AddServicePersonnel';
import config from '@/config/index';
import ServicePersonnelDetail from '../ServicePersonnelDetail';
interface IParams {
  sid: string;
  sRole: string;
  viewRole?: string;
  pageAt: number;
  pageSize: number;
}
const ServicePersonal: FC = () => {
  const sid = window.$storage.getItem('sid');
  const sRole = window.$storage.getItem('role');
  const [tableOptions, setOptions] = useState<IParams>({ sid, sRole, pageAt: 1, pageSize: config.TABLE_PAGESIZE });
  const [form] = Form.useForm();
  const columns = [
    name,
    tel,
    serviceRoleTags,
    {
      title: '操作',
      dataIndex: 'sid',
      align: 'center',
      render: (text: string, record: any) => (
        <ServicePersonnelDetail  refresh={() => setOptions({ ...tableOptions })} name={record.name} wcId={record.wcId}>
          <div className='text-blue-500 cursor-pointer'>查看详情</div>
        </ServicePersonnelDetail>
      ),
    },
  ];
  console.log('tableOptions', tableOptions);
  const handleSelectChange = ({ viewRole }: { viewRole: string }, allValues: string[]) => {
    console.log('_changedValues', viewRole);
    console.log('allValues', allValues);
    const params = { ...tableOptions, viewRole };
    if (!viewRole) {
      delete params.viewRole;
    }
    setOptions(params);
  };
  return (
    <div className='pr-30 pt-10'>
      <div className='flex justify-between mb-30'>
        <Form className="text-right mb-18" form={form} onValuesChange={handleSelectChange}>
          <ServiceRole />
        </Form>
        <AddServicePersonnel refresh={() => setOptions({ ...tableOptions })}>
          <Button type="primary">+新增人员</Button>
        </AddServicePersonnel>
      </div>
      <XzlTable
        request={window.$api.personnel.getPersonnel}
        columns={columns}
        dataKey="teams"
        category='jp-personnel'
        depOptions={tableOptions}
        tableOptions={{
          onChange: () => {},
          rowSelection: false,
        }}
      ></XzlTable>
    </div>
  );
};

export default ServicePersonal;
