import React, { useState, useEffect } from 'react';
import './index.scss';
import logo from '@/assets/img/logo.png';
import defaultAvatar from '@/assets/img/default_doctor.png';
import { Link, useSelector } from 'umi';
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

function NavBar({ user } : IProps) {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const wrapper = React.createRef();
  const avatarUrl = useSelector((state: IState) =>  state.user?.user?.roles?.[0]?.subject?.avatarUrl);

  useEffect(() => {
    if (user.avatar) {
      setAvatar(user.avatar);
    }
  }, [user]);

  return (
    <header className="header-navbar" ref={wrapper}>
      <div className="header-navbar__left">
        <Link to="/home">
          <img className="logo" src={logo} alt="" />
        </Link>
        <p className="name">院外科室随访</p>
      </div>
      <div className="header-navbar__right">
        <img className="avatar" src={avatarUrl || avatar} alt="" />
      </div>
    </header>
  );
}

export default NavBar;
