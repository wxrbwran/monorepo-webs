/**
 * title: 登录
 */
import type { FC } from 'react';
import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { history } from 'umi';
import './login.scss';

const FormItem = Form.Item;

const Login: FC = () => {
  // const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleLogin = async (values: Store) => {
    const params = {
      ...values,
      authType: 'password_type',
      clientId: 'xzl-web-out-org',
    };
    window.$api.auth.token(params).then((res) => {
      localStorage.setItem('xzl-web-out-org_token', JSON.stringify(res.data));
      history.push('/data-statistics');
    });
  };

  return (
    <div className="login">
      <div className="login-slogan">
        <div className="login-slogan__first">您身边的管理专家</div>
        <div className="login-slogan__second">高效 智能 主动 精准</div>
      </div>
      <Row>
        <Col className="login-content">
          <div className="login-title">账号登录</div>
          <Form className="login-form" onFinish={handleLogin} form={form} data-testid="form">
            <FormItem name="account" rules={[{ required: true, message: '请输入用户名或手机号!' }]}>
              <Input className="username" placeholder="用户名" />
            </FormItem>
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
