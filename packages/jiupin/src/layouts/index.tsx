import type { FC } from 'react';
import React from 'react';
import { ConfigProvider } from 'antd';
import type { IRoute } from 'umi';
import { useHistory, useLocation, useStore } from 'umi';
import zhCN from 'antd/es/locale/zh_CN';
import styles from './index.scss';

const logPages: string[] = ['/login', '/find_pwd'];

const BasicLayout: FC = (props: IRoute) => {
  const location = useLocation();
  const history = useHistory();
  const isLogin = window.$storage.getItem('access_token');
  console.log('isLogin', isLogin);
  const store = useStore();
  if (!window?.$store) {
    window.$store = window.$store || store;
  }
  const isGoLoginSome = logPages.includes(location.pathname);
  // 已登录，去往登录等页面
  if (isLogin && isGoLoginSome) {
    history.push('/personnel/org-structure');
  }
  // 未登录，去往需验证等页面
  if (!isLogin && !isGoLoginSome) {
    history.push('/login');
  }
  return (
    <ConfigProvider locale={zhCN}>
      {
        (isLogin || isGoLoginSome) && (
          <div className={styles.main}>{props.children}</div>
        )
      }
    </ConfigProvider>
  );
};

export default BasicLayout;
