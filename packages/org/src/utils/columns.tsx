import React from 'react';
import { Button, Popconfirm, Avatar, Popover } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddEditHospital from '@/components/AddEditHospital';
// import DeleteDepOrg from '@/components/DeleteDepOrg';
import { Role } from './role';

import {
  sexList,
  orgCategroy,
  inviteStatusLists,
  statusLists,
  roleList,
  defaultAvatar,
} from './consts';

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
  width: 50,
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
  render: (text: string) => <span>{statusLists[text]}</span>,
};

export const organizationName = (params) => ({
  title: '医院名',
  dataIndex: 'orgName',
  render: (text, record) => (
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
    render: (_text, record) => (
      <div className="column_btn">
        <AddEditHospital info={record} mode="edit" refresh={params.refresh}>
          <Button type="ghost" icon={<EditOutlined />}>
            编辑
          </Button>
        </AddEditHospital>
        {/* <DeleteDepOrg level="org"> */}
        {/* <Button type="ghost" icon={<DeleteOutlined />}>
          删除
        </Button> */}
        {/* </DeleteDepOrg> */}
      </div>
    ),
  },
];

const deletePop = (
  <div>
    <h3>确认删除？</h3>
    <p>一旦删除不可恢复！</p>
  </div>
);
export const departmentDoctorColumns = (params) => [
  navAvatar(params),
  navName(params),
  sex,
  title,
  patientNum,
  // inviteStatus,
  status,
  // {
  //   title: '操作',
  //   dataIndex: 'operate',
  //   // width: 200,
  //   className: 'action',
  //   render: (text, record) => (
  //     <Popconfirm
  //       placement="topRight"
  //       overlayClassName="delete__pop-confirm"
  //       title={deletePop}
  //       onConfirm={(e) => params.deleteDoctor(e, [record.id])}
  //     >
  //       <Button type="link" icon={<DeleteOutlined />}>
  //         删除
  //       </Button>
  //     </Popconfirm>
  //   ),
  // },
];
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
export const departmentPatientColumns = () => [
  name,
  sex,
  upperDoctor,
  lowerDoctor,
  serviceLevel,
  tel,
  // {
  //   title: '操作',
  //   dataIndex: 'operate',
  //   // width: 200,
  //   className: 'action',
  //   render: (text, record) => (
  //     <Popconfirm
  //       placement="topRight"
  //       overlayClassName="delete__pop-confirm"
  //       title={deletePop}
  //       onConfirm={(e) => params.deleteDoctor(e, [record.id])}
  //     >
  //       <Button type="link" icon={<DeleteOutlined />}>
  //         删除
  //       </Button>
  //     </Popconfirm>
  //   ),
  // },
];

export const role = {
  title: '角色',
  dataIndex: 'role',
  render: (text: string) => <span>{roleList[text]}</span>,
};

export const workload = {
  title: '工作量统计',
  dataIndex: 'workload',
};

const depRender = (text) => (
  <span>{text ? text.map((dep: Department) => dep.name).join('，') : ''}</span>
);

export const department = {
  title: '执业科室',
  dataIndex: 'department',
  width: 150,
  render: depRender,
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

export const groupOperatorColumns = (props) => [
  avatar,
  navName(props),
  sex,
  role,
  workload,
  lastMonthWorkload,
  monthWorkload,
  department,
  // inviteStatus,
  status,
  {
    title: '操作',
    dataIndex: 'operate',
    width: 100,
    className: 'action',
    render: (text, record) => (
      <Popconfirm
        placement="topRight"
        overlayClassName="delete__pop-confirm"
        title={deletePop}
        onConfirm={() => props.delete([record.id])}
      >
        <Button type="link" icon={<DeleteOutlined />}>
          删除
        </Button>
      </Popconfirm>
    ),
  },
];

export const groupOperatorAdminColumns = (props) => [
  avatar,
  navName(props),
  sex,
  role,
  workload,
  lastMonthWorkload,
  monthWorkload,
  department,
  adminDepartment,
  // inviteStatus,
  status,
  {
    title: '操作',
    dataIndex: 'operate',
    width: 100,
    className: 'action',
    render: (text, record) => (
      <Popconfirm
        placement="topRight"
        overlayClassName="delete__pop-confirm"
        title={deletePop}
        onConfirm={() => props.delete([record.id])}
      >
        <Button type="link" icon={<DeleteOutlined />}>
          删除
        </Button>
      </Popconfirm>
    ),
  },
];
const departmentOperatorRemoveTitle = (
  <div>
    <h3>移出科室？</h3>
    <p>确认将护士移出科室吗?</p>
  </div>
);
export const departmentOperatorColumns = (props) => [
  avatar,
  navName(props),
  sex,
  role,
  workload,
  lastMonthWorkload,
  monthWorkload,
  // inviteStatus,
  status,
  {
    title: '操作',
    dataIndex: 'operate',
    width: 120,
    className: 'action',
    render: (text, record) => (
      <>
        <Popconfirm
          placement="topRight"
          overlayClassName="delete__pop-confirm"
          title={departmentOperatorRemoveTitle}
          onConfirm={() => props.remove([record.id])}
        >
          <Button type="link" icon={<DeleteOutlined />}>
            删除
          </Button>
        </Popconfirm>
        <Popover
          placement="bottomLeft"
          title={text}
          content={<h3>{record.role === 'OPERATOR' ? '设为管理员' : '取消管理员'}</h3>}
          trigger="hover"
        >
          <span>...</span>
        </Popover>
      </>
    ),
  },
];
