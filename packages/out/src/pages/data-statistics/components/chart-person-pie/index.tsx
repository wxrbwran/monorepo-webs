import React, { useEffect, useState } from 'react';
import { DoubleRightOutlined } from '@ant-design/icons';
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
  const [open, setopen] = useState(false);
  console.log('dat3232a', data);
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
      if (data.length > 0) {
        // 默认高亮
        const vals = data.map(item => item.value);
        let index = vals.indexOf(Math.max(...vals)); // 高亮索引
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index,
        });
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index,
        });
        myChart.on('mouseover', function (e) {
          if (e.dataIndex != index) {
            myChart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: index,
            });
          }
        });
        myChart.on('mouseout', function (e) {
          index = e.dataIndex;
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: e.dataIndex,
          });
        });
      }

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
      <div
        className={`flex justify-center flex-wrap px-30 ${styles.dep_list}`}
        style={{ height: open ? 'auto' : '24px' }}
      >
        {
          data.map((item, inx) => (
            <div className={styles.legend_item} key={item.name + item?.id}>
              <span className={styles.color} style={{ background: color[inx] }}></span>
              <span>{item.name}</span>
            </div>
          ))
        }
      </div>
      {
        data.length > 0 && (
          <DoubleRightOutlined
            style={{ transform: `rotate(${open ? -90 : 90 }deg)` }}
            onClick={() => setopen(prev => !prev)}
          />
        )
      }

     <div id={id} style={{ width: 235, height: 235, margin: '0 auto' }}></div>
    </div>
  );
}
export default ChartPersonPie;
