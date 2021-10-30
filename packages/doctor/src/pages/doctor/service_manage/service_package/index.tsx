import React, { FC, useEffect, useState } from 'react';
import { Button, Tabs } from 'antd';
import PackageTeamItem, { IDataList } from '../components/PackageTeamItem';
import AddServicePackage from '../components/AddServicePackage';
import * as api from '@/services/api';
import { Role } from 'xzl-web-shared/src/utils/role';
import { isEmpty } from 'lodash';
import styles from './index.scss';

const { TabPane } = Tabs;
const ServicePackage: FC = () => {
  const [packages, setPackages] = useState<{ creator: IDataList[], participant: IDataList[] }>({ creator: [], participant: [] });
  const doctorSid = window.$storage.getItem('sid');
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
      const packs: CommonData = { creator: [], participant: [] };
      // [Role.UPPER_DOCTOR.id, Role.LOWER_DOCTOR.id, Role.DIETITIAN.id, Role.ALONE_DOCTOR.id]
      teams.forEach(teamItem => {
        let isCreator = false;
        let isAloneTeams = false;
        teamItem.innerTeams.forEach((innerItem: { members: ISubject[] }) => {
          innerItem.members.forEach(member => {
            if (member.role === Role.ALONE_DOCTOR.id) {
              isAloneTeams = true;
            }
            if (member.role === Role.NS_OWNER.id && member.sid === doctorSid) {
              isCreator = true;
            }
          });
        });
        if (!isAloneTeams) {
          if (isCreator) {
            packs.creator.push(teamItem);
          } else {
            packs.participant.push(teamItem);
          }
        }
      });
      setPackages(packs);
      console.log('llll*****', packs);
    });
  };

  useEffect(() => {
    fetchPackages();
  }, []);
  console.log('4343packages,', packages);
  return (
    <div className={`p-20 w-full ${styles.service_package}`}>
      <AddServicePackage onSuccess={fetchPackages}>
        <Button type="primary" className="mb-20">+ 添加新服务包</Button>
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
