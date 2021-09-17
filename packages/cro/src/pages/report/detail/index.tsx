import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'umi';
import { queryFields, INFO } from '@/utils/consts';
import { handleBaseObj } from '../util';
import ReportTable from '../components/report_table';
import * as api from '@/services/api';
import { isEmpty } from 'lodash';
import './index.scss';
interface IProps {
  location: {
    pathname: string;
    query: {
      reportId: string;
      reportName: string;
    }
  }
}

function Detail({ location }: IProps) {
  const [tableData, setTableData] = useState<IRepotCon>({});
  const [reportId, setReportId] = useState<string>('');
  const groupList = useSelector((state: IState) => state.project.objectiveGroup);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reportId !== location.query.reportId) {
      // fetchTableData();
      setReportId(location.query.reportId);
    }
  }, [location])

  const fetchTableData = () => {
    api.report.getReportDetail({
      reportId: location.query.reportId,
      pageAt: 0,
      pageSize: 99999
      // id: '8ggKp8'改回去
    }).then(res => {
      setTableData(res)
    })
  }
  const getGroupId = (id) => {
    let groupName = "";
    groupList.forEach(item => {
      item.groupId === id
      groupName = item.groupName;
    })
    return groupName;
  }
  const getSearchConditions = useMemo(() => {
    if (!isEmpty(tableData)) {
      // const { images, other, base, queryScope } = tableData.request;
      const { images, other, base, queryScope } = tableData.condition;
      const { gender, maxAge, minAge, maxHeight, minHeight, maxWeight, minWeight } = handleBaseObj(base);
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
            {
              images.map(item => {
                return (<span className="item" > {INFO[item.imageType]}</span>)
              })
            }
            {
              other && (
                other.fourHigh.map(item => {
                  return (<span className="item" > {INFO[item]}</span>)
                })
              )
            }
          </>
        )
      }
    } else {
      return () => <></>
    }
  }, [tableData])

  const handleExport = (type: string) => {
    // indexOfMax 从字段最多的obj中拼接titles
    const teams = tableData.teams;
    const lenArr = teams.map(item => Object.keys(item).length)
    const max = Math.max(...lenArr);
    const indexOfMax = lenArr.indexOf(max);
    const titles = Object.keys(teams[indexOfMax]).filter((i: string) => i!=='sid').map(item => queryFields[item]);
    const params = {
      name: location.query.reportName || '报告',
      reportId: location.query.reportId,
      type,
      teams: tableData.teams,
      titles,
    }
    api.report.patchExportReport(params).then((res) => {
      if(res.url) {
        window.location.href = res.url;
      }
    })
  }

  return (
    <div className="report-detail">
      {/* {
        !isEmpty(tableData) && (
          <>
            <h2>{tableData.name}</h2>
            <ReportTable
              location={location}
              // tableData={tableData.teams}
              // reportId={location.query.reportId}
              // refreshTable={fetchTableData}
              // handleExport={handleExport}
            />
          </>
        )
      } */}
      <ReportTable
        location={location}
      />
    </div>
  )
}
export default Detail;
