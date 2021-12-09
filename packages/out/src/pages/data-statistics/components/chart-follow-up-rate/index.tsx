import React, { useEffect, useRef } from 'react';

export interface ISfChartProps {
  seriesData: {
    name: string;
    type: string;
    data: number[];
  };
  xAxisData: string[];
}
function ChartFollowUpRate(props: ISfChartProps) {
  const { seriesData, xAxisData } = props;
  // console.log('data', data);
  const chartResize = useRef(() => {});
  let myChart: any = null;
  // const xAxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // const seriesData = [
  //   {
  //     name: '收到消息数',
  //     type: 'bar',
  //     data: [ 2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6],
  //   },
  //   {
  //     name: '发送消息数',
  //     type: 'bar',
  //     data: [ 2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6 ],
  //   },
  //   {
  //     name: '回复率',
  //     type: 'line',
  //     yAxisIndex: 1,
  //     axisLabel: {
  //       formatter: '{value} %',
  //     },
  //     data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3],
  //   },
  // ];
  console.log('seriesData', seriesData);
  const getOption = () => {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
        formatter:function (params){
          var relVal = params[0].name;
          for (var i = 0, l = params.length; i < l; i++) {
            relVal += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'
            + params[i].color + '"></span>' + params[i].seriesName + ' : ' + params[i].value;
            if (params[i].seriesName === '随访率') {
              relVal += '%';
            }
          }
          return relVal;
        },
      },
      legend: {
        data: ['发送随访表数量', '回复的随访表数量', '随访率'],
        bottom: 0,
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData,
          axisPointer: {
            type: 'shadow',
          },
          axisLabel: {
            rotate: xAxisData.length > 4 ? 20 : 0,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: Math.max(...[...seriesData[0].data, ...seriesData[1].data]),
          interval: Math.max(...[...seriesData[0].data, ...seriesData[1].data]) / 5,
        },
        {
          type: 'value',
          min: 0,
          max: Math.max(...seriesData[2].data),
          interval: Math.max(...seriesData[2].data) / 5,
          axisLabel: {
            formatter: '{value} %',
          },
        },
      ],
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
      grid: {
        left: '3%',
        right: '3%',
        bottom: '10%',
        containLabel: true,
      },
    };
    return option;
  };
  useEffect(() => {
    if (myChart === null) {
      myChart = echarts.init(document.getElementById('followUpRate'));
      myChart.setOption(getOption());
      chartResize.current = () => {myChart.resize(); };
      window.addEventListener('resize', chartResize.current);
    } else {
      myChart.setOption(getOption());
    }
    return () => {
      window.removeEventListener('resize', chartResize.current);
    };
  }, [seriesData, xAxisData]);

  return (
    <div id="followUpRate" style={{ width: '90%', height: 430, margin: '0 auto' }}></div>
  );
}
export default ChartFollowUpRate;
