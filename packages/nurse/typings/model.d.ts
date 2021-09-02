interface AuthModelState {
  wcl: Iwcl[];
  yxRegister: {
    accid: string;
    token: string;
  };
}

interface UserModelState {
  userInfo: ISubject;
  organizations: IOrganizations;
  filterOrgs: []
}

interface CurrentPatientModelState{
  medicalLast: IMedicalList[];
  department: {
    name: string;
    nsId: string;
    nsLabels: string[];
  },
  actionType: string;
  imMsgCount?: number;
  issueCount?: number;
  avatarUrl?: string;
  name?: string;
}
interface IPlan {
  count: number;
  planId: string;
  status: string;
  range: {
    end: number;
    start: number;
  }
}
interface IMedicinePlan {
  medicine: {
    name: string;
    dosageUnitFlag: number;
    medicineId: string;
    status: string;
  },
  plans:IPlan[]
}

interface MedicinesModelState {
  currentMedicinePlans: IMedicinePlan[]
}

interface IssueModelState {
  issueHistoryList: IIssueList[],
  issueHistoryPager: {
    pageAt: number;
    total: number;
  }
}
declare interface IMModelState {
  // 是否已连接
  connected: boolean;
  // 操作是否是刷新页面，刷新初始没有nim实例，会导致时序问题
  isRefresh: boolean;
  // IM相关
  // NIM SDK 实例
  // nim: 直接使用window.nim,
  // 消息列表
  msgs: Store; //
  msgsMap: Store; // 以idClient作为key，诸如消息撤回等的消息查找

  sessionlist: Store;
  sessionMap: Store;
  // 当前会话ID（即当前聊天列表，只有单聊群聊采用，可用于判别）
  currSessionId: null | string;
  currSessionMsgs: Store;
  // 页面sessionId, 用于关闭会诊聊天后切回页面聊天
  pageSessionId: string;
  // 是否有更多历史消息，用于上拉加载更多
  noMoreHistoryMsgs: Store;
  // 系统消息
  sysMsgs: Store;
  customSysMsgs: Store;
  sysMsgUnread: {
    total: number;
  };
  userInfos: Store;
  myInfo: Store;
  customSysMsgUnread: number;
  // 临时变量
  endTime: Store;

  images: { src: string }[];
  imageVisible: boolean;
  activeImageIndex: number;

  // 会话组
  sessions: []
}
interface IState {
  auth: AuthModelState;
  user: UserModelState;
  currentPatient: CurrentPatientModelState;
  medicines: MedicinesModelState;
  issue: IssueModelState;
  im: IMModelState;
}
