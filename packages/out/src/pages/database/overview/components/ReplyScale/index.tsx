import React, { useState, useEffect } from 'react';
import XzlTable from '@/components/XzlTable';
import { patientName, crostatus, orgaName, sendNumber as sendNumberCol, noReplyNumber } from '@/utils/columns';
import * as api from '@/services/api';
import AlreadyReplyTable from '../already_reply_table';
import { isEmpty } from 'lodash';
import styles from './index.scss';

interface IProps {
  scaleGroupId?: string;
}
interface IDataSource {
  sendNumber: number;
  replyNumber: number;
}
function Reply({ scaleGroupId }: IProps) {
  const [sendNumber, setSendNumber] = useState(0);
  const [replyNumber, setReplyNumber] = useState(0);
  const [depOptions, setOptions] = useState({});
  useEffect(() => {
    setOptions({
      projectNsId: window.$storage.getItem('projectNsId'),
      scaleGroupId,
    })
  }, [scaleGroupId])
  const handleCallback = (params: { dataSource: IDataSource[]}) => {
      let sendNum = 0;
      let replyNum = 0;
      params.dataSource.forEach((item: {sendNumber: number; replyNumber: number})=> {
        sendNum += item.sendNumber;
        replyNum += item.replyNumber
      })
      setSendNumber(sendNum);
      setReplyNumber(replyNum);
  }
  const replyNumberCol = {
    title: '已回复量表数量',
    dataIndex: 'replyNumber',
    sorter: (a: { replyNumber: number; }, b: { replyNumber: number; }) => a.replyNumber - b.replyNumber,
    render: (text: number, record: any) =>
      <AlreadyReplyTable
        scaleGroupId={window.$storage.getItem('scaleGroupId')!}
        patientId={record.patientId}
      >
        <span className={styles.number}>
          {text}
        </span>
      </AlreadyReplyTable>
  };
  const scaleReplyColumns = [
    patientName,
    crostatus,
    orgaName,
    sendNumberCol,
    replyNumberCol,
    noReplyNumber,
  ]
  return (
    <div className={styles.reply_wrap}>
      <div className={`text-gray-600 ${styles.count}`}>
        <span>已发出: {sendNumber}张</span>
        <span>已回复: {replyNumber}张</span>
        <span>回复率: {sendNumber>0 ? Math.round((replyNumber/sendNumber)*100*100)/100 : 0}%</span>
      </div>
      <div style={{ marginTop: 8 }}>
        {
          !isEmpty(depOptions) && (
            <XzlTable
              noPagination={true}
              request={api.overview.getScaleReplyList}
              columns={scaleReplyColumns}
              dataKey="subScaleReplyInfos"
              handleCallback={handleCallback}
              tableOptions={{
                rowSelection: false,
                // pagination: false,
              }}
              depOptions={depOptions}
            />
          )
        }

      </div>
    </div>
  )
}
export default Reply;
