import React from 'react';
import logo from '@/assets/img/logo.png';
import { Link } from 'umi';

function Logo() {
  return (
    <>
      <Link to="/patients">
        <img src={logo} alt="" />
      </Link>
      <span className="font-bold ml-8">心之力护士端</span>
    </>
  );
}

export default Logo;
