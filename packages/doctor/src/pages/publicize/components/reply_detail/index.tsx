import React, { useState, useEffect } from 'react';
import { Table, Select } from 'antd';
import * as api from '@/services/api';
import ReplyTable from '../reply_table';
import styles from './index.scss';
import { pageSize } from 'xzl-web-shared/src/utils/consts';
import DragModal from 'xzl-web-shared/src/components/DragModal';

interface IProps {
  // id: string;
  children: React.ReactElement;
  rule: any;
  chooseValues: any;
}

const { Option } = Select;
function Reply({ rule, children, chooseValues }: IProps) {

  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [sendNumber, setSendNumber] = useState(0);
  const [replyNumber, setReplyNumber] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totals, setTotals] = useState(0);
  const [contentsList, setContentsList] = useState([]);
  const [choiceContent, setChoiceContent] = useState();

  const getScaleReplyList = () => {

    api.education.getScaleReplyList({
      planRuleId: rule.id,
      pageAt: current,
      scaleId: choiceContent.id,
      pageSize,
    }).then((res: any) => {

      const { list, total, sum, replySum } = res;
      setDataSource(list);
      setSendNumber(sum);
      setReplyNumber(replySum);
      setTotals(total);
    });
  };

  useEffect(() => {

    if (chooseValues) {
      // 获取随访表列表
      const contents = [...chooseValues.frequency.custom.flatMap((custom) => custom.contents), ...chooseValues.firstTime.choiceContents];
      let mySet = new Set();
      const list = contents.filter((item) => {

        if (!mySet.has(item.id)) {
          mySet.add(item.id);
          return true;
        } else {
          return false;
        }
      });

      if (list.length > 0) {
        setChoiceContent(list[0]);
      }
      setContentsList(list);
    }
  }, [showModal, chooseValues]);

  useEffect(() => {

    if (showModal && choiceContent) {
      getScaleReplyList();
    }
  }, [showModal, current, choiceContent]);

  useEffect(() => {
    if (!showModal) {
      setCurrent(1);
    }
  }, [showModal]);

  const handlePagerChange = (pagination: number) => {
    setCurrent(pagination);
  };

  const handleChange = (val) => {

    console.log('============= handleChange', val);
    setCurrent(1);
    setChoiceContent(contentsList.filter((item) => item.id == val)[0]);
  };


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
          planRuleId={rule.id}
          sid={record.sid}
          status={3}
        >
          <span className={styles.number}>
            {text}
          </span>
        </ReplyTable>,
    },
    {
      title: '未回复量表数量',
      dataIndex: 'unReplyCount',
      align: 'center',
      sorter: (a: { noReplyNumber: number; }, b: { noReplyNumber: number; }) => a.noReplyNumber - b.noReplyNumber,
      render: (text: number, record: any) =>
        <ReplyTable
          planRuleId={rule.id}
          sid={record.sid}
          status={1}
        >
          <span className={styles.number}>
            {text}
          </span>
        </ReplyTable>,
    },
  ];


  return (
    <>
      <span onClick={() => setShowModal(!showModal)}>{children}</span>
      {showModal && (
        <DragModal
          visible={showModal}
          title='回复详情'
          width={800}
          wrapClassName="ant-modal-wrap-center"
          onCancel={() => setShowModal(false)}
          maskClosable
          footer={null}
        >
          <div className={styles.reply_wrap}>
            <Select value={choiceContent.title} style={{ width: 180 }} onChange={handleChange}>
              {
                contentsList.map((item) => {
                  return (<Option key={item.id} value={item.id}>{item.title}</Option>);
                })
              }
            </Select>
            <div className={styles.count}>
              <span>已发出: {sendNumber}张</span>
              <span>已回复: {replyNumber}张</span>
              <span>回复率: {sendNumber > 0 ? Math.round((replyNumber / sendNumber) * 100 * 100) / 100 : 0}%</span>
            </div>
            <div className='mt-8'>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                pagination={{
                  pageSize,
                  current,
                  total: totals,
                  onChange: handlePagerChange,
                  showSizeChanger: false,
                }}
              // onHeaderCell={()=>({style:{textAlign: 'center'}})}
              />
            </div>
          </div>
        </DragModal>
      )}
    </>
  );
}
export default Reply;
