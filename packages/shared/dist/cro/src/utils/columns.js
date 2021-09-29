import React from 'react';
import { Popconfirm } from 'antd';
import { fetchRolePropValue } from 'xzl-web-shared/src/utils/role';
import { eventList, exitReason } from '@/utils/consts';
import moment from 'moment';
import { sexList } from './consts';
import IconAutograph from '@/assets/img/icon_autograph.png';
var statusObj = {
    'NO_SEND': '未发送',
    'NO_CONFIRM': '未确认',
    'ADDED': '已加入',
    'REFUSED': '已拒绝',
    '1000': '待确认',
    '1001': '已拒绝',
    '1002': '进行中',
    '1003': '已结束',
};
export var name = {
    title: '姓名',
    dataIndex: 'name',
    width: 150,
    render: function (text) { return React.createElement("span", null, text); },
};
export var age = {
    title: '年龄',
    dataIndex: 'age',
    width: 150,
};
export var sex = {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    width: 150,
    render: function (text) { return React.createElement("span", null, sexList[+text] || '--'); },
};
export var address = {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
    render: function (text) { return text || '--'; }
};
export var status = {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: function (text) { return React.createElement("span", null, statusObj[text]); },
};
export var patientName = {
    title: '姓名',
    dataIndex: 'patientName',
    key: 'patientName',
};
export var patientStatus = {
    title: '患者状态',
    dataIndex: 'status',
    key: 'status',
    render: function (record) { return (React.createElement("div", null, statusObj["" + record.status])); },
};
export var patientGroup = {
    title: '所在分组',
    dataIndex: 'groups',
    key: 'groups',
    render: function (record) { return (React.createElement("div", null, record.groups.map(function (item, index) { return item + " " + (index !== record.groups.length - 1 ? '、' : ''); }))); },
};
export var inGroupAt = {
    title: '入组时间',
    dataIndex: 'interval',
    key: 'interval',
    render: function (text) { return (React.createElement("div", null, (text === null || text === void 0 ? void 0 : text.start) ? moment(text.start).format('YYYY.MM.DD') : '--')); },
};
export var outGroupAt = {
    title: '出组时间',
    dataIndex: 'statusUpdateTime',
    key: 'statusUpdateTime',
    render: function (text, record) { return (React.createElement("div", null, (text && record.status === 1003) ? moment(text).format('YYYY.MM.DD') : '--')); },
};
export var stopReason = {
    title: '退出原因',
    dataIndex: 'etcNotes',
    key: 'etcNotes',
    render: function (text) { return (React.createElement("div", null, text ? exitReason[text === null || text === void 0 ? void 0 : text.exitReason] : '--')); },
};
export var testStatus = {
    title: '试验状态',
    dataIndex: 'status',
    key: 'status',
    render: function (record) { return (React.createElement("div", null, statusObj["" + record.status])); },
};
export var firstProfessionCompany = {
    title: '医院',
    dataIndex: 'firstProfessionCompany',
    key: 'firstProfessionCompany',
};
export var title = {
    title: '职称',
    dataIndex: 'title',
    key: 'title',
};
export var department = {
    title: '科室',
    dataIndex: 'firstPracticeDepartment',
    key: 'firstPracticeDepartment',
};
export var role = {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    render: function (text) { return fetchRolePropValue(text, 'desc'); }
    // sorter: true,
};
export var researcherRole = {
    title: '角色',
    dataIndex: 'roleId',
    key: 'roleId',
    render: function (text) {
        console.log('texttext', text);
        // const type = window.$storage.getItem('croLabel');
        if (!text) {
            return '--';
        }
        else if ((text === null || text === void 0 ? void 0 : text.split('.')[1]) === 'aeJk0w') {
            return '暂未分配';
        }
        else {
            return fetchRolePropValue(text, 'desc');
        }
    },
};
export var tel = {
    title: '手机号',
    dataIndex: 'tel',
    key: 'tel',
};
export var patientCount = {
    title: '受试者人数',
    dataIndex: 'patientCount',
    key: 'patientCount',
};
export var memberStatus = {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
};
export var groupName = {
    title: '分组',
    dataIndex: 'groupName',
    key: 'groupName',
};
export var researchProjectDoctor = {
    title: '研究者',
    dataIndex: 'researchProjectDoctor',
    key: 'researchProjectDoctor',
};
export var ethnicity = {
    title: '民族',
    dataIndex: 'ethnicity',
    key: 'ethnicity',
    render: function (text) { return text || '--'; },
};
// 全部患者列表-未邀请
export var noSendPatientColumns = function () { return [
    name,
    age,
    address,
    sex,
    ethnicity,
]; };
// 全部患者列表-已邀请
export var addedPatientColumns = function () { return [
    name,
    age,
    address,
    status,
    sex,
    ethnicity,
]; };
// 全部受试者列表
export var patientCroColumns = function (params) { return [
    name,
    patientGroup,
    inGroupAt,
    researchProjectDoctor,
    {
        title: '操作',
        dataIndex: '',
        render: function (record) { return (React.createElement("div", { className: "table-operating" }, record.status === 1002 ? (React.createElement(Popconfirm, { placement: "topRight", overlayClassName: "delete__pop-confirm", title: (React.createElement("div", null,
                React.createElement("h3", null, "\u786E\u5B9A\u8981\u505C\u6B62\u6B64\u60A3\u8005\u8BD5\u9A8C\u5417\uFF1F"))), onConfirm: function () { return params.handleStop(record); } },
            React.createElement("span", null, "\u505C\u6B62\u6B64\u60A3\u8005\u8BD5\u9A8C"))) : React.createElement("span", { style: { color: '#C5C5C5' } }, "\u5DF2\u505C\u6B62"))); },
    },
    {
        title: '受试者签名',
        dataIndex: '',
        render: function (record) { return (React.createElement("div", null, (record === null || record === void 0 ? void 0 : record.etcNote) ? React.createElement("img", { style: { width: '26px', height: '26px' }, src: IconAutograph, onClick: function () { return params.toggleImg(record); } }) : '--')); },
    },
]; };
export var patientCroStopColumns = function () { return [
    name,
    patientGroup,
    inGroupAt,
    researchProjectDoctor,
    outGroupAt,
    stopReason,
]; };
// 小组患者列表
export var groupDetailColumns = function () { return [
    name,
    inGroupAt,
    outGroupAt,
    testStatus,
    researchProjectDoctor,
]; };
// 成员列表
export var memberListColumns = [
    name,
    researcherRole,
    firstProfessionCompany,
    department,
    tel,
    patientCount,
    memberStatus,
    // groupName
];
// 添加成员-》待添加的成员列表
export var addGroupDoctorListColumns = [
    name,
    tel,
    researcherRole,
    title,
    department,
    // groupName,
];
export var doctorName = {
    title: '研究者',
    dataIndex: 'doctorName',
    width: 100,
    render: function (text) { return React.createElement("span", null, text); },
};
export var croName = {
    title: '受试者',
    dataIndex: 'patientName',
    width: 100,
    render: function (text) { return React.createElement("span", null, text); },
};
export var eventType = {
    title: '事件',
    dataIndex: 'eventType',
    render: function (text) { return React.createElement("span", null, text.map(function (item, index) { return (React.createElement("span", null,
        eventList[+item], "" + (index === text.length - 1 ? '' : '、'))); })); },
};
var eventClass = function (key) {
    var className = '';
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
    return className;
};
export var content = {
    title: '内容',
    dataIndex: 'content',
    render: function (text, record) {
        console.log('===================xzlTable content ', text, '=record=', record);
        return (React.createElement("span", null, 0
        // text.map((item)=> (
        //   Object.keys(item.detail).map((det)=> {
        //     return (
        //       <span className={eventClass(det)}>{item.detail[det]}</span>
        //     );
        //   })
        // ))
        ));
    },
};
export var createdAt = {
    title: '时间',
    dataIndex: 'createdAt',
    width: 150,
    render: function (text) { return React.createElement("span", null, moment(text).format('YYYY年MM月DD日 HH:mm')); },
};
// 终点事件列表
export var endEventColumns = function () { return [
    doctorName,
    croName,
    eventType,
    content,
    createdAt,
]; };
export var sendAt = {
    title: '发送日期',
    dataIndex: 'sendTime',
    width: 150,
    render: function (text) { return React.createElement("span", null, moment(text).format('YYYY.MM.DD HH:mm')); },
};
export var Sender = {
    title: '发送人',
    dataIndex: 'sender',
    width: 150,
};
export var Receiver = {
    title: '接收人',
    dataIndex: 'receiver',
    width: 150,
};
export var replyAt = {
    title: '回复日期',
    dataIndex: 'replyTime',
    width: 150,
    render: function (text) { return React.createElement("span", null, moment(text).format('YYYY.MM.DD HH:mm')); },
};
