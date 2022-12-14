var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import dayjs from 'dayjs';
import { Role, fetchRolePropValue } from '../../utils/role';
import { projectInviteStatus, sexList } from '../../utils/consts';
// 获取患者列表（做为独立、上级、下级医生的患者列表）
var handlePatientsTeamDataSource = function (data) {
    var newPatients = [];
    var newObj = {};
    // 签约患者下，当前选中菜单的role
    var currentMenuRole = window.$storage.getItem('role');
    console.log('============== currentMenuRole currentMenuRole', currentMenuRole);
    var doctorRole = ['ALONE_DOCTOR', 'UPPER_DOCTOR', 'LOWER_DOCTOR', 'DIETITIAN', 'PHARAMCIST', 'KANGFUSHI', 'PSYCHOLOGIST', 'TEAMNURSE', 'DEP_HEAD'];
    data.forEach(function (team) {
        newObj = {};
        team.members.forEach(function (member) {
            // 下级、上级、科研医生、营养师、独立
            if (Role.NS_OWNER.id === member.role) {
                newObj.nsOwner = {
                    wcId: member.wcId,
                    sid: member.sid, //创建者的sid -  患者列表是否展示更换服务按钮使用
                };
            }
            // 在members里过滤出sid与当前登录者sid相同,并且与侧边栏医生角色一致的医生信息，取出wcId，im聊天会话需要此参数
            if (member.sid === window.$storage.getItem('sid') &&
                member.role === window.$storage.getItem('currRoleId')) {
                newObj.currLoginDoctorInfo = {
                    wcId: member.wcId,
                    sid: member.sid,
                };
            }
            switch (member.role) {
                case Role.PROJECT_PATIENT.id: // 受试列表
                    if (!doctorRole.includes(currentMenuRole)) {
                        newObj = __assign(__assign({}, newObj), member);
                    }
                    newObj.inCro = true; // 标记为受试者
                    break;
                case Role.PATIENT.id:
                case Role.PATIENT_VIP.id:
                    // 科研currentMenuRole为空，医生端currentMenuRole有值，需要属于doctorRole之一才满足条件
                    if (!currentMenuRole || doctorRole.includes(currentMenuRole)) {
                        newObj = __assign(__assign({}, newObj), member);
                    }
                    break;
                case Role.RESEARCH_PROJECT_DOCTOR.id:
                    newObj.researchProjectDoctor = member.name;
                    break;
                case Role.LOWER_DOCTOR.id:
                    newObj.lowerDoctor = member.name;
                    break;
                case Role.UPPER_DOCTOR.id:
                    newObj.upperDoctor = member.name;
                    break;
                case Role.ORG.id:
                    newObj.organizationName = member.name;
                    newObj.organizationNSId = member.nsId;
                    break;
                case Role.RESEARCH_PROJECT.id:
                    newObj.projectName = member.name;
                    break;
                case Role.PATIENT_YL.id:
                case Role.PATIENT_YL_VIP.id:
                    newObj.isYlPatient = true;
                    break; // 1表示此患者为养老患者
                default:
                    break;
            }
        });
        newObj.team = team;
        newPatients.push(newObj);
    });
    return newPatients;
};
// 获取成员列表、邀请成员列表、架构里的表格数据均使用此方法
export var handleInviteMemberList = function (dataSource) {
    var newData = [];
    dataSource.forEach(function (item) {
        var _a;
        var _b = item.subjectDetail || {}, title = _b.title, avatarUrl = _b.avatarUrl, firstProfessionCompany = _b.firstProfessionCompany, firstPracticeDepartment = _b.firstPracticeDepartment, name = _b.name, tel = _b.tel, provinceName = _b.provinceName, sex = _b.sex;
        newData.push(__assign(__assign({}, item), { title: title,
            avatarUrl: avatarUrl,
            name: name, joinTime: ((_a = item === null || item === void 0 ? void 0 : item.interval) === null || _a === void 0 ? void 0 : _a.start) ? dayjs(item.interval.start).format('YYYY-MM-DD') : null, status: projectInviteStatus[item.status], tel: tel,
            provinceName: provinceName, sex: sexList[sex], firstProfessionCompany: firstProfessionCompany,
            firstPracticeDepartment: firstPracticeDepartment, role: fetchRolePropValue(item.role, 'desc'), roleId: item.role }));
    });
    console.log('newData', newData);
    return newData;
};
// cro邀请研究者参与管理数据处理使用此方法
export var handleTeamInviteMemberList = function (dataSource) {
    var newData = [];
    // console.log('handleTeamInviteMemberList dataSource', dataSource);
    dataSource.forEach(function (team) {
        var doctor = {};
        team.members.forEach(function (item) {
            var _a;
            if (item.role === Role.DOCTOR.id) {
                doctor = __assign(__assign({ orgs: (doctor === null || doctor === void 0 ? void 0 : doctor.orgs) || [] }, item), { status: (_a = projectInviteStatus[item.status]) !== null && _a !== void 0 ? _a : '未邀请' });
                // 医生所在的互联网医院
            }
            else if (item.role === Role.ORG.id) {
                if (doctor.orgs) {
                    doctor.orgs.push(item);
                    doctor.orgName = doctor.orgs.map(function (org) { return org.name; }).join(',');
                }
                else {
                    doctor = __assign(__assign({}, doctor), { orgs: [item], orgName: item.name });
                }
            }
        });
        newData.push(doctor);
    });
    // console.log('handleTeamInviteMemberList newData', newData);
    return newData;
};
// 九品管理端-服务人员列表和会员列表
export var handlePersonnewList = function (dataSource) {
    console.log('dataSource333', dataSource);
    var newData = [];
    dataSource.forEach(function (item) {
        var curItem = __assign(__assign({}, item.members[0]), { nroleTags: [], teamNSId: item.teamNSId, department: item.name });
        // 一个人有多个角色，这里把角色集合到roles里
        item.members.forEach(function (memberItem) {
            if (memberItem === null || memberItem === void 0 ? void 0 : memberItem.nroleTags) {
                curItem.nroleTags = __spreadArray(__spreadArray([], __read(curItem.nroleTags)), __read(memberItem === null || memberItem === void 0 ? void 0 : memberItem.nroleTags));
            }
        });
        newData.push(curItem);
    });
    console.log('newData3', newData);
    return newData;
};
var handleDoctorTeamDataSource = function (dataSource) {
    var res = [];
    // dataSource
    //   .map((member) => member.members[0])
    //   .forEach((member) => {
    //     const tmp = { ...member };
    //     tmp.patientNum = member.counters[0]?.count;
    //     res.push(tmp);
    //   });
    dataSource.forEach(function (item) {
        var doctor = { depHeadDoctor: false };
        item.members.forEach(function (member) {
            var _a;
            if (member.role === Role.DOCTOR.id || !member.role) {
                doctor = __assign(__assign({}, member), { patientNum: (_a = member.counters[0]) === null || _a === void 0 ? void 0 : _a.count });
            }
            else if (member.role === Role.DEP_HEAD.id) {
                doctor.depHeadDoctor = true;
                doctor.depHeadDoctorWcId = member.wcId;
            }
        });
        res.push(doctor);
    });
    return res;
};
var handleNurseTeamDataSource = function (dataSource) {
    var res = [];
    res = dataSource.map(function (member) { return member.members[0]; });
    return res;
};
var handlePatientTeamDataSource = function (dataSource) {
    var res = [];
    dataSource.forEach(function (datum) {
        // console.log(datum);
        var tmp = {};
        datum.members.forEach(function (member) {
            var curRole = fetchRolePropValue(member.role, 'key');
            // console.log(curRole);
            if (['patient', 'patient_vip'].includes(curRole)) {
                tmp = __assign({}, member);
            }
            else if (curRole === 'lower_doctor') {
                tmp.lower_doctor = member.name;
            }
            else if (['upper_doctor', 'sys_doctor', 'alone_doctor'].includes(curRole)) {
                tmp.upper_doctor = member.name;
                tmp.upper_wcId = member.wcId;
                tmp.upper_sid = member.sid;
            }
        });
        res.push(tmp);
    });
    // console.log('handlePatientTeamDataSource res', res);
    return res;
};
export var handleRelatedDoctorsDataSource = function (dataSource) {
    var doctors = [];
    dataSource.forEach(function (dataItem) {
        var doctor = {};
        dataItem.members.forEach(function (item) {
            if (item.role === Role.DOCTOR.id) {
                doctor = __assign({ orgs: (doctor === null || doctor === void 0 ? void 0 : doctor.orgs) || [] }, item);
                // 医生所在的互联网医院
            }
            else if (item.role === Role.ORG.id) {
                if (doctor.orgs) {
                    doctor.orgs.push(item);
                }
                else {
                    doctor = __assign(__assign({}, doctor), { orgs: [item] });
                }
            }
        });
        doctors.push(doctor);
    });
    return doctors;
};
export var handleTableDataSource = function (dataKey, dataSource, category) {
    // console.log('dataSource', dataSource);
    // console.log('dataKey', dataKey);
    // console.log('category', category);
    // console.log('Role.DOCTOR.id', Role.DOCTOR.id);
    // console.log('Role.PATIENT_VIP.id', Role.PATIENT_VIP.id);
    // console.log('Role.PATIENT.id', Role.PATIENT.id);
    switch (dataKey) {
        case 'teams':
            if (category === 'patientList') {
                return handlePatientsTeamDataSource(dataSource);
            }
            if (Role.DOCTOR.id === category) {
                return handleDoctorTeamDataSource(dataSource);
            }
            if ([Role.NURSE.id].includes(category)) {
                return handleNurseTeamDataSource(dataSource);
            }
            if ([Role.PATIENT.id, Role.PATIENT_VIP.id].includes(category)) {
                return handlePatientTeamDataSource(dataSource);
            }
            if (category === 'relatedDoctors') {
                return handleRelatedDoctorsDataSource(dataSource);
            }
            if (category === 'inviteMemberList') {
                return handleTeamInviteMemberList(dataSource);
            }
            if (category === 'jp-personnel') {
                return handlePersonnewList(dataSource);
            }
            return dataSource;
        case 'infos':
            return handleInviteMemberList(dataSource);
        case 'indexTable':
            return dataSource;
        default:
            return dataSource;
    }
};
export var handleTableRowKey = function (dataKey, record) {
    switch (dataKey) {
        case 'teams':
            return record.sid;
        case 'infos':
            return record.subjectId;
        case 'images':
        case 'events':
        case 'sendRecordList':
            return record.id;
        default:
            return record.sid || record.id;
    }
};
export default handlePatientsTeamDataSource;
