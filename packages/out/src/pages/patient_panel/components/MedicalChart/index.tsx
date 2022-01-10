import React, { useState } from 'react';
import { useLocation } from 'umi';
import dayjs from 'dayjs';
import * as api from '@/services/api';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import './index.scss';

interface Iprops {
  data: {
    measuredAt: number;
    abbreviation: string;
    name: string;
  };
}
function MedicalChart({ data }: Iprops) {
  const [showModal, setShowModal] = useState(false);
  const { abbreviation, measuredAt, name } = data;
  const sid = useLocation().query.patientSid;

  const initialChart = (chartData) => {
    const container = document
      .querySelector(`.${abbreviation}chart`);
    const myChart = window.echarts.init(container);
    const datas = chartData.map((i) => {
      i.dataList.sort((a, b) => a.measuredAt - b.measuredAt);
      return i;
    });
    const xArr = datas[0].dataList.map((item) => item.measuredAt);
    const { unit } = chartData[0];
    const options = {
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const labelTime = dayjs(+(params[0].axisValue)).format('YYYY.MM.DD');
          let labelContent;
          if (params[0].seriesName === '血压') {
            console.log('params[0]', params[0]);
            labelContent = `${labelTime}<br/>${params[0].seriesName}:
              ${params[1].value}/${params[0].value}${unit}`;
          } else {
            labelContent = `${labelTime}<br/>${params[0]
              .seriesName}: ${params[0].value}${unit}`;
          }
          return labelContent;
        },
      },
      xAxis: {
        type: 'category',
        show: true,
        splitLine: { show: false },
        boundaryGap: false,
        data: xArr,
        axisLabel: {
          formatter(value: number) {
            return dayjs(+value).format('YYYY-MM-DD');
          },
        },
      },
      yAxis: {
        type: 'value',
        name: `${name}(${unit})`,
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#eee',
          },
        },
      },
      dataZoom: [{
        startValue: dayjs(+xArr[0]).format('YYYY-MM-DD'),
        // endValue: dayjs().format('YYYY-MM-DD'),
      }, {
        type: 'inside',
      }, {
        showDetail: false,
      }],
      visualMap: {
        show: false,
        dimensions: 1,
        pieces: [],
        outOfRange: { color: '#999' },
      },
      series: datas.map((item) => {
        const yMin = item.reference.customizedStandardMin;
        const yMax = item.reference.customizedStandardMax;
        const seriesData = {
          name,
          type: 'line',
          data: item.dataList.map((dataItem) => dataItem.value),
          markLine: {
            silent: true,
            itemStyle: {
              normal: {
                borderWidth: 1,
                lineStyle: {
                  type: 'diamond',
                  color: 'orange',
                },
              },
            },
            data: [
              { yAxis: yMin },
              { yAxis: yMax },
            ],
          },
          markArea: {
            data: [
              [{
                x: '0%',
                yAxis: yMin,
              }, {
                x: '100%',
                yAxis: yMax,
              }],
            ],
            itemStyle: { color: ['rgba(99, 205, 156, .1)'] },
          },
        };
        return seriesData;
      }),
    };
    datas.forEach((item) => {
      const standardMin = item.reference.customizedStandardMin;
      const standardMax = item.reference.customizedStandardMax;
      options.visualMap.pieces.push({
        gt: 0,
        lte: standardMin,
        color: '#45a8fb',
      }, {
        gt: standardMin,
        lte: standardMax,
        color: '#64cd9c',
      }, {
        gt: standardMax,
        color: '#ee9447',
      });
    });
    myChart.setOption(options);
  };

  const handleShowChart = (type?: string) => {
    setShowModal(true);
    const params = {
      sid,
      wcId: window.$storage.getItem('patientWcId'),
      indexType: type || abbreviation,
    };
    api.medical.fetchMedicalIndex(params).then((res) => {
      if (name === '血压') {
        const { indexList } = res;
        indexList.shift();
        initialChart(indexList);
      } else {
        initialChart(res.indexList);
      }
    });
  };

  return (
    <>
      <span className="date" onClick={() => handleShowChart()}>
        {`(${dayjs(measuredAt).format('MM.D')})`}
      </span>
      <DragModal
        title={`${name}记录`}
        width="1000px"
        wrapClassName="ant-modal-wrap-center"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        maskClosable
      >
        <div
          className={`${abbreviation}chart`}
          style={{ width: '900px', height: '500px' }}
        />
      </DragModal>
    </>
  );
}

export default MedicalChart;
