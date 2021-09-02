/*eslint-disable*/
/*
 * 点对点音视频通话控制逻辑
 * 注：由于融合了WebRTC和Netcall两种音视频sdk，需要进行如下处理
 * 1. 分别初始化两种实例 webrtc(WebRTC) / webnet(Netcall), 注册各种事件
 * 2. 逻辑里真正调用的sdk API需要通过一个 bridge(目前名字叫netcall) 进行桥接选择当前使用的sdk，默认使用 Netcall 方式
 */
/* eslint-disable */
// import WebRTC from '@/lib/NIM/NIM_Web_WebRTC_v8.1.0';
// import Netcall from '@/lib/NIM/NIM_Web_Netcall_v8.1.0';
// import WebRTC from '@/lib/NIM/NIM_Web_WebRTC_v6.2.0';   // 6.2.0存在问题，a给b拨打通话成功后，b点击挂断后，a收不到挂断推送
// import Netcall from '@/lib/NIM/NIM_Web_Netcall_v6.2.0';
import { message } from 'antd';
import { getDvaApp } from 'umi';

function NetcallBridge(this: any) {
  // Netcall 实例
  this.netcall = null;
  // 呼叫超时检查定时器
  this.callTimer = null;
  // 被呼叫超时检查定时器
  this.beCallTimer = null;
  // 音频或视频通话
  this.type = null;
  // 是否处于通话流程中
  this.netcallActive = false;
  // 通话的channelId
  this.channelId = null;
  // 通话流程的另一方账户
  this.netcallAccount = '';
  // 通话时长
  this.netcallDuration = 0;
  // 通话正式开始时间戳
  this.netcallStartTime = 0;
  // 通话时长定时器
  this.netcallDurationTimer = null;
  // 音视频流配置
  this.sessionConfig = {
    videoQuality: window.Netcall.CHAT_VIDEO_QUALITY_480P,
    videoFrameRate: window.Netcall.CHAT_VIDEO_FRAME_RATE_NORMAL,
    videoBitrate: 0,
    recordVideo: false,
    recordAudio: false,
    highAudio: false,
  };
  // 是否开启摄像头输入
  this.deviceVideoInOn = true;
  // 是否开启音频输入
  this.deviceAudioInOn = true;
  // 是否开启扬声器输出
  this.deviceAudioOutOn = true;
  // 是否全屏状态
  this.isFullScreen = false;

  // 本地agent连接状态
  this.signalInited = false;
  // agent程序下载地址
  this.agentDownloadUrl = 'https://yx-web-nosdn.netease.im/package/1543999612/WebAgent_Setup_V2.9.0.1204.zip';
  // 多人音视频的缓存对象
  this.meetingCall = {};
  // 当前视频状态，是桌面共享还是视频: video / window / screen
  this.videoType = 'video';

  this.isRtcSupported = this.displayCallMethodUI();
  // this.signalInited = false;

  // 通话方式选择，是WebRTC还是Netcall，每次发起通话都要进行选择, 值有: WebRTC / Netcall
  this.callMethod = '';
  // 通话方式选择，是WebRTC还是Netcall，第一次进行选择后记住选择
  this.callMethodRemember = '';

  // 真正业务调用的 API 桥, 在进行通话方式选择之后赋值对应的实例
  this.netcall = null;

  // 开始初始化
  this.init();
}

const fn = NetcallBridge.fn = NetcallBridge.prototype;
fn.showToast = (toast: string, netcallStatus: string) => {
  getDvaApp()._store.dispatch({
    type: 'im/UPDATE_NETCALL_DATA',
    payload: {
      toast,
    },
  });
  setTimeout(() => {
    getDvaApp()._store.dispatch({
      type: 'im/UPDATE_NETCALL_STATUS',
      payload: '',
    });
    getDvaApp()._store.dispatch({
      type: 'im/UPDATE_NETCALL_DATA',
      payload: {
        toast: ''
      },
    });
  }, 2000);
}
// 更新视频画面显示尺寸
// 修改代码为已用。需求：默认大图为自己的图像，对方为小图。
// 这里改用isRemoteBig参数来判断谁大谁小。ui点击切换大小按钮，直接根据状态传此参数即可
// 如果通过class类名判断，会有渲染延迟状况出现。（即：这里在获取属性，可是dom并没有渲染成最新的class）
fn.updateVideoShowSize = function (local: boolean, remote: boolean, isRemoteBig = false) {
  const bigSize = {
    cut: true,
    width: this.isFullScreen ? 900 : 713,
    height: this.isFullScreen ? 500 : 541,
  };
  const smallSize = {
    cut: true,
    width: this.isFullScreen ? 240 : 90,
    height: this.isFullScreen ? 180 : 160,
  };

  if (local) {
    // var isBig = document.getElementById('VIDEO_CURRENT')?.getAttribute('class') === 'video_big';
    // console.log('local big?', isBig, isBig ? bigSize : smallSize);
    this.netcall.setVideoViewSize(isRemoteBig ? smallSize : bigSize);
  }
  if (remote) {
    // var isBig = document.getElementById('VIDEO_REMOTE')?.getAttribute('class') === 'video_big';
    // console.log('remote big?', isBig, isBig ? bigSize : smallSize);
    this.netcall.setVideoViewRemoteSize(isRemoteBig ? bigSize: smallSize );
  }
};
fn.init = function () {
  // this.initEvent();
  // console.log('this', this);
  // console.log('this.initNetcall', this.initNetcall);

  this.initNetcall();
};

/** 页面卸载事件 */
fn.beforeunload = function (e: any) {
  if (!this.netcall || !this.netcall.calling) return;

  if (this.meetingCall.channelName) {
    this.leaveChannel();
  } else {
    this.hangup();
  }

  // var confirmationMessage = "\o/";

  // e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
  // return confirmationMessage;
};

