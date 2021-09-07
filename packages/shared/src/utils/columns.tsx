import React from 'react';
import { defaultAvatar } from './consts';

export const columnCreator = (title: string, dataIndex: string, customRender = undefined) => {
  const column: CommonData = {
    title,
    dataIndex,
  };
  if (customRender) {
    column.render = customRender;
  }
  return column;
};
export const clName = columnCreator('姓名', 'name');
export const clTitle = columnCreator('职称', 'title');
export const clGoodsPrice = columnCreator('收费标准', 'goodsDescriptions');
export const indexName = columnCreator('指标名称', 'name');

export const clAvatar = {
  title: '头像',
  dataIndex: 'avatarUrl',
  render: (text: string) => (
    <img
      src={text || defaultAvatar}
      style={{ width: 40, height: 40 }}
      alt="头像"
    />
  ),
};
export const clDepartment = {
  title: '科室',
  dataIndex: 'department',
  render: (text: { name: string}) => text.name,
};
export const indexUnits = {
  title: () => (
    <div>
      <span>单位</span>
    </div>
  ),
  dataIndex: 'units',
  render: (text: string[]) => (
    <>
      {text?.length === 0 || !text ? <span className="unit no-units">无单位</span> : (
        text.map((item, index) => <span key={item} className={index === 0 ? 'unit default' : 'unit'}>{item}</span>)
      )}
    </>
  ),
};
export const indexAbbr = {
  title: '缩写',
  dataIndex: 'abbreviation',
  render: (text: string) => (
    <div>
      {text || '--'}
    </div>
  ),
};

export const indexSource = {
  title: '数据来源',
  dataIndex: 'source',
  render: (text: string) => (
    <div>{text === 'DOCTOR' ? '自己添加' : '系统添加'}</div>
  ),
};
