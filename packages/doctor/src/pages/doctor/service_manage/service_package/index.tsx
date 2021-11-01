import React, { FC, useEffect, useState } from 'react';
import { Button, Tabs } from 'antd';
import PackageTeamItem, { IDataList } from '../components/PackageTeamItem';
import AddServicePackage from '../components/AddServicePackage';
import * as api from '@/services/api';
import { formatDoctorTeams } from '@/utils/utils';
import { isEmpty } from 'lodash';
import styles from './index.scss';

const { TabPane } = Tabs;
const ServicePackage: FC = () => {
  const [packages, setPackages] = useState<{ creator: IDataList[], participant: IDataList[] }>({ creator: [], participant: [] });
  const handleChangeTabs = (key: string) => {
    console.log(key);
  };
  const fetchPackages = () => {
    const params = {
      pageAt: 1,
      pageSize: 99999,
      teamNSLabels: ['chronic_disease_team'],
    };
    // innerTeams表示套餐集合，members表示一个坑位的信息集合
    api.service.fetchDoctorTeams(params).then(({ teams }: { teams: any[] }) => {
      setPackages(formatDoctorTeams(teams));
    });
  };

  useEffect(() => {
    fetchPackages();
  }, []);
  console.log('4343packages,', packages);
  return (
    <div className={`p-20 w-full ${styles.service_package}`}>
      <AddServicePackage onSuccess={fetchPackages}>
        <Button type="primary" className="mb-20">+ 添加新服务小组</Button>
      </AddServicePackage>
      <Tabs defaultActiveKey="1" onChange={handleChangeTabs} size="large">
        <TabPane tab="我创建的" key="1">
          {
            isEmpty(packages.creator) ? <div>暂无数据</div> : (
              packages.creator.map(item => (
                <PackageTeamItem key={item.teamNSId} dataList={item} showEdit={true} handleRefresh={fetchPackages} />
              ))
            )
          }
        </TabPane>
        <TabPane tab="我参与的" key="2">
          {
            isEmpty(packages.participant) ? <div>暂无数据</div> : (
              packages.participant.map(item => (
                <PackageTeamItem  key={item.teamNSId} dataList={item}  />
              ))
            )
          }
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ServicePackage;
