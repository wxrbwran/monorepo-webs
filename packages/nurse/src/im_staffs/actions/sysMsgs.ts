/* eslint-disable */

import { onRevocateMsg } from './msgs';

export function onSysMsgs(sysMsgs) {
  window.$store.dispatch({ type: 'im/updateSysMsgs', payload: sysMsgs });
}

export function onSysMsg(sysMsg) {
  switch (sysMsg.type) {
    // 对方消息撤回
    case 'deleteMsg':
      if (sysMsg.scene === 'p2p') {
        sysMsg.sessionId = `p2p-${sysMsg.from}`;
      } else {
        sysMsg.sessionId = `team-${sysMsg.to}`;
      }
      onRevocateMsg(null, sysMsg);
      break;
    case 'teamInvite': // 被邀请入群
    case 'applyTeam': // 申请入群
    case 'rejectTeamApply': // 申请入群被拒绝
    case 'rejectTeamInvite': // 拒绝入群邀请
      window.$store.dispatch({ type: 'im/UPDATE_SYS_MSGS', payload: [sysMsg] });
      break;
  }
  window.$store.dispatch({ type: 'im/UPDATE_SYS_MSG_STATE', payload: sysMsg });
}

export function onSysMsgUnread(obj) {
  window.$store.dispatch({ type: 'im/updateSysMsgUnread', payload: obj });
}

export function onCustomSysMsgs(customSysMsgs) {
  console.log(customSysMsgs);
  if (!Array.isArray(customSysMsgs)) {
    customSysMsgs = [customSysMsgs];
  }
  customSysMsgs = customSysMsgs.filter((msg) => {
    if (msg.type === 'custom') {
      if (msg.content) {
        try {
          const content = JSON.parse(msg.content);
          // 消息正在输入中
          if (`${content.id}` === '1') {
            return false;
          }
        } catch (e) {}
      }
    }
    return true;
  });
  if (customSysMsgs.length > 0) {
    window.$store.dispatch({
      type: 'im/updateCustomSysMsgs',
      payload: customSysMsgs,
    });
  }
}

// 不传obj则全部重置
export function markSysMsgRead({ state }, obj) {
  const nim = window.nim;
  let sysMsgs = [];
  if (obj && obj.sysMsgs) {
    sysMsgs = obj.sysMsgs;
  } else {
    sysMsgs = state.sysMsgs;
  }
  if (Array.isArray(sysMsgs) && sysMsgs.length > 0) {
    nim.markSysMsgRead({
      sysMsgs,
      done(error, obj) {},
    });
  }
}

export function markCustomSysMsgRead({ state }) {
  window.$store.dispatch({
    type: 'im/updateCustomSysMsgUnread',
    payload: {
      type: 'reset',
    },
  });
}

export function resetSysMsgs({ state }, obj) {
  window.$store.dispatch({ type: 'im/resetSysMsgs', payload: obj });
}

export function deleteSysMsgs({ state }, obj) {
  window.$store.dispatch({ type: 'im/deleteSysMsgs', payload: obj });
}
