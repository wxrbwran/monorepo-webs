import React from 'react';
import BarChart from '../components/BarChart';

function CroQuality() {
  const dataSource = [{
    name: '主观量表回复率',
    ratio: 68
  }, {
    name: '患者回复及时率',
    ratio: 57
  }, {
    name: '客观量表完成率',
    ratio: 28
  }]
  return (
    <BarChart data={dataSource} title='科研质控管理'/>
  )
}

export default CroQuality;
