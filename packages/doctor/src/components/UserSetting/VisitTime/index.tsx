import React, { useState } from 'react';
import { Table } from 'antd';
import Tabs from './Tabs';
import Td from './Td';
import styles from './index.scss';

function VisitTime() {
  const [activeType, setActiveType] = useState('visiting');
  const handleChangeTab = (tab: string) => {
    setActiveType(tab);
    console.log(activeType);
  };
  const ampm: CommonData = {
    AM: '上午',
    FORENOON: '上午',
    PM: '下午',
    AFTERNOON: '下午',
    NIGHT: '晚上',
  };
  const columns = [
    {
      title: '',
      dataIndex: 'ampm',
      width: 80,
      render: (text: string) => ampm[text],
    },
    {
      title: '周一',
      dataIndex: 'MONDAY',
      render: (text: string, record: object) => (
        <Td text={text} record={record} dayOfWeek="MONDAY" activeType={activeType} />
      ),
    },
    {
      title: '周二',
      dataIndex: 'TUESDAY',
      render: (text: string, record: object) => (
        <Td text={text} record={record} dayOfWeek="TUESDAY" activeType={activeType} />
      ),
    },
    {
      title: '周三',
      dataIndex: 'WEDNESDAY',
      render: (text: string, record: object) => (
        <Td text={text} record={record} dayOfWeek="WEDNESDAY" activeType={activeType} />
      ),
    },
    {
      title: '周四',
      dataIndex: 'THURSDAY',
      render: (text: string, record: object) => (
        <Td text={text} record={record} dayOfWeek="THURSDAY" activeType={activeType} />
      ),
    },
    {
      title: '周五',
      dataIndex: 'FRIDAY',
      render: (text: string, record: object) => (
        <Td text={text} record={record} dayOfWeek="FRIDAY" activeType={activeType} />
      ),
    },
    {
      title: '周六',
      dataIndex: 'SATURDAY',
      render: (text: string, record: object) => (
        <Td text={text} record={record} dayOfWeek="SATURDAY" activeType={activeType} />
      ),
    },
    {
      title: '周日',
      dataIndex: 'SUNDAY',
      render: (text: string, record: object) => (
        <Td text={text} record={record} dayOfWeek="SUNDAY" activeType={activeType} />
      ),
    },
  ];
  const orgAppointInfos = [
    {
      ampm: 'AM',
      dayAppointInfos: [
        {
          dayOfWeek: 'MONDAY',
          inWork: true,
          beginTime: '08:00',
          endTime: '12:00',
          defaultTime: true,
        },
        {
          dayOfWeek: 'TUESDAY',
          inWork: true,
          beginTime: '09:00',
          endTime: '10:00',
          defaultTime: false,
        },
        {
          dayOfWeek: 'WEDNESDAY',
          inWork: true,
          beginTime: '08:00',
          endTime: '10:00',
          defaultTime: false,
        },
        {
          dayOfWeek: 'THURSDAY',
          inWork: true,
          beginTime: '08:00',
          endTime: '12:00',
          defaultTime: true,
        },
        {
          dayOfWeek: 'FRIDAY',
          inWork: false,
          beginTime: '',
          endTime: '',
          defaultTime: false,
        },
        {
          dayOfWeek: 'SATURDAY',
          inWork: true,
          beginTime: '06:00',
          endTime: '10:00',
          defaultTime: false,
        },
        {
          dayOfWeek: 'SUNDAY',
          inWork: false,
          beginTime: '',
          endTime: '',
          defaultTime: false,
        },
      ],
    },
    {
      ampm: 'PM',
      dayAppointInfos: [
        {
          dayOfWeek: 'MONDAY',
          inWork: true,
          beginTime: '12:00',
          endTime: '23:59',
          defaultTime: false,
        },
        {
          dayOfWeek: 'TUESDAY',
          inWork: true,
          beginTime: '14:00',
          endTime: '23:59',
          defaultTime: false,
        },
        {
          dayOfWeek: 'WEDNESDAY',
          inWork: false,
          beginTime: '',
          endTime: '',
          defaultTime: false,
        },
        {
          dayOfWeek: 'THURSDAY',
          inWork: false,
          beginTime: '',
          endTime: '',
          defaultTime: false,
        },
        {
          dayOfWeek: 'FRIDAY',
          inWork: true,
          beginTime: '20:00',
          endTime: '23:00',
          defaultTime: false,
        },
        {
          dayOfWeek: 'SATURDAY',
          inWork: true,
          beginTime: '14:00',
          endTime: '16:00',
          defaultTime: false,
        },
        {
          dayOfWeek: 'SUNDAY',
          inWork: true,
          beginTime: '14:00',
          endTime: '21:00',
          defaultTime: false,
        },
      ],
    },
  ];
  return (
    <div className={styles.visit}>
      <Tabs handleChangeTab={handleChangeTab} />
      <div className={styles.item}>
        <h4>万物无疆医院</h4>
        <Table dataSource={orgAppointInfos} columns={columns} bordered pagination={false} />
      </div>
    </div>
  );
}

export default VisitTime;
