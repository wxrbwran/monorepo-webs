import React, { useState, useEffect } from 'react';
import './index.scss';
import logo from '../../img/logo.png';
import config from '@/config';
import { Link, useSelector } from 'umi';
import { IState } from 'typings/global';

function NavBar() {
  const [avatar, setAvatar] = useState(config.defaultAvatar);
  const user = useSelector((state: IState) => state.user.user);
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
        <Link to="/publicize">
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
