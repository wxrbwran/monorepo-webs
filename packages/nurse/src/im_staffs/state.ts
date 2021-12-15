import { defaultAvatar } from 'xzl-web-shared/dist/utils/consts';

const IMState: IMModelState = {
  // 是否已连接
  connected: false,
  // 操作是否是刷新页面，刷新初始没有nim实例，会导致时序问题
  isRefresh: true,
  // IM相关
  // NIM SDK 实例
  // nim: 直接使用window.nim,
  // 消息列表
  msgs: {}, //
  msgsMap: {}, // 以idClient作为key，诸如消息撤回等的消息查找

  sessionlist: [],
  sessionMap: {},
  // 当前会话ID（即当前聊天列表，只有单聊群聊采用，可用于判别）
  currSessionId: null,
  currSessionMsgs: [],
  // 页面sessionId, 用于关闭会诊聊天后切回页面聊天
  pageSessionId: '',
  // 是否有更多历史消息，用于上拉加载更多
  noMoreHistoryMsgs: {
    // 多聊表历史消息管理
  },
  // 系统消息
  sysMsgs: [],
  customSysMsgs: [],
  sysMsgUnread: {
    total: 0,
  },
  userInfos: {},
  myInfo: {},
  customSysMsgUnread: 0,
  // 临时变量
  endTime: {},

  // 查看图片相关
  images: [],
  imageVisible: false,
  activeImageIndex: 0,

  // 会话组
  sessions: [],
  // 历史消息
  historyMsgs: {},
  myNetcall: {},
  // 通信详情
  netcallData: {
    // 音视频 -s
    // 发起人通话状态：accepted(被接受)，rejected(被拒绝), callOff(取消), noResponse(无应答),
    // 接收人:incomingCall接到来电，accepted(接听), reject(拒绝)，remoteCallOff(对方取消)
    // 通话中： romoteHangUp(对方挂断),currentHangUp(自己挂断或倒计时挂断)
    netcallStatus: '',
    type: 1, // 1语音 2视频
    avatar: defaultAvatar, // 拨打或来电时的患者头像
    name: '', // 患者姓名
    toast: '', // toast文案
    // 音视频设备和webRtc模式或webnet模式是否支持(默认是支持，当检测不支持时，则弹框提示)
    deviceCheckStatus: 1, // 0 不支持，1支持 2检测中
  },
};

export default IMState;
