import React from 'react';
import CreateReport from '../components/create_report';
import { render, fireEvent, RenderResult, waitFor } from '@testing-library/react';

const handleCreateReport = (name: string) => {
  return name;
};
let wrapper: RenderResult;
let createBtn: Node;
describe('生成报告页面', () => {
  beforeEach(() => {
    wrapper = render(<CreateReport handleCreateReport={handleCreateReport}>生成报告</CreateReport>);
    createBtn = wrapper.getByText('生成报告');
  });
  it('匹配快照', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('报告弹框显示及隐藏', async () => {
    const reportContent = wrapper.container.querySelector('.report-name');
    expect(reportContent).toBeFalsy();
    fireEvent.click(createBtn);
    const newReportContent = wrapper.getByText('报告名称');
    expect(newReportContent).toBeInTheDocument();
    const cancelBtn = wrapper.getByTestId('cancel');
    fireEvent.click(cancelBtn);
    await waitFor(() => {
      // wrapper.debug();
      expect(newReportContent).not.toBeVisible();
    });
  });
  it('生成报告，点击确定', async() => {
    fireEvent.click(createBtn);
    const inputName = wrapper.getByPlaceholderText('请输入报告名称, 报告名称仅限文字和数字');
    fireEvent.change(inputName, {
      target: {value: ''}
    })
    const submitBtn = wrapper.getByTestId('submit');
    fireEvent.click(submitBtn);
    const newReportContent = wrapper.getByText('报告名称');
    expect(newReportContent).toBeInTheDocument();
    fireEvent.change(inputName, {
      target: { value: '报告1' }
    })
    fireEvent.click(submitBtn);
    await waitFor(() => {
     expect(newReportContent).not.toBeVisible();
    });
  })
});
