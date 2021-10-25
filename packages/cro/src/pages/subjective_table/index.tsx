import React from 'react';
import noTable from '@/assets/img/follow-table/no_table.png';
import { Button } from 'antd';
import { Link, useSelector } from 'umi';
import { IState } from 'typings/global';

export default () => {
  const { status } = useSelector((state: IState) => state.project.projDetail);
  return (
    // 无主观量表展示
    <div className="follow-table-empty">
      <img className="no-data-img" src={noTable} alt="暂无主观量表" />
      <p>
        您的项目内暂无主观量表，
      </p>
      <p>创建量表并设置计划开始您的科研吧。</p>
      <Button type="primary" disabled={!window.$storage.getItem('isLeader') || status == 1001}>
        <Link to="/subjective_table/guide">立即创建</Link>
      </Button>
    </div>
  );
};
