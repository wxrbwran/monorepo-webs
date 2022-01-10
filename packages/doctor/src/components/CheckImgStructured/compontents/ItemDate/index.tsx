import React, { useState } from 'react';
// import Calendar from '@/components/Calendar';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import moment from 'moment';
import styles from './index.scss';

interface IProps {
  setReporttime: (params: null | number) => void;
  setUnknow?: (params: boolean) => void;
  initReportTime?: number;
  isUnknownTime?: boolean;
  type?: string;
  style?: object;
  label?: string;
  isViewOnly: boolean;
}
function ItemDate(props: IProps) {
  const {
    initReportTime, isUnknownTime, setReporttime, setUnknow, type, style, label, isViewOnly,
  } = props;
  console.log('initReportTime', initReportTime, type);
  const [unknownTime, setUnknownTime] = useState(isUnknownTime);
  let year: string | number = '';
  let month: string | number = '';
  let day: string | number = '';
  // 回显
  if (initReportTime) {
    year = dayjs(initReportTime).format('YYYY');
    month = dayjs(initReportTime).format('MM');
    day = dayjs(initReportTime).format('DD');
  }

  const handleSetFieldsVal = (val: any, momentDate: any) => {
    console.log(momentDate);
    const dateArr = val.split('/');
    if (dateArr[0]) {
      const reportTime = new Date(val).getTime();
      setReporttime(reportTime);
      if (setUnknow) {
        setUnknow(false);
      }
    }
    setUnknownTime(false);
  };
  // 点击时间不详
  const handleTimeUnkown = () => {
    setUnknownTime(!unknownTime);
    if (setUnknow ) {
      setUnknow!(!unknownTime);
    }
  };
  const dateFormat = 'YYYY/MM/DD';
  const disabledDate = (current: any) => current && current > moment().endOf('day');
  return (
    <div className="flex justify-end">
      {
        // 编辑时  ||  查看时且时间不详为false
        (!isViewOnly || (isViewOnly && !unknownTime)) && (
          <>
            <div className="text-sm ml-17 font-medium w-70 text-right" style={{ lineHeight: '32px' }}>{label || '采样时间'}：</div>
            <DatePicker
              disabledDate={disabledDate}
              onChange={(momentDate, dateString) => handleSetFieldsVal(dateString, momentDate)}
              defaultValue={initReportTime ? moment(`${year}/${month}/${day}`, dateFormat) : null}
              format={dateFormat}
              size="large"
              disabled={unknownTime}
              allowClear={false}
              style={style}
            />
          </>
        )
      }
      {
        // 编辑时  ||  查看时且时间不详为true
        (!isViewOnly || (isViewOnly && unknownTime)) && (
          <div
            className={`ml-10 ${styles.date_button} ${unknownTime ? styles.selected : ''}`}
            onClick={handleTimeUnkown}
          >
            时间不详
          </div>
        )
      }
    </div>
  );
}

export default ItemDate;
