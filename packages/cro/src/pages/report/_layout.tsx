import React, { useEffect, useState } from 'react';
import ToogleSide from '@/components/ToogleSide';
import SideMenu from "./components/side_menu";
import { history } from 'umi';
import { reportList } from './detail/const';
import * as api from '@/services/api';
interface IProps {
  children: React.ReactElement;
  location: {
    pathname: string;
    query: {
      reportId: string;
    };
  };
}
interface IReportList {
  name: string;
  id: string;
}
export default ({ children, location }: IProps) => {
  // const [reportList, setReportList] = useState<IReportList[]>([]);
  // const projectSid = window.$storage.getItem('projectSid') || '';
  useEffect(() => {
    // api.report.getReportList(projectSid).then(res => {
    //   setReportList(res.reportInfoList);
    //   if (res.reportInfoList.length > 0) {
    //     history.replace((`/report/detail?reportId=${res.reportInfoList[0].id}&reportName=${res.reportInfoList[0].name}`));
    //     // history.replace((`/report/detail?reportId=8ggKp8`)); //改回去
    //   }
    // })
    history.replace((`/report/detail?reportId=${reportList[0].id}&reportName=${reportList[0].name}`));
  }, [])
  return (
    <div style={{height: '100%'}}>
      {
        reportList.length > 0 ? (
          <ToogleSide>
            <SideMenu reportList={reportList} location={location} />
            {children}
          </ToogleSide>
        ) : <> {children} </>
      }
    </div>
  )
}
