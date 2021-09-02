import React, { useEffect, useState } from 'react';
import {
  Form, Input, Button, message,
} from 'antd';
import { Link, history } from 'umi';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '@/assets/img/logo.svg';
import * as api from '@/services/api';
import styles from '../login/index.scss';

let timer: NodeJS.Timeout | null = null;
function FindPwd() {
  const [isGetting, setIsGetting] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [form] = Form.useForm();
  const { getFieldValue } = form;
  const onFinish = (values: any) => {
    api.user.patchResetPassword(values).then(() => {
      message.success('修改密码成功,请登录');
      history.push('/login');
    })
      .catch((err) => {
        message.error(err.result);
      });
  };

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(Number(timer));
      setSeconds(60);
      setIsGetting(false);
    }
  }, [seconds]);

  const fetchVcode = () => {
    const tel = getFieldValue('tel');
    if (!!tel && !Number.isNaN(+tel)) {
      // postSms
      api.user.postSms({ tel }).then(() => {
        timer = setInterval(() => {
          setSeconds(((preSeconds) => preSeconds - 1));
          setIsGetting(true);
        }, 1000);
      })
        .catch((err) => {
          message.error(err.result);
        });
    } else {
      message.error('请输入正确的手机号码！');
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_wrap}>
        <div className={styles.title}>
          <img src={logo} alt="" className="mb-8" />
          <p>修改密码</p>
        </div>
        <div className="px-50 relative">
          <Form
            name="findPwd"
            initialValues={{ remember: true }}
            onFinish={(value) => onFinish(value)}
            id="height42"
            form={form}
          >
            <Form.Item
              name="tel"
              rules={[{ required: true, message: '请输入手机号!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入手机号" />
            </Form.Item>
            <div className={styles.code_wrap}>
              <Form.Item
                name="code"
                rules={[{ required: true, message: '请输入接收到的验证码!' }]}
              >
                <Input
                  prefix={<LockOutlined />}
                  placeholder="请输入收到的验证码"
                />
              </Form.Item>
              <Button
                className={styles.fetch_btn}
                type="primary"
                onClick={fetchVcode}
                loading={isGetting}
                style={{ width: isGetting ? 140 : 102 }}
              >
                {
                  isGetting ? `${seconds}s后重新获取` : '获取验证码'
                }
              </Button>
            </div>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入新密码!' }]}
            >
              <Input.Password
                className="passwod"
                prefix={<LockOutlined />}
                placeholder="新密码"
              />
            </Form.Item>
            <Form.Item noStyle>
              <Button type="primary" htmlType="submit">
                修改密码
              </Button>
            </Form.Item>
            <Form.Item noStyle>
              <div className={styles.forgot}>
                <Link to="/login">返回登录</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className={styles.version}>Version 2.4.0</div>
    </div>
  );
}

export default FindPwd;
