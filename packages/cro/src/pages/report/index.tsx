import React from 'react';
import noTable from '@/assets/img/follow-table/no_table.png';
import { Link } from 'react-router-dom';
import './index.scss';

export default () => {
  return (
    <div className="report-empty">
      <img className="no-data-img" src={noTable} alt="暂无主观量表" />
      <p> 暂未生成报告， </p>
      <p>请您<Link data-testid='link' to="/query">去查询</Link>模块根据您的查询条件生成科研报告吧！</p>
    </div>
  )
}