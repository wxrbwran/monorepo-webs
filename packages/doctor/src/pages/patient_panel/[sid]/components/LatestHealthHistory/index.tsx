import React, {  FC, useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import Hyd from './compontents/Hyd';
import Jcd from './compontents/Jcd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './index.scss';

const { RangePicker } = DatePicker;
const LatestHealthHistory: FC = ({ children }) => {
  // @ts-ignores
  const initFrom = new Date(moment().subtract(5, 'year'));
  // 这里不采用时间戳格式，便于DatePicker使用value
  const [time, setTime] = useState({ startTime: initFrom,  endTime: new Date() });
  const [show, setShow] = useState(false);
  const [activeType, setActiveType] = useState('HYD');
  const [isFull, setIsFull] = useState(false);
  let controlLineBar:HTMLElement | null;
  let modalPanel:HTMLElement | null;
  let leftWidth: string | number | null = null;
  let timer: any = null;
  const handleMouseDown = (e) => {
    const ev = e || window.event;
    const disX = ev.clientX; // 获取鼠标按下时光标x的值
    const disW = modalPanel.offsetWidth; // 获取拖拽前modal的宽
    document.onmousemove = (event) => {
      const ee = event || window.event;
      leftWidth = ee.clientX - (disX - disW);
      modalPanel!.style.width = `${ leftWidth }px`;
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
  const handleDragControl = () => {
    controlLineBar = document.getElementById('controlLineR') as HTMLElement;
    modalPanel = document.querySelector('.ant-modal') as HTMLElement;
    controlLineBar.addEventListener('mousedown', handleMouseDown, false);
  };
  useEffect(() => {
    if (show) {
      setTime({ ...time,  endTime: new Date() });
      timer = setTimeout(() => {
        handleDragControl();
      }, 1000);
    } else {
      controlLineBar?.removeEventListener('mousedown', handleMouseDown, false);
      controlLineBar = null;
      clearTimeout(timer);
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
        width={isFull ? '99%' : 1200}
        visible={show}
        title="结构化数据"
        onCancel={() => setShow(false)}
        footer={null}
        titleDoubleClick={() => setIsFull(!isFull)}
        style={{ minWidth: 800 }}
      >
        <div className="text-center">
          <div className='flex justify-between mb-10'>
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
          <div className='text-left text-gray-500'><ExclamationCircleOutlined className='mr-5' style={{ fontSize: 14 }} />
            如采样(检查)时间不详, 则展示结构化时间, 已用*标注
          </div>
          {
            show && (
              <>
               {activeType === 'HYD' && <Hyd time={time} />}
               {activeType === 'JCD' && <Jcd time={time}  category={activeType} />}
               {activeType === 'OTHER' && <Jcd time={time}  category={activeType} />}
              </>
            )
          }
          <div id="controlLineR" className='absolute right-0 h-full cursor-move bottom-0 w-2'></div>
        </div>
      </DragModal>
    </>
  );
};

export default LatestHealthHistory;
