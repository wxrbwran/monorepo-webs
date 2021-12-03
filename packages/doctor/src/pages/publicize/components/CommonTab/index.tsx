import React, { useState, useEffect } from 'react';
import { history, useLocation } from 'umi';
import { Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import './index.scss';

const { TabPane } = Tabs;

function CommonTab() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currTab, setCurrTab] = useState('');
  useEffect(() => {
    const urlName = location.pathname.split('/')[2];
    if (currTab !== urlName) {
      setCurrTab(urlName);
    }
  }, [location]);
  const handleChangeTab = (key: string) => {
    if (key !== currTab) {
      history.push(`/publicize/${key}`);
      dispatch({
        type: 'navBar/setActiveTab',
        payload: {
          activeTab: key,
        },
      });
    }
  };
  const croNav = [
    {
      statusName: '全部患者',
      status: 'patients',
    },
    {
      statusName: '宣教文件库、随访表',
      status: 'files',
    },
    {
      statusName: '患者宣教',
      status: 'education',
    },
    {
      statusName: '患者随访',
      status: 'suifang',
    },
    {
      statusName: 'CRF量表',
      status: 'crf_scale',
    },
  ];
  return (
    <>
      <Tabs
        onChange={handleChangeTab}
        activeKey={currTab}
        tabPosition="top"
        animated={false}
        className="project-cont-tab"
      >
        {croNav.map((pane) => (
          <TabPane tab={pane.statusName} key={pane.status} />
        ))}
      </Tabs>
    </>
  );
}

export default CommonTab;
