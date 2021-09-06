import React, { FC, useState, useEffect } from 'react';
import { Button, Form } from 'antd';
import { useSelector, useDispatch } from 'umi';
import XzlTable from '@/components/XzlTable';
import Title xzl-web-shared/src/utils/constsxzl-web-shared/src/components/Selects'/Title';
import Search xzl-web-shared/src/utils/constsxzl-web-shared/src/components/Selects'/Search';
import { Role } from '@/utils/role';
import { handleSelection } from '@/utils/conditions';

import { departmentDoctorColumns } from '@/utils/columns';
import AddEditDoctor from '@/components/AddEditDoctor';
import styles from './index.scss';

// const { confirm } = Modal;

const DepartmentDoctor: FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const department = useSelector((state: IState) => state.org_menu.department);
  console.log('department init', department);
  // const [selectedRowKeys, setRowKeys] = useState<string[]>([]);
  const [tableOptions, setOptions] = useState<Store>({
    targetNSId: department.id,
    viewRole: Role.DOCTOR.id,
  });

  useEffect(() => {
    console.log('department changed', department);
    if (department.id) {
      setOptions({ ...tableOptions, targetNSId: department.id });
    }
  }, [department]);
  const handleCallback = (selected: string[]) => {
    // setRowKeys(selected);
    console.log(selected);
  };
  const deleteDoctor = (doctorIds: string[]) => {
    console.log(doctorIds);
  };
  // const handleConfirmDelete = () => {
  //   confirm({
  //     title: '确认删除选中的医生吗?',
  //     content: '一旦删除不可恢复!',
  //     onOk() {
  //       deleteDoctor(selectedRowKeys);
  //     },
  //   });
  // };
  const nav2RolePage = (record: Store) => {
    dispatch({
      type: 'department_tab/changeTab',
      payload: {
        tab: 'doctor',
        inner: 'info',
        info: record,
      },
    });
  };
  const handleSelectChange = (changedValues: string[], allValues: string[]) => {
    setOptions({ ...tableOptions, conditions: handleSelection(allValues) });
  };
  const columns = departmentDoctorColumns({
    deleteDoctor,
    nav: nav2RolePage,
  });

  return (
    <div>
      <div className={styles.action}>
        <AddEditDoctor mode="ADD">
          <Button className={styles.button} type="primary" ghost size="middle">
            添加
          </Button>
        </AddEditDoctor>
        {/* <Button
          className={styles.button}
          onClick={handleConfirmDelete}
          type="primary"
          ghost
          size="middle"
          disabled={selectedRowKeys.length === 0}
        >
          删除
        </Button> */}
      </div>
      <div className={styles.selection}>
        <Form form={form} onValuesChange={handleSelectChange}>
          <Title />
          <Search form={form} searchKey="searchByName" />
        </Form>
      </div>
      {/* <div className={styles.selection}>22</div> */}
      <div className={styles.content}>
        <XzlTable
          columns={columns}
          dataKey="teams"
          request={window.$api.org.getDepartmentRoles}
          depOptions={tableOptions}
          handleCallback={handleCallback}
        />
      </div>
    </div>
  );
};
export default DepartmentDoctor;
