import React from 'react';
import { fetchRolePropValue } from 'xzl-web-shared/dist/utils/role';
import { eventList, exitReason } from '@/utils/consts';
import moment from 'moment';

import { sexList } from './consts';
import { Store } from 'antd/lib/form/interface';
import haveQuestionPng from '@/assets/img/have_question.png';


export type SexType = 'MALE' | 'FEMALE';
const statusObj: Store = {
  'NO_SEND': '未发送',
  'NO_CONFIRM': '未确认',
  'ADDED': '已加入',
  'REFUSED': '已拒绝',
  '1000': '待确认',
  '1001': '已拒绝',
  '1002': '进行中',
  '1003': '已结束',
};

export const name = {
  title: '姓名',
  dataIndex: 'name',
  width: 150,
  render: (text: string) => <span>{text}</span>,
};

export const age = {
  title: '年龄',
  dataIndex: 'age',
  width: 150,
};

export const sex = {
  title: '性别',
  dataIndex: 'sex',
  key: 'sex',
  width: 150,
  render: (text: SexType) => <span>{sexList[+text] || '--'}</span>,
};

export const address = {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
  render: (text: string) => text || '--',
};

export const status = {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render: (text: string) => <span>{statusObj[text]}</span>,
};

export const patientName = {
  title: '姓名',
  dataIndex: 'patientName',
  key: 'patientName',
};

export const patientStatus = {
  title: '患者状态',
  dataIndex: 'status',
  key: 'status',
  render: (_text: any, record: any) => (
    <div>
      {statusObj[`${record.status}`]}
    </div>
  ),
};

export const patientGroup = {
  title: '所在分组',
  dataIndex: 'groups',
  key: 'groups',
  render: (_text: any, record: any) => (
    <div>
      {record?.groups ? record.groups.map((item: string, index: number) => `${item} ${index !== record.groups.length - 1 ? '、' : ''}`) : '--'}
    </div>
  ),
};

export const inGroupAt = {
  title: '入组时间',
  dataIndex: 'timelines',
  key: 'timelines',
  render: (text: any, _record: any) => {

    const inTime = text ? text.filter((item) => item.eventCode == 1002) : [];
    return (
      <div>
        {inTime.length > 0 ? moment(inTime[0].at).format('YYYY.MM.DD') : '--'}
      </div >
    );

  },
};

export const outGroupAt = {
  title: '出组时间',
  dataIndex: 'timelines',
  key: 'timelines',
  render: (text: any, _record: any) => {

    const inTime = text ? text.filter((item) => item.eventCode == 1003) : [];
    return (
      <div>
        {inTime.length > 0 ? moment(inTime[0].at).format('YYYY.MM.DD') : '--'}
      </div >
    );
  },
};


export const groupInGroupAt = {
  title: '入组时间',
  dataIndex: 'interval',
  key: 'interval',
  render: (text: any, _record: any) => (
    <div>
      {text?.start ? moment(text.start).format('YYYY.MM.DD') : '--'}
    </div>
  ),
};

export const groupOutGroupAt = {
  title: '出组时间',
  dataIndex: 'statusUpdateTime',
  key: 'statusUpdateTime',
  render: (text: any, record: any) => (
    <div>
      {(text && record.status === 1003) ? moment(text).format('YYYY.MM.DD') : '--'}
    </div>
  ),

};

export const stopReason = {
  title: '退出原因',
  dataIndex: 'etcNotes',
  key: 'etcNotes',
  render: (text: any, _record: any) => (
    <div>
      {text ? exitReason[text?.exitReason] : '--'}
    </div>
  ),
};

export const testStatus = {
  title: '试验状态',
  dataIndex: 'status',
  key: 'status',
  render: (_text: any, record: any) => (
    <div>
      {/* {record.status === 'RUN' ? '进行中' : '结束'} */}
      {statusObj[`${record.status}`]}
    </div>
  ),
};


export const practiceAreas = {
  title: '医院 -- 科室',
  dataIndex: 'practiceAreas',
  key: 'practiceAreas',
  render: (text: any, record: any) => {

    const areas = text && text.length > 0 ? text : record?.subjectDetail?.practiceAreas;
    return (
      <div>
        {areas ? areas.map((item) => {
          return (
            <div>
              {(item?.name ?? '') + ' -- ' + (item?.sub?.name ?? '')}
            </div>
          );
        }) : '--'
        }
      </div>
    );
  },
};