/** 初始化p2p音视频响应事件 */
fn.initNetcall = function () {
  const NIM = window.SDK.NIM;
  // var Netcall = window.Netcall;
  // var WebRTC = window.WebRTC;
  NIM.use(window.WebRTC);
  NIM.use(window.Netcall);

  const that = this;

  // const isRtcSupported = rtcSupport.support;
  const isRtcSupported = this.isRtcSupported;
  // 默认使用agent模式
  // console.log('window.rtcSupport', window.rtcSupport);
  if (isRtcSupported) {
    // 初始化webrtc
    window.webrtc = this.webrtc = WebRTC.getInstance({
      nim: window.nim,
      container: document.getElementById('VIDEO_CURRENT'),
      remoteContainer: document.getElementById('VIDEO_REMOTE'),
      debug: process.env.NODE_ENV !== 'production',
    });
    this.initWebRTCEvent();
    this.netcall = this.webrtc;
    this.callMethod = 'webrtc';
  } else {
    // 初始化netcall
    window.webnet = this.webnet = Netcall.getInstance({
      nim: window.nim,
      mirror: false,
      mirrorRemote: false,
      /* kickLast: true, */
      container: document.getElementById('VIDEO_CURRENT'),
      remoteContainer: document.getElementById('VIDEO_REMOTE'),
    });
    this.initNetcallEvent();
    this.netcall = this.webnet;
    this.callMethod = 'webnet';
  }
};

/** 初始化webrtc事件 */
fn.initWebRTCEvent = function () {
  const webrtc = window.webrtc;
  // console.log('rtc');
  const that = this;
  // 对方接受通话 或者 我方接受通话，都会触发
  webrtc.on('callAccepted', (obj: object) => {
    console.log('callAccepted');
    if (this.callMethod !== 'webrtc') return;
    this.onCallAccepted(obj);
  });
  webrtc.on('callRejected', (obj: object) => {
    console.log('callRejected');
    if (this.callMethod !== 'webrtc') return;
    console.log('callRejected');

    this.onCallingRejected(obj);
  });
  webrtc.on('signalClosed', () => {
    console.log('signal closed1');
    if (this.callMethod !== 'webrtc') return;
    console.log('signal closed');
    this.signalInited = false;
    console.log('信令断开了');
    this.showTip('信令断开了', 2000, () => {
      this.beCalling = false;
      this.beCalledInfo = null;
      this.netcall.hangup();
      this.resetWhenHangup();
    });
  });
  webrtc.on('rtcConnectFailed', () => {
    console.log('rtcConnectFailed111');
    if (this.callMethod !== 'webrtc') return;
    console.log('rtcConnectFailed');
    console.log('连接中断');
    this.log('rtc 连接中断');
    // this.showTip("通话连接断开了", 2000, function () {
    //   this.beCalling = false;
    //   this.beCalledInfo = null;
    //   this.netcall.hangup();
    //   this.hideAllNetcallUI();
    // }.bind(this));
  });

  webrtc.on('beCalling', (obj: object) => {
    console.log('beCalling11');
    // if (this.callMethod !== 'webrtc' || window.yunXin.WB.session.length !== 0) return
    this.onBeCalling(obj);
  });
  webrtc.on('control', (obj: object) => {
    // if (this.callMethod !== 'webrtc' || window.yunXin.WB.session.length !== 0) return
    console.log('controlcontrol1');
    this.onControl(obj);
  });
  webrtc.on('hangup', (obj: object) => {
    // if (this.callMethod !== 'webrtc' || window.yunXin.WB.session.length !== 0) return
    this.onHangup(obj);
  });
  // webrtc.on("heartBeatError", function (obj) {
  //   // if (this.callMethod !== 'webrtc' || window.yunXin.WB.session.length !== 0) return
  //   console.log("heartBeatError,要重建信令啦");
  // }.bind(this));
  webrtc.on('callerAckSync', (obj: object) => {
    // if (this.callMethod !== 'webrtc' || window.yunXin.WB.session.length !== 0) return
    this.onCallerAckSync(obj);
  });
  // webrtc.on("netStatus", function (obj) {
  //   // if (this.callMethod !== 'webrtc' || window.yunXin.WB.session.length !== 0) return
  //   // console.log("on net status:", obj);
  // }.bind(this));
  // webrtc.on("statistics", function (obj) {
  //   // if (this.callMethod !== 'webrtc' || window.yunXin.WB.session.length !== 0) return
  //   // console.log("on statistics:", obj);
  // }.bind(this));
  webrtc.on('audioVolume', (obj: object) => {
    if (this.callMethod !== 'webrtc' || window.yunXin.WB.session.length !== 0) return;
    console.log(JSON.stringify(obj));
    console.log('on audioVolume:', obj);
    /** 如果是群聊，转到多人脚本处理 */
    if (this.netcall.calling && this.yx.crtSessionType === 'team' && this.meetingCall.channelName) {
      this.updateVolumeBar(obj);
    }
  });
  webrtc.on('remoteTrack', (obj: any) => {
    console.log('remoteTrack', this.callMethod);
    if (this.callMethod !== 'webrtc') return;
    this.startRemoteStream(obj);
    console.log('on remoteTrack', obj);
    if (obj.track && obj.track.kind === 'audio') {
      that.setDeviceAudioOut(true);
    }
    if (obj.track && obj.track.kind === 'video') {
      // 重新设置尺寸
      this.startRemoteStream(obj);
      // this.updateVideoShowSize(true, true)
    }
  });
  // webrtc.on('leaveChannel', function (obj) {
  //   if (this.callMethod !== 'webrtc'
  //     // || window.yunXin.WB.session.length !== 0
  //   ) return
  //   console.log('leaveChannel', obj)
  //   // that.onLeaveChannel(obj);
  // }.bind(this))
};

