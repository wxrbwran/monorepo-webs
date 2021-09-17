import React from 'react';
import noTable from '@/assets/img/empty.png';
import { Link } from 'react-router-dom';
import './index.scss';

export default () => {
  return (
    <div className="report_empty">
      <img className="no_data_img" src={noTable} alt="暂无主观量表" />
      <p> 暂未生成报告， </p>
      <p>请您<Link data-testid='link' to="/database/query">去查询</Link>模块根据您的查询条件生成科研报告吧！</p>
    </div>
  )
}
