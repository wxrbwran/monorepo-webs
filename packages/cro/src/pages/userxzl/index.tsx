/**
 * title: 登录
 */
import type { FC } from 'react';
import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { history } from 'umi';
import './index.scss';
import * as api from '@/services/api';

const FormItem = Form.Item;

const Login: FC = () => {
  // const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleLogin = async (values: Store) => {
    const params = {
      ...values,
      authType: 'password_type',
      clientId: 'xzl-web-doctor',
    };
    api.auth.token(params).then(res => {
      console.log('=======222', res);
      localStorage.setItem('xzl-web-doctor_access_token', res.data.accessToken);
      localStorage.setItem('xzl-web-doctor_sid', res.data.wcl[0].roles[0].subject.id);
      localStorage.setItem('xzl-web-doctor_wcId', res.data.wcl[0].wcId);
      history.push('/home');
    });
  };

  return (
     <div className="login">
       <div className="login-slogan">
         <div className="login-slogan__first">您身边的慢病管理专家</div>
         <div className="login-slogan__second">高效 智能 主动 精准</div>
       </div>
       <Row>
         <Col className="login-content">
           <div className="login-title">账号登录</div>
           <Form
             className="login-form"
             onFinish={handleLogin}
             form={form}
             data-testid="form"
           >
             <FormItem name="account" rules={[{ required: true, message: '请输入用户名或手机号!' }]}>
               <Input className="username" placeholder="用户名" />
             </FormItem>
             <FormItem name="password" rules={[{ required: true, message: '请输入密码 !' }]}>
               <Input.Password className="passwod" placeholder="密码" />
             </FormItem>
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

export default Login;
