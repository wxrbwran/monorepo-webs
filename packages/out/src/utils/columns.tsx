import React from 'react';
import { Button, Avatar } from 'antd';
import { projectStatus } from '@/utils/consts';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import {
  sexList,
  orgCategroy,
  inviteStatusLists,
  accountStatus,
  roleList,
  defaultAvatar,
} from './consts';

export type SexType = 'MALE' | 'FEMALE';

export const avatar = {
  title: '头像',
  dataIndex: 'avatarUrl',
  align: 'center',
  width: 80,
  mock: 'http://dummyimage.com/200x200',
  render: (text: string) => <Avatar size={40} shape="square" src={text || defaultAvatar} />,
};

export const navAvatar = (params: Store) => ({
  title: '头像',
  dataIndex: 'avatarUrl',
  width: 80,
  mock: 'http://dummyimage.com/200x200/4A7BF7&text=avatar',
  render: (text: string, record: Store) => (
    <span onClick={() => params.nav(record)}>
      <Avatar size={40} shape="square" src={text || defaultAvatar} />
    </span>
  ),
});

export const name = {
  title: '姓名',
  dataIndex: 'name',
  width: 80,
  mock: '@cname',
  align: 'center',
  render: (text: string) => <span>{text}</span>,
};

export const navName = (params: Store) => ({
  title: '姓名',
  dataIndex: 'name',
  width: 80,
  mock: '@cname',
  align: 'center',
  render: (text: string, record: Store) => (
    <Button type="link" onClick={() => params.nav(record)}>
      {text}
    </Button>
  ),
});

export const sex = {
  title: '性别',
  dataIndex: 'sex',
  align: 'center',
  key: 'sex',
  width: 60,
  mock: '@pick(["0", "1"])',
  render: (text: SexType) => <span>{sexList[+text]}</span>,
};

export const age = {
  title: '年龄',
  dataIndex: 'age',
  // width: 100,
  mock: '@integer(50,100)',
};
export const title = {
  title: '职称',
  dataIndex: 'title',
  align: 'center',
  // width: 110,
  mock: '@pick(["主任医师", "副主任医师", "主治医师"])',
  render: (text: string) => <span>{text}</span>,
};

export const upperDoctor = {
  title: '上级医生',
  dataIndex: 'upper_doctor',
  align: 'center',
  mock: '@cname',
};

export const lowerDoctor = {
  title: '下级医生',
  dataIndex: 'lower_doctor',
  align: 'center',
  mock: '@cname',
};

export const province = {
  title: '地区',
  dataIndex: 'province',
  mock: '@province',
};

export const patientNum = {
  title: '患者数量',
  dataIndex: 'patientNum',
  align: 'center',
  // width: 100,
  mock: '@integer(10,200)',
};
// WAITING: '待确认',
//   CONFIRMED: '已确认',
//   REFUSED: '已拒绝',
export const inviteStatus = {
  title: '添加申请',
  dataIndex: 'inviteStatus',
  mock: '@pick(["WAITING", "CONFIRMED", "REFUSED"])',
  render: (text: string) => <span>{inviteStatusLists[text]}</span>,
};

export const status = {
  title: '认证状态',
  dataIndex: 'status',
  align: 'center',
  mock: '@pick(["110", "119", "118"])',
  render: (text: string) => <span>{accountStatus[text]}</span>,
};

export const organizationName = (params) => ({
  title: '医院名',
  dataIndex: 'orgName',
  align: 'center',
  mock: '@region',
  render: (text, record) =>
    params.level === '下级机构' ? (
      <a
        className="header__link__clinical"
        href={`${window.location.origin}${window.location.pathname}#/hospital/account?openSub=true&nsId=${record.nsId}&sid=${record.sid}`}
        target="_blank"
      >
        {text}
      </a>
    ) : (
      <span>{text}</span>
    ),
});
export const orgName = {
  title: '医院名',
  dataIndex: 'orgName',
  mock: '@region',
  align: 'center',
};

