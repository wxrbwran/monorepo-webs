import React from 'react';
import { Button, Popconfirm } from 'antd';
import { useDispatch, useParams } from 'umi';
import * as api from '@/services/api';

interface Iprops {
  data:IIssueList;
  refresh: () => void;
}
function AdjustBtn(props: Iprops) {
  const { data, refresh } = props;
  const role = window.$storage.getItem('role') || '';
  const dispatch = useDispatch();
  const { sid } = useParams<{sid: string}>();
  const handlIgnoreMsg = () => {
    const params = {
      roleType: window.$storage.getItem('roleId'),
      state: role === 'LOWER_DOCTOR' ? 4 : 2, // 2独立管理和上级医生，4是下级医生
      id: data.id,
      objectId: window.$storage.getItem('patientSid'),
      objectWcId: window.$storage.getItem('patientWcId'),
      patientRoleType: window.$storage.getItem('patientRoleId'),
    };
    api.issue.cancelAdjust(params).then(() => {
      console.log('取消成功');
      refresh(); // 更新待审核问题列表
      dispatch({ // 更新操作历史
        type: 'issue/fetchIssueHistory',
        payload: {
          objectId: sid,
        },
      });
    }).catch((err) => {
      console.log(err);
    });
  };
  return (
    <Popconfirm
      title="确定忽略此条信息?"
      onConfirm={handlIgnoreMsg}
      okText="确认忽略"
      cancelText="再想想"
      placement="topRight"
      overlayClassName="confirm_ignore"
    >
      <Button danger>不调整</Button>
    </Popconfirm>
  );
}

export default AdjustBtn;
