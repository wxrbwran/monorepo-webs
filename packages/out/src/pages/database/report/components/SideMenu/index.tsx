import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

interface IProps {
  location: {
    query: {
      reportId: string;
    }
  };
  reportList: {
    id: string,
    name: string
  }[]
}
function SideMenu({ location, reportList }: IProps) {
  const [curTableId, setCurTableId] = useState(location.query.reportId);
  useEffect(() => {
    setCurTableId(location.query.reportId);
  }, [location]);

  return (
    <div className="report-table-menu">
      <div className="table-list">
        {
          reportList.map(item => {
            return (
              <div
                className={['item', item.id === curTableId ? 'active' : ''].join(' ')}
                key={item.id}
                onClick={() => setCurTableId(item.id)}
              >
                <Link to={`/database/report?reportId=${item.id}&reportName=${item.name}`}>{item.name}</Link>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default SideMenu;
