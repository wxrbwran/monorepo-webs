export enum UserStatus {
  Accepted = 110, // 已认证
  Refused = 118, // 未通过审核
  InitState = 119, // 待审核,
  ToBeActivated = 117, // 待激活
}

export enum AdviserDoctorStatus {
  FREE = 'FREE',
  WAITING = '待确认',
  CONFIRMED = '已添加',
}

export enum croStatus {
  Running = 1002,
  Stopping = 1001,
}

export default UserStatus;