/** 初始化netcall事件 */
fn.initNetcallEvent = function () {
  // console.log('webnet')
  const webnet = window.webnet;
  const that = this;
  // 对方接受通话 或者 我方接受通话，都会触发
  webnet.on('callAccepted', (obj: object) => {
    if (this.callMethod !== 'webnet') return;
    this.onCallAccepted(obj);
  });
  webnet.on('callRejected', (obj: object) => {
    if (this.callMethod !== 'webnet') return;
    this.onCallingRejected(obj);
  });

  webnet.on('signalClosed', () => {
    if (this.callMethod !== 'webnet') return;

    console.log('signal closed');
    this.signalInited = false;
  });
  webnet.on('devices', (obj: object) => {
    if (this.callMethod !== 'webnet') return;

    console.log('on devices:', obj);
    // this.checkDeviceStateUI();
  });
  webnet.on('deviceStatus', (obj: object) => {
    if (this.callMethod !== 'webnet') return;
    console.log('on deviceStatus:', obj);
    // this.checkDeviceStateUI();
  });
  webnet.on('beCalling', (obj: object) => {
    if (this.callMethod !== 'webnet') return;
    this.onBeCalling(obj);
  });
  webnet.on('control', (obj: object) => {
    if (this.callMethod !== 'webnet') return;
    this.onControl(obj);
  });
  webnet.on('hangup', (obj: object) => {
    if (this.callMethod !== 'webnet') return;
    this.onHangup(obj);
  });
  webnet.on('heartBeatError', (obj: object) => {
    if (this.callMethod !== 'webnet') return;
    console.log('heartBeatError,要重建信令啦');
  });
  webnet.on('callerAckSync', (obj: object) => {
    if (this.callMethod !== 'webnet') return;
    this.onCallerAckSync(obj);
  });

  webnet.on('netStatus', (obj: object) => {
    if (this.callMethod !== 'webnet') return;
    // console.log("on net status:", obj);
  });
  webnet.on('statistics', (obj: object) => {
    if (this.callMethod !== 'webnet') return;
    // console.log("on statistics:", obj);
  });
  webnet.on('audioVolume', (obj: object) => {
    if (this.callMethod !== 'webnet' || (!this.beCalling && !this.calling && !this.netcallActive)) return;
  });
  webnet.on('streamResize', function () {
    if (this.callMethod !== 'webnet') return;
    console.log('stream resize', arguments);
  }.bind(this));
  webnet.on('joinChannel', (obj: object) => {
    if (this.callMethod !== 'webnet') return;
    // type多人没用
    console.log('user join', obj);
    // that.onJoinChannel(obj);
  });
  webnet.on('leaveChannel', (obj: object) => {
    if (this.callMethod !== 'webnet') return;
    console.log('sb leaveChannel', obj);
    // that.onLeaveChannel(obj);
  });
};

fn.onControl = function (obj: any) {
  console.log('on control:', obj);
  const netcall = this.netcall;
  // 如果不是当前通话的指令, 直接丢掉
  if (netcall.notCurrentChannelId(obj)) {
    this.log('非当前通话的控制信息');
    return;
  }
  const type = obj.type;
  switch (type) {
    // NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON 通知对方自己打开了音频
    case Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON:
      this.log('对方打开了麦克风');
      break;
    // NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF 通知对方自己关闭了音频
    case Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF:
      this.log('对方关闭了麦克风');
      break;
    // NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON 通知对方自己打开了视频
    case Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON:
      this.log('对方打开了摄像头');
      // this.$videoRemoteBox.toggleClass("empty", false).find(".message").text("");
      // if (this.isRtcSupported) {
      // p2p
      // if (this.yx.crtSessionType === 'p2p') {
      this.startRemoteStream();
      // } else {
      //   // team
      //   this.startRemoteStreamMeeting(obj.account);
      // }
      // }
      this.updateVideoShowSize(true, true);
      break;
    // NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF 通知对方自己关闭了视频
    case Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF:
      this.log('对方关闭了摄像头');
      // this.$videoRemoteBox.toggleClass("empty", true).find(".message").text("对方关闭了摄像头");
      // if (this.isRtcSupported) {
      // p2p
      // if (this.yx.crtSessionType === 'p2p') {
      return this.stopRemoteStream();
      // }
      // // team
      // this.stopRemoteStreamMeeting(obj.account);
      // }
      break;
    // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT 拒绝从音频切换到视频
    case Netcall.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT:
      this.log('对方拒绝从音频切换到视频通话');
      this.requestSwitchToVideoRejected();
      break;
    // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO 请求从音频切换到视频
    case Netcall.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO:
      this.log('对方请求从音频切换到视频通话');
      if (this.requestSwitchToVideoWaiting) {
        this.doSwitchToVideo();
      } else {
        this.beingAskSwitchToVideo();
      }
      break;
    // NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE 同意从音频切换到视频
    case Netcall.NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE:
      this.log('对方同意从音频切换到视频通话');
      if (this.requestSwitchToVideoWaiting) {
        this.doSwitchToVideo();
      }
      break;
    // NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO 从视频切换到音频
    case Netcall.NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO:
      this.log('对方请求从视频切换为音频');
      this.doSwitchToAudio();
      break;
    // NETCALL_CONTROL_COMMAND_BUSY 占线
    case Netcall.NETCALL_CONTROL_COMMAND_BUSY:
      this.log('对方正在通话中');
      console.log(new Date());
      // this.log("取消通话");
      // this.netcall.hangup();
      // this.clearCallTimer();
      // this.isBusy = true;
      // this.sendLocalMessage("对方正在通话中");
      // const doEnd = () => {
      //   this.cancelCalling();
      // }
      // if (this.afterPlayRingA) {
      //   this.afterPlayRingA = function () {
      //     this.playRing("C", 3, function () {
      //       this.showTip("对方正在通话中", 2000, doEnd);
      //     }.bind(this));
      //   }.bind(this);
      // } else {
      //   this.clearRingPlay();
      //   this.playRing("C", 3, function () {
      //     this.showTip("对方正在通话中", 2000, doEnd);
      //   }.bind(this));
      // }
      break;
    // NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID 自己的摄像头不可用
    case Netcall.NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID:
      this.log('对方摄像头不可用');
      this.$videoRemoteBox.toggleClass('empty', true).find('.message').text('对方摄像头不可用');
      if (this.isRtcSupported) {
        // p2p
        if (this.yx.crtSessionType === 'p2p') {
          return this.stopRemoteStream();
        }
        // team
        this.stopRemoteStreamMeeting(obj.account);
      }
      break;
    // NETCALL_CONTROL_COMMAND_SELF_ON_BACKGROUND 自己处于后台
    // NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED 告诉发送方自己已经收到请求了（用于通知发送方开始播放提示音）
    // NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_START 通知对方自己开始录制视频了
    // NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_STOP 通知对方自己结束录制视频了
  }
};

