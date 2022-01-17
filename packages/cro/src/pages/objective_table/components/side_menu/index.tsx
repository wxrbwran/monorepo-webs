import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import './index.scss';

interface IProps {
  location: {
    pathname: string;
    query: {
      id: string;
    }
  };
  tableList: {
    id: string,
    name: string;
  }[]
}

const setFormName = (name:string)=> {
  window.$storage.setItem('objectFormName', name);
};

function SideMenu({ tableList, location }: IProps) {
  const [currentId, setCurrentId] = useState('');
  useEffect(() => {
    const id = location.query.id;
    if ( id !== currentId) {
      setCurrentId(id);
    }
  }, [location]);
  return (
    <div className="left-slide">
      <div className="tit">
        <span>全部提醒</span>
      </div>
      <div className="table-list">
        {
          tableList.map((item, index) => {
            return (
              <div
                className={['item', item.id === currentId ? 'active' : ''].join(' ')}
                key={item.id}
              >
                <Link to={`/objective_table/detail?id=${item.id}`} onClick={()=>setFormName(item.name)}>{index + 1}. {item.name}</Link>
              </div>
            );
          })
        }
      </div>
      <div className="create">
        {
          window.$storage.getItem('isLeader') && window.$storage.getItem('projectStatus') != 1001 && (
          <Link to="/objective_table/create">
            <PlusOutlined style={{ fontSize: 14 }} /> 创建新提醒
          </Link>
          )
        }
      </div>
    </div>
  );
}

export default SideMenu;
