import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { history, useDispatch } from 'umi';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import config from '@/config';
import SecurityLayout from './SecurityLayout';
import 'moment/locale/zh-cn';

interface IProps {
  children: React.ReactElement;
  location: Location;
}
moment.locale('zh-cn');
export default (props: IProps) => {
  const dispatch = useDispatch();
  const { children, location } = props;
  const logPages: string[] = ['/login', '/find_pwd'];
  const isLogin = window.$storage.getItem('access_token');
  // 登录、注册和忘记密码等不需要验证的界面
  const isNonAuthPage = logPages.includes(location.pathname);

  let child: React.ReactElement | null = children;
  const authPages = <SecurityLayout location={location}>{children}</SecurityLayout>;

  useEffect(() => {
    if (!isLogin) {
      dispatch({
        type: 'auth/login',
      });
    }
  }, [isLogin]);

  // 已登录，去往需验证页面
  if (isLogin && !isNonAuthPage) {
    console.log(333111);
    child = authPages;
  }
  // 已登录，去往登录等页面
  if (isLogin && isNonAuthPage) {
    console.log(3331112);
    child = null;
    history.push('/patients');
  }
  // 未登录，去往登录等页面
  // if (!isLogin && isNonAuthPage) {
  //   console.log(3331113);
  //   child = children;
  // }
  // 未登录，去往需验证等页面
  if (!isLogin && isNonAuthPage) {
    console.log(3331114);
    if (process.env.NODE_ENV === 'production') {
      child = null;
      window.location.href = config.LOGIN;
    } else {
      child = children;
    }

  }
  return (
    <ConfigProvider locale={zhCN}>
      {child}
    </ConfigProvider>
  );
};
