import React, { useEffect, useRef, useImperativeHandle, Ref, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { history, useSelector, useDispatch } from 'umi';
import QueryTable from '../components/query_table';
import styles from './index.scss';
import { IState } from 'typings/global';
import * as api from '@/services/api';
import { forwardRef } from 'react';

interface IProps {
  param: {
    // pathname: string;
    query: {
      reportName: string;
      resultKey: string;
    }
  };
}

const QueryResult = forwardRef(({ param }: IProps, ref: Ref<any>) => {

  // function QueryResult({ param }: IProps) {
  const dispatch = useDispatch();
  const tableData = useSelector((state: IState) => state.query.tableData);

  const isQueryStopRef = useRef(false);
  const [queryStop, setQueryStop] = useState<boolean>(false);

  const head = useSelector((state: IState) => state.query.head);

  const retryTimes = useRef(1);
  const timer = useRef();

  useImperativeHandle(ref, () => ({ //第一个参数：暴露哪个ref；第二个参数：暴露什么

    setQueryStop: () => {
      isQueryStopRef.current = true;
      setQueryStop(true);
    },
  }));
  // useEffect(() => {
  //   if (tableData.length > 0) {
  //     setLoading(false);
  //   }
  // }, [tableData])

  const clearCurrentTimer = () => {

    clearTimeout(timer.current);
  };

  const queryResult = async (page: number) => {

    console.log('============== queryResult ', isQueryStopRef.current, retryTimes.current);
    if (isQueryStopRef.current) {
      return;
    }
    const pageSize = 10;
    const results = await api.query.fetchResearchStatistics({
      actionLogId: param.query.resultKey,
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

      if (page == 0 && retryTimes.current < 10 || (page != 0 && retryTimes.current < 5)) {
        // 重试5次
        retryTimes.current += 1;

        clearCurrentTimer();
        timer.current = setTimeout(() => {
          queryResult(0);
        }, retryTimes.current * 1000);

      } else {
        // 查询结束
        isQueryStopRef.current = true;
        setQueryStop(true);
        // dispatch({
        //   type: 'query/setIsQueryStop',
        // });
      }
    } else {
      queryResult(page + 1);
    }
  };

  useEffect(() => {

    console.log('==============useEffect queryResult ', param.query.resultKey);

    if (param.query.resultKey) {
      dispatch({
        type: 'query/clearQueryResult',
      });

      clearCurrentTimer();
      timer.current = setTimeout(() => {
        retryTimes.current = 1;
        // 开始从0查询结果
        queryResult(0); // 循环查询结果知道没内容返回
      }, 1000);
    }
  }, [param]);

  return (
    <div className={styles.result}>
      {/* <LeftOutlined
        onClick={() => history.replace('/query')}
        style={{ marginBottom: 36 }}
      /> */}
      <QueryTable
        location={param}
        tableData={tableData}
        head={head}
        queryStop={queryStop}
      />
      {!queryStop && <Spin tip="数据量较大，拼命查询中" className={styles.loading_append} />}

    </div>
  );

});

export default QueryResult;
