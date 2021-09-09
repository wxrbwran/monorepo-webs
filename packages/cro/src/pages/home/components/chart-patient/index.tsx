import React, { useEffect, useState } from 'react';
import './index.scss';

interface IProps {
  data: IData[]
}
interface IData {
  projectName: string;
  count: number;
}

function ChartProject({ data }: IProps) {
  useEffect(() => {
    var myChart2 = echarts.init(document.getElementById('chart-patient'));
    if (data.length > 0) {
      const option = getOption(data);
      myChart2.setOption(option)
    }
  }, [data])

  const getOption = (data: IData[]) => {
    let xData: string[] = [];
    let seriesData1: number[] = [];
    let seriesData2: number[] = [0];
    data.forEach(item => {
      xData.push(item.projectName);
      seriesData1.push(item.count);
    })
    for (let i = 0; i < seriesData1.length - 2; i++) {
      seriesData2.push(seriesData1[i] + seriesData2[i])
    }
    seriesData2.push(0);
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
          var tar = params[1];
          return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        },
        textStyle: {
          fontSize: 12,
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '13%',
        top: '5%',
        containLabel: true
      },

      xAxis: {
        type: 'category',
        splitLine: { show: false },
        data: xData,
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#000'
          },
          interval: 0,
          rotate: seriesData1.length > 4 ? 20 : 0,
          formatter: function (params: string) {   //标签输出形式 ---请开始你的表演
            var index = 6;
            var newstr = params;
            if (params.length > 8)
              return newstr.substring(0, 8) + '...';
            else
              return newstr;
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          textStyle: {
            color: '#8B8B8B'
          },

        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      series: [
        {
          name: '辅助',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
          },
          emphasis: {
            itemStyle: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            }
          },
          data: seriesData2
        },
        {
          name: '项目人次',
          type: 'bar',
          stack: '总量',
          data: seriesData1,
          barMaxWidth: 35,
          itemStyle: {
            normal: {
              color: function (params: {name: string}) {
                console.log(789789789, params)
                return params.name === '受试者总人次' ? '#8C8C8C' : '#1B90FF'
              },
            }
          },
        },
      ],
      dataZoom: [{
        zoomLock: true,
        type: 'slider',
        show: data.length > 9,
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
        height: 12
      }],
    };
    return option;
  }

  return (
    <div className='chart-patient-wrap'>
      <div id="chart-patient" style={{ width: '100%', height: 400 }}></div>
      <div className="legend">
        <div><span></span>各项目人数</div>
        <div><span></span>受试者总人数</div>
      </div>
    </div>
  )
}
export default ChartProject;
