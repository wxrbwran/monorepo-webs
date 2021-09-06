import type { FC, ReactText} from 'react';
import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { message } from 'antd';
import type { XzlTableCallBackProps } from '@/components/XzlTable';
import XzlTable from '@/components/XzlTable';
import { avatar, name, sex, title, patientNum, status } from '@/utils/columns';
import { Role } from '@/utils/role';
import { useLocation } from 'umi';
import * as api from '@/services/api';
import { debounce } from 'lodash';

interface IProps {
  refresh: () => void;
}

const AddDoctor: FC<IProps> = (props) => {
  const { children, refresh } = props;
  const [show, setShow] = useState<boolean>(false);
  const [seleceIds, setSeleceIds] = useState<ReactText[]>([]);
  const [tableOptions] = useState<Store>({
    targetNSId: window.$storage.getItem('nsId'),
    viewRole: Role.DOCTOR.id,
  });
  const depId = useLocation()?.query?.depId;
  // const orgBase = useSelector((state: IState) => state.org.currentOrg.orgBase);

  const handleSubmit = async () => {
    // postManagementDoctor
    const memberList: any[] = [];
    seleceIds.forEach((item) => {
      memberList.push({
        sRole: Role.DOCTOR.id,
        sid: item,
      });
    });
    const params = {
      memberList,
      orgNSId: window.$storage.getItem('nsId'), // 传机构空间id
      nsId: depId, // 传科室id
    };
    api.org.postManagementDoctor(params).then((res) => {
      console.log('dddddsuccess', res);
      message.success('添加成功');
      setShow(false);
      refresh();
    });
  };

  const modalProps: Store = {
    okText: '添加',
    cancelText: '退出',
    onOk: debounce(handleSubmit, 300),
    onCancel: () => setShow(!show),
  };

  const columns = [avatar, name, sex, title, patientNum, status];
  /* eslint-disable react/jsx-props-no-spreading */
  const handleCallback = (params: XzlTableCallBackProps) => {
    console.log(333332, params);
    setSeleceIds(params?.selectedRowKeys || []);
  };
  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShow(!show)}>
        {children}
      </div>
      <DragModal
        {...modalProps}
        width={1100}
        visible={show}
        maskClosable
        centered
        title="添加医生"
        destroyOnClose
        okButtonProps={{ disabled: !(seleceIds.length > 0) }}
      >
        <XzlTable
          request={window.$api.org.getManagementDoctor}
          columns={columns}
          dataKey="teams"
          handleCallback={handleCallback}
          depOptions={tableOptions}
        ></XzlTable>
      </DragModal>
    </>
  );
};

export default AddDoctor;
