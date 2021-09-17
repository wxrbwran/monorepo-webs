import React, { useEffect, useState } from 'react';
import ToogleSide from '@/components/ToogleSide';
import SideMenu from '@/components/SideMenu';
import Empty from './components/Empty';
import Detail from './components/Detail';
import * as api from '@/services/api';

interface IProps {
  location: {
    pathname: string;
    query: {
      reportId: string;
      reportName: string;
    };
  };
}
interface IReportList {
  name: string;
  id: string;
}
export default ({ location }: IProps) => {
  const [reportList, setReportList] = useState<IReportList[]>([]);
  const projectSid = window.$storage.getItem('sid') || '';
  const [currReportId, setReportId] = useState<string>();
  const [reportName, setReportName] = useState<string>();
  useEffect(() => {
    // history.replace((`/database/report?reportId=${reportList[0].id}&reportName=${reportList[0].name}`));
    api.report.getReportList(projectSid).then((res) => {
      setReportList(res.reportInfoList);
      if (res.reportInfoList.length > 0) {
        const { id, name } = res.reportInfoList[0];
        setReportId(id);
        setReportName(name);
      }
    });
  }, []);
  const handleChangeTab = (id: string) => {
    const newReportName = reportList.filter((item) => item.id === id)[0].name;
    setReportId(id);
    setReportName(newReportName);
  };
  return (
    <div style={{ height: '100%' }}>
      {reportList.length > 0 ? (
        <ToogleSide>
          <SideMenu data={reportList} keyName="id" handleChangeTab={handleChangeTab} />
          <Detail location={location} currReportId={currReportId} reportName={reportName} />
        </ToogleSide>
      ) : (
        <Empty />
      )}
    </div>
  );
};
