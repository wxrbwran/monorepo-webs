import { Role } from 'xzl-web-shared/dist/src/utils/role';

interface ITeam {
  members: ISubject[];
}

// 获取患者列表（做为独立、主管医生、医生助手的患者列表）
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
        default: break;
      }
    });
    newPatients.push(newObj);
  });
  return newPatients;
};

export const handleTableDataSource = (
  dataKey: string,
  dataSource: Store[],
  category?: string,
) => {
  // console.log('dataSource', dataSource);
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
    case 'images':
      return record.id;
    default:
      return record.sid;
  }
};

export default handlePatientsTeamDataSource;
