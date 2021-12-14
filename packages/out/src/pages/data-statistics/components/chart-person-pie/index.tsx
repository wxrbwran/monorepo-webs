import React, { useEffect } from 'react';
import styles from './index.scss';

interface IProps {
  data: IData[];
  id: string;
  handleChangeShowDoctor?: (curDepId: string) => void;
}
interface IData {
  name: string;
  value: number;
  id: string;
}

function ChartPersonPie(props: IProps) {
  const { data, id, handleChangeShowDoctor } = props;
  let myChart: any = null;
  const color = ['#72ADFF', '#51D9C8', '#FFCD88', '#FD8684', '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
  const getOption = () => {
    const option = {
      tooltip: {
        trigger: 'item',

      },
      color,
      series: [
        {
          name: id === 'patient' ? '患者数' : '医生数',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          showEmptyCircle: true,
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          data,
        },
      ],
    };
    return option;
  };
  useEffect(() => {
    if (myChart === null) {
      myChart = echarts.init(document.getElementById(id));
      myChart.setOption(getOption());
      if (id === 'im' && handleChangeShowDoctor) {
        myChart.on('click', (param: { data: { id: string } }) => {
          handleChangeShowDoctor(param.data?.id);
        });
      }
    } else {
      myChart.setOption(getOption());
    }
  }, [data]);

  return (
    <div className={styles.pie_chart}>
      <div className='flex justify-center flex-wrap px-30'>
        {
          data.map((item, inx) => (
            <div className={styles.legend_item} key={item.name + item?.id}>
              <span className={styles.color} style={{ background: color[inx] }}></span>
              <span>{item.name}</span>
            </div>
          ))
        }
      </div>
     <div id={id} style={{ width: 235, height: 235, margin: '0 auto' }}></div>
    </div>
  );
}
export default ChartPersonPie;
