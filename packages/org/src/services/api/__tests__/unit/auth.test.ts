import 'jest';
import auth from '@/services/api/auth';

jest.mock('@/services/api/auth', () => {
  return {
    token: jest.fn(() =>
      Promise.resolve({
        data: {},
        status: 'success',
      }),
    ),
  };
});

describe('测试Services: auth', () => {
  it('auth: token 返回正确', () =>
    expect(auth.token({})).resolves.toMatchObject({
      data: {},
      status: 'success',
    }));
});
