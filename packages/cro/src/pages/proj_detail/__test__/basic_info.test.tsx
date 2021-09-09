import 'jest';
import React from 'react';
import BasicInfo from '../basic_info';
import { render, RenderResult, waitFor, fireEvent } from '@testing-library/react';
import * as api from '@/services/api';

const props = {
  projectSid: 'lEZRV8'
}
jest.mock("@/services/api", () => {
  return {
    detail: {
      getCroProjectInfo: jest.fn(() => {
        return Promise.resolve({ infos: [
          {
            avatar: "",
            avgDay: 17,
            createdAt: 1594894822078,
            doctorId: "8KKVP8",
            duration: 100,
            intro: "新型冠状疫苗研发",
            name: "新冠疫苗3",
            patientCount: 5,
            projectSid: "lEZRV8",
            status: "RUN",
          }
        ], status: 'success' });
      }),
      updateCroProject: jest.fn(() => {
        return Promise.resolve();
      })
    }
  };
});
describe('项目详情: 基本信息', () => {
  let wrapper: RenderResult;
  it('匹配快照', () => {
    // expect(wrapper).toMatchSnapshot();
  })
  it('接口调用，ui渲染正常', async() => {
    wrapper = render(<BasicInfo {...props} />)
    await waitFor(() => {
      expect(api.detail.getCroProjectInfo).toBeCalled();
    })
    expect(wrapper.getByText('新冠疫苗3')).toBeTruthy();
    expect(wrapper.getByText('项目人数')).toBeTruthy();
  })
  it('修改项目介绍', async() => {
    wrapper = render(<BasicInfo {...props} />)
    await waitFor(() => {
      expect(api.detail.getCroProjectInfo).toBeCalled();
    })
    const textarea = wrapper.getByTestId('textarea');
    fireEvent.change(textarea, {
      target: { value: '新的项目介绍' }
    })
    fireEvent.blur(textarea);
    await waitFor(() => {
      expect(api.detail.updateCroProject).toHaveBeenCalledTimes(1);
    })
    // wrapper.debug();
    expect(textarea.innerHTML).toBe('新的项目介绍');
  })
  it('修改项目状态', async() => {
    wrapper = render(<BasicInfo {...props} />)
    await waitFor(() => {
      expect(api.detail.getCroProjectInfo).toBeCalled();
    })
    const select = wrapper.container.querySelector('.ant-select-selection-search-input');
    select && fireEvent.change(select, {
      target: {value: 'STOP'}
    })
    await waitFor(() => {
      const dropdown = wrapper.getByText('RUN');
      expect(dropdown).toBeInTheDocument();
      expect(wrapper.getByText('结束')).toBeInTheDocument();
    })
  })
})
