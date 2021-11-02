import { Role, fetchRolePropValue } from '../../utils/role';
import { projectInviteStatus, sexList } from '../../utils/consts';
import dayjs from 'dayjs';

// 获取患者列表（做为独立、上级、下级医生的患者列表）
const handlePatientsTeamDataSource = (data: Store[]) => {
  const newPatients: CommonData[] = [];
  let newObj: CommonData = {};
  data.forEach((team: Store) => {
    newObj = {};
    team.members.forEach((member: ISubject) => {
      switch (member.role) {
        case Role.PROJECT_PATIENT.id: // 受试列表
        case Role.PATIENT.id:
        case Role.PATIENT_VIP.id:
          newObj = { ...newObj, ...member };
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
    newObj.team = team;
    newPatients.push(newObj);
  });
  return newPatients;
};

// 获取成员列表、邀请成员列表、架构里的表格数据均使用此方法
export const handleInviteMemberList = (dataSource: Store[]) => {
  const newData: Array<ISubject> = [];
  console.log('dataSource', dataSource);
  dataSource.forEach((item: any) => {
    const { title, avatarUrl, firstProfessionCompany, firstPracticeDepartment, name, tel, provinceName, sex } = item.subjectDetail || {};
    newData.push({
      ...item,
      title,
      avatarUrl,
      name,
      joinTime: item?.interval?.start ? dayjs(item.interval.start).format('YYYY-MM-DD') : null,
      status: projectInviteStatus[item.status],
      tel,
      provinceName,
      sex: sexList[sex],
      firstProfessionCompany,
      firstPracticeDepartment,
      role: fetchRolePropValue(item.role, 'desc'),
      roleId: item.role,
    });
  });
  console.log('newData', newData);
  return newData;
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

const handleNurseTeamDataSource = (dataSource: Store[]) => {
  let res: Store[] = [];
  res = dataSource.map((member) => member.members[0]);
  return res;
};

const handlePatientTeamDataSource = (dataSource: Store[]) => {
  const res: Store[] = [];
  dataSource.forEach((datum) => {
    // console.log(datum);
    let tmp: Record<string, string> = {};
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
export const handleRelatedDoctorsDataSource = (dataSource: Store[]) => {
  const doctors: any[] = [];
  dataSource.forEach((dataItem) => {
    let doctor: any = {};
    dataItem.members.forEach(item => {
      if (item.role === Role.DOCTOR.id) {
        doctor = {
          ...doctor,
          ...item,
        };
        // 医生所在的互联网医院
      } else if (item.role === Role.ORG.id) {
        if (doctor.orgs) {
          doctor.orgs.push(item);
        } else {
          doctor = {
            ...doctor,
            orgs: [item],
          };
        }
      }
    });
    doctors.push(doctor);
  });
  return doctors;
};
export const handleTableDataSource = (dataKey: string, dataSource: Store[], category?: string) => {
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
      if ([Role.NURSE.id].includes(category as string)) {
        return handleNurseTeamDataSource(dataSource);
      }
      if ([Role.PATIENT.id, Role.PATIENT_VIP.id].includes(category as string)) {
        return handlePatientTeamDataSource(dataSource);
      }
      if (category === 'relatedDoctors') {
        return handleRelatedDoctorsDataSource(dataSource);
      }
      return dataSource;
    case 'infos':
      return handleInviteMemberList(dataSource);
    default:
      return dataSource;
  }
};
export const handleTableRowKey = (dataKey: string, record: Store): string => {
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
