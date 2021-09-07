import React from 'react';
import {
  Form, Input, Button, message,
} from 'antd';
import { FormProps } from 'antd/lib/form';
import { Link } from 'umi';
import { useDispatch } from 'react-redux';
import styles from './index.scss';

function Login() {
  const dispatch = useDispatch();
  const onFinish = (values: FormProps) => {
    const params = {
      ...values,
      authType: 'password_type',
    };
    if (dispatch) {
      dispatch({
        type: 'auth/login',
        payload: params,
      });
    }
  };
  const onFinishFailed = () => {
    message.error('请输入正常的用户名和密码');
  };

  return (
    <div className={styles.login}>
      <div className={styles.slogan}>
        <div className={styles.level1}>您身边的慢病管理专家</div>
        <div className={styles.level2}>高效 智能 主动 精准</div>
      </div>
      <div className={styles.login_wrap}>
        <div className={styles.title}> 帐号登录 </div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={(value: FormProps) => onFinish(value)}
          onFinishFailed={onFinishFailed}
          id="height42"
        >
          <Form.Item
            name="account"
            rules={[{ required: true, message: '请输入用户名或手机号!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              className="passwod"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <div className={styles.forgot}>
              <Link to="/find_pwd">忘记密码?</Link>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.version}>Version 2.4.0</div>
    </div>
  );
}
Login.title = '登录';
export default Login;
