import React, { useState, useEffect } from 'react';
import * as api from '@/services/api';
import AlreadyReplyTable from '../components/already_reply_table';
import NotReplayTable from '../components/not_reply_table';
import { useSelector } from 'umi';
import styles from './index.scss';
import { IState } from 'typings/global';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';

interface IProps {
  location: {
    query: {
      id: string;
    }
  };
  scaleType: string;
}
function Reply({ location }: IProps) {
  // const [dataSource, setDataSource] = useState([]);
  const [sendNumber, setSendNumber] = useState(0);
  const [replyNumber, setReplyNumber] = useState(0);
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const [tableOptions] = useState({ projectNsId, scaleGroupId: location.query.id });


  useEffect(() => {
    // setOptions({ projectNsId, scaleGroupId: location.query.id });
    api.subjective.getScaleReplyList({
      scaleGroupId: location.query.id,
      projectNsId,
      pageAt: 1,
      pageSize: 1,
    }).then((res) => {

      setSendNumber(res.sendNum);
      setReplyNumber(res.replyNum);
      // if (res.researchScaleList.length > 0) {
      //   // setDataSource(res.researchScaleList);
      //   let sendNum = 0;
      //   let replyNum = 0;
      //   res.researchScaleList.forEach((item: { sendNumber: number; replyNumber: number }) => {
      //     sendNum += item.sendNumber;
      //     replyNum += item.replyNumber;
      //   });
      //   setSendNumber(sendNum);
      //   setReplyNumber(replyNum);
      // }
    });
  }, []);

  // const tableId = location.query.id;

  const columns: any = [
    {
      title: '姓名',
      dataIndex: 'patientName',
    },
    {
      title: '试验状态',
      dataIndex: 'status',
      render: (record: any) => (
        <div>{record === 1002 ? '进行中' : '已结束'}</div>
      ),
    },
    {
      title: '机构',
      dataIndex: 'organizationName',
    },
    {
      title: '已发出量表数量',
      dataIndex: 'sendNumber',
    },
    {
      title: '已回复量表数量',
      dataIndex: 'replyNumber',
      sorter: (a: { replyNumber: number; }, b: { replyNumber: number; }) => a.replyNumber - b.replyNumber,
      render: (text: number, record: any) =>
        <AlreadyReplyTable
          scaleType="subjective"
          scaleGroupId={location.query.id}
          patientId={record.patientId}
        >
          <span className={styles.number}>
            {text}
          </span>
        </AlreadyReplyTable>,
    },
    {
      title: '未回复量表数量',
      dataIndex: 'noReplyNumber',
      sorter: (a: { noReplyNumber: number; }, b: { noReplyNumber: number; }) => a.noReplyNumber - b.noReplyNumber,
      render: (text: number, record: any) =>
        record.status === 1002 ?
          <NotReplayTable
            scaleId={location.query.id}
            patientId={record.patientId}
          >
            <span className={styles.number}>
              {text}
            </span>
          </NotReplayTable>
          : <span>{text}</span>,
    },
  ];
  return (
    <div className={styles.reply_wrap}>
      <div className={styles.count}>
        <span>已发出: {sendNumber}张</span>
        <span>已回复: {replyNumber}张</span>
        <span>回复率: {sendNumber > 0 ? Math.round((replyNumber / sendNumber) * 100 * 100) / 100 : 0}%</span>
      </div>
      <div style={{ marginTop: 8 }}>
        {/* <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        /> */}
        <XzlTable
          // request={() => {}}
          request={api.subjective.getScaleReplyList}
          depOptions={tableOptions}
          // noPagination={true}
          category="researchScaleList"
          dataKey="researchScaleList"
          columns={columns}
          tableOptions={{
            rowSelection: false,
            // pagination: true,
          }}
        />
      </div>
    </div>
  );
}
export default Reply;
