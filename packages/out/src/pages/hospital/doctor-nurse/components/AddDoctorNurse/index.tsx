import type { FC } from 'react';
import React from 'react';
import { Form, message } from 'antd';
import ModalForm from '@/components/DragModal/DragModalForm';
import { ProFormText } from '@ant-design/pro-form';
import { formItemLayout } from 'xzl-web-shared/src/utils/consts';
import * as api from '@/services/api';
import { Role } from '@/utils/role';

// import { useDispatch } from 'umi';
// import styles from './index.scss';

interface IProps {
  trigger: React.ReactElement;
  role: string;
  refresh: () => void;
}
/* eslint-disable react/jsx-props-no-spreading */
const AddDoctorNurse: FC<IProps> = (props) => {
  const { trigger, role, refresh } = props;
  // const dispatch = useDispatch();
  const [form] = Form.useForm();
  const text = role === 'doctor' ? '医生' : '护士';
  const handleSave = (values) => {
    console.log(values);
    const { account, name } = values;
    const roleType = role === 'doctor' ?  Role.DOCTOR.id : Role.NURSE.id;
    const { getAdminDoctorInfo, getAdminNurseInfo } = api.org;
    const getDetail = role === 'doctor' ? getAdminDoctorInfo(account) : getAdminNurseInfo(account);
    return getDetail.then((res) => {
      console.log('hhhhhdddd', res);
      let params = {};
      if (res?.sid) {
        params = {
          ...params,
          sid: res.sid,
          details: res.details,
          roleType,
          nsId: window.$storage.getItem('nsId'),
        };
      } else {
        params = {
          nsId: window.$storage.getItem('nsId'),
          account,
          roleType,
          details: {
            name,
            tel: account,
          },
        };
      }
      return api.org.addOrgDoctor(params).then(() => {
        message.success('添加成功');
        refresh();
        return true;
      });
    });
  };
  return (
    <ModalForm
      title={`添加${text}`}
      trigger={trigger}
      layout="horizontal"
      colon={false}
      {...formItemLayout}
      modalProps={{
        width: 570,
        okText: '完成',
      }}
      onFinish={async (values) => handleSave(values)}
      form={form}
    >
      <ProFormText
        width="lg"
        rules={[{ required: true }]}
        name="name"
        label="姓名"
        placeholder="请输入姓名"
      />
      <ProFormText
        width="lg"
        rules={[{ required: true }]}
        name="account"
        label="手机号"
        placeholder="请输入手机号"
      />
      <Form.Item label="  ">
        <span className="text-gray-500">默认密码：123456</span>
      </Form.Item>
    </ModalForm>
  );
};

export default AddDoctorNurse;
