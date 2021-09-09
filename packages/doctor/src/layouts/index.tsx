import React from 'react';
import { ConfigProvider } from 'antd';
import { history } from 'umi';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import SecurityLayout from './SecurityLayout';
import 'moment/locale/zh-cn';

interface IProps {
  children: React.ReactElement;
  location: Location;
}
moment.locale('zh-cn');
export default (props: IProps) => {
  const { children, location } = props;
  const logPages: string[] = ['/login', '/find_pwd'];
  const isLogin = window.$storage.getItem('access_token');
  // 登录、注册和忘记密码等不需要验证的界面
  const isNonAuthPage = logPages.includes(location.pathname);

  let child: React.ReactElement | null = children;
  const authPages = <SecurityLayout location={location}>{children}</SecurityLayout>;
  // 已登录，去往需验证页面
  if (isLogin && !isNonAuthPage) {
    // console.log(333111);
    child = authPages;
  }
  // 已登录，去往登录等页面
  if (isLogin && isNonAuthPage) {
    // console.log(3331112);
    child = null;
    history.push('/doctor/patients/alone');
  }
  // 未登录，去往登录等页面
  if (!isLogin && isNonAuthPage) {
    // console.log(3331113);
    child = children;
  }
  // 未登录，去往需验证等页面
  if (!isLogin && !isNonAuthPage) {
    // console.log(3331114);
    child = null;
    history.push('/login');
  }
  return (
    <ConfigProvider locale={zhCN}>
      {child}
    </ConfigProvider>
  );
};
