import 'jest';
import React from 'react';
import Query from '../index';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore();
let wrapper: RenderResult;
const store = mockStore({
  query: {
    images: [],
    other: [],
    base: {}
  }
});
describe('查询index页面', () => {
  beforeEach(() => {
    wrapper = render(<Provider store={store}><Query /></Provider>)
  })
  it('匹配快照', () => {
    expect(wrapper).toMatchSnapshot();
  })
  it('渲染正常：条件区域，一个搜索按钮，一个搜索历史按钮', () => {
    const historyBtn = wrapper.getByText('搜索历史');
    expect(historyBtn).toBeInTheDocument();
    const searchBtn = wrapper.getByTestId('search');
    expect(searchBtn).toBeInTheDocument();
    const condition = wrapper.getByText('您已选择：');
    expect(condition).toBeInTheDocument();
  })
})