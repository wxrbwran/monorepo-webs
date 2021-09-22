import type { FC } from 'react';
import { useEffect } from 'react';
import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { Input, Button, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import XzlTable from '@/components/XzlTable';
import {
  orgName,
  organizationCode,
  adminName,
  lowOrgCount,
  deptCount,
  doctorCount,
  nurseCount,
  patientCount,
} from 'xzl-web-shared/src/utils/columns';
// import { DisconnectOutlined } from '@ant-design/icons';
import * as api from '@/services/api';
import { debounce } from 'lodash';
import styles from './index.scss';

interface IProps {
  title: string;
  addRoleId: string;
  refresh: () => void;
}
interface IOption {
  orgName?: string;
}
const { Search } = Input;
const AddOrg: FC<IProps> = (props) => {
  const { children, title, addRoleId, refresh } = props;
  const [showModal, setShowModal] = useState(false);
  const [depOptions, setOptions] = useState<IOption>({});
  const [isNodata, setNodata] = useState(true);
  const handleAdd = () => {
    setShowModal(true);
  };
  const onSearch = (value: string) => {
    console.log(value);
    setOptions({
      orgName: value,
    });
  };
  const handleBind = (data: any) => {
    console.log(data);
    const params = {
      orgSid: data.sid,
      roleId: addRoleId,
    };
    api.org.bindOrg(params).then(() => {
      message.success('🎉🎉🎉 绑定成功');
      setShowModal(false);
      refresh();
    });
  };
  useEffect(() => {
    if (!showModal) {
      setOptions({});
      setNodata(true);
    }
  }, [showModal]);
  const columns = [
    orgName,
    organizationCode,
    adminName,
    lowOrgCount,
    deptCount,
    doctorCount,
    nurseCount,
    patientCount,
    {
      title: '操作',
      dataIndex: 'operate',
      width: 100,
      className: 'action',
      render: (_text: string, record) => (
        // <Button type="link" icon={<DisconnectOutlined />} onClick={() => handleBind(record)}>
        //   绑定
        // </Button>
        <div
          className="cursor-pointer w-62 h-32"
          style={{
            border: '1px solid #3588FD',
            textAlign: 'center',
            lineHeight: '30px',
            cursor: 'pointer',
          }}
          onClick={debounce(() => handleBind(record), 300)}
        >
          绑定
        </div>
      ),
    },
  ];
  const handleCallback = (data: any) => {
    // console.log('handleCallback', data?.dataSource?.length > 0)
    setNodata(!(data?.dataSource?.length > 0));
    if (data?.dataSource?.length > 0) {
      setNodata(false);
    } else {
      message.warn('查询数据为空');
    }
  };
  return (
    <>
      <div onClick={handleAdd}>{children}</div>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width="870px"
        visible={showModal}
        title={title}
        onCancel={() => setShowModal(false)}
        footer={null}
        destroyOnClose
      >
        <div className={styles.add_org}>
          <Search
            placeholder="请输入医院名、简称或医院识别码，如:协和医院、协和、02110002"
            onSearch={onSearch}
            style={{ width: 560 }}
            enterButton={<Button type="primary">搜索</Button>}
          />
        </div>
        {isNodata && (
          <div className={styles.no_data}>
            <InfoCircleOutlined />
            <span className="ml-3">暂无数据</span>
          </div>
        )}
        <div style={{ display: isNodata ? 'none' : 'block', height: '70vh' }}>
          {depOptions.orgName! && (
            <XzlTable
              columns={columns}
              dataKey="results"
              request={window.$api.org.getOrganizations}
              depOptions={depOptions}
              tableOptions={{
                rowSelection: false,
              }}
              handleCallback={handleCallback}
            />
          )}
        </div>
      </DragModal>
    </>
  );
};

export default AddOrg;
