import React, { FC, useState, useEffect } from 'react';
import { Button, Table, Modal } from 'antd';
import { useSelector, useDispatch } from 'umi';
import { departmentOperatorColumns } from 'xzl-web-shared/dist/src/utils/columns';
import data from '../DepartmentDoctor/mock';
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
  const removeOperator = (doctorIds: string[]) => {
    console.log(doctorIds);
  };
  const handleConfirmDelete = () => {
    confirm({
      title: '移出科室',
      content: '确认将护士移出科室吗？',
      onOk() {
        removeOperator(selectedRowKeys);
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
  const columns = departmentOperatorColumns({
    remove: removeOperator,
    nav: nav2RolePage,
  });

  return (
    <div>
      <div className={styles.action}>
        <Button className={styles.button} type="primary" ghost size="middle">
          添加
        </Button>
        <Button
          className={styles.button}
          onClick={handleConfirmDelete}
          type="primary"
          ghost
          disabled={selectedRowKeys.length === 0}
          size="middle"
        >
          移出科室
        </Button>
      </div>
      {/* <div className={styles.selection}>22</div> */}
      <div className={styles.content}>
        <Table
          rowSelection={rowSelection}
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
    </div>
  );
};
export default DepartmentOperator;
