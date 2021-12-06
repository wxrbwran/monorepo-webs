import React, { useEffect, useRef } from 'react';

export interface IChartProps {
  xAxisData: string[];
  legendData: string[];
  seriesData: {
    name: string;
    type: string;
    data: number[];
  }[];
}

function ChartImReplyRate(props: IProps) {
  const { xAxisData, legendData, seriesData } = props;
  console.log('====21=21', props);
  const chartResize = useRef(() => {});
  let myChart: any = null;
  // const xAxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  // const legendData = ['李医生', '张医生'];
  // const seriesData = [
  //   { name: '李医生', type: 'line', data: [120, 132, 101, 134, 90] },
  //   { name: '张医生', type: 'line', data: [220, 182, 191, 234, 290] },
  //   // stack: 'Total', ,
  // ];
  const getOption = () => {
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: { //底部图例
        type: 'scroll',
        data: legendData,
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data:xAxisData,
        axisLabel: {
          rotate: 30,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} %',
        },
      },
      series: seriesData,
      dataZoom: [{
        zoomLock: true,
        brushSelect: false, // 是否开启刷选功能，绽放滚动条
        type: 'slider',
        show: xAxisData.length > 5,
        xAxisIndex: 0,
        filterMode: 'none',
        // right: '0',
        left: 50,
        bottom: 40,
        startValue: 0,
        endValue: 8,
        fillerColor: '#d9d9d9',
        borderColor: '#f1f1f1',
        showDetail: false,
        backgroundColor: '#f1f1f1',
        showDataShadow: false,
        // width: 10,
        height: 12,
      }],
    };
    return option;
  };

  useEffect(() => {

  }, []);
  useEffect(() => {
    if (myChart === null) {
      myChart = echarts.init(document.getElementById('imgReplyRate'));
      myChart.setOption(getOption());
      chartResize.current = () => {myChart.resize(); };
      window.addEventListener('resize', chartResize.current);
    } else {
      myChart.setOption(getOption());
    }
    return () => {
      window.removeEventListener('resize', chartResize.current);
    };
  }, [props]);

  return (
    <div id="imgReplyRate" style={{ width: '90%', height: 430, margin: '0 auto' }}></div>
  );
}
export default ChartImReplyRate;
