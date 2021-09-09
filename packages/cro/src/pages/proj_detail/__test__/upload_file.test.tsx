import * as React from 'react'
import { render, RenderResult } from '@testing-library/react';
import UploadFile from '../upload_file';

let wrapper: RenderResult;
describe('项目详情：项目文件', () => {
  beforeEach(() => {
    wrapper = render(<UploadFile />)
  })
  it('匹配快照', () => {
    expect(wrapper).toMatchSnapshot();
    // wrapper.debug();
  })
  it('ui渲染正常：有项目文件、项目邀请书', () => {
    expect(wrapper.getAllByText('项目文件').length).toBe(2);
    expect(wrapper.getByText('项目邀请书')).toBeInTheDocument();
  })
})