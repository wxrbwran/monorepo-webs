// 运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等。
/* eslint-disable  */

import React from 'react';
import type { Settings as LayoutSettings } from 'umi';
import { message } from 'antd';
import { createLogger } from 'redux-logger';
import type { BasicLayoutProps } from '@ant-design/pro-layout';
import RightContent from '@/components/RightContent';

import routes from '@/routes';
import storage from 'xzl-web-shared/dist/src/utils/dva-model-persist/storage';
import { persistEnhancer } from 'xzl-web-shared/dist/src/utils/dva-model-persist';
// import Icon, { SmileOutlined, HeartOutlined, CrownOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';
import { PieChartOutlined } from '@ant-design/icons';
import { Icon1, Icon2, Icon3, Icon4, Icon5, Icon6 } from '@/utils/menuIcon';
// import icont from '@/assets/img/menuIcon/icongx1.svg';

const IconMap = {
  Icon0: <PieChartOutlined />,
  Icon1: <Icon1 />,
  Icon2: <Icon2 />,
  Icon3: <Icon3 />,
  Icon4: <Icon4 />,
  Icon5: <Icon5 />,
  Icon6: <Icon6 />,
  // menuIcon: <img src={icont} />
};
export const dva = {
  config: {
    extraEnhancers: [
      persistEnhancer({
        key: 'out-hospital-patient',
        storage,
        blacklist: ['im'],
      }),
    ],
    onAction: createLogger(),
    onError(e) {
      e.preventDefault();
      console.log('dva error **********', e);
      const msg = e.message || e.result;
      message.error(msg);
    },
  },
};
const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, children, ...item }) => {
    const isOpenSub = window.location.href.includes('openSub') || sessionStorage.getItem('openSub');
    if (isOpenSub) {
      sessionStorage.setItem('openSub', 'true');
    } // 防刷新
    if (!isOpenSub || item.name === '院外管理（科室、人员）') {
      return {
        ...item,
        icon: icon && IconMap[icon as string],
        children: children && loopMenuItem(children),
      };
    }
  });

export async function getInitialState(): Promise<{
  menuData: any[];
  settings?: LayoutSettings;
}> {
  // // 如果是登录页面，不执行
  // if (!['/user/login'].includes(history.location.pathname)) {
  //   const acRoles = localStorage.getItem('acRoles');
  //   let menuData = routes;
  //   if (acRoles) {
  //     console.log(acRoles.split(','));
  //     // menuData = handleACRolesRote(acRoles.split(','));
  //   }
  //   return {
  //     menuData,
  //     settings: defaultSettings,
  //   };
  // }
  // return {
  //   menuData: [],
  //   settings: defaultSettings,
  // };
  return {
    menuData: routes,
    settings: defaultSettings,
  };
}

export const layout = ({
  initialState,
}: {
  initialState: {
    settings?: LayoutSettings;
    menuData: Promise<BasicLayoutProps>;
  };
}): BasicLayoutProps => {
  return {
    menuDataRender: () => loopMenuItem(routes),
    rightContentRender: () => <RightContent></RightContent>,
    onPageChange: (location) => {
      document.title = '院外病人管理系统';
      console.log('onPageChange', location);
    },
    title: '院外病人管理系统',
    ...initialState?.settings,
  };
};
