import { fetchRolePropValue, Role } from '@/utils/role';

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

const handleNurseTeamDataSource = (dataSource: Store[]) => {
  let res: Store[] = [];
  res = dataSource.map((member) => member.members[0]);
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
      if (['patient_vip', 'patient'].includes(curRole)) {
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
  console.log('333333category', category)
  switch (dataKey) {
    case 'teams':
      if ([Role.DOCTOR.id].includes(category)) {
        return handleDoctorTeamDataSource(dataSource);
      }
      if ([Role.NURSE.id].includes(category)) {
        return handleNurseTeamDataSource(dataSource);
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
    case 'results':
      return record.sid;
    default:
      return record.id;
  }
};

export default handleTableDataSource;
