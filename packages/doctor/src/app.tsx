import { message } from 'antd';
import { createLogger } from 'redux-logger';
// 运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等。
import storage from 'dva-model-persist/lib/storage';
import { persistEnhancer } from 'xzl-web-shared/src/utils/dva-model-persist';
import errorPage from '@/pages/404';

// @ts-ignore
export function patchRoutes({ routes }: React) {
  routes[0].routes.push({
    path: '*',
    component: errorPage,
  });
}

export const dva = {
  config: {
    extraEnhancers: [
      persistEnhancer({
        key: 'doctor',
        storage,
        blacklist: ['im', 'user'],
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
// export function onRouteChange({ location, routes, action }) {
//   console.log('______1', location);
//   console.log('______2', routes);
//   console.log('______3', action);
// }
// eslint-disable-next-line import/prefer-default-export
// export const dva = {
//   config: {
//     onAction: createLogger(),
//     onError(e:Error) {
//       message.error(e.message, 3);
//     },
//   },
// };
