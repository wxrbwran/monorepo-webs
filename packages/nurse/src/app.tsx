import { message } from 'antd';
import { createLogger } from 'redux-logger';
// 运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等。
import storage from 'xzl-web-shared/dist/src/utils/dva-model-persist/storage';
import { persistEnhancer } from 'xzl-web-shared/dist/src/utils/dva-model-persist';
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
        key: 'xzl-web-nurse',
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

