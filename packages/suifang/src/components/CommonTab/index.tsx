import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import './index.scss';

const { TabPane } = Tabs;
interface IProps {
  activeTab: string;
  location: {
    pathname: string;
    query: {
      projectSid: string;
    }
  };
}
function CommonTab(props: IProps) {
  const dispatch = useDispatch();
  const [currTab, setCurrTab] = useState('');
  useEffect(() => {
    const urlName = props.location.pathname.split('/')[1];
    console.log(urlName);
    if (currTab !== urlName) {
      setCurrTab(urlName);
    }
  }, [props]);
  const handleChangeTab = (key: string) => {
    if (key !== currTab) {
      history.push(`/${key}`);
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
