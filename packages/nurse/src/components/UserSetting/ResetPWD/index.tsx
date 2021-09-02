import React from 'react';
import {
  Form, Input, Button, message,
} from 'antd';
import { useSelector } from 'umi';
import styles from './index.scss';

const FormItem = Form.Item;

interface Iporps {
  onClose: () => void;
}
function ResetPWD({ onClose }: Iporps) {
  const { wcl } = useSelector((state:IState) => state.auth);
  const rscId: string = (wcl[0].roles as IRole[])[0]?.rsConfig?.rscId as string;
  const handleSubmit = (values: any) => {
    console.log('Success:', values);
    const { oldPassword, password } = values;
    // rscId
    const params = {
      rscId,
      oldPassword,
      password,
    };
    window.$api.user.patchSettingsPassword(params).then(() => {
      message.success('修改密码成功');
      onClose();
    });
  };
  return (
    <div className={styles.reset_pwd}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <FormItem
          label="原密码"
          name="oldPassword"
          hasFeedback
          rules={[{ required: true, message: '请输入原密码!', min: 6 }]}
        >
          <Input.Password placeholder="请输入至少六位密码" />
        </FormItem>

        <FormItem
          label="新密码"
          name="password"
          hasFeedback
          rules={[{ required: true, message: '请输入新密码!', min: 6 }]}
        >
          <Input.Password placeholder="请输入至少六位密码" />
        </FormItem>

        <FormItem
          label="确认密码"
          name="newPassword"
          hasFeedback
          dependencies={['password']}
          rules={[
            { required: true, message: '请再次输入新密码!', min: 6 },
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (!value || getFieldValue('password') === value || value.length < 6) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('两次密码不一致!');
              },
            }),
          ]}
        >
          <Input.Password placeholder="请确认新密码" />
        </FormItem>
        <div className="common__btn">
          <Form.Item>
            <Button onClick={onClose}>退出</Button>
            <Button type="primary" htmlType="submit">
              完成
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default ResetPWD;
