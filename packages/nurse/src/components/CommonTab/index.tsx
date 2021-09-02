import React, { useState } from 'react';
import { history } from 'umi';
import { Tabs } from 'antd';
import styles from './index.scss';

const { TabPane } = Tabs;
function CommonTab() {
  const patientSid = window.$storage.getItem('patientSid');
  const { pathname } = history.location;
  let initCurrTab = `patient_panel/${patientSid}`;

  if (pathname.includes('unchecked')) {
    initCurrTab = 'checked_img/unchecked';
  } else if (pathname.includes('checked')) {
    initCurrTab = 'checked_img/checked';
  }
  const [currTab, setCurrTab] = useState(initCurrTab);
  const handleChangeTab = (key: string) => {
    setCurrTab(key);
    history.push(`/${key}`);
  };
  const navBar = [
    {
      statusName: '个人信息及诊断',
      status: `patient_panel/${patientSid}`,
    },
    {
      statusName: '已审核图片',
      status: 'checked_img/checked',
    },
    {
      statusName: '图片审核',
      status: 'checked_img/unchecked',
    },
  ];
  return (
    <>
      <Tabs
        onChange={handleChangeTab}
        activeKey={currTab}
        tabPosition="top"
        animated={false}
        className={styles.common_tab}
      >
        {navBar.map((pane) => (
          <TabPane tab={pane.statusName} key={pane.status} />
        ))}
      </Tabs>
    </>
  );
}

export default CommonTab;
