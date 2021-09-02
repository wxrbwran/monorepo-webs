import React, { FC } from 'react';
import config from '@/config';
import indexIcon from '../../img/indexIcon.png';

const Header: FC = () => (
  <div className="ui-index-library__header">
    <div className="ui-index-library__header__left">
      <img src={indexIcon} alt="指标库" />
      <span>指标库</span>
    </div>
    <div className="ui-index-library__header__right">
      <img src={window.$storage.getItem('userAvatarUrl') || config.defaultAvatar} alt="user" />
      <span>{window.$storage.getItem('userName')}</span>
    </div>
  </div>
);

export default Header;
