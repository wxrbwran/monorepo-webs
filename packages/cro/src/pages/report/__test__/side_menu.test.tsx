import React from 'react';
import SideMenu from '../components/side_menu';
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

let wrapper: RenderResult;
const props = {
  location: {
    pathname: 'report/detail',
    query: {
      reportId: 'rw9GB8'
    }
  },
  reportList: [
    {
      id: 'rw9GB8',
      name: '报告1'
    },
    {
      id: 'rw9222',
      name: '报告2'
    }
  ]
}
describe('报告页面，侧边栏', () => {
  console.log('history', history)
  beforeEach(() => {
    wrapper = render(<Router><SideMenu {...props} /></Router>)
  });
  it('匹配快照', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('报告列表渲染正常', () => {
   const listItems = wrapper.container.getElementsByClassName('item');
   expect(listItems.length).toBe(2);
  })
  it('默认首条报告为选中状态，测试其a链接href正确性', () => {
    const activeItem = wrapper.container.getElementsByClassName('active')[0];
    const activeItemLink = activeItem.querySelector('a')?.getAttribute('href');
    expect(activeItemLink).toBe(`/report/detail?reportId=${props.reportList[0].id}`);
  })
  it('点击第二个报告名字，则第二个为选中状态', () => {
    const twoItem = wrapper.container.getElementsByClassName('item')[1];
    fireEvent.click(twoItem);
    const activeItem = wrapper.container.getElementsByClassName('active')[0];
    const activeItemLink = activeItem.querySelector('a')?.getAttribute('href');
    expect(activeItemLink).toBe(`/report/detail?reportId=${props.reportList[1].id}`);
  })
})
