/**
 * title: 登录
 */
import type { FC } from 'react';
import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { useDispatch } from 'umi';
import logo from '@/assets/img/login/logo.png';
import './login.scss';

const FormItem = Form.Item;

const Login: FC = () => {
  // const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleLogin = async (values: Store) => {
    const params = {
      ...values,
      authType: 'password_type',
      clientId: 'xzl-web-out-org',
    };
    dispatch({
      type: 'auth/login',
      payload: params,
    });
  };

  return (
    <div className="login">
      <Row>
        <Col className="login-content">
          <div className='w-60 h-60 m-auto mb-30'><img src={logo} alt="久品" /></div>
          <Form
            className="login-form"
            onFinish={handleLogin}
            form={form}
            data-testid="form"
          >
            <div className='mb-10'>帐号</div>
            <FormItem  name="account" rules={[{ required: true, message: '请输入用户名或手机号!' }]}>
              <Input className="username" placeholder="用户名" />
            </FormItem>
            <div className='mb-10'>密码</div>
            <FormItem name="password" rules={[{ required: true, message: '请输入密码 !' }]}>
              <Input.Password className="passwod" placeholder="密码" />
            </FormItem>
            {/* <FormItem>
              <p className="login-form-forgot">
                <a href="/#/user/find_pwd">忘记密码?</a>
              </p>
            </FormItem> */}
            <FormItem>
              <Button
                type="primary"
                data-testid="loginBtn"
                className="login-form-button"
                htmlType="submit"
              >
                登录
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

Login.title = '登录';

export default Login;
