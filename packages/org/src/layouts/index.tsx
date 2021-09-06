import React, { FC } from 'react';
import { IRoute, history } from 'umi';
import { ConfigProvider } from 'antd';
// import Ohbug from '@ohbug/browser';
// import OhbugReact from '@ohbug/react';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import SecurityLayout from './SecurityLayout';

const logPages: string[] = ['/user/login', '/user/find_pwd'];
const componentSize = 'middle';
moment.locale('zh-cn');
// const client = Ohbug.init({
//   apiKey: '21c2e7233d696f6ce36eaa62bf2088a047fc953337b24905189c1b17b09dde6f',
//   endpoint: 'http://localhost:6660/report',
// });
// const OhbugErrorBoundary = client.use(OhbugReact, React);
const BasicLayout: FC = (props: IRoute) => {
  const { location, children } = props;
  const accessToken = window.$storage.getItem('access_token');
  const isLogin = !!accessToken;
  // 登录、注册和忘记密码等不需要验证的界面
  const isNonAuthPage = logPages.includes(location.pathname);

  const authPages = <SecurityLayout>{children}</SecurityLayout>;
  let child = children;
  console.log('isLogin', isLogin, 'isNonAuthPage', isNonAuthPage);

  // 已登录，去往需验证页面
  if (isLogin && !isNonAuthPage) {
    child = authPages;
  }
  // 已登录，去往登录等页面
  if (isLogin && isNonAuthPage) {
    child = null;
    history.push('/root_org');
  }
  // 未登录，去往登录等页面
  if (!isLogin && isNonAuthPage) {
    child = children;
  }

  // 未登录，去往需验证等页面
  if (!isLogin && !isNonAuthPage) {
    child = null;
    history.push('/user/login');
  }
  return (
    <ConfigProvider locale={zhCN} componentSize={componentSize}>
      {child}
    </ConfigProvider>
  );
};

export default BasicLayout;
