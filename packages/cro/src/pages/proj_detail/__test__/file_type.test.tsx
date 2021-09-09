import * as React from 'react'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import FileType from '../upload_file/file_type';
import project from '@/assets/project.png';
import * as api from '@/services/api';

let wrapper: RenderResult;
const props = {
  type: 'PROJECT_FILE',
  name: '项目文件',
  imgSrc: project,
};

jest.mock("@/services/api", () => {
  return {
    detail: {
      getProjectFileList: jest.fn(() => {
        return Promise.resolve({
          infos: [
            {
              address: "https://clinic-trial-attachments.oss-cn-beijing.aliyuncs.com/2924d525-4ca9-4c07-872d-92ca1cdcb476",
              fileId: "5B6jV5",
              name: "form1.xlsx",
              type: "PROJECT_FILE"
            }
          ], status: 'success'
        });
      }),
    }
  };
});
describe('项目详情：上传文件', () => {
  beforeEach(() => {
    wrapper = render(<FileType {...props} />)
  })
  it('匹配快照', () => {
    expect(wrapper).toMatchSnapshot();
  })
  it('点击文件夹，显示文件列表', async() => {
    const fileContent = wrapper.queryByTestId('uploadBtn');
    expect(fileContent).toBeNull();
    const toogleUpload = wrapper.getByTestId('toogleUpload');
    fireEvent.click(toogleUpload);
    await waitFor(() => {
      const uploadBtn = wrapper.getByTestId('uploadBtn');
      expect(uploadBtn).toBeInTheDocument();
    })
    // wrapper.debug();
  })
  // 显示弹框后，获取文件列表----失败
  // it('获取已上传的文件列表', async() => {
  //   const toogleUpload = wrapper.getByTestId('toogleUpload');
  //   fireEvent.click(toogleUpload);
  //   await waitFor(() => {
  //     // expect(api.detail.getProjectFileList).toHaveBeenCalledTimes(1)
  //     wrapper.debug();
  //   })
  // })
})