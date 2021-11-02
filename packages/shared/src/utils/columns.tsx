import React from 'react';
import { Avatar, Button } from 'antd';
import { defaultAvatar, sexList, inviteStatusLists, statusLists, orgCategroy, roleList, projectStatus } from './consts';
import { Role, fetchRolePropValue } from './role';
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


export type SexType = 'MALE' | 'FEMALE';

export const avatar = {
  title: '头像',
  dataIndex: 'avatarUrl',
  width: 80,
  render: (text: string) => <Avatar size={40} shape="square" src={text || defaultAvatar} />,
};

export const navAvatar = (params: Store) => ({
  title: '头像',
  dataIndex: 'avatarUrl',
  width: 80,
  render: (text: string, record: Store) => (
    <span onClick={() => params.nav(record)}>
      <Avatar size={40} shape="square" src={text || defaultAvatar} />
    </span>
  ),
});

export const name = {
  title: '姓名',
  dataIndex: 'name',
  width: 100,
  render: (text: string) => <span>{text}</span>,
};

export const navName = (params: Store) => ({
  title: '姓名',
  dataIndex: 'name',
  width: 100,
  render: (text: string, record: Store) => (
    <Button type="link" onClick={() => params.nav(record)}>
      {text}
    </Button>
  ),
});

export const sex = {
  title: '性别',
  dataIndex: 'sex',
  key: 'sex',
  width: 100,
  render: (text: SexType) => <span>{sexList[+text]}</span>,
};

export const age = {
  title: '年龄',
  dataIndex: 'age',
  width: 100,
};
export const title = {
  title: '职称',
  dataIndex: 'title',
  render: (text: string) => <span>{text}</span>,
};

export const upperDoctor = {
  title: '上级医生',
  dataIndex: 'upper_doctor',
};

export const lowerDoctor = {
  title: '下级医生',
  dataIndex: 'lower_doctor',
};

export const province = {
  title: '地区',
  dataIndex: 'province',
};

export const patientNum = {
  title: '患者数量',
  dataIndex: 'patientNum',
};
export const inviteStatus = {
  title: '添加申请',
  dataIndex: 'inviteStatus',
  render: (text: string) => <span>{inviteStatusLists[text]}</span>,
};

export const status = {
  title: '认证状态',
  dataIndex: 'status',
  render: (text: number) => <span>{statusLists[text]}</span>,
};

export const organizationName = (params: any) => ({
  title: '医院名',
  dataIndex: 'orgName',
  render: (text: string, record: any) => (
    <Button type="link" onClick={() => params.handleGetOrgInfoThenNav(record)}>
      {text}
    </Button>
  ),
});

export const organizationCategory = {
  title: '机构业务',
  dataIndex: 'organizationCategory',
  render: (text: string) => <span>{orgCategroy[text]}</span>,
};
export const organizationCode = {
  title: '医院识别码',
  dataIndex: 'uuCode',
};
export const adminName = {
  title: '管理员',
  dataIndex: 'adminName',
};
export const lowOrgCount = {
  title: '下级医院',
  dataIndex: 'lowOrgCount',
  sorter: true,
};
export const upOrgCount = {
  title: '上级医院',
  dataIndex: 'upOrgCount',
  sorter: true,
};
export const deptCount = {
  title: '科室',
  dataIndex: 'deptCount',
  sorter: true,
};
export const doctorCount = {
  title: '医生',
  dataIndex: 'doctorCount',
  sorter: true,
};
export const nurseCount = {
  title: '护士',
  dataIndex: 'nurseCount',
  sorter: true,
};
export const patientCount = {
  title: '患者',
  dataIndex: 'patientCount',
  sorter: true,
};


export const doctorName = {
  title: '医生',
  dataIndex: 'doctorName',
};
export const assistantName = {
  title: '医助',
  dataIndex: 'assistantName',
};
export const serviceLevel = {
  title: '级别',
  dataIndex: 'role',
  render: (text: string) => (text === Role.PATIENT_VIP.id ? 'VIP' : '普通患者'),
};
export const tel = {
  title: '联系方式',
  dataIndex: 'tel',
};

export const role = {
  title: '角色',
  dataIndex: 'role',
  render: (text: string) => <span>{roleList[text]}</span>,
};
export const roleCol = {
  title: '角色',
  dataIndex: 'role',
  render: (text: string) => <span>{fetchRolePropValue(text, 'desc')}</span>,
};

export const workload = {
  title: '工作量统计',
  dataIndex: 'workload',
};

const depRender = (text: any) => (
  <span>{text ? text.map((dep: any) => dep.name).join('，') : ''}</span>
);

export const department = {
  title: '执业科室',
  dataIndex: 'department',
  width: 150,
  render: depRender,
};

export const departmentName = {
  title: '执业科室',
  dataIndex: 'departmentName',
};

export const adminDepartment = {
  title: '管理科室',
  dataIndex: 'adminDepartment',
  width: 150,
  render: depRender,
};


export const lastMonthWorkload = {
  title: '上月工作量',
  dataIndex: 'lastMonthWorkload',
};

export const monthWorkload = {
  title: '本月工作量',
  dataIndex: 'monthWorkload',
};



