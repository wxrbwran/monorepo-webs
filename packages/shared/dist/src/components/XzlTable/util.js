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
import { Role, fetchRolePropValue } from '../../utils/role';
// interface ITeam {
//   members: ISubject[];
// }
// 获取患者列表（做为独立、上级、下级医生的患者列表）
var handlePatientsTeamDataSource = function (data) {
    var newPatients = [];
    var newObj = {};
    data.forEach(function (team) {
        newObj = {};
        team.members.forEach(function (member) {
            switch (member.role) {
                case Role.PROJECT_PATIENT.id: // 受试列表
                case Role.PATIENT.id:
                case Role.PATIENT_VIP.id:
                    newObj = __assign(__assign({}, newObj), member);
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
                    break;
                case Role.PATIENT_YL.id:
                case Role.PATIENT_YL_VIP.id:
                    newObj.isYlPatient = true;
                    break; // 1表示此患者为养老患者
                default:
                    break;
            }
        });
        newPatients.push(newObj);
    });
    return newPatients;
};
var handleDoctorTeamDataSource = function (dataSource) {
    var res = [];
    dataSource
        .map(function (member) { return member.members[0]; })
        .forEach(function (member) {
        var _a;
        var tmp = __assign({}, member);
        tmp.patientNum = (_a = member.counters[0]) === null || _a === void 0 ? void 0 : _a.count;
        res.push(tmp);
    });
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
            }
        });
        res.push(tmp);
    });
    // console.log('handlePatientTeamDataSource res', res);
    return res;
};
export var handleTableDataSource = function (dataKey, dataSource, category) {
    console.log('dataSource', dataSource);
    console.log('dataKey', dataKey);
    console.log('category', category);
    console.log('Role.DOCTOR.id', Role.DOCTOR.id);
    console.log('Role.PATIENT_VIP.id', Role.PATIENT_VIP.id);
    console.log('Role.PATIENT.id', Role.PATIENT.id);
    switch (dataKey) {
        case 'teams':
            if (category === 'patientList') {
                return handlePatientsTeamDataSource(dataSource);
            }
            if (Role.DOCTOR.id === category) {
                return handleDoctorTeamDataSource(dataSource);
            }
            if ([Role.PATIENT.id, Role.PATIENT_VIP.id].includes(category)) {
                return handlePatientTeamDataSource(dataSource);
            }
            return dataSource;
        default:
            return dataSource;
    }
};
export var handleTableRowKey = function (dataKey, record) {
    switch (dataKey) {
        case 'teams':
            return record.sid;
        case 'images':
            return record.id;
        default:
            return record.sid || record.id;
    }
};
export default handlePatientsTeamDataSource;
