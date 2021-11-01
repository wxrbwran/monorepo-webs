import React, { useEffect, useState } from 'react';
import { Badge, Menu } from 'antd';
import Icon, { UserOutlined, BarChartOutlined, ProfileOutlined } from '@ant-design/icons';
import { history } from 'umi';
import config from '@/config';
import { Role } from 'xzl-web-shared/src/utils/role';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.scss';
import { IState } from 'packages/doctor/typings/model';

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
interface IExistedRole {
  role: string;
  sid: string;
  checked: boolean;
  counters: {
    role: string;
    count: number;
  }[]
}
const { SubMenu } = Menu;
function SideMenu({ location }: Iprops) {
  const roleText = location.pathname.split('/').reverse()[0].toUpperCase();
  const [activeMenu, setActiveMenu] = useState(`${roleText}`);
  const { existedRoles } = useSelector((state: IState) => state.user);
  const icon1 = () => <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" fill="currentColor" ><path d="M9.88832771,16.635081 C10.1237776,16.635081 10.3470638,16.5445347 10.5168671,16.3747314 L15.6237494,11.2678491 C17.0556718,9.83592673 17.0556718,7.51432181 15.6237494,6.08239941 C14.2939381,4.75258814 12.176455,4.64814772 10.7275746,5.82178234 L9.88832771,6.50159636 L9.04908081,5.82178234 C7.60020039,4.64814772 5.4827173,4.75258814 4.15290604,6.08239941 C2.72098363,7.51432181 2.72098363,9.83592673 4.15290604,11.2678491 L9.25978835,16.3747314 C9.42959159,16.5445347 9.65287784,16.635081 9.88832771,16.635081 Z M8.3169793,17.3175405 L3.210097,12.2106582 C1.25747554,10.2580367 1.25747554,7.09221182 3.210097,5.13959037 C5.03661492,3.31307245 7.9246949,3.19511288 9.88832771,4.78571168 C11.8519605,3.19511288 14.7400405,3.31307245 16.5665584,5.13959037 C18.5191799,7.09221182 18.5191799,10.2580367 16.5665584,12.2106582 L11.4596761,17.3175405 C11.0257602,17.7514564 10.457044,17.9684143 9.88832771,17.9684143 C9.31961145,17.9684143 8.75089518,17.7514564 8.3169793,17.3175405 Z M10.0061488,13.5582652 L12.5674467,10.9969673 C12.8017613,10.7626527 13.1816602,10.7626527 13.4159748,10.9969673 L13.5102557,11.0912482 C13.7445703,11.3255628 13.7445703,11.7054617 13.5102557,11.9397763 L10.5246938,14.9253383 L10.4304129,15.0196192 C10.1960983,15.2539338 9.81619929,15.2539338 9.58188472,15.0196192 L6.50204185,11.9397763 C6.26772727,11.7054617 6.26772727,11.3255628 6.50204185,11.0912482 L6.59632275,10.9969673 C6.83063733,10.7626527 7.21053631,10.7626527 7.44485089,10.9969673 L10.0061488,13.5582652 Z" id="合并形状"></path></svg>;
  const dispatch = useDispatch();
  const sidebar: { [key: string]: Imenu } = {
    [Role.ALONE_DOCTOR.id]: {
      role: 'ALONE_DOCTOR',
      value: '我独立管理',
      badgeNum: 0,
      url: 'alone_doctor',
    },
    [Role.UPPER_DOCTOR.id]: {
      role: 'UPPER_DOCTOR',
      value: '我是主管医生',
      badgeNum: 0,
      url: 'upper_doctor',
    },
    [Role.LOWER_DOCTOR.id]: {
      role: 'LOWER_DOCTOR',
      value: '我是医生助手',
      badgeNum: 0,
      url: 'lower_doctor',
    },
    [Role.DIETITIAN.id]: {
      role: 'DIETITIAN',
      value: '我是营养师',
      badgeNum: 0,
      url: 'dietitian',
    },
  };
  const serviceMenu: CommonData = {
    TEAM: { value: '我的团队', url: 'team' },
    SERVICE_PACKAGE: { value: '医疗服务小组', url: 'service_package' },
  };
  useEffect(() => {
    // 获取侧边栏菜单列表
    dispatch({
      type: 'user/getDoctorExistedRoles',
      payload: {},
    });
  }, []);
  useEffect(() => {
    if (serviceMenu[roleText]) {
      setActiveMenu(roleText);
    } else {
      window.$storage.setItem('roleId', Role[`${roleText}`].id);
      window.$storage.setItem('role', `${roleText}`);
      setActiveMenu(`${roleText}`);
    }
  }, [location]);
  const handleToggleMenu = (item: Imenu) => {
    window.$storage.setItem('currRoleId', Role[item.role].id);
    history.push(`/doctor/patients/${item.url}`);
  };
  const handleClick = (e) => {
    console.log('click ', e);
  };
  return (
    <div className={styles.side_menu}>
      <Menu
        onClick={handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={[activeMenu]}
        defaultOpenKeys={['SERVICE_PACKAGE', 'TEAM'].includes(roleText) ? ['sub2'] : ['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<UserOutlined />} title="签约患者">
          {
            existedRoles.map((item: IExistedRole) => {
              return (
                <Menu.Item
                // className={activeMenu === item.role ? styles.active : null}
                key={sidebar[item.role].role}
                onClick={() => handleToggleMenu(sidebar[item.role])}
              >
                {sidebar[item.role].value}
                <Badge count={sidebar[item.role].badgeNum} overflowCount={999} className="left-side__badge" />
              </Menu.Item>
              );
            })
          }
        </SubMenu>
        <SubMenu key="sub2" icon={ <Icon className="menuIcon" component={icon1} />} title="服务管理">
          {
            Object.keys(serviceMenu).map((key) => (
              <Menu.Item
                key={key}
                onClick={() =>  history.push(`/doctor/service_manage/${serviceMenu[key].url}`)}
              >
                {serviceMenu[key].value}
              </Menu.Item>
            ))
          }
        </SubMenu>
        <a href={config.INDEX_LIBRARY} target="_blank" className={styles.structure} rel="noopener noreferrer">
          <BarChartOutlined />
          <span className="ml-8">结构数据展示</span>
        </a>
        <p>
          <a href={config.PUBLICIZE} target="_blank" className={styles.structure} rel="noopener noreferrer">
            <ProfileOutlined />
            <span className="ml-8">患者宣教、患者随访</span>
          </a>
        </p>
      </Menu>
    </div>
  );
}

export default SideMenu;