fn.stopLocalStream = function () {
  this.log('停止本地流显示 stopLocalStream');
  try {
    this.netcall.stopLocalStream();
  } catch (e) {
    this.log('停止本地流失败');
    console && console.warn && console.warn(e);
  }
};
fn.stopRemoteStream = function () {
  this.log('停止远端流显示 stopRemoteStream');
  try {
    this.netcall.stopRemoteStream();
  } catch (e) {
    this.log('停止远端流失败');
    console && console.warn && console.warn(e);
  }
};
fn.startLocalStream = function (node: React.ReactElement) {
  // node = node || this.$netcallBox.find(".netcall-video-local")[0]
  node = node || document.getElementById('VIDEO_CURRENT');
  console.log('%%%%%%%%%node', node);
  this.log('开启本地流显示 startLocalStream');
  try {
    this.netcall.startLocalStream(node);
  } catch (e) {
    this.log('开启本地流失败');
    console && console.warn && console.warn(e);
  }
};
fn.startRemoteStream = function (obj: any) {
  this.log('开启远端流显示 startRemoteStream');
  obj = obj || {};
  obj.node = obj.node || document.getElementById('VIDEO_REMOTE');
  // obj.node = document.getElementById('VIDEO_REMOTE')
  console.log('obj', obj);
  try {
    this.netcall.startRemoteStream(obj);
    this.updateVideoShowSize(false, true);
  } catch (e) {
    this.log('开启远端流失败');
    console && console.warn && console.warn(e);
  }
};

/** 同意音视频通话, 兼容多人音视频 --目前没用这个方法，直接callAcceptedResponse */
fn.accept = function (e) {
  // 如果在转圈的状态，忽略
  // if (this.$beCallingAcceptButton.hasClass('loading')) return
  const that = this;
  if (!this.beCalling) return;
  this.xzlDevicesCheck(this.callAcceptedResponse.bind(this), this.type);
};

// 无需 dispatch   onCallAccepted此方法处理-- 对方接受通话 或者 我方接受通话，都会触发
//  点击接听，先到此方法，当同意会话成功，会走到onCallAccepted方法
/** 同意通话的操作 */
fn.callAcceptedResponse = function () {
  if (!this.beCalling) return;
// 接听通话
  this.clearRingPlay();
  this.clearBeCallTimer();
  this.log('同意对方音视频请求');
  console.log('this.beCalledInfo', this.beCalledInfo)
  console.log('this.sessionConfig', this.sessionConfig)
  this.netcall.response({
    accepted: true,
    beCalledInfo: this.beCalledInfo,
    sessionConfig: this.sessionConfig,
  }).then(() => {
    this.log('同意对方音视频请求成功');
    this.beCalling = false;
    // 加个定时器 处理点击接听了 实际上对面杀进程了，没有callAccepted回调
    this.acceptAndWait = true;
    setTimeout(() => {
      if (this.acceptAndWait) {
        this.log('通话建立过程超时');
        this.hangup('overtime');
        this.acceptAndWait = false;
      }
    }, 45 * 1000);
  }).catch((err: any) => {
    this.log('同意对方音视频通话失败，转为拒绝');
    message.error('同意对方音视频通话失败，转为拒绝');
    console.log('error info:', err);
    this.reject();
  });
};
/** 拒绝音视频通话, 兼容多人音视频 */
fn.reject = function () {
  if (!this.beCalling) return;
  this.clearBeCallTimer();
  this.log("拒绝对方音视频通话请求");
  var beCalledInfo = this.beCalledInfo;
  this.netcall.response({
      accepted: false,
      beCalledInfo: beCalledInfo
  }).then(function () {
      this.log("拒绝对方音视频通话请求成功");
      this.showToast('已拒绝','reject');
      this.clearRingPlay();
      this.beCalledInfo = null;
      this.beCalling = false;
      this.netcallActive = false;
      // this.hideAllNetcallUI();
  }.bind(this)).catch(function (err) {
      // 自己断网了
      this.log("拒绝对方音视频通话请求失败");
      console.log("error info:", err);
      this.beCalledInfo = null;
      this.beCalling = false;
      // this.hideAllNetcallUI();
  }.bind(this));

};

// 挂断通话过程
fn.hangup = function (source) {
  this.beCalledInfo = null;
  this.beCalling = false;
  this.netcallActive = false;
  // this.setDeviceAudioOut(false);
  // this.setDeviceVideoIn(false);
  this.stopRemoteStream();
  this.stopLocalStream();
  this.netcall.hangup();
  if (source && source === 'hangup') {
    this.showToast('通话结束','currentHangUp');
  } else if (source && source === 'cancel') {
    this.showToast('通话已取消','callOff');
  } else if (source && source === 'overtime') {
    this.showToast('通话建立过程超时','overtime');
  }
  this.clearCallTimer();
  this.clearRingPlay();
  /** 状态重置 */
  this.resetWhenHangup();
};

/** 音视频通信状态重置 */
fn.resetWhenHangup = function () {
  console.log('resetWhenHangup');
  /** 放开通道 */
  this.channelId = null;
  this.signalInited = false;
  this.netcall && this.netcall.stopSignal && this.netcall.stopSignal();
  this.isFullScreen = false;
  this.videoType = null;
  /** 设置自己空闲 */
  this.netcallActive = false;
  this.netcallAccount = '';
  this.isFullScreen = false;

  /** 关闭呼叫响铃 */
  this.clearRingPlay();

  /** 关闭各种计时器 */
  this.meetingCall.waitingTimer && clearTimeout(this.meetingCall.waitingTimer);
  this.meetingCall.volumeStatusTimer && window.cancelAnimationFrame(this.meetingCall.volumeStatusTimer);
  // this.clearDurationTimer();

  this.meetingCall = {
    inited: this.meetingCall.inited,
    $box: this.meetingCall.$box,
  };

  if (!this.meetingCall.channelName) return;
};

