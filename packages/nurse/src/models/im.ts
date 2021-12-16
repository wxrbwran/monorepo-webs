/*eslint-disable*/

import { onSessions, onUpdateSession, setCurrSession } from '@/im_staffs/actions/session';
import {
  onMsg,
  onOfflineMsgs,
  onRoamingMsgs,
  updateCurrSessionMsgs,
  getHistoryMsgs,
} from '@/im_staffs/actions/msgs';
import { onMyInfo } from '@/im_staffs/actions/userInfo';
import { onSysMsg, onSysMsgs } from '@/im_staffs/actions/sysMsgs';
import { message } from 'antd';
import state from '@/im_staffs/state';
import Utils from '@/utils/im_utils';
import { uniqueMsgs } from '@/utils/utils';
import NetcallBridge from '@/im_staffs/actions/netcall';
import { isEmpty } from 'lodash';
// import yxRegister from './auth';
// import { useSelector } from 'umi';

// const yxRegister = useSelector((state: IState) => state.auth.yxRegister);
// console.log('yxRegister',yxRegister);


const IMState: IMModelState = state;

const IMModel: any = {
  namespace: 'im',
  state: IMState,
  reducers: {
    initNIMSDK(state: IMModelState, action: Store) {
      // console.log('action', action);
      const appKey = '1e82c88ea2c1d07f67ecfdabf23940e9';
      // const account = 'dev.14188';
      // const token = '43c23ec8a7ff546f7adac23af38d1f3a';
      const account = window.$storage.getItem('uid');
      const token = window.$storage.getItem('sdktoken');
      if (window.nim) {
        window.nim.disconnect();
      }
      console.log('window.NIM',window.NIM);
      console.log('window.nim',window.nim);
      const nim = window.SDK.NIM.getInstance({
        debug: true,
        appKey,
        account,
        token,
        transports: ['websocket'],
        db: false,
        syncSessionUnread: true,
        syncRobots: false,
        autoMarkRead: true, // 默认为true
        onconnect() {
          console.log('im connected');
          // window.$storage.setItem('uid', account);
          // window.$storage.setItem('sdktoken', token);
        },
        onerror(event: Store) {
          message.error('onerror 网络连接状态异常', 5);
        },
        onwillreconnect(event: Store) {
          console.log('onwillreconnect', event);
        },
        ondisconnect(error: Error) {
          console.log('ondisconnect连接失败', error); // 连接失败...
        },
        syncTeams: false,
        onmyinfo: onMyInfo,
        onsessions: onSessions,
        onupdatesession: onUpdateSession,
        onroamingmsgs: onRoamingMsgs,
        onofflinemsgs: onOfflineMsgs,
        onmsg: onMsg,
        // // // 系统通知
        onsysmsg: onSysMsg,
        onofflinesysmsgs: onSysMsgs,
        onupdatesysmsg: onSysMsg, // 通过、拒绝好友申请会收到此回调
        // // // 同步完成
        onsyncdone() {
          if (action.payload.resolve) {
            action.payload.resolve(42);
          }
          // 说明在聊天列表页
          console.log('onsyncdone', state);
          if (state.currSessionId) {
            setCurrSession(state.currSessionId);
            // dispatch('setCurrSession', state.currSessionId)
          }

          // 解决：患者详情浏览器刷新后，消息记录msgs为空的情况（未同步完成导致）
          // 在同步完成后，更改connect属性，页面根据此属性来判断是否渲染IM组件。
          window.$store.dispatch({
            type: 'im/UPDATE_CONNECT',
            payload: true,
          });
        },
      });
      window.nim = nim;
      const myNetcall = isEmpty(state.myNetcall) ? new NetcallBridge() : state.myNetcall;
      // window.myNetcall = myNetcall;
      return {
        ...state,
        myNetcall,
      };
    },
    UPDATE_CONNECT(state: IMModelState, { payload }: Store) {
      return {
        ...state,
        connected: payload
      }
    },
    LOGOUT_NIM(state: IMModelState) {
      if (window.nim) {
        window.nim.disconnect();
        window.nim = null;
      }
      return {...IMState, msgs: {}};
    },
    UPDATE_SESSIONS(state: IMModelState, action: Store) {
      const sessions = action.payload;
      const sessionlist = window.nim.mergeSessions(state.sessionlist, sessions);
      sessionlist.sort((a, b) => {
        return b.updateTime - a.updateTime;
      });
      sessionlist.forEach((item) => {
        state.sessionMap[item.id] = item;
      });
      // console.log('UPDATE_SESSIONS', sessionlist);
      return { ...state, sessionlist };
    },
    UPDATE_MSGS(state: IMModelState, action: Store) {
      let update_msgs = action.payload;
      let tempSessionMap: any = {};
      let sessionId: any;
      update_msgs.forEach((msg) => {
        sessionId = msg.sessionId;
        tempSessionMap[sessionId] = true;
        if (!state.msgs[sessionId]) {
          state.msgs[sessionId] = [];
        }
        if (!Array.isArray(update_msgs)) {
          update_msgs = [update_msgs];
        }
        // sdk会做消息去重
        const currentNim = window.nim;
        state.msgs[sessionId] = uniqueMsgs(currentNim.mergeMsgs(state.msgs[sessionId], msg));
      });
      let temp_Time = new Date().getTime();
      update_msgs.forEach((msg) => {
        // 有idClient 且 5分钟以内的消息
        if (msg.idClient && temp_Time - msg.time < 1000 * 300) {
          state.msgsMap[msg.idClient] = msg;
        }
      });
      // console.log('tempSessionMap', tempSessionMap);
      // for (let sessionId in tempSessionMap) {
      //   state.msgs[sessionId].sort((a, b) => {
      //     return a.time - b.time;
      //   });
      //   if (sessionId === state.currSessionId) {
      //     updateCurrSessionMsgs({ type: 'init' }, state);
      //   }
      // }
      return {
        ...state,
        // currSessionId: sessionId,
        //重构注释掉
        // currSessionMsgs: update_msgs,
      };
    },
    SET_NO_MORE_HISTORY_MSGS(state: IMModelState, action: Store) {
      console.log('SET_NO_MORE_HISTORY_MSGS', action);
      return {
        ...state,
        noMoreHistoryMsgs: {
          ...state.noMoreHistoryMsgs,
          [action.payload]: true,
        },
      };
    },
    RESET_NO_MORE_HISTORY_MSGS(state: IMModelState, action: Store) {
      return { ...state, noMoreHistoryMsgs: false };
    },
    PUT_MSG(state: IMModelState, action: Store) {
      let put_msg = action.payload;
      console.log('put_msg action payload', put_msg);
      let sessionId = put_msg.sessionId;
      // console.log('sessionId', sessionId);
      // console.log('state.msgs', state.msgs);
      if (!state.msgs[sessionId]) {
        state.msgs[sessionId] = [];
      }
      const putArray = !Array.isArray(put_msg) ? [put_msg] : put_msg;
      let tempTime = new Date().getTime();
      putArray.forEach((msg) => {
        // 有idClient 且 5分钟以内的消息
        if (msg.idClient && tempTime - msg.time < 1000 * 300) {
          state.msgsMap[msg.idClient] = msg;
        }
      });

      let tempMsgs = state.msgs[sessionId];
      let lastMsgIndex = tempMsgs.length - 1;
      if (tempMsgs.length === 0 || put_msg.time >= tempMsgs[lastMsgIndex].time) {
        tempMsgs.push(put_msg);
      } else {
        for (let i = lastMsgIndex; i >= 0; i--) {
          let currMsg = tempMsgs[i];
          if (put_msg.time >= currMsg.time) {
            state.msgs[sessionId].splice(i, 0, put_msg);
            break;
          }
        }
      }
      state.msgs[sessionId] = [...uniqueMsgs(state.msgs[sessionId])];
      // console.log('tempMsgstempMsgstempMsgstempMsgs', tempMsgs);
      return { ...state, msgs: { ...state.msgs } };
    },

    REPLACE_MSG(state: IMModelState, action: Store) {
      /* eslint-disable */
      let { idClient, msg } = action.payload;
      let sId = action.payload.sessionId;
      let temp_Msgs = state.msgs[sId];
      if (!temp_Msgs || temp_Msgs.length === 0) {
        return Object.assign({}, state);
      }
      let last_Msg_Index = temp_Msgs.length - 1;
      for (let i = last_Msg_Index; i >= 0; i--) {
        let currMsg = temp_Msgs[i];
        // console.log(idClient, currMsg.idClient, currMsg.text)
        if (idClient === currMsg.idClient) {
          state.msgs[sId].splice(i, 1, msg);
          break;
        }
      }
      return { ...state };
    },
    UPDATE_CURR_SESSION_MSGS(state: IMModelState, action: Store) {
      let update_obj = action.payload;
      updateCurrSessionMsgs(update_obj, state);
      return { ...state };
    },
    UPDATE_CURR_SESSION_ID(state: IMModelState, action: Store) {
      let id_obj = action.payload;
      let type = id_obj.type || '';
      // console.log('id_obj', id_obj);
      if (type === 'destroy') {
        state.currSessionId = null;
      } else if (type === 'init') {
        if (id_obj.sessionId && id_obj.sessionId !== state.currSessionId) {
          state.currSessionId = id_obj.sessionId;
        }
      }
      return { ...state };
    },

    // 发送消息已读回执
    SEND_MSG_RECEIPT(state: IMModelState, action: Store) {
      // 如果有当前会话
      let currSessionId = state.currSessionId;
      if (currSessionId) {
        // 只有点对点消息才发已读回执
        if (Utils.parseSession(currSessionId).scene === 'p2p') {
          // let msgs = state.currSessionMsgs;
          const nim = window.nim;
          if (state.sessionMap[currSessionId]) {
            nim.sendMsgReceipt({
              msg: state.sessionMap[currSessionId].lastMsg,
              done: function sendMsgReceiptDone(error, obj) {
                // do something
              },
            });
          }
        }
      }
      return { ...state };
    },
    UPDATE_SYS_MSGS(state: IMModelState, action: Store) {
      let sysMsgs = action.payload;
      if (!Array.isArray(sysMsgs)) {
        sysMsgs = [sysMsgs];
      }
      sysMsgs = sysMsgs.map((msg) => {
        msg.showTime = Utils.formatDate(msg.time, false);
        return msg;
      });
      // state.sysMsgs = nim.mergeSysMsgs(state.sysMsgs, sysMsgs)
      state.sysMsgs = [].concat(window.nim.mergeSysMsgs(state.sysMsgs, sysMsgs));
      return { ...state };
    },
    GET_HISTORY_MSGS(state: IMModelState, action: Store) {
      const [scene, to] = state.currSessionId.split('-');
      getHistoryMsgs(state, { scene, to });
      return state;
    },
    UPDATE_SYS_MSG_STATE(state: IMModelState, action: Store) {
      let sysMsg = action.payload;
      let exitMsg = state.sysMsgs.find((msg) => {
        return msg.idServer === sysMsg.idServer;
      });
      if (exitMsg) {
        exitMsg.state = sysMsg.state;
      }
      return { ...state };
    },
    UPDATE_MY_INFO(state: IMModelState, action: Store) {
      const myInfo = Utils.mergeObject(state.myInfo, action.payload);
      return Object.assign({}, state, { myInfo });
    },
    UPDATE_USER_INFO(state: IMModelState, action: Store) {
      let userInfos = state.userInfos;
      action.payload.forEach((user) => {
        let account = user.account;
        if (account) {
          userInfos[account] = Utils.mergeObject(userInfos[account], action.payload);
        }
      });
      userInfos = Utils.mergeObject(state.userInfos, userInfos);
      return Object.assign({}, state, { userInfos });
    },
    UPDATE_IMAGES(state: IMModelState, action: Store) {
      return { ...state, images: action.payload };
    },
    TOGGLE_VIEWER(state: IMModelState, action: Store) {
      const images = state.images.map((img) => img.src);
      const src = action.payload.src;
      console.log('images, src', images, src);
      const index = images.indexOf(src);
      return { ...state, imageVisible: action.payload.isShow, activeImageIndex: index };
    },
    SET_SESSION_GROUP(state: IMModelState, action: Store) {
      return { ...state,  sessions: JSON.parse(JSON.stringify(action.payload.sessions))};
    },
    SET_HISTORY_MSGS(state: IMModelState, action: Store) {
      const { sessionId, historyMsgs } = action.payload;
      if(state.historyMsgs[sessionId]){
        return {
          ...state,
          historyMsgs: {
            ...state.historyMsgs,
            [sessionId]: [...historyMsgs, ...state.historyMsgs[sessionId]],
          },
        };
      }else{
        return {
          ...state,
          historyMsgs: {
            ...state.historyMsgs,
            [sessionId]: [...historyMsgs],
          },
        };
      }

    },
    UPDATE_NETCALL_STATUS(state: IMModelState, action: Store) {
      console.log('**********g', action.payload)
      return {
        ...state,
        netcallData:{
          ...state.netcallData,
          netcallStatus: action.payload
        }
      };
    },
    UPDATE_NETCALL_DATA(state: IMModelState, action: Store) {
      console.log('**********incomingCallInfo', action.payload)
      return {
        ...state,
        netcallData: {
          ...state.netcallData,
          ...action.payload
        }
      };
    },
  },
};

export default IMModel;
