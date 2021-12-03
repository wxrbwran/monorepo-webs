import React, { FC } from 'react';
import PersonCount from './components/person-count';
import DoctorData from './components/doctor-data';
import PatientData from './components/patient-data';
import styles from './index.scss';

const DataStatistics: FC = () => {
  const counts = [
    { title: '昨日新增患者数', count: 98 },
    { title: '目前患者数', count: 13347 },
    { title: '患者累计数', count: 133486 },
    { title: '目前医生数', count: 357 },
    { title: '目前护士数', count: 1256 },
  ];
  return (
    <div className="py-20 px-30 w-full" id='gxx'>
      <div className="flex shadow h-124 py-30">
        {
          counts.map(item => (
            <div className={styles.count_item}>
              <div className="text-gray-600 mb-10">{item.title}</div>
              <div>
                <span className={styles.num}>{item.count}</span>
                <span className="text-gray-600">人</span>
              </div>
            </div>
          ))
        }
      </div>
      <PersonCount />
      <DoctorData />
      <PatientData />
    </div>
  );
};

export default DataStatistics;
