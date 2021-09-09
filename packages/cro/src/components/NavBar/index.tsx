import React, { useState, useEffect } from 'react';
import './index.scss';
import logo from '@/assets/img/logo.png';
import defaultAvatar from '@/assets/img/default_doctor.png';
import { RightOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Link, useSelector, useDispatch } from 'umi';
import { Menu, Dropdown } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import MessageBell from '@/components/MessageBell';
import MsgModal from '@/components/MsgModal';
import { IState } from 'typings/global';

interface IProps {
  user: {
    avatar: string;
  };
  location: {
    query: {
      projectName: string;
      projectSid: string;
      isTemp?: string;
    };
    pathname: string;
  }
}

function NavBar({ user, location } : IProps) {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [currProject, setCurrProject] = useState(window.$storage.getItem('projectName' || ''));
  const projectList = useSelector((state:IState)=>state.project.projectList);
  const [currProjectSid, setCurrProjectSid] = useState(window.$storage.getItem('projectSid' || ''));
  const [shake, setShake] = useState(false);
  const wrapper = React.createRef();
  const target = React.createRef();
  const avatarUrl = useSelector((state: IState) =>  state.user?.user?.roles?.[0]?.subject?.avatarUrl);

  // 获取项目列表
  useEffect(() => {
    dispatch({
      type: 'project/fetchProjectList',
      payload: null,
    });
  }, [])

  useEffect(() => {
    const urlProjectName = location.query.projectName;
    const urlProjectSid = location.query.projectSid;
    if (urlProjectName && urlProjectSid !== currProjectSid ){
      window.$storage.setItem('projectName', urlProjectName);
      window.$storage.setItem('projectSid', urlProjectSid);
      setCurrProject(urlProjectName);
      setCurrProjectSid(urlProjectSid);
    }
  }, [location])

  useEffect(() => {
    if (user.avatar) {
      setAvatar(user.avatar)
    }
  }, [user])
  const menu = (
    <Menu>
      {
        projectList.filter(i => i.projectSid !== currProjectSid).map(item => {
          return (
            <Menu.Item key={item.projectSid}>
              <Link to={`/proj_detail?projectSid=${item.projectSid}&projectName=${item.name}`}>
                  {item.name}
                </Link>
            </Menu.Item>
          )
        })
      }
    </Menu>
  );
  const isHome = location.pathname.includes('/home');
  const isTemp = location.pathname.includes('/template') || !!location.query.isTemp;
  return (
    <header className="header-navbar" ref={wrapper}>
      <div className="header-navbar__left">
        <Link to="/home">
          <img className="logo" src={logo} alt="" />
        </Link>
        {
          isHome || isTemp ? <p className="name">智能科研平台</p> : (
            <div>
              <RightOutlined className="arrow" />
              <Dropdown overlay={menu} overlayClassName="project-dropdown">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  {currProject} <CaretDownOutlined />
                </a>
              </Dropdown>
            </div>
          )
        }
      </div>
      <div className="header-navbar__right">
        <MessageBell>
          <BellOutlined ref={target} className={shake ? "bell-shake-delay" : ''}/>
        </MessageBell>
        <img className="avatar" src={avatarUrl || avatar} alt="" />
      </div>
      <MsgModal wrapper={wrapper} target={target} changeShake={(status) => {setShake(status)}} />
    </header>
  );
}

export default NavBar;
