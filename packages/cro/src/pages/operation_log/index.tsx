import React, { FC, useEffect, useState } from 'react';
import { Timeline, Row, Col, Button, Pagination } from 'antd';
import styles from './index.scss';
import * as api from '@/services/api';
import ContentDiff, { ILogItem } from './components/ContentDiff';
import dayjs from 'dayjs';

const OperationLog: FC = () => {
  const [pageAt, setPageAt] = useState(1);
  const [total, setTotal] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [LogList, setLogList] = useState<ILogItem[]>([]);
  useEffect(() => {
    const params = {
      projectSid: window.$storage.getItem('projectSid'),
      pageAt,
      pageSize,
    };
    api.research.fetchLogList(params).then(res => {
      console.log('eeewoijeowi', res);
      setLogList(res.businessLogInfoList);
      setTotal(res.total);
    });
  }, [pageAt, pageSize]);
  const handlePage = (pageN: number, pageSizeN: number) => {
    setPageAt(pageN);
    setPageSize(pageSizeN);
  };
  const docColor = [, styles.green, styles.red];
  return (
    <div className='py-40 pl-60 pr-20'>
      <Timeline>
        {
          LogList.map(logItem => (
            <Timeline.Item className={`${styles.dot} ${docColor[logItem.type]}`} key={logItem.id}>
              <div className='flex justify-between'>
                <div className='font-bold text-sm mb-6 flex items-center'>
                  <span className='mr-30'>
                    {[window.$log.businessType.CREATE_OBJECTIVE.code,
                      window.$log.businessType.CREATE_UNPLANNED_OBJECTIVE.code, 32].includes(logItem?.businessType) ?
                    <div className='flex'>
                      <div style={{ flex: '0 0 95px' }}>创建客观检查 - </div>
                      <div className={styles.objective_tit} dangerouslySetInnerHTML={{ __html: logItem.copyWriting }}></div>
                      {
                        logItem.copyWriting.length > 50 && '......'
                      }
                    </div> : logItem.copyWriting}
                  </span>
                  {
                    logItem.type !== 0 && (
                      <ContentDiff infoData={logItem}>
                        <Button type='link'>
                          <span className='underline'>原内容{logItem.type === 1 && ' - 新内容'}</span>
                        </Button>
                      </ContentDiff>
                    )
                  }
                </div>
                <div className={styles.time}>{dayjs(logItem.operationTime).format('YYYY-MM-DD HH:mm')}</div>
              </div>
              <Row className='text-gray-500 text-sm'>
                <Col span={3}>创建人： {logItem.operatorName}</Col>
                <Col span={3}>IP: {logItem.ip}</Col>
                <Col span={4}>设备名：{logItem.osName}</Col>
                <Col span={6}>浏览器信息：{logItem.browserName}</Col>
                <Col span={8}>操作唯一ID：{logItem.operationUniqueId}</Col>
              </Row>
              { logItem.operationReason && <div className='text-gray-500 mt-10 text-sm '>修改原因：{logItem.operationReason}</div>}
            </Timeline.Item>
          ))
        }
       </Timeline>
       {
         total && total > 0 ?
          <Pagination
            className='text-center'
            defaultCurrent={1}
            total={total}
            onChange={handlePage}
          /> : <></>
       }

       {total === 0 && <div>暂无操作日志</div>}
    </div>
  );
};

export default OperationLog;
