import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import ProjectItem from '../components/ProjectItem';
import type { IProjectDetail, ITabItem } from '@/types/clinical';
import * as api from '@/services/api';

const { TabPane } = Tabs;
function Overview() {
  const [projectList, setProjectList] = useState([]);
  const tabList: ITabItem[] = [
    { tab: '全部项目', data: ['multi_project', 'single_project'] },
    { tab: '多中心临床试验', data: ['multi_project'] },
    { tab: '单中心临床试验', data: ['single_project'] }
  ];
  useEffect(() => {
    // 获取参加的临床科研实验项目
    api.overview.getProjectList(window.$storage.getItem('nsId')!).then(res => {
      setProjectList(res.projectInfos);
    });
  }, [])
  return (
    <div className="pl-20">
      <Tabs
        tabPosition='top'
        animated={false}
        defaultActiveKey="ALL"
        size="large"
        className="tab_btn_18"
      >
        {
          tabList.map(item => {
            return (
              <TabPane tab={item.tab} key={item.tab}>
                <div className="flex flex-row items-start flex-wrap">
                  {
                  projectList.filter((proj: IProjectDetail) => item.data.includes(proj.label))
                  .map(project => <ProjectItem data={project} key={project.projectSid} />)
                  }
                  {
                    projectList.length === 0 && '暂无数据'
                  }
                </div>
              </TabPane>
            )
          })
        }
      </Tabs>
    </div>
  );
}

export default Overview;
