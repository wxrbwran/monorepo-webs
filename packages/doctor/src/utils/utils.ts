// import dayjs from 'dayjs';
import moment from 'moment';
import { Role, fetchRolePropValue } from '@/utils/role';

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

// 获取IM消息角色
export function getRole(role: string) {
  let userRole = '';
  if (role) {
    if (Role[role]) {
      // eslint-disable-next-line prefer-destructuring
      userRole = Role[role].desc.substr(0, 1);
    } else {
      const desc = fetchRolePropValue(role, 'desc')?.substr(0, 1);
      userRole = desc === 'V' ? '患' : desc;
    }
  }
  return userRole;
}

// 得到IM发送者的信息(只要有智能医生角色，发送者就是智能医生，否则以什么角色进的详情页谁就是发送者)
export function getFromDoctorInfo(currSession: IPerson) {
  let fromDoctorInfo:[] = [];
  // 非智能医生
  const doctorInfo = currSession.infos.filter(
    (item) => item.role === window.$storage.getItem('currRoleId'),
  );
  // 智能医生
  const sysDoctorInfo = currSession.infos.filter(
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