// 其它端已处理
fn.onCallerAckSync = function (obj) {
  console.log('其它端已处理');
  if (this.beCalledInfo && obj.channelId === this.beCalledInfo.channelId) {
    console.log('on caller ack async:', obj);
    // message.warn('其它端已处理');
    // getDvaApp()._store.dispatch({
    //   type: 'im/UPDATE_NETCALL_STATUS',
    //   payload: 'onCallerAckSync', // 其它端已处理
    // });
    this.showToast('其它端已处理','onCallerAckSync');
    // this.showTip("其它端已处理", 2000, function () {
    // this.sendLocalMessage("其它端已处理");
    this.beCalledInfo = false;
    this.beCalling = false;
    this.netcallActive = false;
    this.clearRingPlay();
    this.clearBeCallTimer();
    // this.hideAllNetcallUI();
    // }.bind(this));
  }
};
// 对方挂断通话过程
// 1. 通话中挂断
// 2. 请求通话中挂断
fn.onHangup = function (obj) {
  // this.log("收到对方挂断通话消息");
  console.log('on hange up', obj);
  console.log(this.beCalling, this.beCalledInfo, this.netcallDurationTimer);
  // // 是否挂断当前通话
  if (obj.account && obj.account !== this.netcallAccount) {
    console.log('obj.account', obj.account);
    console.log('this.netcallAccount', this.netcallAccount);
    return false;
  }
  this.clearCallTimer();
  this.clearRingPlay();
  this.clearBeCallTimer();
  if (!!this.beCalling) {
    // if (obj.type === 2) {
    //   message.warn('对方取消了此次视频通话');
    // } else {
    //   message.warn('对方取消了此次语音通话');
    // }
    // getDvaApp()._store.dispatch({
    //   type: 'im/UPDATE_NETCALL_STATUS',
    //   payload: 'remoteCallOff', // 来电未接通，对方取消
    // });
    this.showToast(`对方取消了此次${obj.type === 1 ? '语音' : '视频'}通话`,'remoteCallOff');
  } else {
    // message.warn('对方已挂断');
    // getDvaApp()._store.dispatch({
    //   type: 'im/UPDATE_NETCALL_STATUS',
    //   payload: 'remoteHangUp', // 来电接通，通话中挂断
    // });
    this.showToast('对方已挂断','remoteHangUp');
  }
  this.beCalling = false;
  this.netcallActive = false;
  close.call(this);
  function close() {
    // 对方 已挂断
    // this.hideAllNetcallUI();
    // this.setDeviceVideoIn(false);
    // this.setDeviceAudioIn(false);
    // this.setDeviceAudioOut(false);
    /** 状态重置 */
    this.resetWhenHangup();
  }
};
// 打开当前音视频通话对象的聊天窗口
fn.doOpenChatBox = function () {
  const account = this.netcallAccount;
  if (!account) {
    if (this.showTipTimer) {
      clearTimeout(this.showTipTimer);
      this.showTipTimer = null;
    }
  }
};

/** 被呼叫，兼容多人音视频
 * @param {object} obj 主叫信息
 * @param {string} scene 是否是群视频，默认值p2p
 */
fn.onBeCalling = function (obj, scene) {
  scene = scene || 'p2p';
  this.log('收到音视频呼叫');
  console.log(obj);
  const channelId = obj.channelId;
  const netcall = this.netcall;
  const that = this;
  // 如果是同一通呼叫，直接丢掉
  console.log('obj.channelId', obj.channelId);
  console.log('this.channelId', this.channelId);
  if (obj.channelId === this.channelId) return;

  // 自己正在通话或者被叫中, 知对方忙并拒绝通话
  console.log('netcall.calling', netcall.calling);
  console.log('this.beCalling', this.beCalling);
  console.log('this.netcallActive', this.netcallActive);
  if (netcall.calling || this.beCalling || this.netcallActive) {
    const tmp = { command: Netcall.NETCALL_CONTROL_COMMAND_BUSY };
    if (scene === 'p2p') {
      tmp.channelId = channelId;
    }
    console.log('通知呼叫方我方不空');
    netcall.control(tmp);
    return;
  }

  // 正常发起通话请求
  this.type = obj.type;
  this.channelId = obj.channelId;
  this.beCalling = true;

  /**
   * 考虑被呼叫时，呼叫方断网，被呼叫方不能收到hangup消息，因此设置一个超时时间
   * 在通话连接建立后，停掉这个计时器
   */
  // this.beCallTimer = setTimeout(function () {
  //   if (!this.beCallTimer) return;
  //   this.log("呼叫方可能已经掉线，挂断通话");
  //   this.beCallTimer = null;
  //   this.reject();
  // }.bind(this), 60 * 1000)
  // p2p场景
  this.beCalledInfo = obj;
  const account = obj.account;
  this.netcallActive = true;
  this.netcallAccount = account;
  this.doOpenChatBox(account);
  this.playRing('E', 45);
  // console.log("on be calling:", obj);
  // 来电  根据来电帐户找到用户昵称和头像
  // gaoxue
  console.log('来电用户信息', obj)
  window.$api.im.getYxUserInfo(obj.account).then((res: {name: string; avatarUrl: string}) => {
    getDvaApp()._store.dispatch({
      type: 'im/UPDATE_NETCALL_DATA',
      payload: {
        type: obj.type,
        name: res.name,
        avatar: res.avatarUrl,
      },
    });
  })
  getDvaApp()._store.dispatch({
    type: 'im/UPDATE_NETCALL_STATUS',
    payload: 'incomingCall',
  });
};
// 对方接受通话 或者 我方接受通话，都会触发
fn.onCallAccepted = function (obj) {
  function changeState() {
    this.acceptAndWait = false;
    this.log('音视频通话开始');
    this.clearCallTimer();
    this.clearRingPlay();
    this.setDeviceAudioOut(true);
    this.type = obj.type;
    getDvaApp()._store.dispatch({
      type: 'im/UPDATE_NETCALL_STATUS',
      payload: 'accepted',
    });
  }

  changeState = changeState.bind(this);
  // WebRTC模式
  console.log('dddxxx', this.isRtcSupported);
  // this.isRtcSupported = true;
  if (this.isRtcSupported) {
    const that = this;
    Promise.resolve().then(() => {
      that.log('开始webrtc连接2');
      return that.netcall.startRtc();
    }).then(() => {
      that.log('webrtc连接成功');
      console.log(obj.type);
      console.log(WebRTC.NETCALL_TYPE_VIDEO)
      return that.setDeviceVideoIn(obj.type === WebRTC.NETCALL_TYPE_VIDEO);
    }).then(() => that.setDeviceAudioIn(true))
      .then(() => {
        changeState();
      })
      .catch(((e) => {
        console.error(e);
        that.log('连接出错');

        if (/webrtc兼容开关/i.test(e)) {
          minAlert.alert({
            type: 'error',
            msg: '无法接通!请让呼叫方打开"WebRTC兼容开关"，方可正常通话', // 消息主体
            confirmBtnMsg: '知道了，挂断',
            cbConfirm: that.hangup.bind(that),
          });
        }
      }));
  } else {
    const that = this;
    changeState();
    if (obj.type === Netcall.NETCALL_TYPE_VIDEO) {
      this.setDeviceAudioIn(true);
      this.setDeviceAudioOut(true);
      this.setDeviceVideoIn(true);
      this.netcall.startRemoteStream();
      this.netcall.startLocalStream();
      this.updateVideoShowSize(true, true);
    } else {
      this.setDeviceAudioIn(true);
      this.setDeviceAudioOut(true);
      this.setDeviceVideoIn(false);
    }
    // 设置采集和播放音量
    this.netcall.setCaptureVolume(255);
    this.netcall.setPlayVolume(255);
  }

  // 通话时长显示
  // this.startDurationTimer();
  console.log('NNNNNNNNNNnetcallStartTime', this.netcallStartTime);

  /** 重置文案聊天高度 */
  // this.resizeChatContent();
  // 关闭被呼叫倒计时
  this.beCallTimer = null;
};
/**
 * 对方拒绝通话, 兼容多人音视频
 * 先判断是否是群视频，如果是群视频，交给群视频的脚本处理
 */
