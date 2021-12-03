import React, { FC, useState } from 'react';
import { DatePicker, Button, Table } from 'antd';
import IconDoctor from '@/assets/img/icon_doctor.png';
import ChartImReplyRate from '../chart-im-reply-rate';
import ChartFollowUpRate from '../chart-follow-up-rate';
import SelectDoctor from '../select-doctor';
import { doctorName, responseRate, sendScaleNum, receivedScaleNum, followUpRate } from '@/utils/columns';
import moment from 'moment';
const { RangePicker } = DatePicker;

const DoctorData: FC = () => {
  const [dates, setDates] = useState([]);
  const [hackValue, setHackValue] = useState();
  const [value, setValue] = useState();
  const columns = [doctorName, responseRate, sendScaleNum, receivedScaleNum, followUpRate];

  // 时间范围最多365天，并且结束时间是前一天23.59.59
  const disabledDate = (current) => {
    if (!dates || dates.length === 0) {
      return false;
    }
    console.log('======,', dates);
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 365;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 365;
    // current && current > moment().startOf('day');
    console.log(888881212, current < moment().startOf('day'));
    return tooEarly || tooLate ;
  };
  const onOpenChange = open => {
    if (open) {
      setHackValue([]);
      setDates([]);
    } else {
      setHackValue(undefined);
    }
  };
  const handleChangeTable = (pagination, filters, sorter, extra: { currentDataSource: [], action: paginate | sort | filter }) => {
    console.log('=======11');
    console.log(pagination, filters, sorter, extra);
    // 请求数据 图表联动
  };
  return (
    <div className="shadow p-15 w-full">
      <div className="flex text-sm items-center">
        <img className="w-18 h-18" src={IconDoctor} />
        <span className="text-base font-bold mr-60 ml-5">医生数据</span>
        <SelectDoctor />
        <span className="ml-30 mr-10">时间范围</span>
        <RangePicker
          style={{ width: 230 }}
          // 默认时间是t-7到t-  总计7天
          defaultValue={[moment().subtract(1, 'days').startOf('day'), moment().subtract(7, 'days').startOf('day')]}
          onChange={val => setValue(val)}
          disabledDate={disabledDate} // 时间范围最多365
          onCalendarChange = {val => setDates(val)}
          onOpenChange={onOpenChange}
          value={hackValue || value}
        />
        <Button type="primary" className="ml-10">查询</Button>
      </div>
      {/* <div className="text-center pt-30 pb-20 text-sm text-gray-700">请选择医生进行查看</div> */}
      <div className="flex justify-between my-30 w-full">
        <div className="rounded border border-solid  border-gray-200" style={{ flex: '0 0 49.3%' }}>
          <div className="mt-20 ml-15 text-base font-medium border-l-2 border-solid border-blue-400 h-16 pl-5 leading-none">
            消息回复率
          </div>
          <div className="w-full">
            <ChartImReplyRate />
          </div>
        </div>
        <div className="rounded border border-solid  border-gray-200" style={{ flex: '0 0 49.3%' }}>
          <div className="mt-20 ml-15 text-base font-medium border-l-2 border-solid border-blue-400 h-16 pl-5 leading-none">
            随访率
          </div>
          <ChartFollowUpRate />
        </div>
      </div>
      <Table
        dataSource={[]}
        columns={columns}
        rowKey={(record: { id: string }) => record.id}
        onChange={handleChangeTable}
      />
    </div>
  );
};

export default DoctorData;
