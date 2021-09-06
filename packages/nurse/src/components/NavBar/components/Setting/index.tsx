import React, { useState } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'umi';
import config from '@/config';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import UserSetting from '@/components/UserSetting';
import changePassword from '@/assets/img/nav_bar/lock.svg';
import logoutIcon from '@/assets/img/nav_bar/logout.svg';
import styles from './index.scss';

interface Item {
  key: string;
  value: string;
  src: string;
}
function Setting() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state:IState) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('info');
  const handleLogout = () => {
    dispatch({
      type: 'auth/logout',
      payload: '',
    });
  };
  const tabName: Array<Item> = [
    {
      key: 'reset',
      value: '修改密码',
      src: changePassword,
    },
  ];

  const Logout = (
    <div className={styles.item_btn} onClick={handleLogout}>
      <img src={logoutIcon} alt="退出登录" />
      退出登录
    </div>
  );
  const handleDoctorClick = (item: Item) => {
    console.log('item', item);
    setShowModal(true);
    setActiveTab(item.key);
  };
  const menu = (
    <Menu style={{ textAlign: 'center' }}>
      {tabName.map((item) => (
        <Menu.Item key={item.key}>
          <div className={styles.item_btn} onClick={() => handleDoctorClick(item)}>
            <img src={item.src} alt={item.value} />
            {item.value}
          </div>
        </Menu.Item>
      ))}
      <Menu.Item>{Logout}</Menu.Item>
    </Menu>
  );
  const avatar = config.defaultAvatar;
  return (
    <div className={styles.setting}>
      <Dropdown overlay={menu} placement="bottomLeft">
        <div className={styles.avatar}>
          <Avatar
            src={userInfo?.avatarUrl || config.defaultAvatar}
            icon={avatar ? null : <UserOutlined />}
            shape="square"
            size={32}
            alt="用户头像"
          />
          <DownOutlined />
        </div>
      </Dropdown>
      <DragModal
        title=""
        footer={null}
        width={1248}
        visible={showModal}
        onCancel={() => { setShowModal(false); }}
        maskClosable
        wrapClassName="ant-modal-wrap-center no_padding"
      >
        <UserSetting activeTabKey={activeTab} onClose={() => setShowModal(false)} />
      </DragModal>
    </div>
  );
}

export default Setting;