fn.onCallingRejected = function (obj) {
  this.netcallActive = false;
  console.log('对方拒绝音视频通话');
  const typeText = ['', '语音', '视频'];
  this.showToast(`对方拒绝了您的${typeText[obj.type]}通话`,'rejected');
  this.clearCallTimer();
  // this.playRing('D', 1, () => {
  //   this.afterPlayRingA && this.afterPlayRingA();
  //   this.afterPlayRingA = null;
  // });
};

// 发起音视频呼叫
fn.doCalling = function (type: number, account: string) {
  const that = this;
  const nextFn = next.bind(that);
  this.xzlDevicesCheck(nextFn, type);
  function next() {
    that.log('发起音视频呼叫');
    getDvaApp()._store.dispatch({
      type: 'im/UPDATE_NETCALL_STATUS',
      payload: 'comingCall',
    });
    // this.type = type;
    const netcall = this.netcall;
    console.log('呼叫netcall', netcall);
    that.netcallAccount = account; // 对方账号
    that.netcallActive = true;
    const deviceType = type === Netcall.NETCALL_TYPE_VIDEO ? Netcall.DEVICE_TYPE_VIDEO : Netcall.DEVICE_TYPE_AUDIO_IN;
    /* netcall.getDevicesOfType(type).then(function(obj) {
        if (!obj.devices.length) {
            // return console.log("无视频设备");
        }
    }.bind(this)); */

    that.afterPlayRingA = function () { };
    that.playRing('A', 1, () => {
      that.afterPlayRingA && that.afterPlayRingA();
      that.afterPlayRingA = null;
    });
    const params = {
      type,
      account,
      pushConfig: {
        enable: true,
        needBadge: true,
        needPushNick: true,
        pushContent: '',
        custom: JSON.stringify({
          account,
        }),
        pushPayload: '',
        sound: '',
      },
      sessionConfig: that.sessionConfig,
    };
    console.log('paramsssss', params);
    console.log('paramsparamsparamsparams', params);
    console.log('netcall', netcall);
    netcall.call(params).then((obj) => {
      // console.log('发起通话成功', netcall);
      console.log('objjjjjj', obj);
      sessionStorage.setItem('doCalling', '本窗口发起拨打');
      that.log('发起通话成功，等待对方接听');
      // 设置超时计时器
      that.callTimer = setTimeout(() => {
        if (!netcall.callAccepted) {
          that.netcallActive = false;
          that.netcall.hangup('cancel');
          that.playRing('B', 1, () => {
            that.afterPlayRingA && that.afterPlayRingA();
            that.afterPlayRingA = null;
          });
          window.$storage.setItem('noResponse', 'true');
          that.showToast('对方无应答','noResponse');
        }
      }, 1000 * 45);

      if (that.afterPlayRingA) {
        that.afterPlayRingA = function () {
          // this.playRing("E", 45);
        };
      } else {
        // this.playRing("E", 45);
      }
    }).catch((err) => {
      console.log('发起通话失败', err);
      console.log('发起音视频通话请求失败：', err.event.event.code);
      if (err && (err.event.event.code === 11001 || err.code === 11001 || err?.serverCode === 11001)) {
        setTimeout(() => {
          that.clearRingPlay();
          that.showToast('拨打失败，对方不在线','offLine');
        }, 1000);
      } else if (err && (err.event.event.code === 'Error_Timeout' || err.code === 'Error_Timeout')) {
        console.log('发起音视频通话请求失败1：', err.event.code);
        that.clearCallTimer();
        message.warn('请检查网络', 3);
        that.hangup('cancel');
      } else {
        console.log('发起通话失败，未知错误');
        message.warn('发起通话失败');
        that.showToast('发起通话失败','unknownError');
        that.hangup('cancel');
      }
    });
  }
};
fn.xzlDevicesCheck = function(nextFn: () => void, type: number) {
  getDvaApp()._store.dispatch({
    type: 'im/UPDATE_NETCALL_DATA',
    payload: {
      deviceCheckStatus: 2, // 0 不支持，1支持 2检测中
    },
  });
  const that = this;
  mediaDevicesCheck();
  // 此方法：webrtc和webnet选择。默认我们采用webrtc，如果不支持，则检测webnet是否支持。都不支持则弹框提示
  function choiceType() {
    if (that.isRtcSupported) {
      if (rtcSupport.supportWebAudio) {
        console.log('检测插件成功11112222');
        nextFn();
      } else {
        // 浏览器不支持完整webaudio
        window.$storage.setItem('imErrorInfo', '4');
        getDvaApp()._store.dispatch({
          type: 'im/UPDATE_NETCALL_DATA',
          payload: {
            deviceCheckStatus: 0,
          },
        });
      }
    } else {
      // webnet 检测系统和浏览器支持情况
      that.deviceCheck(nextFn);
    }
  }
  // 检测设备是否有麦克风，摄像头--s
  function mediaDevicesCheck() {
    const choiceTypeFn = choiceType.bind(that);
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          const devicesList: any[] = [];
          devices.forEach((device) => {
            devicesList.push(device.kind);
          });

          console.log('devicesList', devicesList);
          const deviceOk = (type === 1 && devicesList.includes('audioinput'))
          || (type === 2 && devicesList.includes('audioinput') && devicesList.includes('videoinput'));
          if (deviceOk) {
            choiceTypeFn();
          } else if (type === 2) {
            console.log('未找到设备');
            window.$storage.setItem('imErrorInfo', '5');
            getDvaApp()._store.dispatch({
              type: 'im/UPDATE_NETCALL_DATA',
              payload: {
                deviceCheckStatus: 0,
              },
            });
          }
        })
        .catch((err) => {
          console.log(`${err.name }: ${ err.message}`);
        });
    } else {
      console.log('不支持 enumerateDevices() .');
      // 浏览器不支持enumerateDevices属性，直接用云信的检测方法
      choiceTypeFn();
    }
  }
}

