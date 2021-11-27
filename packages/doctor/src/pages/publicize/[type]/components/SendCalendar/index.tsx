import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import SendDetail from '../SendDetail';
import { Calendar } from 'antd';
import moment from 'moment';
import { isEmpty } from 'lodash';
import styles from './index.scss';

const SendCalendar: FC = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => {
    setShowModal(true);
  };
  function getCurCount(value: moment.Moment) {
    let countObj = {};
    console.log('=====21', value);
    console.log('========222', moment(value).format('YYYY.MM.DD'));
    switch (value.date()) {
      case 28:
        countObj = {
          num: 10,
          status: 'red',
        };
        break;
      case 29:
        countObj = {
          num: 5,
          status: 'green',
        };
        break;
      default:
    }
    return countObj;
  }

  function dateCellRender(value: moment.Moment) {
    const countObj: { num?: number, status?: string } = getCurCount(value);
    if (isEmpty(countObj)) {
      return <></>;
    }
    return <SendDetail><div className={countObj?.status}>{countObj?.num}</div></SendDetail>;
  }
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
            // 开始时间：计划创建日期的月份，结束时间：当前时间的月份+2
            validRange={[moment(new Date()), moment(new Date().setMonth(new Date().getMonth() + 2))]}
          />
        </div>
      </DragModal>
    </div>
  );
};

export default SendCalendar;
