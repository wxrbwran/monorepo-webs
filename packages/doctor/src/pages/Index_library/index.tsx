import React, { FC } from 'react';
import { useLocation, Location } from 'umi';
import { Empty } from 'antd';
import Header from './components/HeaderTit';
import SideMenu from './components/SideMenu';
import IndexList from './components/IndexList';
import './index.scss';

const IndexLibrary: FC = () => {
  const { query: { documentId } } = useLocation<Location>();
  return (
    <div>
      <Header />
      <div className="ui-index-library__main">
        <SideMenu />
        { documentId ? <IndexList /> : <div className="w-full pt-100"><Empty /></div>}
      </div>
    </div>
  );
};

export default IndexLibrary;
