import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { Button, Form, message } from 'antd';
import XzlTable from 'xzl-web-shared/src/components/XzlTable';
import type { XzlTableCallBackProps } from 'xzl-web-shared/src/components/XzlTable';
import { Search } from 'xzl-web-shared/src/components/Selects';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import AddNurse from '@/components/AddNurse';
import ModalForm from '@/components/DragModal/DragModalForm';
import { useSelector, useLocation /* , useDispatch */ } from 'umi';
import { isOpenSub as getIsOpenSub } from '@/utils/tools';
import { Role } from 'xzl-web-shared/src/utils/role';
import * as api from '@/services/api';
import {
  avatar,
  name,
  sex,
  /* role,
  status, */
} from 'xzl-web-shared/src/utils/columns';
import { handleSelection } from '@/utils/conditions';
import { debounce } from 'lodash';

// import data from '../DepartmentDoctor/mock';

interface ILocation {
  query: {
    depId?: string;
  };
}
const DepartmentOperator: FC = () => {
  const isOpenSub = getIsOpenSub();
  // const dispatch = useDispatch();
  const [form] = Form.useForm();
  const department = useSelector((state: IState) => state.org_menu.department);
  const [total, setTotal] = useState<number>(0);
  const location: ILocation = useLocation<ILocation>();
  const [depId, setDepId] = useState(location.query?.depId);
  const [tableOptions, setOptions] = useState<Store>({
    targetNSId: location.query?.depId,
    viewRole: Role.NURSE.id,
  });
  useEffect(() => {
    console.log('department111111', department);
  }, [department]);

  useEffect(() => {
    const urlDepId = location.query?.depId;
    if (urlDepId && depId !== urlDepId) {
      setDepId(urlDepId);
      setOptions({ ...tableOptions, targetNSId: location.query?.depId });
    }
  }, [location]);

  const handleCallback = (params: XzlTableCallBackProps) => {
    if (params.apiData) {
      setTotal(params.apiData.total!);
    }
  };

  const handleSelectChange = (_changedValues: string[], allValues: string[]) => {
    setOptions({ ...tableOptions, conditions: handleSelection(allValues) });
  };
  const refreshList = () => {
    setOptions({ ...tableOptions });
  };

  const handleDelete = debounce((data) => {
    const params = {
      departmentNsId: depId,
      orgNSId: window.$storage.getItem('nsId'),
      sRole: Role.NURSE.id,
      sid: data.sid,
    };
    api.org.postMoveDepartmentNurse(params).then(() => {
      message.success('移出成功');
      setOptions({ ...tableOptions });
    });
  }, 300);

  // const removeOperator = (doctorIds: string[]) => {
  //   console.log(doctorIds);
  // };

  // const nav2RolePage = (record: Store) => {
  //   console.log(record);
  //   dispatch({
  //     type: 'department_tab/changeTab',
  //     payload: {
  //       tab: 'operator',
  //       inner: 'info',
  //       info: record,
  //     },
  //   });
  // };
  const columns = [
    avatar,
    name,
    sex,
    /* role,
    status, */
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'center',
      width: 80,
      className: 'action',
      render: (_text: string, record: any) => (
        <ModalForm
          title="确定移出？"
          trigger={
            <Button
              type="link"
              danger
              disabled={!!isOpenSub}
              // onClick={() => handleModeDoctor(record)}
            >
              移出科室
            </Button>
          }
          layout="horizontal"
          colon={false}
          modalProps={{
            width: 570,
            okText: '完成',
          }}
          onFinish={async () => handleDelete(record)}
        >
          <p className="text-center text-red-500">这是一个不可逆的操作，请谨慎对待！</p>
        </ModalForm>
      ),
    },
  ];

  return (
    <div>
      <div className="text-right mb-10">
        <div className="inline-block mr-10">
          <UserOutlined />{total}
        </div>
        {!isOpenSub && (
          <AddNurse refresh={refreshList}>
            <Button icon={<PlusOutlined />} type="link" size="middle">
              添加
            </Button>
          </AddNurse>
        )}
      </div>
      <Form className="text-right mb-18" form={form} onValuesChange={handleSelectChange}>
        <Search placeholder="搜索姓名或手机号" form={form} searchKey="searchByName" />
      </Form>
      {
        !!tableOptions?.targetNSId && (
          <XzlTable
            dataKey="teams"
            columns={columns}
            request={window.$api.org.getDepartmentRoles}
            tableOptions={{ rowSelection: undefined }}
            depOptions={tableOptions}
            handleCallback={handleCallback}
          />)
      }

    </div>
  );
};
export default DepartmentOperator;
