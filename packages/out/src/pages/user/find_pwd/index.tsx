import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, history } from 'umi';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.scss';

let timer: NodeJS.Timeout | null = null;
function FindPwd() {
  const [isGetting, setIsGetting] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [form] = Form.useForm();
  const { getFieldValue } = form;
  const onFinish = (values: any) => {
    window.$api.user.patchResetPassword(values).then(() => {
      message.success('修改密码成功,请登录');
      history.push('/login');
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
      window.$api.user.postSms({ tel }).then(() => {
        timer = setInterval(() => {
          setSeconds((preSeconds) => preSeconds - 1);
          setIsGetting(true);
        }, 1000);
      });
    } else {
      message.error('请输入正确的手机号码！');
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_wrap}>
        <Form
          name="findPwd"
          initialValues={{ remember: true }}
          onFinish={(value) => onFinish(value)}
          id="height42"
          form={form}
        >
          <Form.Item name="tel" rules={[{ required: true, message: '请输入手机号!' }]}>
            <Input prefix={<UserOutlined />} placeholder="请输入手机号" />
          </Form.Item>
          <div className={styles.code_wrap}>
            <Form.Item name="code" rules={[{ required: true, message: '请输入接收到的验证码!' }]}>
              <Input prefix={<LockOutlined />} placeholder="请输入收到的验证码" />
            </Form.Item>
            <Button
              className={styles.fetch_btn}
              type="primary"
              onClick={fetchVcode}
              loading={isGetting}
              style={{ width: isGetting ? 140 : 102 }}
            >
              {isGetting ? `${seconds}s后重新获取` : '获取验证码'}
            </Button>
          </div>
          <Form.Item name="password" rules={[{ required: true, message: '请输入新密码!' }]}>
            <Input.Password className="passwod" prefix={<LockOutlined />} placeholder="新密码" />
          </Form.Item>
          <Form.Item>
            <div className={styles.forgot}>
              <Link to="/login">返回登录</Link>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              修改密码
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.version}>Version 2.4.0</div>
    </div>
  );
}

export default FindPwd;
