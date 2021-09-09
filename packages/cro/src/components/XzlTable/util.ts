import { fetchRolePropValue } from '@/utils/role';
import { accountStatus, sexList } from '@/utils/consts';
import dayjs from 'dayjs';
import { CommonData, ISubject, Store } from 'typings/global';
import { Role } from '@/utils/role';

// 患者管理、受试者管理、小组受试者列表
const handlePatientTeamDataSource = (dataSource: Store[]) => {
  const res: Store[] = [];
  dataSource.forEach((datum) => {
    let tmp: CommonData = {};
    datum.members.forEach((member: Store) => {
      switch (member.role) {
        case Role.PROJECT_PATIENT.id: // 受试列表
        case Role.PATIENT.id: // 全部患者列表
        case Role.PATIENT_VIP.id: // 全部患者列表
          tmp = { ...tmp, ...member }; break;
        case Role.RESEARCH_PROJECT_DOCTOR.id:
          tmp.researchProjectDoctor = member.name;
          break;
        default: break;
      }
    });
    res.push(tmp);
  });
  return res;
};
// 获取成员列表、邀请成员列表、架构里的表格数据均使用此方法
export const handleInviteMemberList = (dataSource: Store[]) => {
  const newData: Array<ISubject> = [];
  console.log('dataSource', dataSource)
  dataSource.forEach((item: any) => {
    const { title, avatarUrl, firstProfessionCompany,firstPracticeDepartment, name, tel, provinceName, sex } = item.subjectDetail || {};
    newData.push({
      ...item,
      title,
      avatarUrl,
      name,
      joinTime: item?.interval?.start ? dayjs(item.interval.start).format('YYYY-MM-DD') : null,
      status: accountStatus[item.status],
      tel,
      provinceName,
      sex: sexList[sex],
      firstProfessionCompany,
      firstPracticeDepartment,
      role: fetchRolePropValue(item.role, 'desc'),
      roleId: item.role
    })
  })
  console.log('newData', newData)
  return newData;
}
export const handleTableDataSource = (dataKey: string, dataSource: Store[], category?: string) => {
  switch (dataKey) {
    case 'teams':
      return handlePatientTeamDataSource(dataSource);
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
      return record.subjectId
    case 'events':
    case 'sendRecordList':
      return record.id
    default:
      return record.sid;
  }
};
