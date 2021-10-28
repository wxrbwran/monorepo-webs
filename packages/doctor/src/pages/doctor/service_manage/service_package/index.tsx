import React, { FC } from 'react';
import { Button, Tabs } from 'antd';
import PackageItem from '../components/PackageItem';
import AddServicePackage from '../components/AddServicePackage';
import styles from './index.scss';

const { TabPane } = Tabs;
const ServicePackage: FC = () => {
  const handleChangeTabs = (key: string) => {
    console.log(key);
  };
  const handleRefresh = () => {

  };

  return (
    <div className={`p-20 w-full ${styles.service_package}`}>
      <AddServicePackage>
        <Button type="primary" className="mb-20">+ 添加新服务包</Button>
      </AddServicePackage>
      <Tabs defaultActiveKey="1" onChange={handleChangeTabs} size="large">
        <TabPane tab="我创建的" key="1">
          <PackageItem showEdit={true} handleRefresh={handleRefresh} />
        </TabPane>
        <TabPane tab="我参与的" key="2">
          <PackageItem  />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ServicePackage;
