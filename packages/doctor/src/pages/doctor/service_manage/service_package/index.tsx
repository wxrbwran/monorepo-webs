import React, { FC } from 'react';
import { Button, Tabs } from 'antd';

const { TabPane } = Tabs;
const ServicePackage: FC = () => {

  const handleChangeTabs = (key: string) => {
    console.log(key);
  };

  return (
    <div className="p-20">
      <Button type="primary">+ 添加新服务包</Button>
      <Tabs defaultActiveKey="1" onChange={handleChangeTabs}>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ServicePackage;
