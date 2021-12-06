import React, { useEffect } from 'react';

interface IProps {
  id: string;
  chartTit: string;
  chartData: {
    value: number;
    name: string;
  }[]
}

function ChartPatientPie(props: IProps) {
  const { id, chartData, chartTit } = props;
  let myChart: any = null;
  const getOption = () => {
    const option = {
      title: {
        text: chartTit,
        left: 'center',
        bottom: 30,
        textStyle: {
          color: '#000',
          fontSize: 14,
          fontWeight: 'normal',
        },
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: '患者数量',
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
    console.log('chartData', chartData);
    if (myChart === null) {
      myChart = echarts.init(document.getElementById(id));
      myChart.setOption(getOption());
    } else {
      myChart.setOption(getOption());
    }
  }, [chartData]);

  return (
    <div id={id} style={{ width: '100%', height: 328, margin: '0 auto' }}></div>
  );
}
export default ChartPatientPie;
