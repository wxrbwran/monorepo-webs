import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'umi';
import config from '@/config';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import UserSetting from '@/components/UserSetting';
import Code from '@/assets/img/nav_bar/code.svg';
import info from '@/assets/img/nav_bar/info.svg';
import upperLowerDoctor from '@/assets/img/nav_bar/upper_lower_doctor.svg';
// import msgHistory from '@/assets/img/nav_bar/msg_history.svg';
// import farDoctor from '@/assets/img/nav_bar/far_doctor.svg';
import price from '@/assets/img/nav_bar/price.svg';
// import visitingTime from '@/assets/img/nav_bar/visitingTime.svg';
import changePassword from '@/assets/img/nav_bar/lock.svg';
import logoutIcon from '@/assets/img/nav_bar/logout.svg';
// import score from '@/assets/img/nav_bar/score.svg';
import DoctorQRCode from '../DoctorQRCode';
import styles from './index.scss';
import { IState } from 'packages/doctor/typings/model';

interface Item {
  key: string;
  value: string;
  src: string;
}
function Setting() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: IState) => state.user);
  // 如果没有执业机构和科室信息，则认为是首次登录，默认展示编辑个人资料弹框
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('info');
  useEffect(() => {
    dispatch({
      type: 'user/getUserWclDetail',
      payload: { wcIds: [window.$storage.getItem('wcId')] },
    });
  }, []);
  useEffect(() => {
    if (userInfo.firstLogin === 1) {
      setActiveTab('info');
      setShowModal(true);
    }
  }, [userInfo]);
  const handleLogout = () => {
    dispatch({
      type: 'auth/logout',
    });
  };
  const tabName: Array<Item> = [
    {
      key: 'info',
      value: '个人资料',
      src: info,
    },
    // {
    //   key: 'score',
    //   value: '我的积分',
    //   src: score,
    // },
    {
      key: 'price',
      value: '收费标准',
      src: price,
    },
    {
      key: 'upperLower',
      value: '我的上下级医生',
      src: upperLowerDoctor,
    },
    // {
    //   key: 'farDoctor',
    //   value: '未来医生',
    //   src: farDoctor,
    // }, {
    //   key: 'visitingTime',
    //   value: '出诊时间',
    //   src: visitingTime,
    // }, {
    //   key: 'mmh',
    //   value: '群发历史',
    //   src: msgHistory,
    // },
    {
      key: 'reset',
      value: '修改密码',
      src: changePassword,
    },
  ];
  const titleObj = { info: '个人资料', price: '收费标准', reset: '修改密码' };
  const Logout = (
    <div className={styles.item_btn} onClick={handleLogout}>
      <img src={logoutIcon} alt="退出登录" />
      退出登录
    </div>
  );
  const Qrcode = (
    <DoctorQRCode>
      <div className={styles.item_btn}>
        <img src={Code} alt="我的二维码" />
        我的二维码
      </div>
    </DoctorQRCode>
  );
  const handleDoctorClick = (item: Item) => {
    console.log('item', item);
    setShowModal(true);
    setActiveTab(item.key);
  };
  const menu = (
    <Menu style={{ textAlign: 'center' }}>
      <Menu.Item>{Qrcode}</Menu.Item>
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
            src={userInfo.avatarUrl || config.defaultAvatar}
            icon={avatar ? null : <UserOutlined />}
            shape="square"
            size={32}
            alt="用户头像"
          />
          <span className="ml-8 mr-3 pointer">{userInfo.name}</span>
          <CaretDownOutlined />
        </div>
      </Dropdown>
      <DragModal
        title={titleObj[activeTab] || '用户设置'}
        footer={null}
        width={1000}
        visible={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
        maskClosable
        wrapClassName="ant-modal-wrap-center no_padding"
      >
        <UserSetting activeTabKey={activeTab} onClose={() => setShowModal(false)} />
      </DragModal>
    </div>
  );
}

export default Setting;
