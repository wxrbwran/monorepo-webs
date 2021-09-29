import React, { useEffect, useRef } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { history, useSelector, useDispatch } from 'umi';
import QueryTable from '../components/query_table';
import styles from './index.scss';
import { IState } from 'typings/global';
import * as api from '@/services/api';

interface IProps {
  location: {
    pathname: string;
    query: {
      reportName: string;
      resultKey: string;
    }
  };
}

function QueryResult({ location }: IProps) {
  const dispatch = useDispatch();
  const tableData = useSelector((state: IState) => state.query.tableData);
  const isQueryStop = useSelector((state: IState) => state.query.isQueryStop);
  const head = useSelector((state: IState) => state.query.head);
  // const [loading, setLoading] = useState(true);

  const retryTimes = useRef(1);
  const timer = useRef();

  // useEffect(() => {
  //   if (tableData.length > 0) {
  //     setLoading(false);
  //   }
  // }, [tableData])

  const clearCurrentTimer = () => {

    clearTimeout(timer.current);
  };

  const queryResult = async (resultKey: any, page: number) => {

    const pageSize = 10;
    const results = await api.query.fetchResearchStatistics({
      actionLogId: resultKey,
      page: page,
      pageSize: pageSize,
    });

    if ((results?.tableBody?.length ?? 0) > 0) { // 有数据拼接数据

      dispatch({
        type: 'query/setQueryResult',
        payload: [...results.tableBody],
      });
    }

    if ((results?.tableBody?.length ?? 0) < pageSize) {

      if (page == 0 && retryTimes.current < 3) {
        // 重试3次
        retryTimes.current += 1;

        clearCurrentTimer();
        timer.current = setTimeout(() => {
          queryResult(resultKey, 0);
        }, retryTimes.current * 1000);

      } else {
        // 查询结束
        dispatch({
          type: 'query/setIsQueryStop',
        });
      }
    } else {
      queryResult(resultKey, page + 1);
    }
  };

  useEffect(() => {

    dispatch({
      type: 'query/clearQueryResult',
    });

    retryTimes.current = 1;
    // 开始从0查询结果
    queryResult(location.query.resultKey, 0); // 循环查询结果知道没内容返回

  }, []);

  return (
    <div className={styles.result}>
      <LeftOutlined
        onClick={() => history.replace('/query')}
        style={{ marginBottom: 36 }}
      />

      <QueryTable
        location={location}
        tableData={tableData}
        head={head}
      />
      {!isQueryStop && <Spin tip="数据量较大，拼命查询中" className={styles.loading_append} />}

    </div>
  );
}

export default QueryResult;