// 检测设备是否有麦克风，摄像头--e
// 云信原生检测方法************检测是否支持webrtc******************START*******************
fn.displayCallMethodUI = function (cbSuccess, cbFail) {
  const that = this;
  const versionSupport = this.checkRtcBrowser();
  that.isRtcSupported = versionSupport && rtcSupport?.supportGetUserMedia && rtcSupport?.supportRTCPeerConnection && rtcSupport.supportMediaStream;
  if (!that.isRtcSupported) {
    console.log('当前浏览器不支持WebRTC功能或H264的编解码格式, 无法使用音视频功能, 请使用最新版Chrome、Firefox浏览器');
    // 不支持webrtc会自动使用webnet格式，这里只用做是否支持webrtc判断
    return false;
  }
  if (!rtcSupport?.supportWebAudio) {
    // 支持webrtc，但是浏览器不支持，在docalling里，做提示
    console.log('当前浏览器不支持完整的WebAudio功能, 无法使用音视频功能, 请使用最新版chrome、Firefox浏览器');
    return true;
  }
  window.$storage.setItem('webrtc', true);
  return true;
  // }
};
fn.checkRtcBrowser = function () {
  const test = platform.ua.match(/(chrome|firefox)\/(\d+)/i);
  if (!test || /Edge\/([\d.]+)/.test(platform.ua)) return false;
  const name = test[1]; const
    version = test[2];
  return (/chrome/i.test(name) && version > 57 || /firefox/i.test(name) && version > 56);
};
// ************检测是否支持webrtc******************END*******************

// ************webnet检测设备是否已下载插件，未下载则提示下载 ，已下载，next**********START*********
fn.deviceCheck = function (cbSuccess) {
  const that = this;
  // 检查设备支持情况
  this.checkNetcallSupporting(() => {
    that.netcall = that.webnet;
    console.log('检测插件成功1111');
    cbSuccess();
  }, failure);

  function failure(errorState: any) {
    // console.log('检测插件失败;');
    window.$storage.setItem('imErrorInfo', errorState);
    getDvaApp()._store.dispatch({
      type: 'im/UPDATE_NETCALL_DATA',
      payload: {
        deviceCheckStatus: 0,
      },
    });
  }
};
// 检查webnet
fn.checkNetcallSupporting = function (done, failure) {
  if (this.signalInited) {
    return done();
  }
  // 检查是否支持插件
  // 1. 检查操作系统和浏览器
  // 2. 检查是否能连通agent
  this.checkPlatform(() => {
    this.checkAgentWorking(done, failure);
  }, failure);
};
fn.checkPlatform = function (done, failure) {
  failure = failure || function () { };
  if (platform.os.family.indexOf('Windows') !== -1 && (platform.os.version === '10' || platform.os.version === '7')) { // 判断是否是win7或win10
    if (/Chrome/gi.test(platform.name) || platform.name === 'Microsoft Edge' || (platform.name === 'IE' && platform.version === '11.0')) { // 判断是否是Chrome, Edge, IE 11
      done();
    } else {
      failure(3);
      // console.log('当前浏览器不支持音视频功能，请使用 Chrome、IE 11 或者 Edge 浏览器');
    }
  } else {
    failure(2);
    // console.log("当前系统不支持音视频功能，请使用win7、win10系统");
  }
};
fn.checkAgentWorking = function (done, failure) {
  console.log('checkAgentWorking');
  failure = failure || function () { };
  done = done || function () { };
  console.log('start netcall initSignal');
  this.netcall.initSignal().then(() => {
    // console.log('initSignal success');
    console.log('netcall initSignal success');
    this.signalInited = true;
    done();
  }).catch((err) => {
    console.log('netcall initSignal error', err);
    // 1: 未检测到agent插件
    failure(1);
  });
};

// ************webnet检测设备是否已下载插件，未下载则提示下载 ，已下载，next***********END********
fn.setDeviceAudioIn = function (state) {
  const that = this;
  // $(".icon-micro").toggleClass("icon-disabled", !state);
  that.deviceAudioInOn = !!state;
  if (state) {
    that.log('开启麦克风');
    console.log(Netcall.DEVICE_TYPE_AUDIO_IN);
    return that.netcall.startDevice({
      // 开启麦克风输入
      type: Netcall.DEVICE_TYPE_AUDIO_IN,
    }).then(() => {
      that.log('开启麦克风成功，通知对方我方开启了麦克风');
      // 通知对方自己开启了麦克风
      that.netcall.control({
        command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON,
      });
      that.netcall.setCaptureVolume(255);
    }).catch(() => {
      console.log('开启麦克风失败');
      console.error('开启麦克风失败');
      that.log('开启麦克风失败');
      // that.onDeviceNoUsable(Netcall.DEVICE_TYPE_AUDIO_IN);
    });
  }
  that.log('关闭麦克风');
  console.log(Netcall.DEVICE_TYPE_AUDIO_IN);
  return that.netcall.stopDevice(Netcall.DEVICE_TYPE_AUDIO_IN) // 关闭麦克风输入
    .then(() => {
      that.log('关闭麦克风成功，通知对方我方关闭了麦克风');
      // 通知对方自己关闭了麦克风
      that.netcall.control({
        command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF,
      });
    }).catch(() => {
      that.log('关闭麦克风失败');
      console.error('关闭麦克风失败');
    });
};

