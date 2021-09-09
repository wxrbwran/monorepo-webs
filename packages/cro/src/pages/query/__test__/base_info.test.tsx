import 'jest';
import React from 'react';
import BaseInfo from '../base_info';
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { wrap } from 'module';

const mockStore = configureMockStore();
const store = mockStore({});
store.dispatch = jest.fn();
const dispatch = store.dispatch;

describe('查询页面：基本资料', () => {
  let wrapper: RenderResult;
  let minAge: HTMLElement;
  let maxAge: HTMLElement;
  let ageBtn: HTMLElement;
  beforeEach(() => {
    wrapper = render(<Provider store={store}><BaseInfo /></Provider>)
    minAge = wrapper.getByTestId('minAge');
    maxAge = wrapper.getByTestId('maxAge');
    ageBtn = wrapper.getByTestId('ageBtn');
  })
  it('匹配快照', () => {
    expect(wrapper).toMatchSnapshot();
  })
  it('点击箭头，输入框显示或隐藏', () => {
    const contInputWrap = wrapper.getByTestId('isShow0');
    expect(contInputWrap).not.toBeVisible();
    const changeTab = wrapper.getByTestId('changeTab0');
    fireEvent.click(changeTab);
    expect(contInputWrap).toBeVisible();
    fireEvent.click(changeTab);
    expect(contInputWrap).not.toBeVisible();
  })
  it('max必须大于min数值', async () => {
    
    fireEvent.change(minAge, { target: { value: 20 } });
    fireEvent.change(maxAge, { target: { value: 10 } });
    fireEvent.click(ageBtn);
    await waitFor(() => {
      const errorInfo = wrapper.getByText('请输入正确数值区间');
      expect(errorInfo).toBeInTheDocument();
    })
  })
  it('最小值不能小于0', async () => {
    fireEvent.change(minAge, { target: { value: -10 } });
    fireEvent.change(maxAge, { target: { value: 10 } });
    fireEvent.click(ageBtn);
    await waitFor(() => {
      const errorInfo = wrapper.getByText('请输入正确数值');
      expect(errorInfo).toBeInTheDocument();
      // wrapper.debug();
    })
  })
  it('输入符合规范的年龄后，触发dispatch', () => {
    fireEvent.change(minAge, { target: { value: 20 } });
    fireEvent.change(maxAge, { target: { value: 60 } });
    fireEvent.click(ageBtn);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'query/setBaseVal',
      payload: {
        minAge: 20,
        maxAge: 60
      }
    })
  })
})