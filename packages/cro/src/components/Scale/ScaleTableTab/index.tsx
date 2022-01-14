import { getUrlPreFix } from '@/pages/subjective_table/util';
import React, { useState, useEffect } from 'react';
import { Link } from 'umi';

interface IProps {
  id: string;
  location: {
    pathname: string;
  };
  scaleType: 'CRF' | 'SUBJECTIVE' | 'VISIT_CRF' | 'VISIT_SUBJECTIVE';
}

function ScaleTableTab({ location, id, scaleType }: IProps) {
  const [activeTab, setActiveTab] = useState('');
  useEffect(() => {
    let newTab = 'detail';
    if (location.pathname.includes('reply')) {
      newTab = 'reply';
    } else if (location.pathname.includes('send_record')) {
      newTab = 'send_record';
    }
    setActiveTab(newTab);
  }, [location.pathname]);
  const tabList = [
    {
      name: (scaleType === 'CRF' || scaleType === 'VISIT_CRF') ? 'CRF量表' : '主观量表',
      url: 'detail',
    },
    {
      name: '回复状态',
      url: 'reply',
    },
    {
      name: '发送记录',
      url: 'send_record',
    },
  ];

  console.log('============== scaleType scaleType', scaleType);

  return (
    <div className="subjective-table-tab">
      {
        tabList.map(item => {
          return (
            <div
              key={item.url}
              className={['item', activeTab === item.url ? 'active' : ''].join(' ')}
              onClick={() => setActiveTab(item.url)}
            >
              <Link to={`/${getUrlPreFix(scaleType)}/${item.url}?id=${id}`}>{item.name}</Link>
            </div>
          );
        })
      }
    </div>
  );
}

export default ScaleTableTab;
