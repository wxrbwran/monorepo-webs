import 'jest';
import React from 'react';
import PagerBill from '../pager_bill';
import { render, RenderResult, fireEvent} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({
  query: {
    images: [],
    other: [],
    base: {}
  },
});

describe('查询页面：纸质单据', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = render(<Provider store={store}><PagerBill /></Provider>)
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
})