import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import QuestionDetail from '../question_detail';
import * as api from '@/services/api';
import { pageSize } from 'xzl-web-shared/dist/src/utils/consts';
import dayjs from 'dayjs';
import styles from './index.scss';

interface IProps {
  children: React.ReactElement;
  planRuleId: string;
  sid: string;
  status: number;
}
function RePlyTable({ children, planRuleId, sid, status }: IProps) {
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (showModal){
      api.education.getScalePatientReply({
        planRuleId,
        sid,
        status,
        pageAt: current,
        pageSize,
      }).then((res: { list: [], total: number }) => {
        setDataSource(res.list);
        setTotal(res.total);
      });
    }
  }, [showModal, current]);

  const handlePagerChange = (pagination: number) => {
    setCurrent(pagination);
  };

  const columns: any = [
    {
      title: '发送日期',
      dataIndex: 'createdAt',
      render: (text: number) => {
        return dayjs(text).format('YYYY-MM-DD');
      },
    },
    {
      title: '回复日期',
      dataIndex: 'replyAt',
      render: (text: number) => {
        return dayjs(text).format('YYYY-MM-DD');
      },
    },
    {
      title: '',
      dataIndex: 'updatedAt',
      render: (_text: string, record: any) =>
        <QuestionDetail
          id={record.id}
        >
          <span className={styles.look}>
            查看回复内容
          </span>
        </QuestionDetail>,
    },
  ];
  const columnsNotReply: any = [
    {
      title: '发送日期',
      dataIndex: 'createdAt',
      render: (text: number) => {
        return dayjs(text).format('YYYY-MM-DD');
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_text: any) => (<span>未回复</span>),
    },
  ];
  return (
    <>
      <span onClick={() => setShowModal(!showModal)}>{children}</span>
      {showModal && (
        <DragModal
          visible={showModal}
          title={`${status === 1 ? '未回复量表' : '已回复量表'}`}
          width={800}
          wrapClassName="ant-modal-wrap-center"
          onCancel={() => setShowModal(false)}
          maskClosable
          footer={null}
        >
        <Table
          dataSource={dataSource}
          columns={status === 1 ? columnsNotReply : columns}
          pagination={{
            pageSize,
            total,
            onChange: handlePagerChange,
          }}
        />
        </DragModal>
      ) }
    </>
  );
}
export default RePlyTable;
