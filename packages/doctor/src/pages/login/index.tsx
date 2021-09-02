/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import {
  Form, Input, Button, message, Menu, Dropdown,
} from 'antd';
import { Button as Button1 } from 'xzl-web-shared/dist/src'
import { CaretDownOutlined } from '@ant-design/icons';
import QRCode from 'qrcode.react';
import { FormProps } from 'antd/lib/form';
import { Link } from 'umi';
import { useDispatch } from 'react-redux';
import * as api from '@/services/api';
import { setXzlClientId } from '@/services/http';
// import config from '@/config';
import { clientType } from '@/utils/consts';
import logo from '@/assets/img/logo.svg';
import refresh from '@/assets/img/refresh.svg';
import styles from './index.scss';

function Login() {
  const dispatch = useDispatch();
  const [codeLogin, setCodeLogin] = useState(false); // 二维码登录/账号密码登录
  const [qrcode, setQrCode] = useState(''); // 二维码value
  const [key, setCurrentKey] = useState('DOCTOR'); // 当前是哪个端(医生/护士/院外)
  const [showMask, setShowMask] = useState(false); // 是否显示刷新二维码遮罩

  const clientObj = {
    DOCTOR: 'xzl-web-doctor',
    NURSE: 'xzl-web-nurse',
    OUTPATIENT: 'xzl-web-out-org',
  };
  const createUuid = () => {
    api.auth.createUuid().then((res) => {
      setQrCode(res.uuid);
      setShowMask(false);
    })
      .catch((err) => {
        console.log('err', err);
      });
  };
  useEffect(() => {
    if (codeLogin && !qrcode) {
      createUuid();
    }
    setXzlClientId('xzl-web-doctor');
  }, [codeLogin]);

  const setUuidInvalid = async () => {
    if (qrcode) {
      clearInterval(window.$timer);
      setQrCode('');
      await api.auth.uuidInvalid({ uuid: qrcode });
    }
  };
  useEffect(() => {
    if (qrcode) {
      const start = Date.now();
      const timer = setInterval(async () => {
        if (Date.now() - start > 60 * 1000) {
          // clearInterval(timer);
          setShowMask(true);
          setUuidInvalid();
        }
        const results = await api.auth.fetchLoginInfo({ uuid: qrcode });
        console.log('results', results);
        if (results) {
          dispatch({
            type: 'auth/login',
            payload: {
              ...results,
              clientId: clientObj[key],
            },
          });
          clearInterval(timer);
          await api.auth.loginSign({ uuid: qrcode });
        }
      }, 2000);
      window.$timer = timer;
    }
  }, [qrcode]);
  const onFinish = async (values: FormProps) => {
    console.log('Success:', values);
    const params = {
      ...values,
      authType: 'password_type',
      clientId: clientObj[key],
    };
    console.log('dispatch', dispatch);
    if (dispatch) {
      dispatch({
        type: 'auth/login',
        payload: params,
      });
      clearInterval(window.$timer);
    }
  };
  const onFinishFailed = () => {
    message.error('请输入正常的用户名和密码');
  };
  const changeLoginWay = async () => {
    setCodeLogin(!codeLogin);
    if (codeLogin) {
      setUuidInvalid();
    }
  };
  const changeMenu = (e: { key: string }) => {
    if (key !== e.key) {
      setCurrentKey(e.key);
      setXzlClientId(clientObj[e.key]);
      setCodeLogin(false);
      setUuidInvalid();
      // if (e.key === 'DOCTOR') {
      //   setCodeLogin(true);
      //   createUuid();
      // } else {
      //   setCodeLogin(false);
      // }
    }
  };
  const menu = (
    <Menu onClick={changeMenu}>
      <Menu.Item key="DOCTOR">
        <span className="sign">·</span>
        医生端
      </Menu.Item>
      <Menu.Item key="NURSE">
        <span className="sign">·</span>
        护士端
      </Menu.Item>
      <Menu.Item key="OUTPATIENT">
        <span className="sign">·</span>
        院外管理端
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.login}>
      <Button1>asdasd</Button1>
      <Dropdown overlay={menu} overlayClassName={styles.role}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          {clientType[key]}
          <CaretDownOutlined />
        </a>
      </Dropdown>
      <div className={styles.login_wrap}>
        <div className={styles.title}>
          <img src={logo} alt="" className="mb-8" />
          <p>{codeLogin ? '请使用最新版医生端APP扫码登录' : '账号密码登录'}</p>
        </div>
        <div className="px-50 relative">
          {codeLogin && (
            <>
              {showMask && (
                <div className={styles.qrcode}>
                  <p>您的二维码已失效</p>
                  <p>点击下方刷新按钮</p>
                  <img src={refresh} className="w-40 h-40 mt-10" alt="" onClick={createUuid} />
                </div>
              )}
              <QRCode size={200} value={qrcode} />
            </>
          )}
          {!codeLogin && (
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={(value: FormProps) => onFinish(value)}
              onFinishFailed={onFinishFailed}
              id="height42"
            >
              <Form.Item noStyle>
                <span className="text-base mb-13 inline-block">手机号</span>
              </Form.Item>
              <Form.Item
                name="account"
                rules={[{ required: true, message: '请输入用户名或手机号!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item noStyle>
                <span className="text-base mb-13 inline-block">登录密码</span>
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                <Input.Password className="passwod" placeholder="密码" />
              </Form.Item>
              <Form.Item noStyle>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
              {key !== 'OUTPATIENT' && (
                <Form.Item noStyle>
                  <div className={styles.forgot}>
                    <Link to="/find_pwd">忘记密码?</Link>
                  </div>
                </Form.Item>
              )}
            </Form>
          )}
        </div>
        {key === 'DOCTOR' && (
          <div className={styles.footer} onClick={changeLoginWay}>
            {codeLogin ? '账号密码登录' : '扫码登录'}
          </div>
        )}
      </div>
      {/* <a
        href={config.OUT_HOSPITAL_PATIENT}
        id="go_out_hospital" target="_blank" rel="noopener noreferrer"> </a>
      <a
        href={config.XZL_WEB_NURSE}
        id="xzl_web_nurse" target="_blank" rel="noopener noreferrer"> </a> */}
      {/* <a href={config.CLINICAL_CRO} id="go_cro" target="_blank" rel="noopener noreferrer"/> */}
      <div className={styles.version}>Version 2.4.0</div>
    </div>
  );
}
Login.title = '登录';
export default Login;
