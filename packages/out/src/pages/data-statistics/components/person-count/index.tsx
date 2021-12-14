import React, { FC, useState, useEffect  } from 'react';
import ChartPersonPie from '../chart-person-pie';
import { DatePicker } from 'antd';
import moment from 'moment';

interface IDepPersonItem {
  depName: string;
  depNsId: string;
  doctorCount?: number;
  patientCount?: number;
}
interface IDepItem {
  depName: string;
  depNsId: string;
  name: string;
  sid: string;
}
interface IChartItem {
  value: number;
  name: string;
  id?: string;
}
const PersonCount: FC = () => {
  const yesterday: any = Number(new Date()) - ( 24 * 60 * 60 * 1000 );
  const [depDoctors, setDepDoctors] = useState<IChartItem[]>([]);
  const [depPatients, setDepPatients] = useState<IChartItem[]>([]);
  const [noReplyDoctors, setNoReplyDoctors] = useState<{ [key: string]: IDepItem[] }>({});
  const [noReplyChartData, setNoReplyChartData] = useState<IChartItem[]>([]);
  const [showDepId, setDepId] = useState<string>();
  const nsId = window.$storage.getItem('nsId');
  const fetchDepDoctor = () => {
    window.$api.count.getDepDoctorCount(nsId).then((res: { depDoctors: IDepPersonItem[] }) => {
      const doctors = res.depDoctors.map(item => (
        { value: item.doctorCount!, name: item.depName, id: item.depNsId }
      ));
      setDepDoctors(doctors);
    });
  };
  const fetchDepPatient = () => {
    window.$api.count.getDepPatientCount(nsId).then((res: { depPatients: IDepPersonItem[] }) => {
      const doctors = res.depPatients.map(item => (
        { value: item.patientCount!, name: item.depName, id: item.depNsId }
      ));
      setDepPatients(doctors);
    });
  };
  const fetchNoReplyDoctor = (curDate: number) => {
    const deps = {};
    const params = {
      nsId,
      range: {
        start: new Date(curDate).setHours(0, 0, 0, 0),
        end: new Date(curDate).setHours(23, 59, 59, 59),
      },

    };
    window.$api.count.getNoReplyDoctor(params).then((res: { noReplyDoctors: IDepItem[] }) => {
      res.noReplyDoctors.forEach(item => {
        if (deps[item.depNsId]) {
          deps[item.depNsId].push(item);
        } else {
          deps[item.depNsId] = [item];
        }
      });
      const noReplyD: IChartItem[] = Object.keys(deps).map(depNsId => {
        return {
          value: deps[depNsId].length,
          name:  deps[depNsId][0].depName,
          id: depNsId,
        };
      });
      setNoReplyChartData(noReplyD);
      setNoReplyDoctors(deps);
    });
  };
  useEffect(() => {
    fetchDepDoctor();
    fetchDepPatient();
    fetchNoReplyDoctor(yesterday);
  }, []);

  const handleChangeDate = (date: moment.Moment) => {
    if (date) {
      fetchNoReplyDoctor(moment(date).valueOf());
    }
  };
  // 可选时间范围中最近的时间仅可选到当前时间的前一天，默认显示前一天的00：00到23：59
  const disabledDate = (current: moment.Moment) => {
    return current && current > moment().startOf('day');
  };
  const handleChangeShowDoctor = (depId: string) => {
    console.log('点击饼图啦，科室id--', depId);
    setDepId(depId);
  };
  return (
    <div className="flex shadow pt-30 my-15 w-full">
      <div className="flex flex-col justify-between" style={{ flex: '0 0 31%' }}>
        <div className="text-center mb-10">各个科室目前医生数</div>
        <ChartPersonPie data={depDoctors} id="doctor" />
      </div>
      <div className="flex flex-col justify-between" style={{ flex: '0 0 31%' }}>
        <div className="text-center mb-10">各个科室目前患者数</div>
        <ChartPersonPie data={depPatients} id="patient" />
      </div>
      <div className="flex flex-col justify-between relative" style={{ flex: '0 0 38%' }}>
        <div className="text-center mb-10">
        <DatePicker
          onChange={handleChangeDate}
          style={{ width: 125 }}
          defaultValue={moment(yesterday)}
          disabledDate={disabledDate}
          allowClear={false}
        />
          &nbsp;未回复过消息的医生
        </div>
        <ChartPersonPie data={noReplyChartData} id="im" handleChangeShowDoctor={handleChangeShowDoctor} />
        {
          showDepId && (
            <div className="absolute right-10 bottom-10 shadow text-sm">
              <div className="bg-gray-200 h-35 pl-5 py-10 w-90">医生姓名</div>
              {
                noReplyDoctors[showDepId]?.map(item => (
                  <div className="h-160 overflow-y-auto pb-10" key={item.sid}>
                    <div className="pt-10 pl-5  w-90 truncate" title={item.name}>{item.name}</div>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  );
};

export default PersonCount;
