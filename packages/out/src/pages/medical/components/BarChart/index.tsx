import React, { useEffect } from 'react';

interface IProps {
  data: IData[],
  title: string
}
interface IData {
  name: string;
  ratio: number;
}

function ChartBar({ data, title }: IProps) {
  // 计算坐标轴显示的最大值
  const max = Math.max.apply(null, data.map(item => item.ratio));
  let showMax: number | null = null;
  const bgData: (number | null)[]=[];
  const { length } = `${max}`;
  const firstNo = +`${max}`[0];
  if (max >= 0 && max <= 8 ) {
    showMax = 8;
  } else if (max > 8 && max <= 40) {
    showMax = 40;
  } else if (max > 40 && max <= 100) {
    showMax = 100;
  } else if (max > 100 && firstNo === 1 && max === firstNo * 10 ** (length - 1)) {
    showMax = max;
  } else {
    showMax = (firstNo + 1) * 10 ** (length - 1);
  }
  // 背景柱子的值
  data.forEach(() => {
    bgData.push(showMax)
  })
  const option = {
    xAxis: {
        type: 'category',
        data: data.map(item => item.name),
        axisTick: { // 刻度线
            show: false,
        },
        axisLabel: {
            textStyle: {
              color: '#1E2432',
              fontSize: 14,
            },
        },
    },
    yAxis: {
        type: 'value',
        min: 0,
        max: showMax,
        interval: showMax / 4,
        splitLine: {
            lineStyle: {
              color: ['#e9e9e9'],
              width: 1,
            },
        },
        axisLabel: {
            textStyle: {
              color: '#1E2432',
              fontSize: 14,
            },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
    },
    series: [{
        data: data.map(item => item.ratio),
        type: 'bar',
        barMaxWidth: 57,
        showBackground: true, // 新版本支持此方法设置柱子背景色，不用再使用barGap
        backgroundStyle: {
            color: '#eee'
        },
        itemStyle: {
          normal: {
            color: '#1B90FF',
            label: {
              show: true,
              position: 'top',
              color: '#3588FD',
              formatter: '{c}%',
            }
          }
        },
    }]
};

useEffect(() => {
  const myChart = echarts.init(document.getElementById('main'));
  if(data.length > 0) {
    myChart.setOption(option)
  }
}, [data])

  return (
    <div>
      <p className="text-lg">{title}</p>
      <div id="main" style={{ width: '100%', height: 600 }}></div>
    </div>
  )
}
export default ChartBar;
