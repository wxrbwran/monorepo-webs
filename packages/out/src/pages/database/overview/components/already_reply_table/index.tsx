import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import DragModal from '@/components/DragModal';
import QuestionDetail from '../question_detail';
import * as api from '@/services/api';
import dayjs from 'dayjs';
import styles from './index.scss';

interface IProps {
  children: React.ReactElement;
  scaleGroupId: string;
  patientId: string;
}
function AlreadyRePlyTable({ children, scaleGroupId, patientId }: IProps) {
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  // const projectSid = window.$storage.getItem('projectSid');
  useEffect(() => {
    if (showModal) {
      api.overview.getScalePatientReply({ scaleGroupId, patientId, status: 2 }).then((res) => {
        setDataSource(res.scalePatientInfos);
      });
    }
  }, [showModal]);
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
      dataIndex: 'updatedAt',
      render: (text: number) => {
        return dayjs(text).format('YYYY-MM-DD');
      },
    },
    {
      title: '',
      dataIndex: 'updatedAt',
      render: (_text: string, record: any) => (
        <QuestionDetail questions={record.result} scaleName={record.scaleName}>
          <span className={styles.look}>查看回复内容</span>
        </QuestionDetail>
      ),
    },
  ];
  return (
    <>
      <span onClick={() => setShowModal(!showModal)}>{children}</span>
      {showModal && (
        <DragModal
          visible={showModal}
          title="已回复量表"
          width={800}
          wrapClassName="ant-modal-wrap-center"
          onCancel={() => setShowModal(false)}
          maskClosable
          footer={null}
        >
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </DragModal>
      )}
    </>
  );
}
export default AlreadyRePlyTable;
