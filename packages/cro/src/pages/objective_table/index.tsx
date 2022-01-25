import React from 'react';
import noTable from '@/assets/img/follow-table/no_table.png';
import { Button } from 'antd';
import { Link } from 'umi';
import { Role } from 'xzl-web-shared/dist/utils/role';
import { useSelector } from 'umi';

export default () => {

  const { roleType, status } = useSelector((state: IState) => state.project.projDetail);
  const isLeader = [Role.MAIN_PI.id, Role.PROJECT_LEADER.id].includes(roleType);

  return (
    // 无主观量表展示
    <div className="follow-table-empty  mt-100">
      <img className="no-data-img" src={noTable} alt="暂无提醒" />
      <p>
        您的项目内暂无提醒，
      </p>
      <p>创建并设置提醒计划开始您的科研吧。</p>
      <Button type="primary" disabled={!isLeader || status == 1001}>
        <Link to="/objective_table/create">立即创建</Link>
      </Button>
    </div>
  );
};
