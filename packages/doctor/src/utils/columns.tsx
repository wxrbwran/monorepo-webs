import React from 'react';
import { message, Switch } from 'antd';
import config from '@/config';
import * as api from '@/services/api';
import moment from 'moment';

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
    <img src={text || config.defaultAvatar} style={{ width: 40, height: 40 }} alt="头像" />
  ),
};
export const clDepartment = {
  title: '科室',
  dataIndex: 'department',
  render: (text: { name: string }) => text.name,
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
      {text?.length === 0 || !text ? (
        <span className="unit no-units">无单位</span>
      ) : (
        text.map((item, index) => (
          <span key={item} className={index === 0 ? 'unit default' : 'unit'}>
            {item}
          </span>
        ))
      )}
    </>
  ),
};
export const indexAbbr = {
  title: '缩写',
  dataIndex: 'abbreviation',
  render: (text: string) => <div>{text || '--'}</div>,
};
const handleCommon = (common: boolean, editData: object, refreshList: () => void) => {
  const params = {
    ...editData,
    common,
  };
  api.indexLibrary
    .patchIndexDocumentIndex(params)
    .then(() => {
      message.success('修改成功');
      refreshList();
    })
    .catch((err) => {
      message.error(err?.result ?? '修改失败');
    });
};
export const indexCommon = (refreshList: () => void) => ({
  title: () => (
    <div>
      <span>是否常用</span>
      {/* <Tooltip title="是否是常用指标">
          <QuestionCircleFilled style={{ color: '#EDEDE' }} />
        </Tooltip> */}
    </div>
  ),
  dataIndex: 'common',
  render: (_text: boolean, record: any) => (
    <div className="table-operating">
      <Switch
        checkedChildren="是"
        unCheckedChildren="否"
        checked={_text}
        disabled={record.source === 'SYSTEM' || !!record.used}
        onChange={(e) => {
          handleCommon(e, record, refreshList);
        }}
      />
    </div>
  ),
});
export const indexSource = {
  title: '数据来源',
  dataIndex: 'source',
  render: (text: string) => <div>{text === 'DOCTOR' ? '自己添加' : '系统添加'}</div>,
};

export const patientName = {
  title: '姓名',
  dataIndex: 'name',
  width: 122,
};

export const sendAt = {
  title: '时间',
  dataIndex: 'sendTime',
  width: 236,
  render: (text: number) => <span>{moment(text).format('YYYY.MM.DD HH:mm')}</span>,
};

export const senderFileName = {
  title: '文件名称',
  dataIndex: 'fileName',
  render: (text: string[]) => <span>{text.join(' ')}</span>,
};
