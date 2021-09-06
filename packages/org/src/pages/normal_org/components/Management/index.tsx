import React, { FC, useState } from 'react';
import { Tabs } from 'antd';
import DoctorManage from '../DoctorManage';

const { TabPane } = Tabs;
const Management: FC = () => {
  const [tab, setTab] = useState('');
  const handleTabChange = (active: string) => {
    setTab(active);
  };
  return (
    <Tabs
      style={{ width: '100%' }}
      defaultActiveKey={tab}
      size="large"
      onChange={handleTabChange}
    >
      <TabPane tab="医院医生管理" key="doctor">
        <DoctorManage />
      </TabPane>
      {/* <TabPane tab="医疗质量管理" key="qulity">
        <QualityManage />
      </TabPane>
      <TabPane tab="医疗数据管理" key="data">
        <DataManage />
      </TabPane> */}
    </Tabs>
  );
};

export default Management;
