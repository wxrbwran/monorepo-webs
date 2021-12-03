import React, { useEffect } from 'react';
import styles from './index.scss';

interface IProps {
  data: IData[];
  id: string;
}
interface IData {
  name: string;
  value: number;
}

function ChartPersonPie(props: IProps) {
  const { data, id } = props;
  const color = ['#72ADFF', '#51D9C8', '#FFCD88', '#FD8684', '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
  const getOption = (datas: IData[]) => {
    const option = {
      tooltip: {
        trigger: 'item',
      },
      color,
      series: [
        {
          name: '医生数',
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
          data: datas,
        },
      ],
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    };
    return option;
  };
  useEffect(() => {
    const myChart = echarts.init(document.getElementById(id));
    const option = getOption(data);
    myChart.setOption(option);
  }, []);

  return (
    <div className={styles.pie_chart}>
      <div className='flex jusitify-center flex-wrap px-30'>
        {
          data.map((item, inx) => (
            <div className={styles.legend_item} key={item.name}>
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
