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
import { Role } from '@/utils/role';
// 获取患者列表（做为独立、主管、医生助手的患者列表）
var handlePatientsTeamDataSource = function (data) {
    console.log(5432, data);
    var newPatients = [];
    var newObj = {};
    data.forEach(function (team) {
        newObj = {};
        team.members.forEach(function (member) {
            switch (member.role) {
                case Role.PATIENT.id:
                case Role.PATIENT_VIP.id:
                    newObj = __assign(__assign({}, newObj), member);
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
                default: break;
            }
        });
        newPatients.push(newObj);
    });
    return newPatients;
};
export var handleTableDataSource = function (dataKey, dataSource, category) {
    console.log('dataSource', dataSource);
    switch (dataKey) {
        case 'teams':
            if (category === 'patientList') {
                return handlePatientsTeamDataSource(dataSource);
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
        default:
            return record.sid || record.id;
    }
};
export default handlePatientsTeamDataSource;
