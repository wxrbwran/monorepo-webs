import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { useSelector, Link } from 'umi';
import {projectDefaultImg} from '@/utils/consts';
import { Role } from 'xzl-web-shared/src/utils/role';
import styles from './index.scss';
import { IProjectList, IState } from 'typings/global';
import ProjectItem from '../ProjectItem';
import { isEmpty } from 'lodash';

interface IItem {
  title: string;
  data: IProjectList[]
};
const { TabPane } = Tabs;
interface IFormatData {
  [key: string]: IItem
}

function Home() {
  const projectList = useSelector((state:IState)=>state.project.projectList);
  const [multiProject, setMultiProject] = useState<IItem[]>([]);
  const [singleProject, setSingleProject] = useState<IItem[]>([]);
  useEffect(() => {
    const formatData: IFormatData = {
      mainPi: { title: '总PI', data: [] },
      subPi: { title: '分PI', data: [] },
      pi: { title: 'PI', data: [] },
      researcher: { title: '研究者', data: []},
      multiMember: { title: '暂未分配', data: []},

      projectLeader: { title: '项目组长', data: [] },
      psingleMember: { title: '组员', data: [] },
    }
    projectList.forEach((item: IProjectList) => {
      switch (item.roleType) {
        case Role.MAIN_PI.id:
          formatData.mainPi.data.push(item);
          break;
        case Role.SUB_PI.id:
          formatData.subPi.data.push(item);
          break;
        case Role.PI.id:
          formatData.pi.data.push(item);
          break;
        case Role.PROJECT_LEADER.id:
          formatData.projectLeader.data.push(item);
          break;
        case Role.PROJECT_RESEARCHER.id:
          formatData.researcher.data.push(item);
          break;
        case Role.PROJECT_MEMBERS.id:
          formatData.psingleMember.data.push(item);
          break;
        default:
          item.label === 'single_project' ?
            formatData.psingleMember.data.push(item)
           : formatData.multiMember.data.push(item);

      }
    })
    const multiList: IItem[] = [];
    const singleList:IItem[] = [];
    Object.keys(formatData).forEach(item => {
      if(!isEmpty(formatData[item].data)) {
        if ([ 'projectLeader', 'psingleMember' ].includes(item)) {
          singleList.push(formatData[item]);// 单中心
        } else {
          multiList.push(formatData[item]); // 多中心
        }
      }
    })
    setMultiProject(multiList);
    setSingleProject(singleList)
  }, [projectList])
  return (
    <div className={styles.tab}>
      <Tabs
        tabPosition='top'
        animated={false}
        defaultActiveKey="ALL"
      >
        <TabPane tab="全部项目" key="ALL">
          <div className={styles.proj_item}>
            {
              projectList.map((item)=>(
                <Link
                  to={`proj_detail?projectSid=${item.projectSid}&projectName=${item.name}`}
                  key={item.projectSid}
                >
                  <p>
                    <span className={styles.proj_name}>{item.name}</span>
                    <img src={item.detail.avatarUrl ? item.detail.avatarUrl : projectDefaultImg[0]} />
                  </p>
                </Link>
              ))
            }
            {
              projectList.length === 0 && '暂无项目'
            }
          </div>
        </TabPane>
        <TabPane tab="多中心临床试验" key="DOUBLE">
          {multiProject.map(item => <ProjectItem data={item} key={item.title} />)}
        </TabPane>
        <TabPane tab="单中心临床试验" key="SINGLE">
          {singleProject.map(item => <ProjectItem data={item}  key={item.title} />)}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Home;
