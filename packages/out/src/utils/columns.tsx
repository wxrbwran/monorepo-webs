import React from 'react';
import { Button, Avatar } from 'antd';
import { projectStatus } from 'xzl-web-shared/src/utils/consts';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import {
  sexList,
  orgCategroy,
  inviteStatusLists,
  accountStatus,
  roleList,
  defaultAvatar,
} from './consts';

export type SexType = 'MALE' | 'FEMALE';

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
