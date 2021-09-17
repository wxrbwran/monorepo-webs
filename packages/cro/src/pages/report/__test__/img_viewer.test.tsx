import React from 'react';
import ImgViewer from '../components/img_viewer';
import { render, fireEvent, waitFor, } from '@testing-library/react';

const props = {
  imageList: [
    {
      url: 'http://www.img.com/a.png',
      time: '2020-10-10'
    }
  ],
  title: '心电图'
}
const props1 = {
  imageList: [],
  title: '高血压'
}
describe('图片查看器', () => {
  it('匹配快照', () => {
    const wrapper = render(<ImgViewer {...props}>1</ImgViewer>);
    expect(wrapper).toMatchSnapshot();
  });
  it('image图片url数量小于0，样式为不可点击状态', () => {
    const wrapper = render(<ImgViewer {...props1}>1</ImgViewer>);
    expect(wrapper.container.querySelector('.checklist-num')).toBeNull();
  })
  it('image图片url数量大于0，样式为可点击状态', () => {
    const wrapper = render(<ImgViewer {...props}>1</ImgViewer>);
    expect(wrapper.container.querySelector('.checklist-num')).toBeTruthy();
  })
  it('点击图片数量大于0的，显示图片列表弹框', async() => {
    const wrapper = render(<ImgViewer {...props}>1</ImgViewer>);
    const showListBtn = wrapper.container.querySelector('.checklist-num');
    const imgList = wrapper.container.querySelector('.img-list');
    expect(imgList).toBeNull();
    showListBtn && fireEvent.click(showListBtn);
    await waitFor(() => {
      const title = wrapper.getByText('心电图');
      expect(title).toBeInTheDocument();
    })
  }) 
  it('点击图片列表中任一图片，打开图片查看器', async() => {
    const wrapper = render(<ImgViewer {...props}>1</ImgViewer>);
    const showListBtn = wrapper.container.querySelector('.checklist-num');
    showListBtn && fireEvent.click(showListBtn); 
    const itemImg = wrapper.getByTestId('item0');
    itemImg && fireEvent.click(itemImg);
    const viewer = wrapper.getByText('1 of 1');
    expect(viewer).toBeInTheDocument();
  })
})