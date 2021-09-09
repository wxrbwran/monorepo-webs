import moment from 'moment';
import React from 'react'

export const normalColumns = [{
  title: '时间',
  dataIndex: 'createdAt',
  render: (text: number) => <span>{moment(text).format('YYYY年MM月DD日 HH:mm')}</span>,
},{
  title: '数值',
  dataIndex: 'number',
  key: 'number',
},{
  title: '单位',
  dataIndex: 'unit',
  key: 'unit',
}]
