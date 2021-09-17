import React, { useState, useEffect } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { history, useDispatch } from 'umi';
import { handleSelection } from '@/utils/conditions';
import QueryCondition from '../components/QueryCondition';
// import { tableData } from './mock';
import * as api from '@/services/api';
import { useSelector } from 'react-redux';
import ReportTable from '../components/ReportTable';
import Empty from '../components/Empty';
import styles from '../index.scss';
import { isEmpty } from 'lodash';
import { message } from 'antd';

interface IProps {
  location: { pathname: string; }
}

function QueryResult({ location }: IProps) {
  const dispatch = useDispatch()
  const [searchStatus, setSearchStatus] = useState(2);
  const [tableData, setTabledata] = useState<ITableData[]>([]);
  const { base, images, other, queryScope } = useSelector((state: IQuery)=>state.query);
  // const doctorId = useSelector((state: IState)=>state.user.user.id);


  const handleSearchData = (type?: string, image?: IQuery) => {
    if (isEmpty(base) && isEmpty(images) && isEmpty(other)) {
      message.error('请选择搜索条件')
    } else {
      console.log('查询范围', queryScope)
      const params = {
        condition: {
          // doctorId: 1381,
          base: handleSelection(base),
          images: image || images,
          other: (other && !!other.fourHigh) ? other : null,
          // queryScope: queryParams
          queryScope,
        }
      }
      if(!type) {
        params.condition.pSid = window.$storage.getItem('PSidArr').split(',')
      }
      const { fetchSearchReport, fetchBaseReport } = api.query;
      const featchReport = type ? fetchBaseReport(params) : fetchSearchReport(params);
      featchReport.then((res: {teams: []} ) => {
        setTabledata(res.teams);
        dispatch({
          type: 'query/setBaseCondition',
          payload: handleSelection(base)
        });
      })
    }
  }

  useEffect(() => {
    // 刷新页面，搜索条件清空了，这里跳转回搜索页面
    if (isEmpty(base) && isEmpty(images) && isEmpty(other)) {
      history.replace('/database/query');
    } else {
      // normal 代表非扩展字段的查询操作
      handleSearchData('normal');
    }
  }, [])

  const fetchTableData = () => {
    console.log(83838)
  }
  console.log('tableData', tableData)
  return (
    <div className={`${styles.query} ${styles.result}`}>
      <LeftOutlined
        onClick={() => history.replace(`/database/query`)}
        style={{marginBottom: 36}}
      />
      <div>
        <QueryCondition
          searchStatus={searchStatus}
          changeSearchStatus={(val) => setSearchStatus(val)}
          handleSearchData={handleSearchData}
        />
      </div>
      {
        tableData?.length > 0 ? (
          <ReportTable
            location={location}
            tableData={tableData}
            refreshTable={fetchTableData}
            handleSearchData={handleSearchData}
          />
        ) : <Empty />
      }

    </div>
  )
}

export default QueryResult;
