import React, { FC, useEffect, useState } from 'react';
import PersonCount from './components/person-count';
import DoctorData from './components/doctor-data';
import PatientData from './components/patient-data';
import styles from './index.scss';

interface IDocItem {
  depName: string;
  depNsId: string;
  name: string;
  sid: string;
}
const DataStatistics: FC = () => {
  const [personCount, setPersonCount] = useState({});
  const [doctorList, setDoctorList] = useState([]);
  const orgNsId = window.$storage.getItem('nsId');
  const fetchDepDoctor = () => {
    const depDoctors = {};
    window.$api.count.getStatisticDoctor(orgNsId).then((res: { doctorList: IDocItem[] }) => {
      res.doctorList.forEach(docItem => {
        const { depName, depNsId, name, sid } = docItem;
        const doctorInfo = { label: name, value: sid };
        if (depDoctors[depNsId]) {
          depDoctors[depNsId].children.push(doctorInfo);
        } else {
          depDoctors[depNsId] = {
            label: depName,
            value: depNsId,
            children: [doctorInfo],
          };
        }
      });
      setDoctorList(Object.values(depDoctors));
    });
  };
  useEffect(() => {
    window.$api.count.getPersonCount(orgNsId).then((res: CommonData) => {
      console.log('===3', res);
      setPersonCount(res);
    });
    fetchDepDoctor();
  }, []);
  const counts = [
    { title: '昨日新增患者数', key: 'yest_count' },
    { title: '目前患者数', key: 'curr_pat_count' },
    { title: '患者累计数', key: 'total_pat_count' },
    { title: '目前医生数', key: 'curr_doc_count' },
    { title: '目前护士数', key: 'curr_nur_count' },
  ];
  return (
    <div className={`py-20 px-30 w-full ${styles.statistics}`} id='gxx'>
      <div className="flex shadow h-124 py-30">
        {
          counts.map(item => (
            <div className={styles.count_item} key={item.key}>
              <div className="text-gray-600 mb-10">{item.title}</div>
              <div>
                <span className={styles.num}>{personCount?.[item.key] ?? '--'}</span>
                <span className="text-gray-600">人</span>
              </div>
            </div>
          ))
        }
      </div>
      <PersonCount />
      <DoctorData doctorList={doctorList} />
      <PatientData doctorList={doctorList} />
    </div>
  );
};

export default DataStatistics;
