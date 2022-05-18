import React, { useEffect, useState, useMemo } from 'react';
import { Menu } from 'antd';
import Icon, { UserOutlined, BarChartOutlined, ProfileOutlined } from '@ant-design/icons';
import { history } from 'umi';
import config from '@/config';
import { Role } from 'xzl-web-shared/dist/utils/role';
import { doctorRoles, croRoles } from '@/utils/tools';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.scss';
import { IState } from 'packages/doctor/typings/model';

interface Iprops {
  location: {
    pathname: string;
  }
}
interface Imenu {
  desc: string;
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
  console.log('roleText', roleText);
  const [activeMenu, setActiveMenu] = useState(`${roleText}`);
  const { existedRoles, userInfo } = useSelector((state: IState) => state.user);
  const icon1 = () => <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" fill="currentColor" ><path d="M9.88832771,16.635081 C10.1237776,16.635081 10.3470638,16.5445347 10.5168671,16.3747314 L15.6237494,11.2678491 C17.0556718,9.83592673 17.0556718,7.51432181 15.6237494,6.08239941 C14.2939381,4.75258814 12.176455,4.64814772 10.7275746,5.82178234 L9.88832771,6.50159636 L9.04908081,5.82178234 C7.60020039,4.64814772 5.4827173,4.75258814 4.15290604,6.08239941 C2.72098363,7.51432181 2.72098363,9.83592673 4.15290604,11.2678491 L9.25978835,16.3747314 C9.42959159,16.5445347 9.65287784,16.635081 9.88832771,16.635081 Z M8.3169793,17.3175405 L3.210097,12.2106582 C1.25747554,10.2580367 1.25747554,7.09221182 3.210097,5.13959037 C5.03661492,3.31307245 7.9246949,3.19511288 9.88832771,4.78571168 C11.8519605,3.19511288 14.7400405,3.31307245 16.5665584,5.13959037 C18.5191799,7.09221182 18.5191799,10.2580367 16.5665584,12.2106582 L11.4596761,17.3175405 C11.0257602,17.7514564 10.457044,17.9684143 9.88832771,17.9684143 C9.31961145,17.9684143 8.75089518,17.7514564 8.3169793,17.3175405 Z M10.0061488,13.5582652 L12.5674467,10.9969673 C12.8017613,10.7626527 13.1816602,10.7626527 13.4159748,10.9969673 L13.5102557,11.0912482 C13.7445703,11.3255628 13.7445703,11.7054617 13.5102557,11.9397763 L10.5246938,14.9253383 L10.4304129,15.0196192 C10.1960983,15.2539338 9.81619929,15.2539338 9.58188472,15.0196192 L6.50204185,11.9397763 C6.26772727,11.7054617 6.26772727,11.3255628 6.50204185,11.0912482 L6.59632275,10.9969673 C6.83063733,10.7626527 7.21053631,10.7626527 7.44485089,10.9969673 L10.0061488,13.5582652 Z" id="合并形状"></path></svg>;
  const dispatch = useDispatch();
  const sidebar: { [key: string]: Imenu } = { ...doctorRoles, ...croRoles };
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
    } else if (roleText === 'DEP_HEAD') {
      console.log('=3-232', history.location.query.depHeadNsId);
      setActiveMenu(history.location.query.depHeadNsId.toUpperCase());
      window.$storage.setItem('role', roleText);
      window.$storage.setItem('roleId', Role[`${roleText}`].id);
    } else if (roleText == 'QUERY') { // 查询以独立医生进入
      window.$storage.setItem('roleId', Role.ALONE_DOCTOR.id);
      window.$storage.setItem('role', Role.ALONE_DOCTOR);
      setActiveMenu(`${roleText}`);
    } else {
      console.log('=========  roleText ', roleText, activeMenu);
      window.$storage.setItem('roleId', Role[`${roleText}`].id);
      window.$storage.setItem('role', `${roleText}`);
      setActiveMenu(`${roleText}`);
    }
  }, [location]);
  const handleToggleMenu = (item: Imenu, role: string) => {
    window.$storage.setItem('currRoleId', role);
    history.push(`/doctor/patients/${item.url}`);
  };
  const handleClick = (e) => {
    console.log('click ', e);
  };
  const defaultKey = () => {
    if (['SERVICE_PACKAGE', 'TEAM'].includes(roleText)) {
      return 'sub3';
    } else if ('DEP_HEAD' === roleText) {
      return 'sub2';
    } else {
      return 'sub1';
    }
  };
  const getDepHead = useMemo(() => () => {
    if (existedRoles.length > 1) {
      return (
        <SubMenu key="sub2" icon={<UserOutlined />} title="科室管理">
          {
            [...existedRoles].splice(1).map(item => {
              const curOrg = item.members.filter(member => member.role === Role.ORG.id)[0];
              const curDepHead = item.members.filter(member => member.role === Role.DEP_HEAD.id)[0];
              return (
                <Menu.Item
                  key={curDepHead.nsId.toUpperCase()}
                  onClick={() => history.push(`/doctor/dep_head?depHeadNsId=${curDepHead.nsId}&depHeadWcId=${curDepHead?.wcId}`)}
                >
                  {curOrg.name}
                </Menu.Item>
              );
            })
          }
        </SubMenu>
      );
    }
  }, [existedRoles]);
  return (
    <div className={styles.side_menu}>
      <Menu
        onClick={handleClick}
        style={{ width: 256 }}

        selectedKeys={[activeMenu.toUpperCase()]}
        defaultOpenKeys={[defaultKey()]}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<UserOutlined />} title="签约患者">
          {
            existedRoles?.[0]?.members.filter(item => !!sidebar[item.role]).map((item: IExistedRole, inx: number) => {
              return (
                <Menu.Item
                  key={sidebar[item.role].url.toUpperCase()}
                  onClick={() => handleToggleMenu(sidebar[item.role], item.role)}
                >
                  {inx === 0 ? '我' : '我是'}{sidebar[item.role]?.desc}
                  {/* <Badge count={sidebar[item.role]?.badgeNum} overflowCount={999} className="left-side__badge" /> */}
                </Menu.Item>
              );
            })
          }
        </SubMenu>
        {getDepHead()}
        { // utils-tools.ts  accountStatus  110已认证
          userInfo.status === 110 && (
            <SubMenu key="sub3" icon={<Icon className="menuIcon" component={icon1} />} title="服务管理">
              {
                Object.keys(serviceMenu).map((key) => (
                  <Menu.Item
                    key={key}
                    onClick={() => history.push(`/doctor/service_manage/${serviceMenu[key].url}`)}
                  >
                    {serviceMenu[key].value}
                  </Menu.Item>
                ))
              }
            </SubMenu>
          )
        }

        <a href={config.INDEX_LIBRARY} target="_blank" className={styles.structure} rel="noopener noreferrer">
          <BarChartOutlined />
          <span className="ml-8">结构数据展示</span>
        </a>

        <Menu.Item
          className='query'
          key={'query'.toUpperCase()}
          icon={<UserOutlined />}
          onClick={() => history.push('/doctor/query')}
        >
          {'数据查询'}
        </Menu.Item>

        {/* <SubMenu key={'query'.toUpperCase()} icon={<UserOutlined />} title="数据查询" onTitleClick={() => history.push('/doctor/query')}>

        </SubMenu> */}

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
