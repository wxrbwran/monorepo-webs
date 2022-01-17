import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import './index.scss';

interface IProps{
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
function SideMenu(props: IProps) {
  const [currentId, setCurrentId] = useState('');
  useEffect(() => {
    const id = props.location.query.id;
    if ( id !== currentId) {
      setCurrentId(id);
    }
  }, [props]);
  return (
    <div className="follow-table-menu">
      <div className="tit">
        <span>全部主观量表</span>
      </div>
      <div className="table-list">
        {
          props.tableList.map((item, index) => {
            return (
              <div
                className={['item', item.id === currentId ? 'active' : ''].join(' ')}
                key={item.id}
              >
                <Link to={`/subjective_table/detail?id=${item.id}`}>{index + 1}. {item.name}</Link>
              </div>
            );
          })
        }
      </div>
      {
        window.$storage.getItem('isLeader') && window.$storage.getItem('projectStatus') != 1001 && (
          <div className="create">
            <Link to="/subjective_table/guide">
              <PlusOutlined style={{ fontSize: 14 }} /> 创建主观量表
            </Link>
          </div>
        )
      }
    </div>
  );
}
export default SideMenu;
