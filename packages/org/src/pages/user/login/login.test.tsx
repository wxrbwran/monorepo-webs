import 'jest';
import React from 'react';
import { useDispatch } from 'umi';
import { Link, Route, BrowserRouter as Router, Switch, useLocation } from 'react-router-dom';
import { render as rtlRender, fireEvent, screen, cleanup } from '@testing-library/react';
import { sleep } from '@/utils/tools';
import userEvent from '@testing-library/user-event';
import Login from './index';
import { act } from 'react-dom/test-utils';
import { user } from '@/services/api';

jest.useFakeTimers();

const mockDispatch = jest.fn(() => {
  return Promise.resolve();
});
const mockPush = jest.fn();
jest.mock('umi', () => ({
  useSelector: jest.fn(),
  useDispatch: () => {
    return mockDispatch;
  },
}));

jest.mock('@/services/api', () => {
  return {
    auth: {
      token: jest.fn(() => {
        return Promise.resolve({ data: { info: {} }, status: 'success' });
      }),
    },
  };
});

const render = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Login page', route);

  return rtlRender(ui, { wrapper: Router });
};

let renderedElement: any = null;
beforeAll(() => {});
beforeEach(() => {
  renderedElement = render(<Login />);
});
afterEach(() => {
  // cleanup();
});
afterAll(() => {
  // renderedElement = null;
});

describe('首页', () => {
  it('匹配快照', () => {
    const wrapper = renderedElement.container;
    // console.log(renderedElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('渲染正确 一个form，两个input, 一个button', () => {
    const form = screen.getByTestId('form');
    const username = screen.getByPlaceholderText('用户名');
    const password = screen.getByPlaceholderText('密码');
    const loginBtn = screen.getByTestId('loginBtn');

    expect(form).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });

  it('点击表单button，不调用dispatch', async () => {
    const loginBtn = screen.getByTestId('loginBtn');
    act(() => {
      const username = screen.getByPlaceholderText('用户名');
      const password = screen.getByPlaceholderText('密码');
      userEvent.type(username, 'username111');
      userEvent.type(password, 'password222');
      userEvent.click(loginBtn);
    });
    // expect(mockDispatch).toBeCalledTimes(1);
    // expect(mockPush).toBeCalledTimes(1);
    // const warningUsername = screen.getByText('请输入用户名或手机号!');
    // const warningPassword = screen.getByText('请输入密码 !');
    // expect(warningUsername).toBeInTheDocument();
    // expect(warningPassword).toBeInTheDocument();
  });
});

/*********
 *
 *
 * baseElement: HTMLBodyElement {},
      debug: [Function: debug],
      unmount: [Function: unmount],
      rerender: [Function: rerender],
      asFragment: [Function: asFragment],
      queryAllByLabelText: [Function: bound ],
      queryByLabelText: [Function: bound ],
      getAllByLabelText: [Function: bound ],
      getByLabelText: [Function: bound ],
      findAllByLabelText: [Function: bound ],
      findByLabelText: [Function: bound ],
      queryByPlaceholderText: [Function: bound ],
      queryAllByPlaceholderText: [Function: bound ],
      getByPlaceholderText: [Function: bound ],
      getAllByPlaceholderText: [Function: bound ],
      findAllByPlaceholderText: [Function: bound ],
      findByPlaceholderText: [Function: bound ],
      queryByText: [Function: bound ],
      queryAllByText: [Function: bound ],
      getByText: [Function: bound ],
      getAllByText: [Function: bound ],
      findAllByText: [Function: bound ],
      findByText: [Function: bound ],
      queryByDisplayValue: [Function: bound ],
      queryAllByDisplayValue: [Function: bound ],
      getByDisplayValue: [Function: bound ],
      getAllByDisplayValue: [Function: bound ],
      findAllByDisplayValue: [Function: bound ],
      findByDisplayValue: [Function: bound ],
      queryByAltText: [Function: bound ],
      queryAllByAltText: [Function: bound ],
      getByAltText: [Function: bound ],
      getAllByAltText: [Function: bound ],
      findAllByAltText: [Function: bound ],
      findByAltText: [Function: bound ],
      queryByTitle: [Function: bound ],
      queryAllByTitle: [Function: bound ],
      getByTitle: [Function: bound ],
      getAllByTitle: [Function: bound ],
      findAllByTitle: [Function: bound ],
      findByTitle: [Function: bound ],
      queryByRole: [Function: bound ],
      queryAllByRole: [Function: bound ],
      getAllByRole: [Function: bound ],
      getByRole: [Function: bound ],
      findAllByRole: [Function: bound ],
      findByRole: [Function: bound ],
      queryByTestId: [Function: bound ],
      queryAllByTestId: [Function: bound ],
      getByTestId: [Function: bound ],
      getAllByTestId: [Function: bound ],
      findAllByTestId: [Function: bound ],
      findByTestId: [Function: bound ]baseElement: HTMLBodyElement {},
      debug: [Function: debug],
      unmount: [Function: unmount],
      rerender: [Function: rerender],
      asFragment: [Function: asFragment],
      queryAllByLabelText: [Function: bound ],
      queryByLabelText: [Function: bound ],
      getAllByLabelText: [Function: bound ],
      getByLabelText: [Function: bound ],
      findAllByLabelText: [Function: bound ],
      findByLabelText: [Function: bound ],
      queryByPlaceholderText: [Function: bound ],
      queryAllByPlaceholderText: [Function: bound ],
      getByPlaceholderText: [Function: bound ],
      getAllByPlaceholderText: [Function: bound ],
      findAllByPlaceholderText: [Function: bound ],
      findByPlaceholderText: [Function: bound ],
      queryByText: [Function: bound ],
      queryAllByText: [Function: bound ],
      getByText: [Function: bound ],
      getAllByText: [Function: bound ],
      findAllByText: [Function: bound ],
      findByText: [Function: bound ],
      queryByDisplayValue: [Function: bound ],
      queryAllByDisplayValue: [Function: bound ],
      getByDisplayValue: [Function: bound ],
      getAllByDisplayValue: [Function: bound ],
      findAllByDisplayValue: [Function: bound ],
      findByDisplayValue: [Function: bound ],
      queryByAltText: [Function: bound ],
      queryAllByAltText: [Function: bound ],
      getByAltText: [Function: bound ],
      getAllByAltText: [Function: bound ],
      findAllByAltText: [Function: bound ],
      findByAltText: [Function: bound ],
      queryByTitle: [Function: bound ],
      queryAllByTitle: [Function: bound ],
      getByTitle: [Function: bound ],
      getAllByTitle: [Function: bound ],
      findAllByTitle: [Function: bound ],
      findByTitle: [Function: bound ],
      queryByRole: [Function: bound ],
      queryAllByRole: [Function: bound ],
      getAllByRole: [Function: bound ],
      getByRole: [Function: bound ],
      findAllByRole: [Function: bound ],
      findByRole: [Function: bound ],
      queryByTestId: [Function: bound ],
      queryAllByTestId: [Function: bound ],
      getByTestId: [Function: bound ],
      getAllByTestId: [Function: bound ],
      findAllByTestId: [Function: bound ],
      findByTestId: [Function: bound ]
 */
