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
  type: string;
  tableList: {
    id: string,
    name: string;
  }[]
}

function SideMenu(props: IProps) {
  const { type } = props;
  const [currentId, setCurrentId] = useState('');
  const scaleData = {
    CRF: {  title: 'CRF量表', urlName: 'crf', createUrl: 'create' },
    subjective: { title: '主观量表', urlName: 'subjective', createUrl: 'guide'  },
    objective: { title: '客观检查', urlName: 'objective', createUrl: 'create'  },
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
        <span>全部{scaleData[type].title}</span>
      </div>
      <div className="table-list">
        {
          props.tableList.map((item, index) => {
            return (
              <div
                className={['item', item.id === currentId ? 'active' : ''].join(' ')}
                key={item.id}
              >
                <Link to={`/out_plan_visit/${scaleData[type].urlName}/detail?id=${item.id}`}>{index + 1}. {item.name}</Link>
              </div>
            );
          })
        }
      </div>
      {
        window.$storage.getItem('isLeader') && (
          <div className="create">
            <Link to={`/out_plan_visit/${scaleData[type].urlName}/${scaleData[type].createUrl}`}>
              <PlusOutlined style={{ fontSize: 14 }} /> 创建{scaleData[type].title}
            </Link>
          </div>
        )
      }
    </div>
  );
}
export default SideMenu;