fn.setDeviceAudioOut = function (state) {
  const that = this;
  // $(".icon-volume").toggleClass("icon-disabled", !state);
  that.deviceAudioOutOn = !!state;
  if (state) {
    that.log('开启扬声器');
    return that.netcall.startDevice({
      type: Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT,
    }).then(() => {
      that.netcall.setPlayVolume(255);
      that.log('开启扬声器成功');
    }).catch(() => {
      console.log('开启扬声器失败');
      that.log('开启扬声器失败');
      // that.onDeviceNoUsable(Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT);
      console.error('开启扬声器失败');
    });
  }
  that.log('关闭扬声器');
  return that.netcall.stopDevice(Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT).then(() => {
    that.log('关闭扬声器成功');
  }).catch(() => {
    that.log('关闭扬声器失败');
    console.error('关闭扬声器失败');
  });
};

fn.setDeviceVideoIn = function (state) {
  const that = this;
  // $(".icon-camera").toggleClass("icon-disabled", !state);
  that.deviceVideoInOn = !!state;

  if (state) {
    that.log('开启摄像头');
    return that.netcall.startDevice({
      type: Netcall.DEVICE_TYPE_VIDEO,
      /* width: that.videoCaptureSize.width,
       height: that.videoCaptureSize.height */
    }).then(() => {
      that.videoType = 'video';
      that.log('开启摄像头成功，通知对方己方开启了摄像头');
      // 通知对方自己开启了摄像头
      that.netcall.control({
        command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON,
      });
      that.startLocalStream();
      that.updateVideoShowSize(true, false);
    }).catch((err) => {
      console.error(err);
      that.videoType = null;
      // 通知对方自己的摄像头不可用
      that.log('开启摄像头失败，通知对方己方摄像头不可用', err);
      // that.onDeviceNoUsable(Netcall.DEVICE_TYPE_VIDEO);

      that.netcall.control({
        command: Netcall.NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID,
      });
      /** 如果是群聊，转到多人脚本处理 */
      if (that.netcall.calling && that.yx.crtSessionType === 'team' && that.meetingCall.channelName) {
        that.updateDeviceStatus(Netcall.DEVICE_TYPE_VIDEO, true, false);
      }
    });
  }
  that.videoType = null;
  that.log('关闭摄像头');
  return that.netcall.stopDevice(Netcall.DEVICE_TYPE_VIDEO).then(() => {
    // 通知对方自己关闭了摄像头
    that.log('关闭摄像头成功，通知对方我方关闭了摄像头');
    that.netcall.control({
      command: Netcall.NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF,
    });
    /** 如果是群聊，转到多人脚本处理 */
    if (that.netcall.calling && that.yx.crtSessionType === 'team' && that.meetingCall.channelName) {
      that.updateDeviceStatus(Netcall.DEVICE_TYPE_VIDEO, false, true);
    }
  }).catch((e) => {
    that.videoType = null;
    that.log('关闭摄像头失败');
  });
};

fn.setDeviceVolume = function (val: number) {
  console.log('setDeviceVolume', val)
   this.netcall.setPlayVolume(val);
}

fn.clearCallTimer = function () {
  if (this.callTimer) {
    clearTimeout(this.callTimer);
    this.callTimer = null;
  }
};

fn.clearBeCallTimer = function () {
  if (this.beCallTimer) {
    clearTimeout(this.beCallTimer);
    this.beCallTimer = null;
  }
};
fn.clearRingPlay = function () {
  console.log('clearRingPlay');
  if (this.playRingInstance) {
    this.playRingInstance.cancel && this.playRingInstance.cancel();
    this.playRingInstance = null;
  }
};

fn.playRing = function (name, count, done) {
  console.log('playRing');
  done = done || function () { };
  this.playRingInstance = this.playRingInstance || {};
  // 铃声已上传到阿里云
  const nameMap: CommonData = {
    A: 'b21d35dd-9162-418e-ac17-ef6fa52c716bavchat_connecting',
    B: '78c977e4-f6c1-4e78-9210-0f3f1b96543aavchat_no_response',
    C: '7205979a-6021-4d2b-ad67-2fdae1ed4bc0avchat_peer_busy',
    D: '464a3da7-492a-431f-9ffe-7ee3a501a69aavchat_peer_reject',
    E: 'b1fcf244-eafd-4c88-b273-c9910e5397afavchat_ring',
  };
   var url = `https://xzl-archive-files.oss-cn-hangzhou.aliyuncs.com/dev/1000/${nameMap[name]}.mp3`;
  function doPlay(url, playDone) {
    let that = this;
    var audio = document.createElement('audio');
    audio.autoplay = true;
    function onEnded() {
      that.playRingInstance.cancel =function () {
        console.log('cancelll')
      };
      audio = null;
      playDone();
    }
    onEnded = onEnded.bind(this);
    audio.addEventListener('ended', onEnded);// 事件在音频/视频(audio/video)播放完成后触发。
    audio.src = url;
    console.log('audioooo', audio)
    console.log('this.playRingInstance', this.playRingInstance)
    this.playRingInstance.cancel = function () {
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audio = null;
    };
  }
  doPlay = doPlay.bind(this);
  var wrap = function () {
    this.playRingInstance = null;
    done();
  }.bind(this);
  for (var i = 0; i < count; i++) {
    wrap = (function (wrap) {
      return function () {
        doPlay(url, wrap);
      };
    }(wrap));
  }
  wrap();
};
fn.log = function () {
  const msg = [].join.call(arguments, ' ');
  console.log(`%c${ msg}`, 'color: green;font-size:16px;');
};

export default NetcallBridge;
