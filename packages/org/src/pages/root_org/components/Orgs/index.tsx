import React, { FC, useState } from 'react';
import { Input, Button, Space, message } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import { useDispatch, history, Link } from 'umi';
import AddEditHospital from '@/components/AddEditHospital'
import BatchUploadStaff from '@/components/BatchUploadStaff';
import XzlTable, { XzlTableCallBackProps } from 'xzl-web-shared/src/components/XzlTable';
import {
  organizationName,
  organizationCode,
  adminName,
  lowOrgCount,
  upOrgCount,
  deptCount,
  doctorCount,
  nurseCount,
  patientCount,
 } from 'xzl-web-shared/src/utils/columns';
import OrgStaffs from '../OrgStaffs';
import styles from './index.scss';

const { Search } = Input;

const Orgs: FC = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const sid = window.$storage.getItem('sid');
  const [tableOptions, setOptions] = useState<Store>({ sid });
  const handleSearchOrgs = (search: string) => {
    setOptions({
      ...tableOptions,
      orgName: search,
    });
  };
  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const handleCallback = (data: XzlTableCallBackProps) => {
    console.log(data);
  };
  const handleGetOrgInfoThenNav = async (record: Store) => {
    message.loading('加载中');
    dispatch({
      type: 'org/saveCurrentOrgByList',
      payload: record,
    });
    /* eslint-disable no-new */
    await new Promise((resolve) => {
      dispatch({
        type: 'org/getOrgMenu',
        payload: {
          nsId: record.nsId,
          sid: record.sid,
          resolve,
        },
      });
    });
    history.push(`/normal_org/${record.nsId}`);
  };
  const action = {
    title: '操作',
    dataIndex: 'operate',
    // width: 200,
    className: 'action',
    render: (_text, record) => (
      <div className="column_btn">
        <AddEditHospital info={record} mode="edit" refresh={() => setOptions({ ...tableOptions })}>
          <Button type="ghost" icon={<EditOutlined />}>
            编辑
          </Button>
        </AddEditHospital>
      </div>
    ),
  };
  const columns = [
    organizationName({
      handleGetOrgInfoThenNav,
    }),
    organizationCode,
    adminName,
    lowOrgCount,
    upOrgCount,
    deptCount,
    doctorCount,
    nurseCount,
    patientCount,
    action,
  ];

  return (
    <div className={styles.org}>
      <div className={styles.title}>
        <div>
          <OrgStaffs />
        </div>
        <div className={styles.actions}>
          <Search
            placeholder="输入医院名"
            value={keyword}
            onSearch={handleSearchOrgs}
            onChange={handleChangeKeyword}
            style={{ width: 300, marginRight: 8 }}
          />
          <Space>
            <BatchUploadStaff refresh={() => {}}>
              <Button>批量上传</Button>
            </BatchUploadStaff>
            <AddEditHospital refresh={() => {}}>
              <Button>添加医院</Button>
            </AddEditHospital>
            <Button>
              <Link to="/group_msg/send">群发消息</Link>
            </Button>
            <Button>
              <Link to="/group_msg/history">群发历史</Link>
            </Button>
          </Space>
        </div>
      </div>
      <div className={styles.content}>
        <XzlTable
          columns={columns}
          dataKey="results"
          request={window.$api.org.getOrganizations}
          depOptions={tableOptions}
          tableOptions={{
            rowSelection: false,
          }}
          handleCallback={handleCallback}
        />
      </div>
    </div>
  );
};

export default Orgs;
