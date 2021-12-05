import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import SendDetail from '../SendDetail';
import { Calendar } from 'antd';
import moment from 'moment';
import * as api from '@/services/api';
import { sfTypeUrl } from '../../../utils';
import { useParams } from 'umi';
import styles from './index.scss';
import dayjs from 'dayjs';

interface ISendItem {
  sendTime: number;
  sendCount: number;
}
interface IDatData {
  [key: string]: {
    todoSendCount?: number;
    sendCount?: number
  }
}
interface IProps {
  rule: any;
}
const SendCalendar: FC<IProps> = ({ children, rule }) => {
  const [showModal, setShowModal] = useState(false);
  const [sendDatas, setsendDatas] = useState({});
  const { type } = useParams();

  const getDatas = (startTime: any, endTime: any) => {
    const params = {
      startTime: startTime,   			//起始时间
      endTime: endTime, //截止时间
      ruleId: rule.id,      // 规则id
    };
    const sendCount = {};
    api.education.getPublicizSendCount(params).then((res: { sendList: ISendItem[], todoSendList: ISendItem[] }) => {
      res.sendList.forEach(item => {
        sendCount[item.sendTime] = { sendCount: item.sendCount };
      });
      res.todoSendList.forEach(item => {
        sendCount[item.sendTime] = {
          ...sendCount?.[item.sendTime],
          todoSendCount: item.sendCount,
        };
      });
      setsendDatas(sendCount);
    });
  };

  const handleShow = () => {
    setShowModal(true);
    getDatas(rule.createdAtTime, dayjs(rule.createdAtTime).endOf('month').valueOf());
  };


  // 切换年/月，刷新
  const onPanelChange = (value: moment.Moment) => {
    getDatas(+moment(value).startOf('month'), +moment(value).endOf('month'));
  };

  function dateCellRender(value: moment.Moment) {

    const itemTime = new Date(value).setHours(0, 0, 0, 0);

    const { todoSendCount, sendCount }: IDatData = sendDatas?.[itemTime] || {};

    if (!todoSendCount && !sendCount) {
      return <></>;
    }
    // actionType 0已发送  1待发送
    const detailProp = {
      ruleId: rule.id,
      startTime: itemTime,
      sourceType: sfTypeUrl?.[type]?.sourceType,
    };
    return (
      <div className={styles.count_wrap}>
        <SendDetail actionType={1} {...detailProp}>
          {todoSendCount && <div className='red'>{todoSendCount}</div>}
        </SendDetail>
        <SendDetail actionType={0} {...detailProp}>
          {sendCount && <div className='green'>{sendCount}</div>}
        </SendDetail>
      </div>
    );
  }
  // 开始时间，暂时先写当前，加完数据再改
  // 计划创建日期的月份  ~ 当前时间的月份 + 2
  let startDate = new Date();
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);
  return (
    <div>
      <span onClick={handleShow}>{children}</span>
      <DragModal
        title={
          <div className={styles.modal_title}>
            <span className={styles.green}>表示已发送</span>
            <span className={styles.red}>表示待发送</span>
            <span className="ml-25">数字表示发送数量，点击数字可以查看详情</span>
          </div>
        }
        footer={null}
        width={1038}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        wrapClassName="ant-modal-wrap-center"
      >
        <div className={styles.calendar_wrap}>
          <Calendar
            dateCellRender={dateCellRender}
            onPanelChange={onPanelChange}
            // 开始时间：计划创建日期的月份，结束时间：当前时间的月份+2
            validRange={[moment(rule.createdAtTime),
              moment(new Date().setMonth(new Date().getMonth() + 2))]}
          />
        </div>
      </DragModal>
    </div>
  );
};

export default SendCalendar;
