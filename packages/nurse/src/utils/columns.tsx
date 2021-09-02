import React from 'react';
import config from '@/config';

export const clAvatar = {
  title: '头像',
  dataIndex: 'avatarUrl',
  render: (text: string) => (
    <img
      src={text || config.defaultAvatar}
      style={{ width: 40, height: 40 }}
      alt="头像"
    />
  ),
};
export const clName = {
  title: '姓名',
  dataIndex: 'name',
};
export const clTitle = {
  title: '职称',
  dataIndex: 'title',
};
export const clDepartment = {
  title: '科室',
  dataIndex: 'department',
  render: (text: { name: string}) => text.name,
};
export const clGoodsPrice = {
  title: '收费标准',
  dataIndex: 'goodsDescriptions',
};
