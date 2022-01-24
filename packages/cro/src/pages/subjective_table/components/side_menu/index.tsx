import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import './index.scss';
import { Role } from 'xzl-web-shared/dist/utils/role';
import { useSelector } from 'umi';
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
function SideMenu(props: IProps) {
  const [currentId, setCurrentId] = useState('');
  const { roleType, status } = useSelector((state: IState) => state.project.projDetail);

  useEffect(() => {
    const id = props.location.query.id;
    if (id !== currentId) {
      setCurrentId(id);
    }
  }, [props]);

  const isLeader = [Role.MAIN_PI.id, Role.PROJECT_LEADER.id].includes(roleType);

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
        isLeader && status != 1001 && (
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
