import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import * as api from '@/services/api';
import dayjs from 'dayjs';
import styles from './index.scss';

interface IProps {
  children: React.ReactElement;
  scaleId: string;
  patientId: string;
}
function NotRePlyTable({ children, scaleId, patientId }: IProps) {
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [scalePatientIds, setScalePatientIds] = useState<string[]>([]);

  const fetchScalePatientReply = () => {
    const params = {
      scaleGroupId: scaleId,
      patientId,
      status: 1,
    };
    api.subjective.getScalePatientReply(params).then((res) => {
      setDataSource(res.scalePatientInfos);
    });
  };
  useEffect(() => {
    if (showModal){
      fetchScalePatientReply();
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
      title: '状态',
      dataIndex: 'status',
      render: (_text: any, record: any) => (
        <div>{record.status === 1 ? '未回复' : '已回复'}</div>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: string[], selectedRows: []) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      const filterResult = selectedRows.filter(item => item.remindStatus !== 1);
      setScalePatientIds(filterResult.map((item: { id: string }) => item.id));
    },
    getCheckboxProps: (record: { remindStatus: number; }) => ({
      disabled: record.remindStatus === 1,
    }),
  };
  const remindFill = () => {
    console.log('scalePatientIds', scalePatientIds);
    api.subjective.replyDoctorReminder({ sid: patientId, scalePatientIds }).then(() => {
      message.success('提醒成功', () => {
        setShowModal(false);
      });
      setScalePatientIds([]);
      fetchScalePatientReply();
    });
  };
  return (
    <>
      <span onClick={() => setShowModal(!showModal)}>{children}</span>
      {showModal && (
        <DragModal
          visible={showModal}
          title='未回复量表'
          width={800}
          wrapClassName="ant-modal-wrap-center"
          onCancel={() => setShowModal(false)}
          maskClosable
          footer={null}
          className={styles.not_reply}
        >
          <div style={{ textAlign: 'right' }}>
            <Button type="primary"
              style={{ fontSize: 14 }}
              onClick={remindFill}
              disabled={scalePatientIds.length === 0}
            >提醒填写</Button>
          </div>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            style={{ marginTop: 10 }}
            rowKey={(record: { id: number }) => record.id}
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
          />
        </DragModal>
      ) }
    </>
  );
}
export default NotRePlyTable;
