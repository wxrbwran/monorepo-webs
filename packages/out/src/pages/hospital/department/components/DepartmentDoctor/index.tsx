import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { Button, Form, message } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation } from 'umi';
import type { XzlTableCallBackProps } from '@/components/XzlTable';
import XzlTable from '@/components/XzlTable';
// import MoveOutHospital from '@/components/MoveOutHospital';
import { Search } from 'xzl-web-shared/src/components/Selects';
import { Role } from 'xzl-web-shared/src/utils/role';
import { handleSelection } from '@/utils/conditions';
import ModalForm from '@/components/DragModal/DragModalForm';
import * as api from '@/services/api';
import { avatar, name, sex, title, patientNum, status } from 'xzl-web-shared/src/utils/columns';
import AddDoctor from '@/components/AddDoctor';
import { isOpenSub as getIsOpenSub } from '@/utils/tools';
import { debounce } from 'lodash';

interface ILocation {
  query: {
    depId?: string;
  };
}
const DepartmentDoctor: FC = () => {
  const isOpenSub = getIsOpenSub();
  const [form] = Form.useForm();
  const [total, setTotal] = useState<number>(0);
  const location: ILocation = useLocation<ILocation>();
  const [depId, setDepId] = useState(location.query?.depId);
  const [tableOptions, setOptions] = useState<Store>({
    targetNSId: location.query?.depId,
    viewRole: Role.DOCTOR.id,
  });

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
  const columns = [avatar, name, sex, title, patientNum, status];
  const refreshList = () => {
    setOptions({ ...tableOptions });
  };

  const handleDelete = debounce((data) => {
    const params = {
      departmentNsId: depId,
      orgNSId: window.$storage.getItem('nsId'),
      sRole: Role.DOCTOR.id,
      sid: data.sid,
    };
    api.org.postMoveDepartmentDoctor(params).then(() => {
      message.success('移出成功');
      setOptions({ ...tableOptions });
    });
  }, 300);
  const action = {
    title: '操作',
    dataIndex: 'operate',
    align: 'center',
    // width: 200,
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
  };
  return (
    <>
      <div className="text-right mb-10">
        <div className="inline-block mr-10">
          <UserOutlined />
          {total}
        </div>
        {!isOpenSub && (
          <AddDoctor refresh={refreshList}>
            <Button icon={<PlusOutlined />} type="link" size="middle">
              添加
            </Button>
          </AddDoctor>
        )}
      </div>
      <Form className="text-right mb-18" form={form} onValuesChange={handleSelectChange}>
        <Search form={form} searchKey="searchByName" placeholder="搜索姓名或手机号" />
      </Form>
      {!!tableOptions?.targetNSId && (
        <XzlTable
          columns={[...columns, action]}
          dataKey="teams"
          request={window.$api.org.getDepartmentRoles}
          depOptions={tableOptions}
          handleCallback={handleCallback}
          tableOptions={{ rowSelection: undefined }}
        />
      )}
    </>
  );
};
export default DepartmentDoctor;
