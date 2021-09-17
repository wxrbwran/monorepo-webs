import React, { useEffect, useState, useMemo } from 'react';
// import { useSelector } from 'umi';
// import { tableData } from './mock';
import { queryFields, INFO } from '../../../query/consts';
import { handleBaseObj } from '../../../query/util';
import ReportTable from '../../../query/components/ReportTable';
import * as api from '@/services/api';
import { isEmpty } from 'lodash';
import './index.scss';

interface IProps {
  currReportId?: string;
  reportName?: string;
  location: {
    pathname: string;
    query: {
      reportId: string;
      reportName: string;
    };
  };
}

function Detail({ currReportId, reportName, location }: IProps) {
  const [tableData, setTableData] = useState<IRepotCon>({});
  const [_reportId, setReportId] = useState<string>('');
  // const groupList = useSelector((state: IState) => state.project.objectiveGroup);

  const fetchTableData = () => {
    api.report
      .getReportDetail({
        reportId: currReportId,
        pageAt: 0,
        pageSize: 99999,
        // id: '8ggKp8'改回去
      })
      .then((res) => {
        setTableData(res);
      });
  };
  useEffect(() => {
    if (currReportId) {
      fetchTableData();
      setReportId(currReportId);
    }
  }, [currReportId]);

  // const getGroupId = (id) => {
  //   let groupName = "";
  //   groupList.forEach(item => {
  //     item.groupId === id
  //     groupName = item.groupName;
  //   })
  //   return groupName;
  // }
  const getSearchConditions = useMemo(() => {
    if (!isEmpty(tableData)) {
      // const { images, other, base, queryScope } = tableData.request;
      const { images, other, base, queryScope  } = tableData.condition;
      const { gender, maxAge, minAge, maxHeight, minHeight, maxWeight, minWeight } = handleBaseObj(
        base,
      );
      let scopeText = "";
      if (!isEmpty(queryScope)) {
        scopeText = '全部受试者';
      }else{
        scopeText = "全部患者";
      };
      return () => {
        return (
          <>
            <span className="item">查询范围 : {scopeText}</span>
            {!!gender && <span className="item">性别 : {gender === 'FEMALE' ? '女' : '男'}</span>}
            {!!maxAge && <span className="item">年龄 : {`${minAge}-${maxAge}`}岁</span>}
            {!!maxHeight && <span className="item">身高 : {`${minHeight}-${maxHeight}`}cm</span>}
            {!!maxWeight && <span className="item">体重 : {`${minWeight}-${maxWeight}`}kg</span>}
            {images.map((item) => {
              return <span className="item"> {INFO[item.imageType]}</span>;
            })}
            {other?.fourHigh?.map((item) => {
              return <span className="item"> {INFO[item]}</span>;
            })}
          </>
        );
      };
    }
    return () => <></>;
  }, [tableData]);

  const handleExport = (type: string) => {
    // indexOfMax 从字段最多的obj中拼接titles
    const { teams } = tableData;
    const lenArr = teams.map((item) => Object.keys(item).length);
    const max = Math.max(...lenArr);
    const indexOfMax = lenArr.indexOf(max);
    const titles = Object.keys(teams[indexOfMax])
      .filter((i: string) => i !== 'sid')
      .map((item) => queryFields[item]);
    const params = {
      name: reportName || '报告',
      reportId: currReportId,
      type,
      teams: tableData.teams,
      titles,
    };
    api.report.patchExportReport(params).then((res) => {
      if (res.url) {
        window.location.href = res.url;
      }
    });
  };

  return (
    <div className="report-detail">
      {!isEmpty(tableData) && (
        <>
          {/* <h2 className="text-lg">{location.query.reportName}</h2> */}
          <div className="search-conditions">
            <span className="tit">查询条件</span>
            {getSearchConditions()}
          </div>
          <ReportTable
            location={location}
            tableData={tableData.teams}
            reportId={currReportId}
            refreshTable={fetchTableData}
            handleExport={handleExport}
          />
        </>
      )}
    </div>
  );
}
export default Detail;