export const title = {
  title: '职称',
  dataIndex: 'title',
  key: 'title',
  render: (text: any, _record: any) => {
    return (
      <div>
        {text ? text : '--'}
      </div>
    );
  },
};
export const department = {
  title: '科室',
  dataIndex: 'firstPracticeDepartment',
  key: 'firstPracticeDepartment',
};
export const orgName = {
  title: '线上医院和项目机构',
  dataIndex: 'orgName',
  key: 'orgName',
};
export const inviteStatus = {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
};
export const role = {
  title: '角色',
  dataIndex: 'role',
  key: 'role',
  render: (text: string) => fetchRolePropValue(text, 'desc'),
  // sorter: true,
};
export const researcherRole = {
  title: '角色',
  dataIndex: 'roleId',
  key: 'roleId',
  render: (text: string) => {
    console.log('texttext', text);
    // const type = window.$storage.getItem('croLabel');
    if (!text) {
      return '--';
    } else if (text?.split('.')[1] === 'aeJk0w') {
      return '暂未分配';
    } else {
      return fetchRolePropValue(text, 'desc');
    }
  },
};
export const tel = {
  title: '手机号',
  dataIndex: 'tel',
  key: 'tel',
};
export const patientCount = {
  title: '受试者人数',
  dataIndex: 'patientCount',
  key: 'patientCount',
};
export const memberStatus = {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
};
export const groupName = {
  title: '分组',
  dataIndex: 'groupName',
  key: 'groupName',
};
export const researchProjectDoctor = {
  title: '研究者',
  dataIndex: 'researchProjectDoctor',
  key: 'researchProjectDoctor',
};
export const ethnicity = {
  title: '民族',
  dataIndex: 'ethnicity',
  key: 'ethnicity',
  render: (text: string) => text || '--',
};
// 全部患者列表-未邀请
export const noSendPatientColumns = (params: Store) => [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 150,
    // render: (text: string, record: any) => <span>{record.name}{text}</span>,
    render: (text: number, record: any) => {

      const experimentName = params.getExperimentName(record);
      return (
        experimentName ?
          <div className='no_send_patient_name'>
            {text}
            <div className="no_chose_why" >
              <img style={{ width: '16px', height: '16px', alignSelf: 'center', marginLeft: '6px' }} src={haveQuestionPng} />
              <div className="no_chose_alert">
                患者正在参与试验 {experimentName},无法邀请
              </div>
            </div>
          </div >
          : <div className='no_send_patient_name'>
            {text}
          </div >
      );
    },
  },
  age,
  address,
  sex,
  ethnicity,
];
// 全部患者列表-已邀请
export const addedPatientColumns = () => [
  name,
  age,
  address,
  status,
  sex,
  ethnicity,
];
// 全部受试者列表
export const patientCroColumns = () => [
  name,
  patientGroup,
  inGroupAt,
  researchProjectDoctor,
];
export const patientCroStopColumns = () => [
  name,
  patientGroup,
  inGroupAt,
  researchProjectDoctor,
  outGroupAt,
  stopReason,
];

// 小组患者列表
export const groupDetailColumns = () => [
  name,
  groupInGroupAt,
  groupOutGroupAt,
  testStatus,
  researchProjectDoctor,
];
// 成员列表
export const memberListColumns = [
  name,
  researcherRole,
  // firstProfessionCompany,
  practiceAreas,
  // department,
  tel,
  patientCount,
  memberStatus,
  // groupName
];
// 添加成员-》待添加的成员列表
export const addGroupDoctorListColumns = [
  name,
  tel,
  researcherRole,
  title,
  // department,
  practiceAreas,
  // groupName,
];

export const doctorName = {
  title: '研究者',
  dataIndex: 'doctorName',
  width: 100,
  render: (text: string) => <span>{text}</span>,
};

export const croName = {
  title: '受试者',
  dataIndex: 'patientName',
  width: 100,
  render: (text: string) => <span>{text}</span>,
};

export const eventType = {
  title: '事件',
  dataIndex: 'eventType',
  render: (text: string[]) => <span>
    {
      text.map((item, index) => (
        <span>{eventList[+item]}{`${index === text.length - 1 ? '' : '、'}`}</span>
      ))
    }
  </span>,
};

const eventClass = (key: string) => {
  let className = '';
  if (key.indexOf('first_') > -1) {
    className = 'event_label MAIN';
  }
  if (key.indexOf('second_') > -1) {
    className = 'event_label MINOR';
  }
  if (key.indexOf('third_') > -1) {
    className = 'event_label BAD';
  }
  if (key.indexOf('forth_') > -1) {
    className = 'event_label SICK';
  }
  if (key.indexOf('other_') > -1) {
    className = 'event_label OTHER';
  }
  return className;
};

export const content = {
  title: '内容',
  dataIndex: 'content',
  render: (text: Store[]) => {

    return (
      <span>
        {
          text.map((item) => (
            Object.keys(item.detail).map((det) => {
              return (
                <span className={eventClass(det)}>{item.detail[det]}</span>
              );
            })
          ))
        }
        <span className={eventClass('other_')}>其他事件</span>
      </span>
    );
  },
};

export const createdAt = {
  title: '时间',
  dataIndex: 'createdAt',
  width: 150,
  render: (text: number) => <span>{moment(text).format('YYYY年MM月DD日 HH:mm')}</span>,
};

// 终点事件列表
export const endEventColumns = () => [
  doctorName,
  croName,
  eventType,
  content,
  createdAt,
];

export const sendAt = {
  title: '发送日期',
  dataIndex: 'sendTime',
  width: 150,
  render: (text: number) => <span>{moment(text).format('YYYY.MM.DD HH:mm')}</span>,
};

export const Sender = {
  title: '发送人',
  dataIndex: 'sender',
  width: 150,
};

export const Receiver = {
  title: '接收人',
  dataIndex: 'receiver',
  width: 150,
  render: (text: string[]) => <span>{text ? text.join(',') : ''}</span>,
};

export const replyAt = {
  title: '回复日期',
  dataIndex: 'replyTime',
  width: 150,
  render: (text: number) => <span>{moment(text).format('YYYY.MM.DD HH:mm')}</span>,
};

