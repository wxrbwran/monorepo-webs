import React, { FC, useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import { useSelector, useDispatch } from 'umi';
import AddEditOperatorAdmin from '@/components/AddEditOperatorAdmin';
import { groupOperatorAdminColumns } from '@/utils/columns';
import { operators } from '../GroupOperator/mock';
// import data from './mock';
import styles from '../DepartmentDoctor/index.scss';

// const { confirm } = Modal;
const DepartmentOperatorAdmin: FC = () => {
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
  // const handleConfirmDelete = () => {
  //   confirm({
  //     title: '确认删除选中的护士吗?',
  //     content: '一旦删除不可恢复!',
  //     onOk() {
  //       deleteOperator(selectedRowKeys);
  //     },
  //   });
  // };

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
  const columns = groupOperatorAdminColumns({
    nav: nav2RolePage,
    delete: deleteOperator,
  });

  return (
    <div>
      <div className={styles.action}>
        <AddEditOperatorAdmin mode="ADD">
          <Button className={styles.button} type="primary" ghost size="middle">
            添加
          </Button>
        </AddEditOperatorAdmin>
      </div>
      {/* <div className={styles.selection}>22</div> */}
      <div className={styles.content}>
        <Table
          rowSelection={rowSelection}
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={operators}
          pagination={false}
          scroll={{
            scrollToFirstRowOnChange: true,
            x: true,
          }}
        />
      </div>
    </div>
  );
};
export default DepartmentOperatorAdmin;
