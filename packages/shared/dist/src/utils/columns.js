import React from 'react';
import { Avatar, Button } from 'antd';
import { defaultAvatar, sexList, inviteStatusLists, statusLists, orgCategroy, roleList, projectStatus } from './consts';
import { Role } from './role';
export var columnCreator = function (title, dataIndex, customRender) {
    if (customRender === void 0) { customRender = undefined; }
    var column = {
        title: title,
        dataIndex: dataIndex,
    };
    if (customRender) {
        column.render = customRender;
    }
    return column;
};
export var clName = columnCreator('姓名', 'name');
export var clTitle = columnCreator('职称', 'title');
export var clGoodsPrice = columnCreator('收费标准', 'goodsDescriptions');
export var indexName = columnCreator('指标名称', 'name');
export var clAvatar = {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: function (text) { return (React.createElement("img", { src: text || defaultAvatar, style: { width: 40, height: 40 }, alt: "\u5934\u50CF" })); },
};
export var clDepartment = {
    title: '科室',
    dataIndex: 'department',
    render: function (text) { return text.name; },
};
export var indexUnits = {
    title: function () { return (React.createElement("div", null,
        React.createElement("span", null, "\u5355\u4F4D"))); },
    dataIndex: 'units',
    render: function (text) { return (React.createElement(React.Fragment, null, (text === null || text === void 0 ? void 0 : text.length) === 0 || !text ? React.createElement("span", { className: "unit no-units" }, "\u65E0\u5355\u4F4D") : (text.map(function (item, index) { return React.createElement("span", { key: item, className: index === 0 ? 'unit default' : 'unit' }, item); })))); },
};
export var indexAbbr = {
    title: '缩写',
    dataIndex: 'abbreviation',
    render: function (text) { return (React.createElement("div", null, text || '--')); },
};
export var indexSource = {
    title: '数据来源',
    dataIndex: 'source',
    render: function (text) { return (React.createElement("div", null, text === 'DOCTOR' ? '自己添加' : '系统添加')); },
};
export var avatar = {
    title: '头像',
    dataIndex: 'avatarUrl',
    width: 80,
    render: function (text) { return React.createElement(Avatar, { size: 40, shape: "square", src: text || defaultAvatar }); },
};
export var navAvatar = function (params) { return ({
    title: '头像',
    dataIndex: 'avatarUrl',
    width: 80,
    render: function (text, record) { return (React.createElement("span", { onClick: function () { return params.nav(record); } },
        React.createElement(Avatar, { size: 40, shape: "square", src: text || defaultAvatar }))); },
}); };
export var name = {
    title: '姓名',
    dataIndex: 'name',
    width: 100,
    render: function (text) { return React.createElement("span", null, text); },
};
export var navName = function (params) { return ({
    title: '姓名',
    dataIndex: 'name',
    width: 100,
    render: function (text, record) { return (React.createElement(Button, { type: "link", onClick: function () { return params.nav(record); } }, text)); },
}); };
export var sex = {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    width: 50,
    render: function (text) { return React.createElement("span", null, sexList[+text]); },
};
export var age = {
    title: '年龄',
    dataIndex: 'age',
    width: 100,
};
export var title = {
    title: '职称',
    dataIndex: 'title',
    render: function (text) { return React.createElement("span", null, text); },
};
export var upperDoctor = {
    title: '上级医生',
    dataIndex: 'upper_doctor',
};
export var lowerDoctor = {
    title: '下级医生',
    dataIndex: 'lower_doctor',
};
export var province = {
    title: '地区',
    dataIndex: 'province',
};
export var patientNum = {
    title: '患者数量',
    dataIndex: 'patientNum',
};
export var inviteStatus = {
    title: '添加申请',
    dataIndex: 'inviteStatus',
    render: function (text) { return React.createElement("span", null, inviteStatusLists[text]); },
};
export var status = {
    title: '认证状态',
    dataIndex: 'status',
    render: function (text) { return React.createElement("span", null, statusLists[text]); },
};
export var organizationName = function (params) { return ({
    title: '医院名',
    dataIndex: 'orgName',
    render: function (text, record) { return (React.createElement(Button, { type: "link", onClick: function () { return params.handleGetOrgInfoThenNav(record); } }, text)); },
}); };
export var organizationCategory = {
    title: '机构业务',
    dataIndex: 'organizationCategory',
    render: function (text) { return React.createElement("span", null, orgCategroy[text]); },
};
export var organizationCode = {
    title: '医院识别码',
    dataIndex: 'uuCode',
};
export var adminName = {
    title: '管理员',
    dataIndex: 'adminName',
};
export var lowOrgCount = {
    title: '下级医院',
    dataIndex: 'lowOrgCount',
    sorter: true,
};
export var upOrgCount = {
    title: '上级医院',
    dataIndex: 'upOrgCount',
    sorter: true,
};
export var deptCount = {
    title: '科室',
    dataIndex: 'deptCount',
    sorter: true,
};
export var doctorCount = {
    title: '医生',
    dataIndex: 'doctorCount',
    sorter: true,
};
export var nurseCount = {
    title: '护士',
    dataIndex: 'nurseCount',
    sorter: true,
};
export var patientCount = {
    title: '患者',
    dataIndex: 'patientCount',
    sorter: true,
};
export var doctorName = {
    title: '医生',
    dataIndex: 'doctorName',
};
export var assistantName = {
    title: '医助',
    dataIndex: 'assistantName',
};
export var serviceLevel = {
    title: '级别',
    dataIndex: 'role',
    render: function (text) { return (text === Role.PATIENT_VIP.id ? 'VIP' : '普通患者'); },
};
export var tel = {
    title: '联系方式',
    dataIndex: 'tel',
};
export var role = {
    title: '角色',
    dataIndex: 'role',
    render: function (text) { return React.createElement("span", null, roleList[text]); },
};
export var workload = {
    title: '工作量统计',
    dataIndex: 'workload',
};
var depRender = function (text) { return (React.createElement("span", null, text ? text.map(function (dep) { return dep.name; }).join('，') : '')); };
export var department = {
    title: '执业科室',
    dataIndex: 'department',
    width: 150,
    render: depRender,
};
export var adminDepartment = {
    title: '管理科室',
    dataIndex: 'adminDepartment',
    width: 150,
    render: depRender,
};
export var lastMonthWorkload = {
    title: '上月工作量',
    dataIndex: 'lastMonthWorkload',
};
export var monthWorkload = {
    title: '本月工作量',
    dataIndex: 'monthWorkload',
};
export var organizationNameOut = function (params) { return ({
    title: '医院名',
    dataIndex: 'orgName',
    align: 'center',
    mock: '@region',
    render: function (text, record) {
        return params.level === '下级机构' ? (React.createElement("a", { className: "header__link__clinical", href: "" + window.location.origin + window.location.pathname + "#/hospital/account?openSub=true&nsId=" + record.nsId + "&sid=" + record.sid, target: "_blank" }, text)) : (React.createElement("span", null, text));
    },
}); };
export var orgName = {
    title: '医院名',
    dataIndex: 'orgName',
    mock: '@region',
    align: 'center',
};
export var patientName = {
    title: '姓名',
    dataIndex: 'patientName',
    width: 100,
    mock: '@cname',
    render: function (text) { return React.createElement("span", null, text); },
};
export var crostatus = {
    title: '试验状态',
    dataIndex: 'status',
    mock: '@pick(["1002", "1001"])',
    align: 'center',
    render: function (text) { return (projectStatus[text]); },
};
export var orgaName = {
    title: '机构',
    dataIndex: 'organizationName',
    mock: '@pick(["心之力医院", "阜外医院", "临汾医院"])',
    align: 'center',
};
export var sendNumber = {
    title: '已发出量表数量',
    dataIndex: 'sendNumber',
    mock: '@integer(10,30)',
    align: 'center',
    sorter: function (a, b) { return a.deptCount - b.deptCount; },
};
export var noReplyNumber = {
    title: '未回复量表数量',
    dataIndex: 'noReplyNumber',
    align: 'center',
    mock: '@integer(10,30)',
    sorter: function (a, b) {
        return a.noReplyNumber - b.noReplyNumber;
    },
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
//   render: (_text) => (
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
