import React from 'react';
import BarChart from '../components/BarChart';

function CroQuality() {
  const dataSource = [{
    name: '患者满意度',
    ratio: 99
  }, {
    name: '达标率',
    ratio: 50
  }, {
    name: '回复及时率',
    ratio: 80
  }]
  return (
    <BarChart data={dataSource} title='随访质控管理'/>
  )
}

export default CroQuality;
