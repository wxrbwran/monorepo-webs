import React from 'react';
import { Badge } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { history, getDvaApp } from 'umi';
import dayjs from 'dayjs';
import { sexList } from '@/utils/tools';

export interface IRecord {
  sid: string;
  recordCount: number;
  imageCount: number;
}
const patientPage = (record: IRecord, actionType?: string) => {
  console.log('跳转', record, actionType);
  const {
    wcId, sid, department, imageCount, issueCount, avatarUrl, name,
  } = record;
  window.$storage.setItem('patientWcId', wcId);
  window.$storage.setItem('patientSid', sid);
  window.$storage.setItem('patientName', name);
  // eslint-disable-next-line no-underscore-dangle
  getDvaApp()._store.dispatch({
    type: 'currentPatient/saveDeparment',
    payload: department,
  });
  // eslint-disable-next-line no-underscore-dangle
  getDvaApp()._store.dispatch({
    type: 'currentPatient/savePatientDetails',
    payload: {
      actionType,
      imageCount,
      issueCount,
      name,
      avatarUrl,
    },
  });
  history.push(`/patient_panel/${record.sid}`);
  window.$storage.setItem('recordCount', record.recordCount);
};

export const name = {
  title: '姓名',
  dataIndex: 'name',
  render: (data: string, record: IRecord) => (
    <div onClick={() => patientPage(record)} className="cursor-pointer">
      {data}
    </div>
  ),
};
export const tel = {
  title: '手机号',
  dataIndex: 'tel',
};
export const sex = {
  title: '性别',
  dataIndex: 'sex',
  render: (text: string) => <span>{sexList[text] || '保密' }</span>,
};
export const org = {
  title: '机构',
  dataIndex: 'orgName',
};
export const dep = {
  title: '科室',
  dataIndex: 'depName',
};
export const checked = {
  title: '建档',
  dataIndex: 'recordCount',
  render: (data: boolean, record: IRecord) => (
    <div onClick={() => patientPage(record)} className="cursor-pointer" style={{ color: data ? '#000' : '#d48f94' }}>
      {data ? '需要建档' : '无建档请求'}
    </div>
  ),
};
export const imgCount = {
  title: '图片审核',
  dataIndex: 'imgCount',
  render: (_data: number, record: IRecord) => {
    let color = '#000';
    if (record.imageCount) {
      color = '#f56a00';
    }
    return (
      <Badge
        count={record.imageCount}
        style={{ backgroundColor: color as string }}
      >
        <span style={{ color: color as string }}>
          <PictureOutlined
            className="cursor-pointer"
            onClick={() => patientPage(record)}
            // onClick={() => patientPage(record, 'pic')}
          />
        </span>
      </Badge>
    );
  },
};
export const createTime = {
  title: '工单生成时间',
  dataIndex: 'createdAt',
  render: (text: string) => <span>{(text && dayjs(text).format('YYYY-MM-DD')) || '--'}</span>,
};
