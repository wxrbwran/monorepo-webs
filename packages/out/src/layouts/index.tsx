import type { FC } from 'react';
import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import config from '@/config';
import type { IRoute } from 'umi';
import { history, useDispatch, useSelector, useLocation, useStore } from 'umi';
import zhCN from 'antd/es/locale/zh_CN';
import '@/im_staffs/actions/rtcSupport';
import styles from './index.scss';

const logPages: string[] = ['/user/login', '/user/find_pwd'];

const BasicLayout: FC = (props: IRoute) => {
  const location = useLocation();
  const { isLogin } = useSelector(state => state.auth);
  const connected = useSelector((state: IState) => state.im.connected);
  const dispatch = useDispatch();
  const store = useStore();
  if (!window?.$store) {
    window.$store = window.$store || store;
  }
  const isGoLoginSome = logPages.includes(location.pathname);
  useEffect(() => {
    if (!isLogin){
      dispatch({
        type: 'auth/login',
      });
    } else {
      if (!connected) {
        new Promise((resolve) => {
          dispatch({
            type: 'im/initNIMSDK',
            payload: { resolve },
          });
        });
      }
    }
  }, [isLogin]);
  // 已登录，去往登录等页面
  if (isLogin && isGoLoginSome) {
    history.push('/data-statistics');
  }
  // 未登录，去往需验证等页面
  if (!isLogin && isGoLoginSome) {
    window.location.href = config.LOGIN;
  }
  return (
    <ConfigProvider locale={zhCN}>
      {
        isLogin && (
          <div className={styles.main}>{props.children}</div>
        )
      }
    </ConfigProvider>
  );
};

export default BasicLayout;
