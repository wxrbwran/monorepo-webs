import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useParams } from 'umi';
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
  const { type } = useParams<{ type: string }>();
  const soruceType = {
    education: { text: '宣教' },
    suifang: { text: '随访' },
  };
  useEffect(() => {
    const id = props.location.query.id;
    if ( id !== currentId) {
      setCurrentId(id);
    }
  }, [props]);
  return (
    <div className="follow-table-menu">
      <div className="tit">
        <span>全部{soruceType[type].text}</span>
      </div>
      <div className="table-list">
        {
          props.tableList.map((item) => {
            return (
              <div
                className={['item', item.id === currentId ? 'active' : ''].join(' ')}
                key={item.id}
              >
                <Link to={`/publicize/${type}/detail?id=${item.id}`}>{item.name}</Link>
              </div>
            );
          })
        }
      </div>
      <div className="create">
        <Link to={`/publicize/${type}/create`}>
          <PlusOutlined style={{ fontSize: 14 }} /> 创建新{soruceType[type].text}
        </Link>
      </div>
    </div>
  );
}
export default SideMenu;