export const organizationCategory = {
  title: '机构业务',
  dataIndex: 'organizationCategory',
  render: (text: string) => <span>{orgCategroy[text]}</span>,
};
export const organizationCode = {
  title: '医院识别码',
  dataIndex: 'uuCode',
  align: 'center',
  mock: '@integer(10000,99999)',
};
export const adminName = {
  title: '管理员',
  dataIndex: 'adminName',
  align: 'center',
  mock: '@cname',
};
export const lowOrgCount = {
  title: '下级医院',
  dataIndex: 'lowOrgCount',
  // mock: '@county',
  mock: '@integer(0,10)',
  sorter: (a: { lowOrgCount: number }, b: { lowOrgCount: number }) => a.lowOrgCount - b.lowOrgCount,
};
export const upOrgCount = {
  title: '上级医院',
  dataIndex: 'upOrgCount',
  mock: '@integer(1,10)',
  sorter: (a: { upOrgCount: number }, b: { upOrgCount: number }) => a.upOrgCount - b.upOrgCount,
};
export const deptCount = {
  title: '科室',
  dataIndex: 'deptCount',
  mock: '@integer(10,30)',
  // mock: '@pick(["心内科", "心外科", "急诊科", "儿科", "骨科", "神经科", "放射科"])',
  sorter: (a: { deptCount: number }, b: { deptCount: number }) => a.deptCount - b.deptCount,
};
export const doctorCount = {
  title: '医生',
  dataIndex: 'doctorCount',
  mock: '@integer(80,200)',
  sorter: (a: { doctorCount: number }, b: { doctorCount: number }) => a.doctorCount - b.doctorCount,
};
export const nurseCount = {
  title: '护士',
  dataIndex: 'nurseCount',
  mock: '@integer(100,200)',
  sorter: (a: { nurseCount: number }, b: { nurseCount: number }) => a.nurseCount - b.nurseCount,
};
export const patientCount = {
  title: '患者',
  dataIndex: 'patientCount',
  mock: '@integer(100,500)',
  sorter: (a: { patientCount: number }, b: { patientCount: number }) =>
    a.patientCount - b.patientCount,
};
export const doctorName = {
  title: '医生',
  dataIndex: 'doctorName',
  mock: '@cname',
};
export const assistantName = {
  title: '医助',
  dataIndex: 'assistantName',
  mock: '@cname',
};
export const serviceLevel = {
  title: '级别',
  dataIndex: 'serviceLevel',
  mock: '@pick(["VIP", "普通患者"])',
  align: 'center',
  render: (text) => (text === 'VIP' ? 'VIP' : '普通患者'),
};
export const tel = {
  title: '联系方式',
  dataIndex: 'tel',
  align: 'center',
  mock: '@integer(13100000000,19899999999)',
};

export const role = {
  title: '角色',
  dataIndex: 'role',
  align: 'center',
  mock: '@pick(["OPERATOR", "OPERATOR_ADMIN"])',
  render: (text) => <span>{roleList[text]}</span>,
};

export const workload = {
  title: '工作量统计',
  dataIndex: 'workload',
  align: 'center',
  mock: '@integer(10,200)',
};

export const lastMonthWorkload = {
  title: '上月工作量',
  dataIndex: 'lastMonthWorkload',
  align: 'center',
  mock: '@integer(10,200)',
};

export const monthWorkload = {
  title: '本月工作量',
  dataIndex: 'monthWorkload',
  align: 'center',
  mock: '@integer(10,200)',
};

export const organization = {
  title: '执业机构',
  dataIndex: 'organization',
  mock: '@region',
  render: (text) => (
    <span>{text.length > 0 ? text.map((org: Department) => org.name).join('，') : ''}</span>
  ),
};

export const department = {
  title: '执业科室',
  dataIndex: 'departmentName',
  align: 'center',
  mock: '@pick(["心内科", "心外科", "急诊科", "儿科", "骨科", "神经科", "放射科"])',
  // render: (text) => (
  //   <span>{text.length > 0 ? text.map((dep: Department) => dep.name).join('，') : ''}</span>
  // ),
};

export const adminDepartment = {
  title: '管理科室',
  dataIndex: 'adminDepartment',
  width: 150,
  mock: '@region',
  render: (text) => (
    <span>{text && (text.length > 0 ? text.map((dep) => dep.name).join('，') : '')}</span>
  ),
};

export const patientName = {
  title: '姓名',
  dataIndex: 'patientName',
  width: 100,
  mock: '@cname',
  render: (text: string) => <span>{text}</span>,
};

export const crostatus = {
  title: '试验状态',
  dataIndex: 'status',
  mock: '@pick(["1002", "1001"])',
  align: 'center',
  render: (text: number) => (projectStatus[text]),
};

export const orgaName = {
  title: '机构',
  dataIndex: 'organizationName',
  mock: '@pick(["心之力医院", "阜外医院", "临汾医院"])',
  align: 'center',
};

export const sendNumber = {
  title: '已发出量表数量',
  dataIndex: 'sendNumber',
  mock: '@integer(10,30)',
  align: 'center',
  sorter: (a: { deptCount: number }, b: { deptCount: number }) => a.deptCount - b.deptCount,
};

export const noReplyNumber = {
  title: '未回复量表数量',
  dataIndex: 'noReplyNumber',
  align: 'center',
  mock: '@integer(10,30)',
  sorter: (a: { noReplyNumber: number }, b: { noReplyNumber: number }) =>
    a.noReplyNumber - b.noReplyNumber,
};

export const rootOrgColumns = (params) => [
  organizationName(params),
  // organizationCategory,
  organizationCode,
  adminName,
  lowOrgCount,
  upOrgCount,
  deptCount,
  doctorCount,
  nurseCount,
  patientCount,
  {
    title: '操作',
    dataIndex: 'operate',
    // width: 200,
    className: 'action',
    render: (_text, _record) => (
      <div className="column_btn">
        <Button type="ghost" icon={<EditOutlined />}>
          编辑
        </Button>
        <Button type="ghost" icon={<DeleteOutlined />}>
          删除
        </Button>
      </div>
    ),
  },
];

export const departmentPatientColumns = () => [
  name,
  sex,
  upperDoctor,
  lowerDoctor,
  serviceLevel,
  tel,
];

// 医联体->机构列表
export const orgListColumns = (params: any) => [
  organizationName(params),
  adminName,
  organizationCode,
  deptCount,
  doctorCount,
  nurseCount,
  patientCount,
];
export const addOrgListColumns = [
  orgName,
  organizationCode,
  adminName,
  lowOrgCount,
  deptCount,
  doctorCount,
  nurseCount,
  patientCount,
];

