import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import * as api from '@/services/api';
import ReplyTable from '../reply_table';
import styles from './index.scss';
import { pageSize } from '@/utils/consts';
import DragModal from '@/components/DragModal';

interface IProps {
  id: string;
  children: React.ReactElement;
}
function Reply({ id, children }: IProps) {
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [sendNumber, setSendNumber] = useState(0);
  const [replyNumber, setReplyNumber] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totals, setTotals] = useState(0);
  useEffect(() => {
    if(showModal){
      api.education.getScaleReplyList({
        planRuleId: id,
        pageAt: current,
        pageSize,
      }).then((res: any) => {
        if(res.list.length>0){
          const { list, total, sum, replySum } = res;
          setDataSource(list);
          setSendNumber(sum);
          setReplyNumber(replySum);
          setTotals(total);
        }
      })
    }
  }, [showModal, current]);

  useEffect(() => {
    if(!showModal){
      setCurrent(1);
    }
  }, [showModal])

  const handlePagerChange = (pagination: number) => {
    setCurrent(pagination);
  }

  const columns: any = [
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '已发送量表数量',
      dataIndex: 'count',
      align: 'center',
    },
    {
      title: '已回复量表数量',
      dataIndex: 'replyCount',
      align: 'center',
      sorter: (a: { replyNumber: number; }, b: { replyNumber: number; }) => a.replyNumber - b.replyNumber,
      render: (text: number, record: any) =>
        <ReplyTable
          planRuleId={id}
          sid={record.sid}
          status={3}
        >
          <span className={styles.number}>
            {text}
          </span>
        </ReplyTable>
    },
    {
      title: '未回复量表数量',
      dataIndex: 'unReplyCount',
      align: 'center',
      sorter: (a: { noReplyNumber: number; }, b: { noReplyNumber: number; }) => a.noReplyNumber - b.noReplyNumber,
      render: (text: number, record: any) =>
        <ReplyTable
          planRuleId={id}
          sid={record.sid}
          status={1}
        >
          <span className={styles.number}>
            {text}
          </span>
        </ReplyTable>
    }
  ];
  return (
    <>
      <span onClick={() => setShowModal(!showModal)}>{children}</span>
      {showModal && (
        <DragModal
          visible={showModal}
          title=''
          width={800}
          wrapClassName="ant-modal-wrap-center"
          onCancel={() => setShowModal(false)}
          maskClosable
          footer={null}
        >
          <div className={styles.reply_wrap}>
            <div className={styles.count}>
              <span>已发出: {sendNumber}张</span>
              <span>已回复: {replyNumber}张</span>
              <span>回复率: {sendNumber>0 ? Math.round((replyNumber/sendNumber)*100*100)/100 : 0}%</span>
            </div>
            <div className='mt-8'>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                pagination={{
                  pageSize,
                  total: totals,
                  onChange: handlePagerChange,
                  showSizeChanger: false,
                }}
                // onHeaderCell={()=>({style:{textAlign: 'center'}})}
              />
            </div>
          </div>
        </DragModal>
      ) }
    </>
  )
}
export default Reply;
