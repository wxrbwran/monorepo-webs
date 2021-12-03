import React, { FC  } from 'react';
import ChartPersonPie from '../chart-person-pie';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;


const PersonCount: FC = () => {
  const yesterday: any = Number(new Date()) - ( 24 * 60 * 60 * 1000 );
  console.log('yesterday', yesterday);
  // const [startTime, setstartTime] = useState(yesterday);
  // const [endTime, setendTime] = useState(yesterday);

  const data1 =  [
    { value: 1048, name: '心内科' },
    { value: 735, name: '儿科' },
    { value: 580, name: '外科' },
    { value: 484, name: '心外科' },
    { value: 300, name: '骨科' },
    { value: 1048, name: '心内科1' },
    { value: 735, name: '儿科1' },
    { value: 580, name: '外科1' },
    { value: 484, name: '心外科1' },
    { value: 300, name: '骨科1' },
  ];
  // 请求接口的时间  new Date(startTime).setHours(0,0,0,0)
  // new Date(setendTime).setHours(23,59,59,59)
  const handleChangeDate = (date: moment, dateString: string) => {
    console.log('======date', date);
    console.log(dateString);
  };
  // 可选时间范围中最近的时间仅可选到当前时间的前一天，默认显示前一天的00：00到23：59
  const disabledDate = (current) => {
    return current && current > moment().startOf('day');
  };
  return (
    <div className="flex shadow pt-30 my-15 w-full">
      <div className="flex flex-col justify-between" style={{ flex: '0 0 31%' }}>
        <div className="text-center mb-10">各个科室目前医生数</div>
        <ChartPersonPie data={data1} id="doctor" />
      </div>
      <div className="flex flex-col justify-between" style={{ flex: '0 0 31%' }}>
        <div className="text-center mb-10">各个科室目前患者数</div>
        <ChartPersonPie data={data1} id="patient" />
      </div>
      <div className="flex flex-col justify-between relative" style={{ flex: '0 0 38%' }}>
        <div className="text-center mb-10">
        <RangePicker
          size="small"
          style={{ width: 225 }}
          defaultValue={[moment(yesterday), moment(yesterday)]}
          onChange={handleChangeDate}
          disabledDate={disabledDate}
        />
          未回复过消息的医生
        </div>
        <ChartPersonPie data={data1} id="im" />
        <div className="absolute right-10 bottom-10 shadow text-sm">
          <div className="bg-gray-200 h-35 pl-5 py-10 w-90">医生姓名</div>
          <div className="h-160 overflow-y-auto pb-10">
            <div className="pt-10 pl-5">医生姓名</div>
            <div className="pt-10 pl-5">医生姓名</div>
            <div className="pt-10 pl-5">医生姓名</div>
            <div className="pt-10 pl-5">医生姓名</div>
            <div className="pt-10 pl-5">医生姓名</div>
            <div className="pt-10 pl-5">医生姓名</div>
            <div className="pt-10 pl-5">医生姓名</div>
            <div className="pt-10 pl-5">医生姓名</div>
            <div className="pt-10 pl-5">医生姓名</div>
            <div className="pt-10 pl-5">医生姓名</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCount;
