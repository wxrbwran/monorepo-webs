import React, { useEffect } from 'react';

interface IProps {
  id: string;
  chartData: {
    value: number;
    name: string;
  }[]
}
// interface IData {
//   name: string;
//   value: number;
// }

function ChartPatientPie(props: IProps) {
  const { id, chartData } = props;
  const getOption = () => {
    const option = {
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: '患者数据',
          type: 'pie',
          radius: '50%',
          data: chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
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
    const option = getOption();
    myChart.setOption(option);
  }, []);

  return (
    <div id={id} style={{ width: '100%', height: 328, margin: '0 auto' }}></div>
  );
}
export default ChartPatientPie;
