import React, { useState, useEffect } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { history, useSelector, useDispatch } from 'umi';
import ReportTable from '../../report/components/report_table';
import Empty from '../components/empty';
import styles from './index.scss';
import { IState } from 'typings/global';
import { destroyLink } from '@/utils/mqtt';
interface IProps {
  location: {
    pathname: string;
    query : {
      reportName: string;
    }
  };
}

function QueryResult({ location }: IProps) {
  const dispatch = useDispatch();
  const tableData = useSelector((state: IState) => state.query.tableData);
  const isQueryStop = useSelector((state: IState) => state.query.isQueryStop);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setTimeout(()=> {

    // }, 10000)
    if(tableData.length>0){
      setLoading(false);
    }
  }, [tableData])

  useEffect(()=> {
    // 从查询结果页返回别的页面时停止轮循查询
    return () => {
      clearInterval(window.$timer);
    }
  },[])

  console.log('tableData', tableData);

  return (
    <div className={styles.result}>
      <LeftOutlined
        onClick={() => history.replace(`/query`)}
        style={{marginBottom: 36}}
      />
      {
        !isQueryStop && !tableData.length ? <Spin tip="数据量较大，拼命查询中" className={styles.loading}/> :
        <>
          {
            tableData.length>0 ? <>
              <ReportTable
                location={location}
                tableData={tableData}
              />
              {!isQueryStop && <Spin tip="数据量较大，拼命查询中" className={styles.loading_append}/>}
            </> : <Empty/>
          }
        </>
      }
    </div>
  )
}

export default QueryResult;
