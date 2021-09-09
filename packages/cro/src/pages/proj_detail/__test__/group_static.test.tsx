import * as React from 'react'
import { render, RenderResult, fireEvent, waitFor, act } from '@testing-library/react';
import GroupStatic from '../group_static';
import * as api from '@/services/api';

let wrapper: RenderResult;
const props = {
  projectSid: '5beKM8'
};

jest.mock("@/services/api", () => {
  return {
    detail: {
      getStandard: jest.fn(() => {
        return Promise.resolve({
          infos: [], status: 'success'
        });
      }),
    }
  };
});

describe('项目详情：纳入标准、排除标准', () => {
  beforeEach(() => {
    wrapper = render(<GroupStatic {...props} />)
  })
  it('匹配快照', () => {
    expect(wrapper).toMatchSnapshot();
  })
  it('未设置过纳入标准，显示添加按钮', () => {
    expect(wrapper.queryAllByText('添加条件').length).toBe(2);
  })
  it('点击添加按钮，增加一行选项;点击删除icon，删除一行选项', async() => {
    // add
    const addBtn = wrapper.getByTestId('addJoin');
    const delBtn = wrapper.getByTestId('delJoin');
    const selector = wrapper.container.getElementsByClassName('ant-select-selector');
    expect(selector.length).toBe(2);
    fireEvent.click(addBtn);
    expect(selector.length).toBe(3);
    fireEvent.click(delBtn);
    expect(selector.length).toBe(2);
  })
  it('点击提交按钮，提示提交后不可修改', () => {
    const submit = wrapper.getByTestId('submit');
    fireEvent.click(submit);
    expect(wrapper.getByText('提交之后不可修改，您确定提交吗？')).toBeInTheDocument();
  })
  it('点击确认提交按钮，标准为空，提交失败，提示不能为空', () => {
    const submit = wrapper.getByTestId('submit');
    fireEvent.click(submit);
    const confirmSubmit = wrapper.getByText('确 认');
    fireEvent.click(confirmSubmit);
    expect(wrapper.getByText('纳入标准排除标准不能同时为空')).toBeInTheDocument();
  })
  // it('纳入标准选择年龄后，显示范围输入框', async() => {
  //   const select = wrapper.container.querySelector('.ant-select-selection-search-input');
  //   select && fireEvent.change(select, {
  //     target: { value: 'AGE' }
  //   })
  //   wrapper.debug();
  //   await waitFor(() => {
  //     const dropdown = wrapper.getByText('范围：');
  //     expect(dropdown).toBeInTheDocument();
  //   })
  // })
})
