/*
 * 会话列表
 */
/* eslint-disable */

import { sendMsgReceipt } from './msgs';
import IMState from '@/im_staffs/state';

// 如果会话对象不是好友，需要更新好友名片
function updateSessionAccount(sessions) {
  const accountsNeedSearch = [];
  const state = IMState;
  // sessions.forEach((item) => {
  //   if (item.scene === 'p2p') {
  //     // 如果不存在缓存资料
  //     if (!state.userInfos[item.to]) {
  //       accountsNeedSearch.push(item.to);
  //     }
  //   }
  // });
  console.log(state);
}

function filterSession(sessions) {
  const newSessions = sessions.filter((s) => s.lastMsg.type !== 'notification');
  return newSessions;
}

// onSessions只在初始化完成后回调
export function onSessions(sessions) {
  console.log('sessions', sessions);
  // const newSessions = filterSession(sessions);
  // if (newSessions > 0) {
  console.log('store', window.$store);

  console.log('onSessions sessions', sessions);
  updateSessionAccount(sessions);
  window.$store.dispatch({
    type: 'im/UPDATE_SESSIONS',
    payload: sessions,
  });
}

export function onUpdateSession(session) {
  const sessions = [session];
  // const newSessions = filterSession(sessions);
  // if (newSessions > 0) {
  // console.log('onUpdateSession sessions', sessions);
  updateSessionAccount(sessions);
  window.$store.dispatch({
    type: 'im/UPDATE_SESSIONS',
    payload: sessions,
  });
}

export function deleteSession({ state }, sessionId) {
  const nim = window.nim;
  sessionId = sessionId || '';
  let scene = null;
  let account = null;
  if (/^p2p-/.test(sessionId)) {
    scene = 'p2p';
    account = sessionId.replace(/^p2p-/, '');
  } else if (/^team-/.test(sessionId)) {
    scene = 'team';
    account = sessionId.replace(/^team-/, '');
  }
  if (account && scene) {
    nim.deleteSession({
      scene,
      to: account,
      done: function deleteServerSessionDone(error, obj) {
        if (error) {
          console.log(error);
          return;
        }
        nim.deleteLocalSession({
          id: sessionId,
          done: function deleteLocalSessionDone(error, obj) {
            if (error) {
              console.log(error);
              return;
            }
            window.$store.dispatch({ type: 'deleteSessions', payload: [sessionId] });
          },
        });
      },
    });
  }
}

export function setCurrSession(sessionId) {
  const nim = window.nim;
  if (sessionId) {
    window.$store.dispatch({
      type: 'im/UPDATE_CURR_SESSION_ID',
      payload: {
        type: 'init',
        sessionId,
      },
    });
    if (nim) {
      // 如果在聊天页面刷新，此时还没有nim实例，需要在onSessions里同步
      nim.setCurrSession(sessionId);
      console.log(999996);
      window.$store.dispatch({
        type: 'im/UPDATE_CURR_SESSION_MSGS',
        payload: {
          type: 'init',
          sessionId,
        },
      });
      // 发送已读回执
      // window.$store.dispatch({type: 'im/SEND_MSG_RECEIPT'});
      sendMsgReceipt();
    }
  }
  return {
    type: 'NOOP',
  };
}

export function setPageSessionId(id) {
  return {
    type: 'SET_PAGE_SESSION_ID',
    payload: id,
  };
}

export function resetCurrSession() {
  const nim = window.nim;
  if (nim) {
    nim.resetCurrSession();
    return {
      type: 'UPDATE_CURR_SESSION_MSGS',
      payload: {
        type: 'destroy',
      },
    };
  }
  return {
    type: 'NOOP',
  };
}

export function saveSelfSessions(sessions) {
  return {
    type: 'SAVE_SELF_SESSIONS',
    payload: sessions,
  };
}
