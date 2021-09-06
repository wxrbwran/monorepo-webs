import React, { FC, useState, useEffect } from 'react';
import { Button, Table, Modal } from 'antd';
import { useSelector, useDispatch } from 'umi';
import AddEditOperator from '@/components/AddEditOperator';
import AssignDepartment from '@/components/AssignDepartment';
import { groupOperatorColumns } from '@/utils/columns';
import { operators } from './mock';
// import data from './mock';
import styles from '../DepartmentDoctor/index.scss';

const { confirm } = Modal;
const DepartmentOperator: FC = () => {
  const dispatch = useDispatch();
  const department = useSelector((state: IState) => state.org_menu.department);
  const [selectedRowKeys, setRowKeys] = useState<string[]>([]);

  useEffect(() => {
    console.log('department', department);
  }, [department]);

  const onSelectChange = (keys: string[]) => {
    setRowKeys(keys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const deleteOperator = (doctorIds: string[]) => {
    console.log(doctorIds);
  };
  const handleConfirmDelete = () => {
    confirm({
      title: '确认删除选中的护士吗?',
      content: '一旦删除不可恢复!',
      onOk() {
        deleteOperator(selectedRowKeys);
      },
    });
  };
  const nav2RolePage = (record: Store) => {
    console.log(record);
    dispatch({
      type: 'department_tab/changeTab',
      payload: {
        tab: 'operator',
        inner: 'info',
        info: record,
      },
    });
  };
  const columns = groupOperatorColumns({
    nav: nav2RolePage,
    delete: deleteOperator,
  });

  return (
    <div>
      <div className={styles.action}>
        <AddEditOperator mode="ADD">
          <Button className={styles.button} type="primary" ghost size="middle">
            添加
          </Button>
        </AddEditOperator>
        <Button
          className={styles.button}
          onClick={handleConfirmDelete}
          type="primary"
          ghost
          disabled={selectedRowKeys.length === 0}
          size="middle"
        >
          删除
        </Button>
        <AssignDepartment>
          <Button
            className={styles.button}
            type="primary"
            ghost
            disabled={selectedRowKeys.length === 0}
            size="middle"
          >
            分配科室
          </Button>
        </AssignDepartment>
      </div>
      {/* <div className={styles.selection}>22</div> */}
      <div className={styles.content}>
        <Table
          rowSelection={rowSelection}
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={operators}
          pagination={false}
        />
      </div>
    </div>
  );
};
export default DepartmentOperator;
