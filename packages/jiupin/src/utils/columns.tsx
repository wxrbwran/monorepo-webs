import React from 'react';
import { Avatar } from 'antd';
import { defaultAvatar } from './consts';

export type SexType = 'MALE' | 'FEMALE';
export const columnCreator = (title: string, dataIndex: string, prop?: Object = {}) => {
  let column: CommonData = {
    title,
    dataIndex,
    key: dataIndex,
  };
  if (prop) {
    column = {
      ...column,
      ...prop,
    };
  }
  return column;
};
export const avatar = {
  title: '头像',
  dataIndex: 'avatarUrl',
  align: 'center',
  width: 80,
  mock: 'http://dummyimage.com/200x200',
  render: (text: string) => <Avatar size={40} shape="square" src={text || defaultAvatar} />,
};

export const navAvatar = (params: Store) => ({
  title: '头像',
  dataIndex: 'avatarUrl',
  width: 80,
  mock: 'http://dummyimage.com/200x200/4A7BF7&text=avatar',
  render: (text: string, record: Store) => (
    <span onClick={() => params.nav(record)}>
      <Avatar size={40} shape="square" src={text || defaultAvatar} />
    </span>
  ),
});

export const name = {
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  align: 'center',
  render: (text: string) => <span>{text}</span>,
};

export const serviceRoleTags =  {
  title: '角色',
  dataIndex: 'roleTags',
  key: 'roleTags',
  align: 'center',
  render: (text: any[]) => <span>{[...new Set(text.map(tag => tag.name))].join('、')}</span>,
};

export const department = columnCreator('部门', 'department', { align: 'center' });
export const tel = columnCreator('联系电话', 'tel', { align: 'center' });
export const serviceName =  columnCreator('服务名称', 'name', { align: 'center' });

