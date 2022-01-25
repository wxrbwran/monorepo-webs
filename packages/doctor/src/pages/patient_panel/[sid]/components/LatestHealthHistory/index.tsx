import React, {
  FC, useEffect, useState, useMemo,
} from 'react';
import {
  DatePicker, Button, Spin, Tabs, message,
} from 'antd';
import moment from 'moment';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import * as api from '@/services/api';
import config from '@/config';
import LatestHealthHistoryTable from '../LatestHealthHistoryTable';
import { bpCol, gluCol, getCustomCol } from './columns';
import { formatData, fetchTypeList } from './formatData';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
interface IImgTypeItem {
  name: string;
  imageId: string;
}
const LatestHealthHistory: FC = ({ children }) => {
  // @ts-ignores
  const initFrom = new Date(moment().subtract(5, 'year'));
  const [startTime, setStartTime] = useState(initFrom); // 这里不采用时间戳格式，便于DatePicker使用value
  const [endTime, setEndTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dataLoading, setDataLoading] = useState(true); // 列表的loading
  const [btnLoading, setLoading] = useState(false); // 加载更多按钮的loading
  const [isAll, setIsAll] = useState(false); // 是否已加载完毕
  const [pageAt, setPageAt] = useState(1);
  const [data, setData] = useState<CommonData[]>([]);
  const [activeTab, setActiveTab] = useState('BP');
  const patientSid = window.$storage.getItem('patientSid');
  const [imgTypeList, setImgTypeList] = useState<IImgTypeItem[]>([]); // 自定义指标历史中所有的图片分类(tab栏显示)
  const [curImgTypeHead, setHead] = useState([]); // 某一项图片分类的head

  const apiData = (res: any, paramsPageAt: number, activeTabKey:string) => {
    const newData = formatData(res, activeTabKey, paramsPageAt);
    if (paramsPageAt === 1) {
      setData(newData);
    } else {
      setData([...data, ...newData]);
    }
    setLoading(false);
    setDataLoading(false);
    setIsAll(!res.hasNext);
  };
  const apiError = () => {
    message.error('接口请求失败');
    setLoading(false);
    setDataLoading(false);
  };
  const fetchHistory = (apiParams?: object, tab?:string) => {
    const activeTabKey = tab || activeTab;
    const params: CommonData = {
      sid: patientSid,
      startTime: startTime.setHours(0, 0, 0, 0),
      endTime: endTime.setHours(23, 59, 59, 59),
      pageAt,
      pageSize: config.LATES_HEALTH_SIZE,
      ...apiParams,
    };
    if (['BP', 'GLU'].includes(activeTabKey)) {
      // 血压、血糖
      params.indexTypeList = fetchTypeList(activeTabKey);
      api.medical.fetchMedicalIndexHistory(params).then((res) => {
        apiData(res, params.pageAt, activeTabKey);
      }).catch(() => apiError());
    } else {
      // 图片结构化里的指标
      api.image.fetchImageIndexHistory({ ...params, imageTypeNew: activeTabKey }).then((res) => {
        const headerList = res?.subCategory ? res.headInfoList : res.headList;
        setHead(headerList || []);
        apiData(res, params.pageAt, activeTabKey);
      }).catch(() => apiError());
    }
  };
  // 获取自定义指标历史中所有的图片分类
  const fetchCustomType = () => {
    api.image.fetchImageTypeTabs({ sid: patientSid }).then((res) => {
      setImgTypeList(res?.imageTypeList || []);
    });
  };
  useEffect(() => {
    if (show) {
      setDataLoading(true);
      setEndTime(new Date());
      fetchCustomType();
      fetchHistory();
    } else {
      setData([]);
      setPageAt(1);
      setActiveTab('BP');
    }
  }, [show]);

  const dateFormat = 'YYYY/MM/DD';
  const handleDate = (date: any, dateString: string[]) => {
    console.log(date);
    const from = (new Date(dateString[0]));
    const to = (new Date(dateString[1]));
    setStartTime(from);
    setEndTime(to);
    setPageAt(1);
    fetchHistory(
      {
        startTime: from.setHours(0, 0, 0, 0),
        endTime: to.setHours(23, 59, 59, 59),
        pageAt: 1,
      },
    );
  };
  const handleMore = () => {
    setLoading(true);
    fetchHistory({ pageAt: pageAt + 1 });
    setPageAt((prev) => prev + 1);
  };
  const handleChangeTab = (tab: string) => {
    // @ts-ignore
    setActiveTab(tab);
    setPageAt(1);
    setData([]);
    setDataLoading(true);
    fetchHistory({ pageAt: 1 }, tab);
  };
  const tabList = [
    { tabTit: '血压心率', columns: bpCol, type: 'BP' },
    { tabTit: '血糖', columns: gluCol, type: 'GLU' },
  ];

  const renderTab = useMemo(() => (tab: string, key: string, col?: object[]) => {
    // console.log('col21', col);
    let columns = [];
    if (col) {
      columns = col;
    } else {
      columns = getCustomCol(curImgTypeHead);
    }
    return (
      <TabPane tab={tab} key={key}>
        {
          dataLoading
            ? <Spin size="default" className="w-full" /> : (
              <LatestHealthHistoryTable
                data={data}
                col={columns || []}
                activeTab={activeTab}
              />
            )
        }
      </TabPane>
    );
  }, [data, dataLoading]);
  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  };
  return (
    <>
      <span onClick={() => setShow(true)}>{ children }</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width="99%"
        visible={show}
        title="结构化数据"
        onCancel={() => setShow(false)}
        footer={null}
      >
        <div className="text-center">
          <RangePicker
            onChange={handleDate}
            size="large"
            value={[moment(startTime, dateFormat), moment(endTime, dateFormat)]}
            format={dateFormat}
            allowClear={false}
            disabledDate={disabledDate}
          />
          <Tabs onChange={handleChangeTab} size="large">
            { tabList.map((item) => renderTab(item.tabTit, item.type, item.columns)) }
            { imgTypeList.map((item) => renderTab(item.name, item.imageId)) }
          </Tabs>
          <Button
            type={isAll ? 'text' : 'primary'}
            loading={btnLoading}
            onClick={handleMore}
            disabled={isAll}
          >
            {isAll ? '无更多数据' : '加载更多'}
          </Button>
        </div>
      </DragModal>
    </>
  );
};

export default LatestHealthHistory;
