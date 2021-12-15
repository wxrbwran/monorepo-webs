// import dayjs from 'dayjs';
import moment from 'moment';
import { Role, fetchRolePropValue } from 'xzl-web-shared/src/utils/role';

export function unique(arr: { id: string, content: string }[]) {
  const result: never[] = [];
  const obj: IIndexObject = {};
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i].id]) {
      result.push(arr[i]);
      obj[arr[i].id] = true;
    }
  }
  return result;
}
// IM消息按时间排序
export function compareMsgs(el) {
  return (m, n) => {
    const a = m[el];
    const b = n[el];
    return a - b;
  };
}
// IM消息去重
// export function uniqueMsgs(arr: {displayTimeHeader: string}[]) {
//   const result: never[] = [];
//   const obj: IIndexObject = {};
//   for (let i = 0; i < arr.length; i++) {
//     const time = dayjs(arr[i].time).format('YYYY-MM-DD hh:mm:ss');
//     if (!obj[time]) {
//       result.push(arr[i]);
//       obj[time] = true;
//     }
//   }
//   return result;
// }
export function uniqueMsgs(arr: []) {
  const result: never[] = [];
  const obj: IIndexObject = {};
  for (let i = 0; i < arr.length; i++) {
    let msgId = '';
    if (typeof (arr[i].custom) === 'string') {
      msgId = JSON.parse(arr[i].custom).msgId;
    } else {
      msgId = arr[i].custom.msgId;
    }
    if (!obj[msgId]) {
      result.push(arr[i]);
      obj[msgId] = true;
    }
  }
  return result;
}

// 待审核问题接口参数
export function getIssueParams(content: any, type: number) {
  return {
    objectId: window.$storage.getItem('patientSid'),
    objectWcId: window.$storage.getItem('patientWcId'),
    patientRoleType: window.$storage.getItem('patientRoleId'),
    roleType: window.$storage.getItem('roleId'),
    content,
    type,
  };
}

export function getCondition(keyName: string, value:any, operator?: string) {
  return {
    var: keyName,
    value,
    operator: operator || '=',
  };
}
// 各角色排序优先级
// 患者 > 科主任 > 独立管理 > 护士 > 研究者 > PM > CRA > CRC
// 患者 > 主管医生 > 医生助手 > 营养师 > 护士 > 研究者 > PM > CRA > CRC

// 当一个医生多个角色时，括号内的排序：
// 独立管理 > 主管医生 > 医生助手 > 营养师 > 药师 >  康复师  > 心理医生  > 护士 >  其他医生 > 研究者 > PM > CRA > CRC
export const imRoleOrder: string[] = [
  Role.PATIENT.id,
  Role.PATIENT_VIP.id,

  Role.DEP_HEAD.id,
  Role.ALONE_DOCTOR.id,
  Role.UPPER_DOCTOR.id,
  Role.LOWER_DOCTOR.id,
  Role.DIETITIAN.id,
  Role.PHARAMCIST.id,
  Role.KANGFUSHI.id,
  Role.PSYCHOLOGIST.id,
  Role.TEAMNURSE.id, // 服务包里的护士角色

  Role.NURSE.id, // im聊天中应该不会出现此角色

  Role.RESEARCH_PROJECT_DOCTOR.id, // 科研项目医生  31
  // Role.PROJECT_RESEARCHER.id, // 研究者  36只有在组织架构里有存在，其余出现，均为31角色
  Role.CRO_PM.id,
  Role.CRO_CRA.id,
  Role.CRO_CRC.id,
];

// 获取IM消息角色
export function getRole(role: string) {
  switch (role) {
    case Role.NURSE.id:
      return '护士';
    case Role.PATIENT.id:
    case Role.PATIENT_VIP.id:
      return '患者';
    case Role.UPPER_DOCTOR.id:
      return '主管医生';
    case Role.ALONE_DOCTOR.id:
      return '独立医生';
    case Role.LOWER_DOCTOR.id:
      return '医助';
    case Role.RESEARCH_PROJECT_DOCTOR.id:
      return '研究者';
    default:
      return fetchRolePropValue(role, 'desc');
  }
}

const roleCompare = (role1: string, role2: string) => (
  imRoleOrder.indexOf(role1) - imRoleOrder.indexOf(role2)
);
export function getRoles(msgCustom: { fromUsers?: { role: string }[], fromUser: { role: string } }) {
  if (msgCustom?.fromUsers) {
    return [...new Set(msgCustom?.fromUsers.map(item => item.role))]
      .sort(roleCompare)
      .map(roleId => getRole(roleId)).join('、');
  } else {
    return getRole(msgCustom?.fromUser?.role) || '';
  }
}

// 得到IM发送者的信息(只要有智能医生角色，发送者就是智能医生，否则以什么角色进的详情页谁就是发送者)
export function getFromDoctorInfo(currSession: IPerson) {
  let fromDoctorInfo:[] = [];
  console.log('currSession', currSession);
  // 非智能医生
  const doctorInfo = currSession.members.filter(
    (item) => item.role === window.$storage.getItem('currRoleId'),
  );
  // 智能医生
  const sysDoctorInfo = currSession.members.filter(
    (item) => item.role === Role.SYS_DOCTOR.id,
  );
  if (sysDoctorInfo[0]?.wcId) {
    fromDoctorInfo = [...sysDoctorInfo];
  } else {
    fromDoctorInfo = [...doctorInfo];
  }
  return [...fromDoctorInfo];
}
// 服药计划时间排序
export function compare(el) {
  return (m, n) => {
    const a = +(moment(m[el].start).format('HH:mm').split(':').join(''));
    const b = +(moment(n[el].start).format('HH:mm').split(':').join(''));
    return a - b;
  };
}

// 我的套餐列表--医疗服务小组列表---根据：我创建的、我参与的、我独立管理做分类
export const formatDoctorTeams = (teams: any[]) => {
  const packs: CommonData = { creator: [], participant: [], alone: [] };
  teams.forEach(teamItem => {
    let isCreator = false;
    let isAloneTeams = false;
    teamItem.innerTeams.forEach((innerItem: { members: ISubject[] }) => {
      innerItem.members.forEach(member => {
        if (member.role === Role.ALONE_DOCTOR.id) {
          isAloneTeams = true;
        }
        if (member.role === Role.NS_OWNER.id && member.sid === window.$storage.getItem('sid')) {
          isCreator = true;
        }
      });
    });
    if (!isAloneTeams) {
      if (isCreator) {
        packs.creator.push(teamItem);
      } else {
        packs.participant.push(teamItem);
      }
    } else {
      packs.alone.push(teamItem);
    }
  });
  return packs;
};
