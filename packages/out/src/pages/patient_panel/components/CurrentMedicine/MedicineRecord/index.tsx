import React, { useEffect, useState } from 'react';
import { Calendar } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import * as api from '@/services/api';
import { unitFlagRe } from '@/utils/tools';
import styles from './index.scss';

interface IFormatPlansItem {
  medicine: {
    dosage: number;
    name: string;
    dosageUnitFlag: number;
    medicineId: string;
  };
  plans: IIndex;
}
interface IIndex {
  [k: number]: any;
}
interface IDayState {
  date: number;
  state: number;
}

function MedicineRecord() {
  const [dayRecords, setDayRecords] = useState<IFormatPlansItem[]>([]);
  const [selectedValue, setSelectedValue] = useState<moment.Moment>();
  const [isShow, setIsShow] = useState(false);
  const [dayStates, setDayStates] = useState<IDayState[]>([]);

  // 获取服药状态
  const fetchTimelineStatus = (value?: moment.Moment) => {
    const params = {
      sid: window.$storage.getItem('patientSid'),
      timeRange: {
        start: +moment(value).startOf('month'),
        end: +moment(value).endOf('month'),
      },
    };
    api.medicine
      .getTimeLineStatus(params)
      .then((res) => {
        setDayStates(res.dayStates);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };
  // 格式化服药记录数据
  const formatAllPlans = (value: []) => {
    let newAllPlans: IFormatPlansItem[] = [];
    value.forEach((item: IMedicinePlans) => {
      const allPlansItem: any = {};
      allPlansItem.medicine = item.medicine;
      const newObj: IIndex = {};
      item.plans.forEach((v) => {
        if (newObj[v.count]) {
          newObj[v.count] = [
            ...newObj[v.count],
            {
              start: v.range.start,
              confirmAt: v.confirmAt,
              boxCellNos: v.boxCellNos,
            },
          ];
        } else {
          newObj[v.count] = [
            {
              start: v.range.start,
              confirmAt: v.confirmAt,
              boxCellNos: v.boxCellNos,
            },
          ];
        }
      });
      allPlansItem.plans = newObj;
      newAllPlans = [...newAllPlans, allPlansItem];
    });
    return newAllPlans;
  };
  // 获取某天服药记录
  const fetchRecords = (value: moment.Moment) => {
    const params = {
      sid: window.$storage.getItem('patientSid'),
      timeRange: {
        start: +moment(value).startOf('day'),
        end: +moment(value).endOf('day'),
      },
      isContainsCurrent: true,
      aggregationType: 0,
    };
    api.medicine
      .getPlans(params)
      .then((res) => {
        const newDayRecords = formatAllPlans(res.allPlans);
        setDayRecords(newDayRecords);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };
  useEffect(() => {
    fetchTimelineStatus();
  }, []);
  useEffect(() => {
    if (selectedValue){
      fetchRecords(selectedValue);
    } else {
      fetchRecords(moment());
    }
  }, [moment(selectedValue).format('YYYY-MM-DD')]);
  // 切换年/月，获取每天服药状态
  const onPanelChange = (value: moment.Moment) => {
    fetchTimelineStatus(value);
    setIsShow(false);
  };
  // 选中某天，获取某天服药记录
  const onSelect = (value: moment.Moment) => {
    // fetchRecords(value);
    setIsShow(true);
    setSelectedValue(value);
  };
  // 获取当天服药记录
  const toToday = () => {
    setSelectedValue(moment());
    fetchTimelineStatus();
    setIsShow(false);
  };
  // 关闭pop层
  const closeEvents = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsShow(false);
  };
  // 大于当前日期的日期禁用
  const disabledDate = (value: moment.MomentInput) => {
    const selectedDay = moment(value).format('x');
    return selectedDay > moment().format('x');
  };
  // pop层内容
  const getPopContent = () => (
    <ul className={styles.outer}>
      {dayRecords.map((rItem: IFormatPlansItem) => (
        <li key={rItem.medicine.medicineId} className={styles.item}>
          <span className={styles.name}>{rItem.medicine.name}</span>
          <div>
            {Object.keys(rItem.plans).map((pItem) => (
              <p key={pItem}>
                <span>{Math.round((Number(pItem) / 1000) * 100) / 100}</span>
                <span className={styles.unit}>{unitFlagRe[rItem.medicine.dosageUnitFlag]}</span>
                {rItem.plans[Number(pItem)].map(
                  (v: { start: number; confirmAt: number }) => (
                    <span
                      className={v.confirmAt ? `${styles.hour} ${styles.green}` : styles.hour}
                      key={v.start}
                    >
                      {moment(v.start).format('HH:mm').split(':')[1] === '00' ? moment(v.start).format('HH:mm').split(':')[0] : moment(v.start).format('HH:mm')}
                    </span>
                  ),
                )}
              </p>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
  // 不同服药状态对应不同类名
  const getClassname = (status: number) => {
    let statusMedicine = '';
    switch (status) {
      case 0:
        statusMedicine = 'noTake';
        break;
      case 1:
        statusMedicine = 'takeSome';
        break;
      case 2:
        statusMedicine = 'takeAll';
        break;
      default:
        statusMedicine = '';
    }
    return statusMedicine;
  };
  // 点击单元格显示的内容
  const dateCellRender = (value: moment.Moment) => {
    const currentDay = dayStates.filter(
      (item) => moment(item.date).format('YYYY/MM/DD') === moment(value).format('YYYY/MM/DD'),
    )[0];
    const className = currentDay && currentDay.date < new Date().getTime() ? getClassname(currentDay.state) : 'noPlan';
    return (
      <>
        <div className={styles[className]} />
        {!!isShow
        && dayRecords.length > 0
        && moment(value).format('YYYY.MM.DD') === moment(selectedValue).format('YYYY.MM.DD') ? (
          <div className={styles.events}>
            <span className={styles.date}>{value.date()}</span>
            <CloseOutlined className={styles.close} onClick={(e) => closeEvents(e)} />
            <div className={styles[className]} />
            {getPopContent()}
          </div>
          ) : (
            ''
          )}
      </>
    );
  };
  return (
    <div className={styles.record}>
      <div className={styles.today} onClick={toToday}>
        今天
      </div>
      <Calendar
        value={selectedValue || moment()}
        dateCellRender={dateCellRender}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        disabledDate={disabledDate}
      />
    </div>
  );
}

export default MedicineRecord;
