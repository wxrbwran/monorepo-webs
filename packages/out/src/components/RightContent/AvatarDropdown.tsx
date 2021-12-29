import React from 'react';
import { LogoutOutlined, LockOutlined } from '@ant-design/icons';
// import * as api from '@/services/api';
import { Avatar, Menu, Button } from 'antd';
import { useDispatch, useSelector } from 'umi';
import { defaultAvatar } from 'xzl-web-shared/dist/utils/consts';
import config from '@/config';
import ChangePWD from '@/components/ChangePwd';
// import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

interface Item {
  key: string;
  component: React.ReactElement;
  // src: string;
}

const AvatarDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const wcl = useSelector((state: IState) => state.user.wcl[0] || []);
  const handleLogout = () => {
    console.log('退出登录');
    dispatch({
      type: 'auth/logout',
      payload: '',
    });
    // history.push('/user/login');
    window.location.href = config.LOGIN;
  };
  const tabName: Item[] = [
    {
      key: 'reset',
      component: (
        <ChangePWD
          trigger={
            <Button type="text" icon={<LockOutlined />}>
              修改密码
            </Button>
          }
        />
      ),
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

  return (
    <HeaderDropdown overlay={menu}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={defaultAvatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{wcl?.roles?.[0].name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
