import type { FC } from 'react';
import React from 'react';
import { Select, Form } from 'antd';

export const provinces = [
  {
    id: 1,
    regionName: '北京',
  },
  {
    id: 2,
    regionName: '上海',
  },
  {
    id: 3,
    regionName: '天津',
  },
  {
    id: 4,
    regionName: '重庆',
  },
  {
    id: 5,
    regionName: '江苏',
  },
  {
    id: 6,
    regionName: '广东',
  },
  {
    id: 7,
    regionName: '山东',
  },
  {
    id: 8,
    regionName: '辽宁',
  },
  {
    id: 9,
    regionName: '河北',
  },
  {
    id: 10,
    regionName: '河南',
  },
  {
    id: 11,
    regionName: '四川',
  },
  {
    id: 12,
    regionName: '黑龙江',
  },
  {
    id: 13,
    regionName: '山西',
  },
  {
    id: 14,
    regionName: '湖北',
  },
  {
    id: 15,
    regionName: '湖南',
  },
  {
    id: 17,
    regionName: '陕西',
  },
  {
    id: 18,
    regionName: '浙江',
  },
  {
    id: 21,
    regionName: '云南',
  },
  {
    id: 22,
    regionName: '吉林',
  },
  {
    id: 25,
    regionName: '安徽',
  },
  {
    id: 26,
    regionName: '广西',
  },
  {
    id: 27,
    regionName: '江西',
  },
  {
    id: 28,
    regionName: '福建',
  },
  {
    id: 29,
    regionName: '新疆',
  },
  {
    id: 30,
    regionName: '内蒙古',
  },
  {
    id: 31,
    regionName: '甘肃',
  },
  {
    id: 32,
    regionName: '贵州',
  },
  {
    id: 33,
    regionName: '海南',
  },
  {
    id: 34,
    regionName: '青海',
  },
  {
    id: 35,
    regionName: '宁夏',
  },
  {
    id: 36,
    regionName: '西藏',
  },
  {
    id: 4000,
    regionName: '香港',
  },
  {
    id: 4001,
    regionName: '澳门',
  },
  {
    id: 4002,
    regionName: '台湾',
  },
];

const { Option } = Select;
const { Item } = Form;
const Province: FC = () => (
  <Item noStyle name="province">
    <Select placeholder="选择地区">
      <Option value="all">全部地区</Option>
      {provinces.map((val: any) => (
        <Option key={val.id} value={val.id.toString()} title={val.regionName}>
          {val.regionName}
        </Option>
      ))}
    </Select>
  </Item>
);
export default Province;
