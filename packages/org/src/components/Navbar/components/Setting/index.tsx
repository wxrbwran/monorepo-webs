import React, { FC } from 'react';
import { Menu, Dropdown, Avatar, Button } from 'antd';
import { defaultAvatar } from 'xzl-web-shared/dist/utils/consts';
import { DownOutlined, UserOutlined, LogoutOutlined, LockOutlined } from '@ant-design/icons';
// import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { history, useDispatch } from 'umi';
import ChangePWD from '../ChangePwd';
import styles from './index.scss';

interface Item {
  key: string;
  component: React.ReactElement;
  // src: string;
}
const Setting: FC = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log('退出登录');
    dispatch({
      type: 'auth/logout',
      payload: '',
    });
    history.push('/user/login');
  };
  const triggerEle = (
    <Button type="text" icon={<LockOutlined />}>
      修改密码
    </Button>
  );
  const tabName: Array<Item> = [
    {
      key: 'reset',
      component: <ChangePWD trigger={triggerEle} />,
    },
    {
      key: 'logout',
      component: (
        <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
          退出登录
        </Button>
      ),
    },
  ];
  const menu = (
    <Menu style={{ textAlign: 'center' }}>
      {tabName.map((item) => (
        <Menu.Item key={item.key}>{item.component}</Menu.Item>
      ))}
    </Menu>
  );
  const avatar = defaultAvatar;
  return (
    <div className={styles.setting}>
      <Dropdown overlay={menu} placement="bottomLeft">
        <div className={styles.avatar}>
          <Avatar
            src={defaultAvatar}
            icon={avatar ? null : <UserOutlined />}
            shape="square"
            size={40}
            alt="用户头像"
          />
          <span>设置</span>
          <DownOutlined />
        </div>
      </Dropdown>
    </div>
  );
};

export default Setting;
