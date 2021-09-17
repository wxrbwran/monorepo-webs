import React, { useEffect, useState } from 'react';

interface IProps {
  data: IData[];
}
interface IData {
  projectName: string;
  ratio: number;
}

function ChartProject({ data }: IProps) {
  const [isXAxisTipShow, setIsXAxisTipShow] = useState(false);
  const getOption = (datas: IData[]) => {
    const yData: string[] = [];
    const seriesData: number[] = [];
    datas.forEach((item) => {
      yData.push(item.projectName);
      seriesData.push(item.ratio);
    });
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        textStyle: {
          fontSize: 12,
        },
      },
      grid: {
        left: '3%',
        right: '10%',
        bottom: '3%',
        top: '1%',
        containLabel: true,
      },
      xAxis: {
        show: false,
      },

      yAxis: {
        type: 'category',
        data: yData,
        triggerEvent: true,
        axisLine: {
          lineStyle: {
            color: '#ccc',
          },
        },
        axisLabel: {
          textStyle: {
            color: 'rgba(0,0,0,.65)',
          },
          interval: 0,
          formatter(params: string) {
            // 标签输出形式 ---请开始你的表演
            const newstr = params;
            if (params.length > 9) return `${newstr.substring(0, 9)}...`;
            return newstr;
          },
        },
      },
      dataZoom: [
        {
          zoomLock: true,
          type: 'slider',
          show: datas.length > 9,
          yAxisIndex: 0,
          filterMode: 'none',
          right: '0',
          top: 0,
          bottom: 0,
          startValue: 0,
          endValue: 8,
          fillerColor: '#d9d9d9',
          borderColor: '#f1f1f1',
          showDetail: false,
          backgroundColor: '#f1f1f1',
          showDataShadow: false,
          width: 10,
          height: '98%',
        },
      ],
      series: [
        {
          name: '项目进度',
          type: 'bar',
          data: seriesData,
          barMaxWidth: 30,
          itemStyle: {
            normal: {
              color: '#1B90FF',
              label: {
                show: true,
                position: 'right',
                color: '#8B8B8B',
                formatter: '{c}%',
              },
            },
          },
        },
      ],
    };
    return option;
  };
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('main'));
    if (data.length > 0) {
      const option = getOption(data);
      myChart.setOption(option);
      myChart.on('mouseover', { element: 'main' }, (params) => {
        console.log(params);
        if (params.componentType === 'yAxis' && params.value.length > 9) {
          const { clientX, clientY } = params.event.event;
          const xAxisTip = document.querySelectorAll<HTMLDivElement>('.x-axis-tip');
          for (let i = 0; i < xAxisTip.length; i++) {
            const current: HTMLDivElement = xAxisTip[i];
            current.innerText = params.value;
            setIsXAxisTipShow(true);
            current.style.left = `${clientX + document.documentElement.scrollLeft - 30}px`;
            current.style.top = `${clientY + document.documentElement.scrollTop + 10}px`;
          }
        }
      });
      myChart.on('mouseout', { element: 'main' }, () => {
        setIsXAxisTipShow(false);
      });
    }
  }, [data]);

  return (
    <div>
      <div id="main" style={{ width: '100%', height: 400 }}></div>
      <div
        className="x-axis-tip fixed bg-white text-blank text-xs shadow-md p-3"
        style={{ display: isXAxisTipShow ? 'block' : 'none' }}
      />
    </div>
  );
}
export default ChartProject;
