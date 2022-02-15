import type { FC } from 'react';
import React from 'react';
import { message, Form, Input } from 'antd';
import ModalForm from '@/components/DragModal/DragModalForm';
import { formItemLayout } from 'xzl-web-shared/dist/utils/consts';
import { useSelector } from 'umi';
// import { useDispatch } from 'umi';
// import styles from './index.scss';

interface IProps {
  trigger: React.ReactElement;
}
interface IFormData {
  oldPassword: string;
  password: string;
  newPassword: string;
}
const ChangePwd: FC<IProps> = (props) => {
  const { trigger } = props;
  const [form] = Form.useForm();
  const { wcl } = useSelector((state: IState) => state.auth);
  const handleSubmit = async (values: IFormData) => {
    const { oldPassword, password } = values;
    const rscId: string = (wcl[0].roles as IRole[])[0]?.rsConfig?.rscId as string;
    // rscId
    const params = {
      rscId,
      oldPassword,
      password,
    };
    const data = await window.$api.user.patchSettingsPassword(params);
    message.success('修改密码成功');
    return data === null; // 成功后会得到null这里返回true可以关闭ModalForm
  };
  return (
    <div>
      <ModalForm
        title="修改密码"
        trigger={trigger}
        layout="horizontal"
        {...formItemLayout}
        modalProps={{
          width: 570,
          okText: '完成',
          wrapClassName: 'hide_modalform_cancel',
        }}
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          label="原密码"
          name="oldPassword"
          rules={[{ required: true, message: '请输入原密码!', min: 6 }]}
        >
          <Input placeholder="请输入原密码" />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="password"
          rules={[{ required: true, message: '请输入新密码!', min: 6 }]}
        >
          <Input placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="newPassword"
          rules={[
            { required: true, message: '请再次输入新密码!', min: 6 },
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (!value || getFieldValue('password') === value || value.length < 6) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次密码不一致!'));
              },
            }),
          ]}
        >
          <Input placeholder="请确认密码" />
        </Form.Item>
      </ModalForm>
    </div>
  );
};

export default ChangePwd;
