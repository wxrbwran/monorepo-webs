import React, { FC, useState, useEffect } from 'react';
import { Button, Form } from 'antd';
import { department, name, tel } from '@/utils/columns';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
import AddServicePersonnel from '../component/AddServicePersonnel';
import config from '@/config/index';
import { Search } from 'xzl-web-shared/dist/components/Selects';
import { handleSelection } from 'xzl-web-shared/dist/utils/conditions';
import { useLocation } from 'umi';
interface IParams {
  sid: string;
  sRole: string;
  viewRole?: string;
  pageAt: number;
  pageSize: number;
}
const RoleList: FC = () => {
  const sid = window.$storage.getItem('sid');
  const sRole = window.$storage.getItem('role');
  const location = useLocation();
  const [tableOptions, setOptions] = useState<IParams>({ sid, sRole, pageAt: 1, pageSize: config.TABLE_PAGESIZE, viewRole: location?.query?.roleId });
  const [form] = Form.useForm();

  useEffect(() => {
    const roleId = location?.query?.roleId;
    if (roleId !== tableOptions.viewRole) {
      setOptions({
        ...tableOptions,
        viewRole: location?.query?.roleId,
      });
    }
  }, [location]);
  console.log('location2', location);
  const columns = [
    name,
    tel,
    department,
  ];
  console.log('tableOptions', tableOptions);
  const handleSelectChange = (_changedValues: any, allValues: string[]) => {
    console.log('_changedValues', _changedValues);
    console.log('allValues', allValues);
    const newConditions = handleSelection(allValues);
    setOptions({ ...tableOptions, conditions: [...newConditions] });
  };
  return (
    <div className='p-20 w-full'>
      <div className='flex justify-between mb-30'>
        <Form className="text-right mb-18 w-600" form={form} onValuesChange={handleSelectChange}>
          <Search placeholder='输入关键词搜索' form={form} searchKey="searchByName"  />
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

export default RoleList;
