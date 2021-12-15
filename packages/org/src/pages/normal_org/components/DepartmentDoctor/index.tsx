import React, { FC, useState, useEffect } from 'react';
import { Button, Form } from 'antd';
import { useSelector, useDispatch } from 'umi';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
import { Title, Search } from 'xzl-web-shared/dist/components/Selects';
import { Role } from 'xzl-web-shared/dist/utils/role';
import { handleSelection } from 'xzl-web-shared/dist/utils/conditions';
import {
  navAvatar,
  navName,
  sex,
  title,
  patientNum,
  status,
} from 'xzl-web-shared/dist/utils/columns';
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
  const handleSelectChange = (_: string[], allValues: string[]) => {
    setOptions({ ...tableOptions, conditions: handleSelection(allValues) });
  };

  const columnParams = {
    nav: nav2RolePage,
  };
  const columns = [navAvatar(columnParams), navName(columnParams), sex, title, patientNum, status];


  return (
    <div>
      <div className={styles.action}>
        <AddEditDoctor mode="ADD">
          <Button className={styles.button} type="primary" ghost size="middle">
            添加
          </Button>
        </AddEditDoctor>
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
          category={Role.DOCTOR.id}
          request={window.$api.org.getDepartmentRoles}
          depOptions={tableOptions}
          handleCallback={handleCallback}
        />
      </div>
    </div>
  );
};
export default DepartmentDoctor;
