import React from 'react';
import noTable from '@/assets/img/follow-table/no_table.png';
import { Button } from 'antd';
import { Link } from 'umi';

export default () => {
  return (
    // 无主观量表展示
    <div className="follow-table-empty mt-100">
      <img className="no-data-img" src={noTable} alt="暂无提醒" />
      <p>
        您的项目内暂无提醒，
      </p>
      <p>创建并设置提醒计划开始您的科研吧。</p>
      <Button type="primary" disabled={!window.$storage.getItem('isLeader') || window.$storage.getItem('projectStatus') == 1001}>
        <Link to="/out_plan_visit/objective/create">立即创建</Link>
      </Button>
    </div>
  );
};
