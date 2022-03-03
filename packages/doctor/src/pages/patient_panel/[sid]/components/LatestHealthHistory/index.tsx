import React, {  FC, useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import Hyd from './hyd';
import Jcd from './jcd';
import styles from './index.scss';

const { RangePicker } = DatePicker;
const LatestHealthHistory: FC = ({ children }) => {
  // @ts-ignores
  const initFrom = new Date(moment().subtract(5, 'year'));
  // 这里不采用时间戳格式，便于DatePicker使用value
  const [time, setTime] = useState({ startTime: initFrom,  endTime: new Date() });
  const [show, setShow] = useState(false);
  const [activeType, setActiveType] = useState('JCD');
  useEffect(() => {
    if (show) {
      setTime({ ...time,  endTime: new Date() });
    }
  }, [show]);

  const dateFormat = 'YYYY/MM/DD';
  const handleDate = (date: any, dateString: string[]) => {
    console.log(date);
    const startTime = (new Date(dateString[0]));
    const endTime = (new Date(dateString[1]));
    setTime({ startTime, endTime });
  };

  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  };
  const outType = {
    HYD: '化验单',
    JCD: '检查单',
    OTHER: '其他医学单据',
  };
  return (
    <>
      <span onClick={() => setShow(true)}>{ children }</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width="99%"
        visible={show}
        title="结构化数据"
        onCancel={() => setShow(false)}
        footer={null}
      >
        <div className="text-center">
          <div className='flex justify-between mb-20'>
            <div className='flex'>
              {
                Object.keys(outType).map(key => (
                  <div
                    key={key}
                    onClick={() => setActiveType(key)}
                    className={activeType === key ? `${styles.active} ${styles.outtype_btn}` : styles.outtype_btn}
                  >{outType[key]}</div>
                ))
              }
            </div>
            <RangePicker
              onChange={handleDate}
              size="large"
              value={[moment(time.startTime, dateFormat), moment(time.endTime, dateFormat)]}
              format={dateFormat}
              allowClear={false}
              disabledDate={disabledDate}
            />
          </div>
          {
            show && (
              <>
               {activeType === 'HYD' && <Hyd time={time} />}
               {activeType === 'JCD' && <Jcd time={time} />}
              </>
            )
          }
        </div>
      </DragModal>
    </>
  );
};

export default LatestHealthHistory;
