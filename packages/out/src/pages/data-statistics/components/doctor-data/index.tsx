import React, { FC, useState } from 'react';
import { DatePicker, Button, Table, Empty, message } from 'antd';
import IconDoctor from '@/assets/img/icon_doctor.png';
import ChartImReplyRate, { IChartProps } from '../chart-im-reply-rate';
import ChartFollowUpRate from '../chart-follow-up-rate';
import SelectDoctor, { IDocList } from '../select-doctor';
import { doctorName, replyRatio, sendSfCount, receiveSfCount, sfRatio } from '@/utils/columns';
import moment from 'moment';
import config from '@/config';
import { isEmpty, debounce, cloneDeep } from 'lodash';
const { RangePicker } = DatePicker;
interface IDocRatioItem {
  msgdate: number;
  name: string;
  percent: 0,
  sid: number;
  receive_count: number;
  reply_count: number;
}
const DoctorData: FC<IDocList> = ({ doctorList }) => {
  const [dates, setDates] = useState([]);
  const [hackValue, setHackValue] = useState();
  // 默认时间是t-7到t-  总计7天
  const [value, setValue] = useState<moment.Moment[]>([
    moment().subtract(300, 'days').startOf('day'),
    moment().subtract(1, 'days').startOf('day'),
  ]);
  // ['dev.V0Xwme']
  const [doctorSids, setdoctorSids] = useState<string[]>([]);
  const initRatio = { xAxisData: [], legendData:[], seriesData:[] };
  const [docRatioData, setDocRatioData] = useState(cloneDeep(initRatio)); // 回复率拆线图数据
  const initSfRatio = { xAxisData: [], seriesData: [
    { name: '发送随访表数量', type: 'bar', data: [] },
    { name: '回复的随访表数量', type: 'bar', data: [] },
    { name: '随访率', type: 'line', data: [], yAxisIndex: 1, axisLabel: { formatter: '{value} %' } },
  ] };
  const [sfRatioData, setSfData] = useState(initSfRatio);
  const [doctorTableDatas, setDoctorTableDatas] = useState([]);
  const [pageAt, setPageAt] = useState(1);
  const [total, setTotal] = useState(0);
  const nsId = window.$storage.getItem('nsId');

  const toDate = (date: moment.Moment[]) => {
    return {
      start: moment(date[0]).startOf('day').format('x'),
      end: moment(date[1]).endOf('day').format('x'),
    };
  };

  // 时间范围最多365天，并且结束时间是前一天23.59.59
  const disabledDate = (current) => {
    if (!dates || dates.length === 0) { return false;  }
    console.log('======,', dates);
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 365;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 365;
    // current && current > moment().startOf('day');
    console.log(888881212, current < moment().startOf('day'));
    console.log('tooEarly', tooEarly);
    console.log('tooLate', tooLate);
    return tooEarly || tooLate;
  };

  const onOpenChange = open => {
    if (open) {
      setHackValue([]);
      setDates([]);
    } else {
      setHackValue(undefined);
    }
  };

  // 消息回复率-折线图
  const fetchReplyRatio = async (sids: string[]) => {
    const params = {
      nsId,
      range: toDate(value),
    };
    const doctors: { [key: string]: IDocRatioItem[] } = {};
    let xDate: number[] = []; // 所有人日期时间集合,且去重
    const doctorsChartData: IChartProps = cloneDeep(initRatio); // 传递给chart

    Promise.all(sids.map(sidItem => window.$api.count.getDoctorReplyRatio({ ...params, doctorSids: [sidItem] })))
      .then((res: { doctorRatios: IDocRatioItem[] }[]) => {
        res.forEach((docItem) => {
          doctors[docItem.doctorRatios[0].sid] = docItem.doctorRatios;
          xDate = [ ...xDate, ...docItem.doctorRatios.map(item => item.msgdate)];
        });
        xDate = [...new Set(xDate)].sort((a, b) => a - b); // 去重排序
        // 遍历时间集合，
        xDate.forEach((dateItem, inx) => {
          doctorsChartData.xAxisData.push( moment(dateItem).format('YYYY-MM-DD')); // 时间轴
          // 如果医生不存在此时间，就push进去，数值为0
          Object.keys(doctors).forEach(doctorSid => {
            let curDoc = doctors[doctorSid];
            if (!curDoc.find(itemDay => itemDay.msgdate === dateItem)) {
              // 保证时间顺序
              curDoc.splice(inx, 0, { msgdate: dateItem, name: curDoc[0].name, percent: 0,  sid: curDoc[0].sid, receive_count: 0, reply_count: 0 });
            }
          });
        });

        Object.keys(doctors).forEach(doctorSid => {
          let curDoc = doctors[doctorSid];
          doctorsChartData.legendData.push(curDoc[0].name);
          doctorsChartData.seriesData.push({
            name: curDoc[0].name,
            type: 'line',
            data: curDoc.map(item => item.percent * 100),
            imCount: curDoc.map(item => {
              return {
                receive_count: item.receive_count,
                reply_count: item.reply_count,
              };
            }),
          });
        });
        console.log('doctorsChartData', doctorsChartData);
        setDocRatioData(doctorsChartData);
      });
  };
  const fetchSfRatio = (datas: any[]) => {
    // setSfData
    const sfDatas = { ...initSfRatio };
    datas.map(docItem => {
      console.log('====32', docItem);
      sfDatas.xAxisData.push(docItem.name);
      sfDatas.seriesData[0].data.push(docItem.sendSfCount);
      sfDatas.seriesData[1].data.push(docItem.receiveSfCount);
      sfDatas.seriesData[2].data.push(Number(docItem.sfRatio) * 100);
    });
    console.log('xxcdsfad', sfDatas);
    setSfData(sfDatas);
  };
  const fetchPatientOperationData = (changeParams: any = {}) => {
    const params = {
      nsId,
      range: toDate(value),
      pageAt,
      pageSize: config.TABLE_PAGESIZE,
      ...changeParams,
    };
    if (!isEmpty(doctorSids)) {
      params.doctorSids = doctorSids;
    }
    // "orderBy":"reply_ratio desc",  //倒排用 desc,正排 不用传后缀, 非必传参数
    window.$api.count.getDoctorMsgSfList(params).then(res => {
      console.log('23232322222', res);
      if (isEmpty(res.doctorList)) {
        message.success('查询数据为空');
        setDoctorTableDatas([]);
      } else {
        setDoctorTableDatas(res.doctorList);
        fetchSfRatio(res.doctorList);
        fetchReplyRatio(res.doctorList.map(item => item.sid));
        setTotal(res.total);
      }
    });
  };
  const handleChangeTable = (pagination: any, filters: any, sorter: any, extra: { currentDataSource: [], action: 'paginate' | 'sort' | 'filter' }) => {
    console.log('filters', filters);
    if (extra.action === 'paginate') {
      setPageAt(pagination.current);
      fetchPatientOperationData({ pageAt: pagination.current });
    } else if (extra.action === 'sort') {
      setPageAt(1);
      fetchPatientOperationData({
        orderBy: sorter.order === 'descend' ? `${sorter.field} desc` : sorter.field,
        pageAt: 1,
      });
    }
  };

  const handleSearch = () => {
    setDocRatioData(initRatio);
    fetchPatientOperationData();
  };
  const columns = [doctorName, replyRatio, sendSfCount, receiveSfCount, sfRatio];
  return (
    <div className="shadow p-15 w-full">
      <div className="flex text-sm items-center">
        <img className="w-18 h-18" src={IconDoctor} />
        <span className="text-base font-bold mr-60 ml-5">医生数据</span>
        <SelectDoctor
          handleSelect={(ids: string[]) => setdoctorSids(ids)}
          doctorList={doctorList}
        />
        <span className="ml-30 mr-10">时间范围</span>
        <RangePicker
          style={{ width: 236 }}
          onChange={val => setValue(val)}
          disabledDate={disabledDate} // 时间范围最多365
          onCalendarChange = {val => setDates(val)}
          onOpenChange={onOpenChange}
          value={hackValue || value}
          allowClear={false}
        />
        <Button type="primary" className="ml-10" onClick={debounce(handleSearch, 300)}>查询</Button>
      </div>
      {
        isEmpty(doctorTableDatas) ? (
          <div className="text-center pt-30 pb-20 text-sm text-gray-700">请选择医生进行查看</div>
        ) : (
          <>
            <div className="flex justify-between my-30 w-full">
              <div className="rounded border border-solid  border-gray-200" style={{ flex: '0 0 49.3%' }}>
                <div className="mt-20 ml-15 text-base font-medium border-l-2 border-solid border-blue-400 h-16 pl-5 leading-none">
                  消息回复率
                </div>
                <div className="w-full">
                  { isEmpty(docRatioData.xAxisData) ?
                    <div style={{ paddingTop: 120 }}> <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> </div>
                    : <ChartImReplyRate {...docRatioData} />
                  }
                </div>
              </div>
              <div className="rounded border border-solid  border-gray-200" style={{ flex: '0 0 49.3%' }}>
                <div className="mt-20 ml-15 text-base font-medium border-l-2 border-solid border-blue-400 h-16 pl-5 leading-none">
                  随访率
                </div>
                <ChartFollowUpRate {...sfRatioData} />
              </div>
            </div>
            <Table
              bordered
              dataSource={doctorTableDatas}
              columns={columns}
              rowKey={(record: { id: string }) => record.id}
              onChange={handleChangeTable}
              pagination={{
                pageSize: config.TABLE_PAGESIZE,
                current: pageAt,
                total,
                // onChange: handlePagerChange,
                showSizeChanger: false,
                hideOnSinglePage: true,
              }}
            />
          </>
        )
      }
    </div>
  );
};

export default DoctorData;
