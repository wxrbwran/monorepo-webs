// import { persistEnhancer } from 'dva-model-persist';
import { message } from 'antd';
import { createLogger } from 'redux-logger';
import { persistEnhancer } from '@/utils/dva-model-persist';
import storage from 'dva-model-persist/lib/storage';

export function patchRoutes({ routes }) {
  routes[0].routes.push({
    path: '*',
    component: require('@/pages/404').default,
  });
};

export const dva = {
  config: {
    extraEnhancers: [
      persistEnhancer({
        key: 'clinical-cro',
        storage,
        blacklist: ['query'],
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
