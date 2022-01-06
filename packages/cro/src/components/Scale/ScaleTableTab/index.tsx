import React, { useState, useEffect } from 'react';
import { Link } from 'umi';

interface IProps {
  id: string;
  location: {
    pathname: string;
  };
  scaleType: string;
  source?: string; // out_plan_visit计划外随访
}

function ScaleTableTab({ location, id, scaleType, source }: IProps) {
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
      name: scaleType === 'crf' ? 'CRF量表' : '主观量表',
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
  let urlPrefix = scaleType === 'crf' ? 'end_event' : 'subjective_table';
  if (source === 'out_plan_visit') {
    urlPrefix = `out_plan_visit/${scaleType.toLocaleLowerCase()}`;
  }

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
              <Link to={`/${urlPrefix}/${item.url}?id=${id}`}>{item.name}</Link>
            </div>
          );
        })
      }
    </div>
  );
}

export default ScaleTableTab;
