import React, { FC } from 'react';
import { useLocation, Location } from 'umi';
import { Empty } from 'antd';
import Header from './components/HeaderTit';
import SideMenu from './components/SideMenu';
import IndexList from './components/IndexList';
import JcdView from './components/JcdView';

import './index.scss';

const IndexLibrary: FC = () => {
  const { query: { documentId, documentType } } = useLocation<Location>();
  return (
    <div>
      <Header />
      <div className="ui-index-library__main">
        <SideMenu />
        {documentId && documentType === 'HYD' && <IndexList />}
        {documentId && ['JCD', 'OTHER'].includes(documentType) && (
          <JcdView id={documentId} type={documentType} />
        )}
        {!documentId && <Empty />}
      </div>
    </div>
  );
};

export default IndexLibrary;
