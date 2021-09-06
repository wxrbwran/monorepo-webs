import React, { FC, useState } from 'react';
import { Input, Button, Space, message } from 'antd';
import { useDispatch, history, Link } from 'umi';
import AddHospital from '@/components/AddEditHospital';
import BatchUploadStaff from '@/components/BatchUploadStaff';
import XzlTable, { XzlTableCallBackProps } from '@/components/XzlTable';
import { rootOrgColumns } from '@/utils/columns';
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
  const columns = rootOrgColumns({
    handleGetOrgInfoThenNav,
    refresh: () => setOptions({ ...tableOptions }),
  });

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
            <AddHospital refresh={() => {}}>
              <Button>添加医院</Button>
            </AddHospital>
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
