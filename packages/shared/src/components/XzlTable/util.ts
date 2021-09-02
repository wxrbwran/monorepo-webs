import { Role } from '@/utils/role';

interface ITeam {
  members: ISubject[];
}

// 获取患者列表（做为独立、上级、下级医生的患者列表）
const handlePatientsTeamDataSource = (data) => {
  console.log(5432, data);
  const newPatients: CommonData[] = [];
  let newObj: CommonData = {};
  data.forEach((team: ITeam) => {
    newObj = {};
    team.members.forEach((member: ISubject) => {
      switch (member.role) {
        case Role.PATIENT.id:
        case Role.PATIENT_VIP.id:
          newObj = { ...newObj, ...member }; break;
        case Role.LOWER_DOCTOR.id:
          newObj.lowerDoctor = member.name; break;
        case Role.UPPER_DOCTOR.id:
          newObj.upperDoctor = member.name; break;
        case Role.ORG.id:
          newObj.organizationName = member.name; break;
        case Role.PATIENT_YL.id:
        case Role.PATIENT_YL_VIP.id:
          newObj.isYlPatient = true; break; // 1表示此患者为养老患者
        default: break;
      }
    });
    newPatients.push(newObj);
  });
  return newPatients;
};

export const handleTableDataSource = (dataKey: string, dataSource: Store[], category?: string) => {
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
export const handleTableRowKey = (dataKey: string, record: Store): string => {
  switch (dataKey) {
    case 'teams':
      return record.sid;
    default:
      return record.sid || record.id;
  }
};

export default handlePatientsTeamDataSource;
