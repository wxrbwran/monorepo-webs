import React, { useMemo, useState } from 'react';
import { InputNumber } from 'antd';
import checked from '@/assets/img/nav_bar/visiting_tiime_checked.png';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { btnRender } from '@/utils/button';
import styles from '../index.scss';

export interface Irecord {
  ampm: string;
  dayAppointInfos: IdayAppointInfo[];
  data: Idata[];
}
interface IdayAppointInfo {
  dayOfWeek: string;
  beginTime: string;
  endTime: string;
  inWork: string;
  defaultTime: string;
}
interface Idata {
  id: string;
  beginTime: string;
  endTime: string;
  inWork: string;
  weekName: string;
}
interface Iprops {
  text: string;
  record: Irecord;
  dayOfWeek: string;
  activeType: string;
}

interface IdataInfo {
  dayOfWeek: string;
  id?: string;
  beginTime: string;
  endTime: string;
  inWork: boolean | string;
  defaultTime?: string;
}
interface IactiveEditTime {
  id?: string;
  beginTime: number;
  endTime: number;
  amOrPm: string;
  dayOfWeek: string;
  inWork: boolean;
}
function Td(props: Iprops) {
  const {
    text, record, dayOfWeek, activeType,
  } = props;
  console.log(text, record, dayOfWeek, activeType);
  const weekList: CommonData = {
    MONDAY: '周一',
    TUESDAY: '周二',
    WEDNESDAY: '周三',
    THURSDAY: '周四',
    FRIDAY: '周五',
    SATURDAY: '周六',
    SUNDAY: '周日',
  };
  const ampmList: CommonData = {
    AM: '上午',
    FORENOON: '上午',
    PM: '下午',
    AFTERNOON: '下午',
    NIGHT: '晚上',
  };
  const [isShowChangeTime, setIsShowChangeTime] = useState(false);
  const [activeEditTime, setActiveEditTime] = useState<IactiveEditTime>({});
  const handleChangeVisitingTime = (dataInfo:any, ampm: string) => {
    console.log(dataInfo, ampm);
    let beginTime = 0;
    let endTime = 0;
    if (['AM', 'FORENOON'].includes(ampm)) {
      beginTime = dataInfo.beginTime ? +dataInfo.beginTime.split(':')[0] : 8;
      endTime = dataInfo.endTime ? +dataInfo.endTime.split(':')[0] : 12;
    } else if (['PM', 'AFTERNOON'].includes(ampm)) {
      beginTime = dataInfo.beginTime ? +dataInfo.beginTime.split(':')[0] : 14;
      endTime = dataInfo.endTime ? +dataInfo.endTime.split(':')[0] : 18;
    } else if (['NIGHT'].includes(ampm)) {
      beginTime = dataInfo.beginTime ? +dataInfo.beginTime.split(':')[0] : 19;
      endTime = dataInfo.endTime ? +dataInfo.endTime.split(':')[0] : 22;
    }
    const activeEditData:IactiveEditTime = ({
      id: dataInfo.id,
      beginTime,
      endTime,
      amOrPm: ampm,
      dayOfWeek: dataInfo.dayOfWeek,
      inWork: dataInfo.inWork,
    });
    setIsShowChangeTime(!isShowChangeTime);
    setActiveEditTime(activeEditData);
  };
  const obtainDayOfWeekInfo = useMemo(() => {
    const {
      ampm, dayAppointInfos,
      data,
    } = record;
    let dataInfo: IdataInfo = {};
    return () => {
      if (activeType === 'visiting') {
        dayAppointInfos.forEach((dayAppointInfo) => {
          if (dayAppointInfo.dayOfWeek === dayOfWeek) {
            dataInfo = {
              dayOfWeek,
              beginTime: dayAppointInfo.beginTime,
              endTime: dayAppointInfo.endTime,
              inWork: dayAppointInfo.inWork,
              defaultTime: dayAppointInfo.defaultTime,
            };
          }
        });
      } else {
        data.forEach((info) => {
          if (info.weekName === dayOfWeek) {
            dataInfo = {
              dayOfWeek,
              id: info.id,
              beginTime: info.beginTime,
              endTime: info.endTime,
              inWork: info.inWork === 'ADMISSIONS',
            };
          }
        });
      }
      return (
        <div
          className="day-of-week"
          onClick={() => handleChangeVisitingTime(dataInfo, ampm)}
        >
          {dataInfo.inWork ? (
            <div className={styles.work_time}>
              <span>
                {dataInfo.beginTime}
                {' '}
                -
                {' '}
                {dataInfo.endTime}
              </span>
              <img src={checked} alt="" />
            </div>
          ) : '暂不接诊'}
        </div>
      );
    };
  }, [props]);
  const onChange = (type: any, value:any) => {
    console.log(type, value);
  };
  const cancelReservation = () => {
    console.log('暂不会诊');
  };
  const saveReservation = () => {
    console.log('保存会诊时间');
  };
  const {
    beginTime, endTime, inWork, amOrPm,
  } = activeEditTime;
  const weekDayName = weekList[dayOfWeek];
  const weekDayTime = ampmList[amOrPm];
  let timeLimit: CommonData = {};
  if (activeType === 'imTime') {
    timeLimit = {
      上午: { min: 0, max: 12 },
      下午: { min: 12, max: 18 },
      晚上: { min: 18, max: 24 },
    };
  } else {
    timeLimit = {
      上午: { min: 0, max: 12 },
      下午: { min: 12, max: 24 },
    };
  }
  return (
    <div>
      {obtainDayOfWeekInfo()}
      {
        isShowChangeTime && (
          <DragModal
            title={activeType === 'imTime' ? '' : '出诊时间'}
            visible={isShowChangeTime}
            onCancel={() => setIsShowChangeTime(false)}
            wrapClassName="ant-modal-wrap-center"
            footer={null}
            width={660}
          >
            <div className={styles.edit_time}>
              <h3>
                {weekDayName}
                （
                {weekDayTime}
                ）
              </h3>
              <div className={styles.input_wrap}>
                <div>
                  <InputNumber
                    min={timeLimit[weekDayTime].min}
                    max={timeLimit[weekDayTime].max}
                    precision={0}
                    value={Number(beginTime)}
                    onChange={(value) => onChange('begin', value)}
                  />
                  {' '}
                  点
                </div>
                <div className={styles.line}>————</div>
                <div>
                  <InputNumber
                    min={timeLimit[weekDayTime].min}
                    max={timeLimit[weekDayTime].max}
                    precision={0}
                    value={Number(endTime)}
                    onChange={(value) => onChange('end', value)}
                  />
                  {' '}
                  点
                </div>
              </div>
              {btnRender({
                okText: '保存',
                cancelText: '暂不接诊',
                onOk: saveReservation,
                onCancel: cancelReservation,
                noCancel: !inWork,
              })}
            </div>
          </DragModal>

        )
      }
    </div>
  );
}
export default Td;
