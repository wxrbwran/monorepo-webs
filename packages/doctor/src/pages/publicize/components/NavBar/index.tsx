import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, message } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import * as api from '@/services/api';
import './index.scss';
import logo from '../../img/logo.png';
import config from '@/config';
import { Link, useSelector, useDispatch } from 'umi';
import { IState } from 'typings/global';

function NavBar() {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(config.defaultAvatar);
  const user = useSelector((state: IState) => state.user.user);
  const wrapper = React.createRef();
  const avatarUrl = useSelector((state: IState) =>  state.user?.user?.roles?.[0]?.subject?.avatarUrl);
  const filterOrgs: ISubject[] = useSelector((state: IState) => state.user.filterOrgs);
  const [selectOrgList, setSelectOrgList] = useState<ISubject[]>(filterOrgs);
  const [currentOrg, setCurrentOrg] = useState();

  // 初始化随访团队接口
  const initContact = (nsId?: string) => {
    api.education.initContact({
      orgNSId: nsId,
      sid: window.$storage.getItem('sid'),
    }).then(() => {
      console.log('成功');
    }).catch((err: any) => {
      message.error(err?.result);
    });
  };

  // 获取/设置机构列表
  useEffect(() => {
    dispatch({
      type: 'user/getUserOrganizations',
      payload: { },
    });
  }, []);

  useEffect(() => {
    if (!!filterOrgs.length) {
      setSelectOrgList(filterOrgs);
      setCurrentOrg(filterOrgs[0]);
      // initContact(filterOrgs[0].nsId);
    }
  }, [filterOrgs]);

  // 用户头像
  useEffect(() => {
    if (user.avatar) {
      setAvatar(user.avatar);
    }
  }, [user]);

  // 存储当前机构信息
  useEffect(() => {
    if (currentOrg){
      dispatch({
        type: 'education/setCurrentOrgInfo',
        payload: currentOrg,
      });
      initContact(currentOrg?.nsId);
    }
  }, [currentOrg]);

  const handleChangeOrg = (item: any) => {
    setCurrentOrg(item);
  };

  const menu = (
    <Menu style={{ textAlign: 'center' }}>
      {selectOrgList.map((item) => (
        <Menu.Item key={item.wcId}>
          <div onClick={() => handleChangeOrg(item)}>
            {item.name}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <header className="header-navbar" ref={wrapper}>
      <div className="header-navbar__left">
        <Link to="/publicize">
          <img className="logo" src={logo} alt="" />
        </Link>
        <p className="name mr-60">院外科室随访</p>
        <Dropdown overlay={menu} placement="bottomLeft" overlayClassName="org-dropdown">
          <div>
            <span className="ml-8 mr-3 pointer">{currentOrg?.name}</span>
            <CaretDownOutlined />
          </div>
        </Dropdown>
      </div>
      <div className="header-navbar__right">
        <img className="avatar" src={avatarUrl || avatar} alt="" />
      </div>
    </header>
  );
}

export default NavBar;
