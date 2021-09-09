import 'jest';
import React from 'react';
import QueryCondition from '../components/query_condition';
import { render, RenderResult } from '@testing-library/react';
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
const props1 = {
  searchStatus: 2,
  changeSearchStatus: jest.fn(),
  handleSearchData: jest.fn() // 点击继续搜索
}
const props2 = {
  searchStatus: 3,
  changeSearchStatus: jest.fn(),
  handleSearchData: jest.fn() // 点击继续搜索
}
describe('查询页面：查询结果页', () => {
  let wrapper: RenderResult;
  // it('匹配快照', () => {
  //   expect(wrapper).toMatchSnapshot();
  // })
  it('状态1：显示继续筛选按钮', async() => {
    wrapper = render(<Provider store={store}><QueryCondition {...props1} /></Provider>)
    const continueSearch = wrapper.getByText('继续筛选');
    expect(continueSearch).toBeVisible();
    expect(wrapper.queryByText('清除全部')).toBeNull();
  })
  // it('状态2：点击继续筛选后，显示清除全部和继续搜索按钮', async () => {
    // wrapper = render(<Provider store={store}><QueryCondition {...props2} /></Provider>)
    // const continueSearch = wrapper.queryByText('继续筛选');
    // expect(continueSearch).toBeNull();
    // const clearAll = wrapper.getByText('清除全部');
    // expect(clearAll).toBeVisible();
    // const searchBtn = wrapper.getByText('继续搜索');
    // expect(searchBtn).toBeVisible();
  // })
})