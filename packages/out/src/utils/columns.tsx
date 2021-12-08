import React from 'react';
import { Button, Avatar } from 'antd';
import { defaultAvatar } from './consts';

export type SexType = 'MALE' | 'FEMALE';
export const columnCreator = (title: string, dataIndex: string, prop?: Object = {}) => {
  let column: CommonData = {
    title,
    dataIndex,
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
  width: 80,
  mock: '@cname',
  align: 'center',
  render: (text: string) => <span>{text}</span>,
};

export const navName = (params: Store) => ({
  title: '姓名',
  dataIndex: 'name',
  width: 80,
  mock: '@cname',
  align: 'center',
  render: (text: string, record: Store) => (
    <Button type="link" onClick={() => params.nav(record)}>
      {text}
    </Button>
  ),
});

export const doctorName = columnCreator('医生姓名', 'name');
export const replyRatio = {
  title: '平均每天回复率',
  dataIndex: 'replyRatio',
  render: (text: number) => {
    return <span>{text * 1000 / 10}%</span>;
  },
  sorter: (a: { deptCount: number }, b: { deptCount: number }) => a.deptCount - b.deptCount,
};
export const sendSfCount = {
  title: '发送随访表数量',
  dataIndex: 'sendSfCount',
  sorter: (a: { deptCount: number }, b: { deptCount: number }) => a.deptCount - b.deptCount,
};
export const receiveSfCount = {
  title: '收到随访表数量',
  dataIndex: 'receiveSfCount',
  sorter: (a: { deptCount: number }, b: { deptCount: number }) => a.deptCount - b.deptCount,
};
export const sfRatio = {
  title: '随访率',
  dataIndex: 'sfRatio',
  render: (text: number) => {
    return <span>{text * 1000 / 10}%</span>;
  },
  sorter: (a: { deptCount: number }, b: { deptCount: number }) => a.deptCount - b.deptCount,
};

