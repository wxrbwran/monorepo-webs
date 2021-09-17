import type { FC} from 'react';
import { useState, useEffect } from 'react';
import React from 'react';
import SideMenu from '@/components/SideMenu';
// import { projectListMock, deparmentList } from '../mock';
import ProjectItem from '../components/ProjectItem';
import { useSelector } from 'umi';
import { Empty } from 'antd';
import * as api from '@/services/api';

const Department: FC = () => {
  const [projects, setProlects] = useState([]);
  const pureDepartmentList = useSelector((state: Store) => state?.org?.currentOrg?.pureDepartmentList);

  const handleChangeTab = (key: string) => {
    if (key) {
      // 获取对应科室下的项目列表
      api.overview.getDepartmentProject(key).then((res) => {
        setProlects(res.projectInfos);
      });
    }
  };
  useEffect(() => {
    handleChangeTab(pureDepartmentList?.[0]?.id);
  }, []);
  return (
    <div className={`flex h-full ${pureDepartmentList.length > 0 ? '' : 'justify-center items-center'}`}>
      {
        pureDepartmentList.length > 0 ? (
          <>
            <SideMenu data={pureDepartmentList} keyName="id" handleChangeTab={handleChangeTab} />
              <div className="flex-1 ml-28 overflow-auto">
                {projects.map((project) => (
                  <ProjectItem data={project} key={project.projectSid} className="dep-item" />
                ))}
                {projects.length === 0 && '暂无数据'}
              </div>
          </>
        ) : <Empty />
      }

    </div>
  );
};
export default Department;