export const organizationNameOut = (params: any) => ({
  title: '医院名',
  dataIndex: 'orgName',
  align: 'center',
  mock: '@region',
  render: (text: string, record: any) =>
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

export const pname = {
  title: '姓名',
  dataIndex: 'pname',
  width: 100,
  render: (text: string) => <span>{text}</span>,
};

export const groupName = {
  title: '所在分组',
  dataIndex: 'groupName',
  key: 'groupName',
  render: (_text: any, record: any) => (
    <div>
      {record.groupName.join()}
    </div>
  ),
};

export const initAt = {
  title: '与医生绑定时间',
  dataIndex: 'initAt',
  key: 'initAt',
  render: (text: any, _record: any) => (
    <div>
      {text ? moment(text).format('YYYY.MM.DD') : '--'}
    </div>
  ),
};

export const bindAt = {
  title: '与医生绑定时间',
  dataIndex: 'bindAt',
  key: 'bindAt',
  render: (text: any, _record: any) => (
    <div>
      {text ? moment(text).format('YYYY.MM.DD') : '--'}
    </div>
  ),
};


// export const rootOrgColumns = (params) => [
//   organizationName(params),
//   // organizationCategory,
//   organizationCode,
//   adminName,
//   lowOrgCount,
//   upOrgCount,
//   deptCount,
//   doctorCount,
//   nurseCount,
//   patientCount,
// {
//   title: '操作',
//   dataIndex: 'operate',
//   // width: 200,
//   className: 'action',
//   render: (_text, _record) => (
//     <div className="column_btn">
//       <Button type="ghost" icon={<EditOutlined />}>
//         编辑
//       </Button>
//       <Button type="ghost" icon={<DeleteOutlined />}>
//         删除
//       </Button>
//     </div>
//   ),
// },
// ];


// 医联体->机构列表
// export const orgListColumnsOut = (params: any) => [
//   organizationNameOut(params),
//   adminName,
//   organizationCode,
//   deptCount,
//   doctorCount,
//   nurseCount,
//   patientCount,
// ];
// export const addOrgListColumns = [
//   orgName,
//   organizationCode,
//   adminName,
//   lowOrgCount,
//   deptCount,
//   doctorCount,
//   nurseCount,
//   patientCount,
// ];



// export const groupOperatorAdminColumns = (props) => [
//   avatar,
//   navName(props),
//   sex,
//   role,
//   workload,
//   lastMonthWorkload,
//   monthWorkload,
//   department,
//   adminDepartment,
//   // inviteStatus,
//   status,
//   {
//     title: '操作',
//     dataIndex: 'operate',
//     width: 100,
//     className: 'action',
//     render: (text, record) => (
//       <Popconfirm
//         placement="topRight"
//         overlayClassName="delete__pop-confirm"
//         title={deletePop}
//         onConfirm={() => props.delete([record.id])}
//       >
//         <Button type="link" icon={<DeleteOutlined />}>
//           删除
//         </Button>
//       </Popconfirm>
//     ),
//   },
// ];
// const departmentOperatorRemoveTitle = (
//   <div>
//     <h3>移出科室？</h3>
//     <p>确认将护士移出科室吗?</p>
//   </div>
// );
// export const departmentOperatorColumns = (props) => [
//   avatar,
//   navName(props),
//   sex,
//   role,
//   workload,
//   lastMonthWorkload,
//   monthWorkload,
//   // inviteStatus,
//   status,
//   {
//     title: '操作',
//     dataIndex: 'operate',
//     width: 120,
//     className: 'action',
//     render: (text, record) => (
//       <>
//         <Popconfirm
//           placement="topRight"
//           overlayClassName="delete__pop-confirm"
//           title={departmentOperatorRemoveTitle}
//           onConfirm={() => props.remove([record.id])}
//         >
//           <Button type="link" icon={<DeleteOutlined />}>
//             删除
//           </Button>
//         </Popconfirm>
//         <Popover
//           placement="bottomLeft"
//           title={text}
//           content={<h3>{record.role === 'OPERATOR' ? '设为管理员' : '取消管理员'}</h3>}
//           trigger="hover"
//         >
//           <span>...</span>
//         </Popover>
//       </>
//     ),
//   },
// ];

// export const rootOrgColumns = (params) => [
//   organizationName(params),
//   // organizationCategory,
//   organizationCode,
//   adminName,
//   lowOrgCount,
//   upOrgCount,
//   deptCount,
//   doctorCount,
//   nurseCount,
//   patientCount,
//   {
//     title: '操作',
//     dataIndex: 'operate',
//     // width: 200,
//     className: 'action',
//     render: (_text, record) => (
//       <div className="column_btn">
//         <AddEditHospital info={record} mode="edit" refresh={params.refresh}>
//           <Button type="ghost" icon={<EditOutlined />}>
//             编辑
//           </Button>
//         </AddEditHospital>
//         {/* <DeleteDepOrg level="org"> */}
//         {/* <Button type="ghost" icon={<DeleteOutlined />}>
//           删除
//         </Button> */}
//         {/* </DeleteDepOrg> */}
//       </div>
//     ),
//   },
// ];

// export const departmentDoctorColumns = (params) => [
//   navAvatar(params),
//   navName(params),
//   sex,
//   title,
//   patientNum,
//   status,

// ];

