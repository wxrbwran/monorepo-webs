import React, { FC } from 'react';
import { Tabs } from 'antd';
import { ApartmentOutlined, TeamOutlined } from '@ant-design/icons';
import Orgs from './Orgs';
import Roles from './Roles';
import { Link, useLocation, useSelector } from 'umi';
import styles from './index.scss';

const { TabPane } = Tabs;
const SideMenu: FC = () => {
  const { roleList } = useSelector((state: IState) => state.personnel);

  const location = useLocation();
  console.log('32', useLocation());
  return (
    <div className={styles.side_menu}>
      {/* <Input
        placeholder="搜索"
        onPressEnter={onSearch}
        prefix={<SearchOutlined style={{ color: '#999999', fontSize: 16 }} />}
      /> */}
      <div>
      <Tabs activeKey={location.pathname.includes('role-list') ? 'role-list' : 'org-structure'}  centered>
        <TabPane
          tab={<Link to="/personnel/org-structure"><ApartmentOutlined />组织架构</Link>}
          key="org-structure"
        >
          <Orgs />
        </TabPane>
        <TabPane
          tab={<Link to={`/personnel/role-list?roleId=${roleList?.[0]?.id}`}><TeamOutlined />角色</Link>}
          key="role-list"
        >
          <Roles />
        </TabPane>
      </Tabs>
      </div>
    </div>
  );
};

export default SideMenu;
