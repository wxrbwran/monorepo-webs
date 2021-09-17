import React, {useEffect, useState} from 'react';
import { setServers } from 'dns';

interface IProps {
  data: IData[]
}
interface IData {
  projectName: string;
  ratio: number;
}

function ChartProject({ data }: IProps) {
  useEffect(() => {
    var myChart = echarts.init(document.getElementById('main'));
    if(data.length > 0) {
      const option = getOption(data);
      myChart.setOption(option)
    }
  }, [data])
  const getOption = (data: IData[]) => {
    let yData:string[] = [];
    let seriesData:number[] = [];
    data.forEach(item => {
      console.log('item,', item)
      yData.push(item.projectName);
      seriesData.push(item.ratio);
    })
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
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
        containLabel: true
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        type: 'category',
        data: yData,
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#8B8B8B'
          },
          interval: 0,
          formatter: function (params: string) {   //标签输出形式 ---请开始你的表演
            var index = 6;
            var newstr = params;
            if (params.length > 12)
              return newstr.substring(0, 12) + '...';
            else
              return newstr;
          }
        },

      },
      series: [
        {
          name: '项目进度',
          type: 'bar',
          data: seriesData,
          itemStyle: {
            normal: {
              color: '#1B90FF',
              label: {
                show: true,
                position: 'right',
                color: '#8B8B8B',
                formatter: '{c}%',
              }
            }
          },

        },
      ],
      dataZoom: [{
        zoomLock: true,
        type: 'slider',
        show: data.length > 9,
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
        width: 12,
        height: '91%'
      }],

    };
    return option;
  }

  return (
    <div>
      <div id="main" style={{ width: '100%', height: 400 }}></div>
    </div>
  )
}
export default ChartProject;
