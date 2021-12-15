import React, { FC, useState, useEffect } from 'react';
import { Button, Table, Modal, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'umi';
import { DeleteOutlined } from '@ant-design/icons';
import AddEditOperator from '@/components/AddEditOperator';
import AssignDepartment from '@/components/AssignDepartment';
import { avatar,
  navName,
  sex,
  role,
  workload,
  lastMonthWorkload,
  monthWorkload,
  status } from 'xzl-web-shared/dist/utils/columns';
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

  const action = {
    title: '操作',
    dataIndex: 'operate',
    width: 100,
    className: 'action',
    render: (_: string, record: any) => (
      <Popconfirm
        placement="topRight"
        overlayClassName="delete__pop-confirm"
        title={
          <div>
            <h3>确认删除？</h3>
            <p>一旦删除不可恢复！</p>
          </div>
        }
        onConfirm={() => deleteOperator([record.id])}
      >
        <Button type="link" icon={<DeleteOutlined />}>
          删除
        </Button>
      </Popconfirm>
    ),
  };

  const columns = [
    avatar,
    navName(nav2RolePage),
    sex,
    role,
    workload,
    lastMonthWorkload,
    monthWorkload,
    department,
    status,
    action,
  ];
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
