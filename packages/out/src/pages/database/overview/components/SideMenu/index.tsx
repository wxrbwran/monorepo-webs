import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  location: {
    query: {
      id: string;
    };
  };
  scaleList: {
    id: string,
    name: string
  }[]
}
function SideMenu({ location, scaleList }: IProps) {
  const [curTabId, setCurTabId] = useState(location.query.id);
  useEffect(() => {
    setCurTabId(location.query.id);
  }, [location]);

  return (
    <div className="report-table-menu">
      <div className="table-list">
        {
          scaleList.map(item => {
            return (
              <div
                className={['item', item.id === curTabId ? 'active' : ''].join(' ')}
                key={item.id}
                onClick={() => setCurTabId(item.id)}
              >
                <Link to={`/database/overview?id=${item.id}`}>{item.name}</Link>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default SideMenu;
