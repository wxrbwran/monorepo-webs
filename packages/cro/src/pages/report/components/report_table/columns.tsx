import React from 'react';
import EndEvent from '../end_event';
import Normal from '../normal';
import ImgViewer from '../img_viewer';
import ScaleModal from '../../../subjective_table/components/already_reply_table';
import { dataSource } from './const';
export const columns1 = [
  {
    title: '基本资料',
    children: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'BMI',
        dataIndex: 'bmi',
        key: 'bmi',
      },
    ],
  },
  {
    title: '化验单',
    children: [
      {
        title: '血常规',
        dataIndex: 'xcg',
        key: 'xcg',
      },
      {
        title: '生化全项',
        dataIndex: 'shqx',
        key: 'shqx',
        // render: (text: string, record: any) => (
        //   <ImgViewer><span>{text}</span></ImgViewer>
        // ),
      },
      {
        title: '尿常规',
        dataIndex: 'ncg',
        key: 'ncg',
      },
      {
        title: '便常规',
        dataIndex: 'bcg',
        key: 'bcg',
      },
    ],
  },
  {
    title: '常用指标',
    children: [
      {
        title: '心率',
        dataIndex: 'heart',
        key: 'heart',
        render: (text: string, record: any) => (
          <Normal>
            <span>{text}</span>
          </Normal>
        ),
      },
      {
        title: '血糖',
        children: [
          {
            title: '空腹',
            dataIndex: 'kf',
            key: 'kf',
            width: 100,
          },
          {
            title: '早餐前',
            dataIndex: 'before',
            key: 'before',
            width: 100,
          },
          {
            title: '早餐后',
            dataIndex: 'behind',
            key: 'behind',
            width: 100,
          },
        ],
      },
    ],
  },
  {
    title: '主观量表',
    children: [
      {
        title: '主观量表1',
        dataIndex: 'scale1',
        key: 'scale1',
        render: (text: string, record: any) => (
          <ScaleModal scaleInfos={dataSource}>
            <span>{text}</span>
          </ScaleModal>
        ),
      },
      {
        title: '主观量表2',
        dataIndex: 'scale2',
        key: 'scale2',
      },
    ],
  },
  {
    title: '终点事件',
    children: [
      {
        title: '主要终点事件',
        dataIndex: 'main',
        key: 'main',
        // render: (text: string, record: any) => (
        //   <EndEvent>
        //     <span>{text}</span>
        //   </EndEvent>
        // ),
      },
      {
        title: '次要终点事件',
        dataIndex: 'second',
        key: 'second',
      },
    ],
  },
];
export const columns2 = [
  {
    title: '基本资料',
    children: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'BMI',
        dataIndex: 'bmi',
        key: 'bmi',
      },
    ],
  },
  {
    title: '常用指标',
    children: [
      {
        title: '心率',
        dataIndex: 'heart',
        key: 'heart',
        render: (text: string, record: any) => (
          <Normal>
            <span>{text}</span>
          </Normal>
        ),
      },
      {
        title: '血糖',
        children: [
          {
            title: '空腹',
            dataIndex: 'kf',
            key: 'kf',
            width: 100,
          },
          {
            title: '早餐前',
            dataIndex: 'before',
            key: 'before',
            width: 100,
          },
          {
            title: '早餐后',
            dataIndex: 'behind',
            key: 'behind',
            width: 100,
          },
        ],
      },
    ],
  },
  {
    title: '检查单',
    children: [
      {
        title: '心脏超声',
        dataIndex: 'xcg',
        key: 'xcg',
      },
      {
        title: '心电图',
        dataIndex: 'shqx',
        key: 'shqx',
        // render: (text: string, record: any) => (
        //   <ImgViewer><span>{text}</span></ImgViewer>
        // ),
      },
      {
        title: '冠造',
        dataIndex: 'ncg',
        key: 'ncg',
      },
      {
        title: '心肺运动',
        dataIndex: 'bcg',
        key: 'bcg',
      },
    ],
  }
];
export const columns3 = [
  {
    title: '基本资料',
    children: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'BMI',
        dataIndex: 'bmi',
        key: 'bmi',
      },
    ],
  },
  {
    title: '常用指标',
    children: [
      {
        title: '心率',
        dataIndex: 'heart',
        key: 'heart',
        render: (text: string, record: any) => (
          <Normal>
            <span>{text}</span>
          </Normal>
        ),
      },{
        title: '总胆固醇',
        dataIndex: 'heart',
        key: 'heart',
      }
    ],
  },
  {
    title: '检查单',
    children: [
      {
        title: '心脏超声',
        dataIndex: 'xcg',
        key: 'xcg',
      },
      {
        title: '心电图',
        dataIndex: 'shqx',
        key: 'shqx',
        // render: (text: string, record: any) => (
        //   <ImgViewer><span>{text}</span></ImgViewer>
        // ),
      },
      {
        title: '冠造',
        dataIndex: 'ncg',
        key: 'ncg',
      },
      {
        title: '心肺运动',
        dataIndex: 'bcg',
        key: 'bcg',
      },
    ],
  },
  {
    title: '主观量表',
    children: [
      {
        title: '主观量表1',
        dataIndex: 'scale1',
        key: 'scale1',
        render: (text: string, record: any) => (
          <ScaleModal scaleInfos={dataSource}>
            <span>{text}</span>
          </ScaleModal>
        ),
      },
      {
        title: '主观量表2',
        dataIndex: 'scale2',
        key: 'scale2',
      },
    ],
  }
];
