import React, { useEffect, useState } from 'react';
import { Badge, Menu } from 'antd';
import { UserOutlined, BarChartOutlined } from '@ant-design/icons';
import { history } from 'umi';
import config from '@/config';
import { Role } from 'xzl-web-shared/src/utils/role';
import styles from './index.scss';

interface Iprops {
  location: {
    pathname: string;
  }
}
interface Imenu {
  role: string;
  value: string;
  badgeNum?: number;
  url: string;
}

const { SubMenu } = Menu;
function SideMenu({ location }: Iprops) {
  const roleText = location.pathname.split('/').reverse()[0].toUpperCase();
  const [activeMenu, setActiveMenu] = useState(`${roleText}_DOCTOR`);
  const sidebar: Imenu[] = [
    {
      role: 'ALONE_DOCTOR',
      value: '我独立管理',
      badgeNum: 0,
      url: 'alone',
    },
    {
      role: 'UPPER_DOCTOR',
      value: '我是主管医生',
      badgeNum: 0,
      url: 'upper',
    }, {
      role: 'LOWER_DOCTOR',
      value: '我是医生助手',
      badgeNum: 0,
      url: 'lower',
    },
    // {
    //   role: 'COUNSELOR_DOCTOR',
    //   value: '我是顾问医生',
    //   url: 'adviser',
    // },
  ];
  useEffect(() => {
    window.$storage.setItem('roleId', Role[`${roleText}_DOCTOR`].id);
    window.$storage.setItem('role', `${roleText}_DOCTOR`);
    setActiveMenu(`${roleText}_DOCTOR`);
  }, [location]);
  const handleToggleMenu = (item: Imenu) => {
    window.$storage.setItem('currRoleId', Role[item.role].id);
    history.push(`/doctor/patients/${item.url}`);
  };
  const handleClick = (e) => {
    console.log('click ', e);
  };
  console.log('activeMenu', activeMenu);
  return (
    <div className={styles.side_menu}>
      {/* {
        sidebar.map((item) => (
          <div
            className={activeMenu === item.role ? styles.active : null}
            key={item.role}
            onClick={() => handleToggleMenu(item)}
          >
            {item.value}
            <Badge count={item.badgeNum} overflowCount={999} className="left-side__badge" />
          </div>
        ))
      } */}
      <Menu
        onClick={handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={[activeMenu]}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<UserOutlined />} title="签约患者">
          {
            sidebar.map((item) => (
              <Menu.Item
                // className={activeMenu === item.role ? styles.active : null}
                key={item.role}
                onClick={() => handleToggleMenu(item)}
              >
                {item.value}
                <Badge count={item.badgeNum} overflowCount={999} className="left-side__badge" />
              </Menu.Item>
            ))
          }
        </SubMenu>
        {/* <SubMenu key="sub2" icon={<SettingOutlined />} title="Navigation Three" /> */}
        <a href={config.INDEX_LIBRARY} target="_blank" className={styles.structure} rel="noopener noreferrer">
          <BarChartOutlined />
          <span className="ml-8">结构数据展示</span>
        </a>
      </Menu>
    </div>
  );
}

export default SideMenu;
