import React, { useEffect, useRef } from 'react';

interface IProps {
  data: IData[];
  id: string;
}
interface IData {
  name: string;
  value: number;
}

function ChartImReplyRate(props: IProps) {
  const { data } = props;
  console.log(data);
  const timer = useRef<any>();
  const chartResize = useRef(() => {});
  const dateList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Thu1', 'Fri2', 'Sat1', 'Sun1'];
  const getOption = () => {
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: { //底部图例
        type: 'scroll',
        data: ['李医生', '李医生1', '李医生2', '李医生3', '李医生22'],
        bottom: 0,
      },
      grid: {
        left: '0%',
        right: '3%',
        bottom: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data:dateList,
        axisLabel: {
          rotate: dateList.length > 4 ? 20 : 0,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} %',
        },
      },
      series: [
        {
          name: '李医生',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210, 134, 90, 230, 210],
        },
        {
          name: '李医生1',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310, 134, 90, 230, 210],
        },
        {
          name: '李医生2',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410, 134, 90, 230, 210],
        },
        {
          name: '李医生3',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320, 134, 90, 230, 210],
        },
        {
          name: '李医生22',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320, 134, 90, 230, 210],
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
      const myChart = echarts.init(document.getElementById('imgReplyRate'));
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
    <div id="imgReplyRate" style={{ width: '90%', height: 430, margin: '0 auto' }}></div>
  );
}
export default ChartImReplyRate;
