import 'jest';
import React from 'react';
import dva from 'dva';
import AuthModel from '../auth';

jest.mock('@/services/api', () => {
  return {
    auth: {
      token: jest.fn(() =>
        Promise.resolve({
          data: {
            accessToken: 'accessToken',
            yxRegister: {
              accid: 'login_accid',
            },
            wcl: [{ roles: [{ subject: { id: 'subjectId' } }] }],
          },
          status: 'success',
        }),
      ),
    },
  };
});

let app: any = null;
beforeAll(() => {
  app = dva({});
  app.model(AuthModel);
  app.router(() => <div />);
  app.start();
});

describe('models: auth', () => {
  it('Model namespace: auth', () => {
    expect(AuthModel.namespace).toBe('auth');
  });
  describe('测试reducer', () => {
    it('changeLoginStatus: 应该登录成功, 并改变state值值', () => {
      const payload = {
        yxRegister: {
          accid: 'accid',
        },
      };
      app._store.dispatch({
        type: 'auth/changeLoginStatus',
        payload,
      });
      expect(app._store.getState().auth.uid).toEqual('accid');
    });

    it('logout: 登出成功, uid未空', () => {
      app._store.dispatch({
        type: 'auth/logout',
      });
      expect(app._store.getState().auth).toEqual({
        isLogin: false,
        uid: '',
      });
    });
  });
  describe('测试effects', () => {
    it('*login: 发起登录, 改变state值', (done) => {
      app._store
        .dispatch({
          type: 'auth/login',
          payload: { account: '1', password: '2' },
        })
        .then(() => {
          // console.log('state1', app._store.getState());
          expect(app._store.getState().auth.uid).toEqual('login_accid');
          expect(app._store.getState().auth.isLogin).toEqual(true);
          done();
        });
    });
  });
});
