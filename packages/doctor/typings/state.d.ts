// state
declare interface AuthModelState {
  isLogin: boolean;
  uid: string;
}

declare interface UserModelState {
  user: any;
  organizations: {
    teams: any[];
  }
}

declare interface DocumentModelState {
  curDocument: TIndexItem;
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
  sessions: [],
  // 历史消息
  historyMsgs: Store,
  // 音视频
  myNetcall: Store,
  netcallData: {
    netcallStatus: string; // 音视频状态
    type: number; // 1语音 2视频
    avatar: string; // 拨打或来电时的患者头像
    name: string; // 患者姓名
    toast: string; // toast文案
    deviceCheckStatus: number;
  };
}

declare interface IState {
  user: UserModelState;
  auth: AuthModelState;
  im: IMModelState;
  document: DocumentModelState;
}

// state end
