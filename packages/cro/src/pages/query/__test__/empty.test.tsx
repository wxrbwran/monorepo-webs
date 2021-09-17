import 'jest';
import React from 'react';
import Empty from '../components/empty';
import { render, RenderResult} from '@testing-library/react';

describe('查询页面：查询结果没有找到想着数据', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = render(<Empty />)
  })
  it('匹配快照', () => {
    expect(wrapper).toMatchSnapshot();
    // wrapper.debug();
  })
  it('ui匹配', () => {
    expect(wrapper.getByText('很抱歉，没有找到相关数据。')).toBeTruthy();
  })
})