import React, { FC } from 'react';
import { Tabs } from 'antd';
import ServicePersonal from '../component/ServicePersonal';
import Member from '../component/Member';

const { TabPane } = Tabs;

const ServicePeople: FC = () => {
  return (
    <div className='w-full'>
      <Tabs defaultActiveKey="1" style={{ paddingLeft: 20 }}>
        <TabPane tab="服务人员" key="1">
          <ServicePersonal />
        </TabPane>
        <TabPane tab="会员" key="2">
          <Member />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ServicePeople;
