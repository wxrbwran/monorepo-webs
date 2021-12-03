import React, { useEffect, useRef } from 'react';

interface IProps {
  data: IData[];
  id: string;
}
interface IData {
  name: string;
  value: number;
}

function ChartFollowUpRate(props: IProps) {
  const { data } = props;
  console.log('data', data);
  const timer = useRef<any>();
  const chartResize = useRef(() => {});
  const dateList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
        // formatter:function (params){
        //   var relVal = params[0].name;
        //   for (var i = 0, l = params.length; i < l; i++) {
        //     relVal += '<br/>' + params[i].seriesName + ' : ' + params[i].value;
        //     if (params[i].seriesName === '回复率') {
        //       relVal += '%';
        //     }
        //   }
        //   return relVal;
        // },
      },
      legend: {
        data: ['收到消息数', '发送消息数', '回复率'],
        bottom: 0,
      },
      xAxis: [
        {
          type: 'category',
          data: dateList,
          axisPointer: {
            type: 'shadow',
          },
          axisLabel: {
            rotate: dateList.length > 4 ? 20 : 0,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: 250,
          interval: 50,
        },
        {
          type: 'value',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} %',
          },
        },
      ],
      series: [
        {
          name: '收到消息数',
          type: 'bar',
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
          ],
        },
        {
          name: '发送消息数',
          type: 'bar',
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
          ],
        },
        {
          name: '回复率',
          type: 'line',
          yAxisIndex: 1,
          axisLabel: {
            formatter: '{value} %',
          },
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
        },
      ],
      dataZoom: [{
        zoomLock: true,
        brushSelect: false, // 是否开启刷选功能，绽放滚动条
        type: 'slider',
        show: dateList.length > 5,
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
    timer.current = setTimeout(() => {
      const myChart = echarts.init(document.getElementById('followUpRate'));
      myChart.setOption(getOption());
      chartResize.current = () => {myChart.resize(); };
      window.addEventListener('resize', chartResize.current);
    }, 300);
    return () => {
      clearTimeout(timer.current);
      window.removeEventListener('resize', chartResize.current);
    };
  }, []);

  return (
    <div id="followUpRate" style={{ width: '90%', height: 430, margin: '0 auto' }}></div>
  );
}
export default ChartFollowUpRate;
