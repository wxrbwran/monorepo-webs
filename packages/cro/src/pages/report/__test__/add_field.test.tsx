import React from 'react';
import AddField from '../components/add_field';
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import add from '@/assets/img/icon_add.svg';

let wrapper: RenderResult;
let addBtn: Node;
const props = {
  titleAll: ['年龄', '体重', '身高'],
  changeTitle: ['体重'],
  handleChangeTitle: () => {},
  handleSearchData: () => {}
}
describe('添加字段页面', () => {
  beforeEach(() => {
    wrapper = render(<AddField {...props}><img src={add} alt="添加字段" /></AddField>)
    addBtn = wrapper.getByAltText('添加字段');
  });
  it('匹配快照', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('添加字段弹框显示及隐藏', async () => {
    const reportContent = wrapper.container.querySelector('.submit-btn-style1');
    expect(reportContent).toBeFalsy();
    fireEvent.click(addBtn);
    const newReportContent = wrapper.getByText('选择字段');
    expect(newReportContent).toBeInTheDocument();
    const cancelBtn = wrapper.getByTestId('cancel');
    fireEvent.click(cancelBtn);
    await waitFor(() => {
      expect(newReportContent).not.toBeVisible();
    });
  });
  // it('选择字段，点击确定', async () => {
  //   fireEvent.click(addBtn);
  //   const checkbox = wrapper.getByTestId('checkbox');
  //   fireEvent.change(checkbox, {
  //     value: ['年龄']
  //   })
  // });
})