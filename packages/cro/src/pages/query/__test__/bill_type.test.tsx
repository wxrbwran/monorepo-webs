import 'jest';
import React from 'react';
import BillType from '../components/bill_type';
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react';
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
const laboratoryType = [
  {
    key: 'SHQX',
    value: '生化全项',
  }, {
    key: 'XCG',
    value: '血常规',
  }, {
    key: 'BCG',
    value: '便常规',
  }
]

const checkType = [
  {
    key: 'XZCS',
    value: '超声',
  }, {
    key: 'XDT',
    value: '心电图',
  }
]
const laboratoryPorps = {
  laboratoryType: laboratoryType,
  toggleTab: jest.fn(),
  billType: 'LABORATORY'
}
const checkPorps = {
  laboratoryType: checkType,
  toggleTab: jest.fn(),
  billType: 'CHECK'
}
describe('查询页面：化验单选择组件', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = render(<Provider store={store}><BillType {...laboratoryPorps} /></Provider>)
  })
  it('匹配快照', () => {
    expect(wrapper).toMatchSnapshot();
    // wrapper.debug();
  })
  // it('勾选化验单类型后，显示时间选择框', async() => {
  //   const checkbox = wrapper.getByTestId('checkbox0');
  //   fireEvent.change(checkbox, {
  //     target: { checked: true }
  //   })
  //   await waitFor(() => {
  //     // expect(wrapper.getByTestId('time0')).toBeVisible();
  //   })
  // })
})
// describe('查询页面：检查单选择组件', () => {
//   let wrapper: RenderResult;
//   beforeEach(() => {
//     wrapper = render(<Provider store={store}><BillType {...checkPorps} /></Provider>)
//   })
// })