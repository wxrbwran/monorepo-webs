import type { FC, ReactText} from 'react';
import React, { useState } from 'react';
import DragModal from '@/components/DragModal';
import { message } from 'antd';
import type { XzlTableCallBackProps } from '@/components/XzlTable';
import XzlTable from '@/components/XzlTable';
import { Role } from '@/utils/role';
import { useLocation } from 'umi';
import { isOpenSub as getIsOpenSub, upperOrgNsId } from '@/utils/tools';
import * as api from '@/services/api';
import {
  avatar,
  name,
  sex,
  // role,
  // workload,
  // monthWorkload,
  // lastMonthWorkload,
} from '@/utils/columns';

interface IProps {
  refresh: () => void;
}

const AddNurse: FC<IProps> = (props) => {
  const { children, refresh } = props;
  const [selectIds, setSelectIds] = useState<ReactText[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const isOpenSub = getIsOpenSub();
  const initOptions = isOpenSub
    ? {
        targetNSId: upperOrgNsId(),
        viewRole: Role.NURSE.id,
      }
    : {
        sid: window.$storage.getItem('sid'),
        sRole: Role.ORG_ADMIN.id,
        viewRole: Role.NURSE.id,
      };
  const [tableOptions] = useState<Store>(initOptions);
  const depId = useLocation()?.query?.depId;
  // const orgBase = useSelector((state: IState) => state.org.currentOrg.orgBase);

  const handleSubmit = async () => {
    // postManagementDoctor
    const memberList: any[] = [];
    selectIds.forEach((item) => {
      memberList.push({
        sRole: Role.NURSE.id,
        sid: item,
      });
    });
    const params = {
      memberList,
      orgNSId: window.$storage.getItem('nsId'), // 传机构空间id
      nsId: depId, // 传科室id
    };
    api.org.postManagementNurse(params).then((res) => {
      console.log('dddddsuccess', res);
      message.success('添加成功');
      setShow(false);
      refresh();
    });
  };

  const modalProps: Store = {
    okText: '添加',
    cancelText: '退出',
    onOk: handleSubmit,
    onCancel: () => setShow(!show),
  };
  const columns = [avatar, name, sex, /* role,  workload, lastMonthWorkload, monthWorkload */];
  const handleCallback = (params: XzlTableCallBackProps) => {
    console.log(333332, params);
    setSelectIds(params?.selectedRowKeys || []);
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
        title="添加护士"
        destroyOnClose
        okButtonProps={{ disabled: !(selectIds.length > 0) }}
      >
        <XzlTable
          columns={columns}
          dataKey="teams"
          request={window.$api.org.getDepartmentRoles}
          depOptions={tableOptions}
          handleCallback={handleCallback}
        ></XzlTable>
      </DragModal>
    </>
  );
};

export default AddNurse;
