import 'jest';
import React from 'react';
import Report from '..';
import { render, RenderResult } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
let wrapper: RenderResult;

describe('报告页面', () => {
  beforeEach(() => {
    wrapper = render(<Router>
      < Report />
    </Router>)
  })
  it('匹配快照', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('ui渲染正确， 一个img,两个p', () => {
    const emptyImg = wrapper.getByAltText('暂无主观量表');
    expect(emptyImg).toBeInTheDocument();
    expect(wrapper.container.querySelectorAll('p').length).toBe(2);
  })
  it('a链接正确', () => {
    expect(wrapper.getByTestId('link').getAttribute('href')).toMatch(/\/query/)
  });
});
