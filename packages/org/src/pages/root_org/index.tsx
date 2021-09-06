import React, { FC, useState } from 'react';
import { Tabs } from 'antd';
import { history } from 'umi';
// import DataManage from '../normal_org/components/DataManage';
// import QualityManage from '../normal_org/components/QualityManage';
import Orgs from './components/Orgs';
import styles from './index.scss';

const { TabPane } = Tabs;

const RootOrg: FC = () => {
  const hrefTab = history.location.query.tab;
  const [tab, setTab] = useState<string>(hrefTab || 'doctor');
  function handleTabChange(key: string): void {
    setTab(key);
    history.replace({
      pathname: '/root_org',
      query: {
        tab: key,
      },
    });
  }
  // useEffect(() => {
  //   console.log(111);
  // }, []);
  return (
    <div className={styles.content}>
      <Tabs defaultActiveKey={tab} size="large" onChange={handleTabChange}>
        <TabPane tab="医院医生管理" key="doctor">
          <Orgs />
        </TabPane>
        {/* <TabPane tab="医疗质量管理" key="qulity">
          <QualityManage />
        </TabPane>
        <TabPane tab="医疗数据管理" key="data">
          <DataManage />
        </TabPane> */}
      </Tabs>
    </div>
  );
};

RootOrg.title = '医院列表';

export default RootOrg;
