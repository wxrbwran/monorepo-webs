import React, { FC, useState, useEffect } from 'react';
import { Button, Form } from 'antd';
import { name, tel } from '@/utils/columns';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
import AddServicePersonnel from '../component/AddServicePersonnel';
import config from '@/config/index';
import { Search } from 'xzl-web-shared/dist/components/Selects';
import { handleSelection } from 'xzl-web-shared/dist/utils/conditions';
import { useLocation } from 'umi';
import { Role } from 'xzl-web-shared/dist/utils/role';
interface IParams {
  sid: string;
  viewRole?: string;
  pageAt: number;
  pageSize: number;
  nroleTagId: string;
}
const RoleList: FC = () => {
  const sid = window.$storage.getItem('sid');
  const location = useLocation();

  const [tableOptions, setOptions] = useState<IParams>(
    {
      sid,
      pageAt: 1,
      pageSize: config.TABLE_PAGESIZE,
      viewRole:  Role.NINE_MEMBER_CALLER_1.id,
      nroleTagId: location?.query?.roleId,
    },
  );
  const [form] = Form.useForm();

  useEffect(() => {
    const roleId = location?.query?.roleId;
    if (roleId !== tableOptions.nroleTagId) {
      setOptions({
        ...tableOptions,
        nroleTagId: location?.query?.roleId,
      });
    }
  }, [location]);
  const columns = [
    name,
    tel,
  ];
  console.log('tableOptions', tableOptions);
  const handleSelectChange = (_changedValues: any, allValues: string[]) => {
    console.log('_changedValues', _changedValues);
    const newConditions = handleSelection(allValues);
    setOptions({ ...tableOptions, conditions: [...newConditions] });
  };
  return (
    <div className='p-20 w-full'>
      {
        location?.query?.roleId ? (
          <>
            <div className='flex justify-between mb-30'>
            <Form className="text-right mb-18 w-600" form={form} onValuesChange={handleSelectChange}>
              <Search placeholder='输入关键词搜索' form={form} searchKey="searchByName"  />
            </Form>
            <AddServicePersonnel refresh={() => setOptions({ ...tableOptions })}>
              <Button type="primary">+ 新增人员</Button>
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
          </>
        ) : <div>无数据</div>
      }
    </div>
  );
};

export default RoleList;
