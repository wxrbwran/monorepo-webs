import React, { useState, useEffect, MouseEvent } from 'react';
import { EditFilled } from '@ant-design/icons';
import { Button, DatePicker } from 'antd';
import moment from 'moment';
import styles from './index.scss';

function WorkingTime() {
  const [visible, setVisible] = useState(false); // 是否显示弹框
  const [status, setStatus] = useState(0); // 0：12小时，1：24小时，2：暂不会诊
  const [editEndTime, setEditEndTime] = useState(false);
  const [deadLine, setDeadLine] = useState<Date>();

  const handleShowPanel = (e: React.MouseEvent) => {
    console.log(9);
    e.nativeEvent.stopImmediatePropagation();
    setVisible(true);
  };
  const hideConsultation = (e) => {
    const { startsWith } = e.target.className;
    if (startsWith && !e.target.className.startsWith('ant-calendar')) {
      setVisible(false);
      setEditEndTime(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', hideConsultation);
    return function cleanup() {
      document.removeEventListener('click', hideConsultation);
    };
  });
  const stopPropagation = (e: MouseEvent) => {
    e.nativeEvent.stopImmediatePropagation();
  };
  useEffect(() => {
    console.log(111, editEndTime);
  }, [editEndTime]);
  const handleToggleTime = (statusNum: number) => {
    setStatus(statusNum);
    if (statusNum === 2) {
      setVisible(false);
      console.log('选择的结束时间', deadLine);
    }
  };
  // 选择结束时间，点击确定
  const handleChoiseEndTime = (e: MouseEvent) => {
    e.stopPropagation();
    setEditEndTime(false);
    handleToggleTime(2);
  };
  // 编辑结束时间
  const handleEditTime = (e: MouseEvent) => {
    stopPropagation(e);
    setEditEndTime(true);
  };
  const handleDeadline = (date: Date) => {
    console.log('date', date);
    console.log(new Date(date).getTime());
    setDeadLine(date);
    // this.setState({ deadline: new Date(date).getTime() });
  };
  // 暂不会诊，截至时间
  const unAcceptEndTime = 1597718591658;
  const showText = ['接受会诊', '接受会诊', '暂不会诊'];
  const showTime = ['(12小时内回复)', '（24小时内回复)', `${moment(unAcceptEndTime).format('YYYY.MM.DD')}(结束)`];
  const disabledDate = (current: moment.Moment) => current && current < moment().endOf('day');
  return (
    <div className={styles.working_time}>
      <div className={styles.current} onClick={handleShowPanel}>
        <div>
          <span className={status === 2 ? styles.red : null} />
          {showText[status]}
        </div>
        <div>{showTime[status]}</div>
      </div>
      {
        visible && (
          <div className={styles.tooltip}>
            <span className={styles.arrow} />
            <div
              className={status === 0 ? styles.active : null}
              onClick={() => handleToggleTime(0)}
            >
              接受会诊（12小时内回复）
            </div>
            <div
              className={status === 1 ? styles.active : null}
              onClick={() => handleToggleTime(1)}
            >
              接受会诊（24小时内回复)
            </div>
            <div
              className={status === 2 ? styles.activeEnd : null}
              onClick={handleEditTime}
            >
              暂不会诊&nbsp;
              {status === 2 && !editEndTime && (
                <>
                  结束时间
                  {moment(unAcceptEndTime).format('YYYY.MM.DD')}
                  &nbsp;
                  <EditFilled />
                </>
              )}
              {
                editEndTime && (
                  <div className={styles.end_time}>
                    <span>结束时间</span>
                    <DatePicker
                      onChange={(data) => handleDeadline(data)}
                      defaultValue={unAcceptEndTime && moment(unAcceptEndTime)}
                      disabledDate={disabledDate}
                    />
                    <Button onClick={(e) => handleChoiseEndTime(e)}>确认</Button>
                  </div>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  );
}

export default WorkingTime;
