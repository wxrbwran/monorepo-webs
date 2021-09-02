import React, { useState, useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import * as api from '@/services/api';
import { unique } from '@/utils/utils';
import './index.scss';

interface IDayStates {
  medicineId: string;
  medicine: {
    name: string;
  };
  date: number;
}

function MedicineSheet() {
  const [dayStates, setDayStates] = useState([]);

  const initialTimeLine = (dayState: IDayStates[]) => {
    if (dayState.length > 0) {
      const filterDayStates = unique(
        dayState.map((item: IDayStates) => ({
          id: item.medicineId,
          content: item.medicine.name,
        })),
      );
      const groups = new vis.DataSet(filterDayStates);
      const items = new vis.DataSet(
        dayState.map((item: IDayStates) => ({
          group: item.medicineId,
          start: new Date(item.date),
          end: new Date(+moment(item.date).endOf('day')),
        })),
      );
      const maxHeight = groups.length * 58 + 50;
      const options = {
        selectable: false,
        groupOrder: (a: { value: number }, b: { value: number }) => a.value - b.value,
        zoomMin: 604800000,
        zoomMax: 3153600000000,
        locale: moment.locale('zh-CN'),
        autoResize: true,
        maxHeight,
        verticalScroll: true,
        horizontalScroll: true,
        tooltip: { followMouse: true, overflowMethod: 'cap' },
      };
      const container = document.querySelector('#medicineSheet');
      const timeline = new vis.Timeline(container, items, options);
      timeline.setGroups(groups);
      timeline.setItems(items);
      timeline.setOptions({ orientation: { axis: 'top', item: 'bottom' } });
      setTimeout(() => {
        let scrollPanel: any = document.querySelector('.vis-left');
        scrollPanel.scrollTo(0, 0);
        timeline.redraw();
        scrollPanel = null;
      }, 1000);
    }
  };
  useEffect(() => {
    const myDate = new Date();
    const params = {
      sid: window.$storage.getItem('patientSid'),
      timeRange: {
        start: myDate.setDate(myDate.getDate() - 90),
        end: +new Date(),
      },
    };
    api.medicine
      .getTimeLineOverview(params)
      .then((res) => {
        setDayStates(res.dayStates);
        initialTimeLine(res.dayStates);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  return dayStates.length > 0 ? (
    <div
      className="medicine-sheet"
      id="medicineSheet"
      style={{
        overflow: 'hidden',
        maxHeight: `${dayStates.length * 58 + 100}px`,
      }}
    />
  ) : (
    <div className="no-medicine-sheet">
      <ExclamationCircleOutlined />
      患者当前暂无服药信息
    </div>
  );
}

export default MedicineSheet;
