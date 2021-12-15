// 运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等。

import { createLogger } from 'redux-logger';
// import { getDvaApp, history } from 'umi';
import { message } from 'antd';
import storage from 'xzl-web-shared/dist/src/utils/dva-model-persist/storage/session';
import { persistEnhancer } from 'xzl-web-shared/dist/src/utils/dva-model-persist';
import page404 from '@/pages/404';
export const dva = {
  config: {
    extraEnhancers: [
      persistEnhancer({
        key: 'xzlAdmin',
        storage,
      }),
    ],
    onAction: createLogger(),
    onError(e) {
      e.preventDefault();
      const msg = e.result || e.message;
      message.error(msg, 2);
    },
  },
};

export function onRouteChange({ matchedRoutes }) {
  if (matchedRoutes.length) {
    document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
  }
}
/*eslint-disable*/
export function patchRoutes({ routes }) {
  console.log('patchRoutes routes', routes);
  routes[0].routes.push({
    path: '*',
    component: page404,
  });
}
