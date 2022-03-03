import React, { FC, useState, useMemo, useEffect } from 'react';
import { Tabs, message, Spin, Button } from 'antd';
import config from '@/config';
import * as api from '@/services/api';
import { bpCol, gluCol, getCustomCol, weightCol, stepCol } from './columns';
import { formatData, fetchTypeList } from './formatData';
import LatestHealthHistoryTable from '../LatestHealthHistoryTable';


const { TabPane } = Tabs;
interface IImgTypeItem {
  name: string;
  imageId: string;
}
interface IProps {
  time: {
    startTime: Date;
    endTime: Date;
  }
}
const Hyd: FC<IProps> = ({ time }) => {
  const [pageAt, setPageAt] = useState(1);
  const [data, setData] = useState<CommonData[]>([]);
  const [dataLoading, setDataLoading] = useState(true); // 列表的loading
  const patientSid = window.$storage.getItem('patientSid');
  const [activeTab, setActiveTab] = useState('BP');
  const [btnLoading, setLoading] = useState(false); // 加载更多按钮的loading
  const [isAll, setIsAll] = useState(false); // 是否已加载完毕
  const [curImgTypeHead, setHead] = useState([]); // 某一项图片分类的head
  const [imgTypeList, setImgTypeList] = useState<IImgTypeItem[]>([]); // 自定义指标历史中所有的图片分类(tab栏显示)

  // 获取自定义指标历史中所有的图片分类
  const fetchCustomType = () => {
    api.image.fetchImageTypeTabs({ sid: patientSid }).then((res) => {
      setImgTypeList(res?.imageTypeList || []);
    });
  };
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
      startTime: time.startTime.setHours(0, 0, 0, 0),
      endTime: time.endTime.setHours(23, 59, 59, 59),
      pageAt,
      pageSize: config.LATES_HEALTH_SIZE,
      ...apiParams,
    };
    if (['BP', 'GLU', 'WEIGHT', 'STEP'].includes(activeTabKey)) {
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
  useEffect(() => {
    setDataLoading(true);
    fetchCustomType();
    return () => {
      setData([]);
      setPageAt(1);
      setActiveTab('BP');
    };
  }, []);
  useEffect(() => {
    setPageAt(1);
    fetchHistory(
      {
        startTime: time.startTime.setHours(0, 0, 0, 0),
        endTime: time.endTime.setHours(23, 59, 59, 59),
        pageAt: 1,
      },
    );

  }, [time]);


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
    { tabTit: '体重', columns: weightCol, type: 'WEIGHT' },
    { tabTit: '步数', columns: stepCol, type: 'STEP' },
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
  const handleMore = () => {
    setLoading(true);
    fetchHistory({ pageAt: pageAt + 1 });
    setPageAt((prev) => prev + 1);
  };

  return (
    <div>
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
  );
};

export default Hyd;
