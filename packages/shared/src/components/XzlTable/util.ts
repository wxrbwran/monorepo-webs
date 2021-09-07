import { Role, fetchRolePropValue } from '@/utils/role';

interface ITeam {
  members: ISubject[];
}

// 获取患者列表（做为独立、上级、下级医生的患者列表）
const handlePatientsTeamDataSource = (data) => {
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

const handleDoctorTeamDataSource = (dataSource: Store[]) => {
  const res: Store[] = [];
  dataSource
    .map((member) => member.members[0])
    .forEach((member) => {
      const tmp = { ...member };
      tmp.patientNum = member.counters[0]?.count;
      res.push(tmp);
    });
  return res;
};

const handlePatientTeamDataSource = (dataSource: Store[]) => {
  const res: Store[] = [];
  dataSource.forEach((datum) => {
    // console.log(datum);
    let tmp = {};
    datum.members.forEach((member: Store) => {
      const curRole: string = fetchRolePropValue(member.role, 'key') as string;
      // console.log(curRole);
      if (['patient', 'patient_vip'].includes(curRole)) {
        tmp = { ...member };
      } else if (curRole === 'lower_doctor') {
        tmp.lower_doctor = member.name;
      } else if (['upper_doctor', 'sys_doctor', 'alone_doctor'].includes(curRole)) {
        tmp.upper_doctor = member.name;
      }
    });
    res.push(tmp);
  });
  // console.log('handlePatientTeamDataSource res', res);
  return res;
};

export const handleTableDataSource = (dataKey: string, dataSource: Store[], category?: string) => {
  console.log('dataSource', dataSource);
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
export const handleTableRowKey = (dataKey: string, record: Store): string => {
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
