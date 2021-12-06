import React, { useEffect, useState } from 'react';
import CountItem from '../components/CountItem';
import type { ICountItem } from '@/types/clinical';
import ChartProject from '../components/ChartProject';
// import { projectListChart } from '../mock';
import * as api from '@/services/api';
import styles from './index.scss';

function DataStatistics() {
  const [projectData, setProjectData] = useState({ infos: [] });
  const leftCount: ICountItem[] = [
    { countKey: 'doctorCount', desc: '开展试验医生数量', unit: '人' },
    { countKey: 'projectCount', desc: '试验总数' },
  ];
  const rightCount: ICountItem[] = [
    { countKey: 'patientCount', desc: '受试者人数', unit: '人' },
    { countKey: 'multiCount', desc: '单中心临床试验' },
    { countKey: 'singleCount', desc: '多中心临床试验' },
  ];

  console.log('============= ');
  useEffect(() => {

    api.overview.getProjectStatistics(window.$storage.getItem('nsId')!).then(res => {
      setProjectData(res);
    });
    // api.org.getOrgInfo({
    //   sid: window.$storage.getItem('sid'),
    //   sRole: Role.ORG_ADMIN.id,
    // }).then(res => {

    //   window.$storage.setItem('orgSid', res.orgSid);
    //   window.$storage.setItem('orgRole', res.orgRole);
    // });
  }, []);
  return (
    <div className="flex items-start h-full bg-white">
      <div className={`flex mr-88 mt-80 ml-30 ${styles.count}`}>
        <div className="mr-50">
          {leftCount.map(item => <CountItem data={item} projectData={projectData} key={item.desc} />)}
        </div>
        <div className="ml-50">
          {rightCount.map(item => <CountItem data={item} projectData={projectData} key={item.desc} />)}
        </div>
      </div>
      <div className={styles.chart_box}>
        <div className="text-xl mt-30 mb-30">项目统计</div>
        <ChartProject data={projectData.infos} />
      </div>
    </div>
  );
}
export default DataStatistics;
