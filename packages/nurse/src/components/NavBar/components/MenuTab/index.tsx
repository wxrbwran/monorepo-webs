import React from 'react';
import { Tabs } from 'antd';
import styles from './index.scss';

const { TabPane } = Tabs;

function MenuTab() {
  return (
    <div className={styles.menu_tab}>
      <Tabs defaultActiveKey="UNPROCESSED">
        <TabPane tab="工单审核" key="UNPROCESSED" />
      </Tabs>
    </div>
  );
}

export default MenuTab;
