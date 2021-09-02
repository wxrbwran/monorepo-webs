/*eslint-disable*/
import util from '@/utils/im_utils';
// import { uniqueMsgs } from '@/utils/utils';

const store = window.$store;
console.log(store);
// 发送消息已读回执
export function sendMsgReceipt() {
  const state = window.$store.getState().im;
  // 如果有当前会话
  const currSessionId = state.currSessionId;
  if (currSessionId) {
    // 只有点对点消息才发已读回执
    if (util.parseSession(currSessionId).scene === 'p2p') {
      // let msgs = store.state.currSessionMsgs
      const nim = window.nim;
      if (state.sessionMap[currSessionId]) {
        nim.sendMsgReceipt({
          msg: state.sessionMap[currSessionId].lastMsg,
          done: sendMsgReceiptDone,
        });
      }
    }
  }
}

function sendMsgReceiptDone(error, obj) {
  console.log(`发送消息已读回执${!error ? '成功' : '失败'}`, error, obj);
}

export function getMsgNeedToReceipt(state, teamId, msgs) {
  const sentReceipedList = state.sentReceipedMap[teamId] || [];
  const needToReceipt = msgs
    .filter(
      (msg) =>
        msg.needMsgReceipt &&
        msg.from !== state.myInfo.account &&
        !sentReceipedList.find((id) => id === msg.idServer),
    )
    .map((msg) => ({
      teamId,
      idServer: msg.idServer,
    }));
  return needToReceipt;
}

export function formatMsg(msg) {
  msg.sessionId = 'p2p-'+JSON.parse(msg.custom).sessionId
  return msg;
}

export function onRoamingMsgs(obj) {
  const msgs = obj.msgs
    .filter((item) => !!item.custom && item.custom !== '{}')
    .map((msg) => formatMsg(msg));;
  //初始化
  window.$store.dispatch({
    type: 'im/UPDATE_MSGS',
    payload: msgs,
  });
}

export function onOfflineMsgs(obj) {
  const msgs = obj.msgs.map((msg) => formatMsg(msg));
  window.$store.dispatch({
    type: 'im/UPDATE_MSGS',
    payload: msgs,
  });
}

// export function onMsg(msg) {
export const onMsg = async(msg) => {

  console.log('onmsg', msg);
  const state = window.$store.getState().im;
  if (msg.scene === 'team' && msg.type === 'notification') {
    console.log('收到到im消息啦~1', msg)
    window.$store.dispatch({
      type: 'NOOP',
    });
  } else if(msg.scene === 'p2p' && msg.type === 'notification') {
    const isCurrWindow = sessionStorage.getItem('doCalling');
    console.log('收到到im消息啦~2', msg)
    // 通知类的消息如果状态是以下，则是im音视频通话结束后，在聊天框中需要展示通话详情的数据。
    // 这里把数据拿到后发送后端，此消息为custom类型，由后端处理后再接收
    const p2pCall = ["netcallBill", 'netcallMiss', 'cancelNetcallBeforeAccept', 'rejectNetcall', 'netcallRejected'];
    if(p2pCall.includes(msg?.attach.type) && msg.flow === 'out' && isCurrWindow) {
      if (window.$storage.getItem('noResponse')) {
         window.$storage.removeItem('noResponse');
        msg.attach.type = 'noResponse';
      }
      const imParams = {
        operatorWcId: window.$storage.getItem('fromWcId'),
        // toWcIds: [window.$storage.getItem('patientWcId')],
        msgTypes: [118],
        content: JSON.stringify({
          type: 118,
          content: JSON.stringify(msg.attach)
        }),
        associateWcId: window.$storage.getItem('patientWcId'),
        associateSId: window.$storage.getItem('patientSid'),
        sessionId: window.$storage.getItem('toSessionId'),
      };
      window.$api.im.sendMsg(imParams);
    }
  } else {
    console.log('收到到im消息啦~3', msg)
    msg = formatMsg(msg);
    const contentId = msg?.content ? JSON.parse(msg?.content).id : '';
    if(contentId){
      const result = await window.$api.im.getSingleMsg({
        associateWcId: window.$storage.getItem('patientWcId'),
        contentId,
      });
      msg = {
        ...msg,
        content: JSON.stringify(result),
      };
    }
    window.$store.dispatch({
      type: 'im/PUT_MSG',
      payload: msg,
    });
    if (msg.sessionId === state.currSessionId) {
      console.log(999993);
      window.$store.dispatch({
        type: 'im/UPDATE_CURR_SESSION_MSGS',
        payload: {
          type: 'put',
          msg,
        },
      });
      sendMsgReceipt();
    }
  }
}

function onSendMsgDone(error, msg) {
  if (error) {
    // 被拉黑
    if (error.code === 7101) {
      msg.status = 'success';
      console.log(error.message);
    } else {
      console.log(error.message);
    }
  }
  onMsg(msg);
}

// 消息撤回
export function onRevocateMsg(error, msg) {
  const nim = window.nim;
  const state = window.$store.getState().im;
  if (error) {
    if (error.code === 508) {
      console.log('发送时间超过2分钟的消息，不能被撤回');
    } else {
      console.log(error);
    }
    return;
  }
  let tip = '';
  if (msg.from === state.userUID) {
    tip = '你撤回了一条消息';
  } else {
    const userInfo = state.userInfos[msg.from];
    console.log('userInfo', userInfo);
    if (userInfo) {
      tip = `撤回了一条消息`;
    } else {
      tip = '对方撤回了一条消息';
    }
  }
  nim.sendTipMsg({
    isLocal: true,
    scene: msg.scene,
    to: msg.to,
    tip,
    time: msg.time,
    done: sendTipMsgDone,
  });
}
function sendTipMsgDone(error, tipMsg) {
  const state = window.$store.getState().im;
  console.log('tipMsg', tipMsg);
  const idClient = tipMsg.deletedIdClient || tipMsg.idClient;
  if (tipMsg.sessionId === state.currSessionId) {
    onMsg(tipMsg);
  }
}
export function revocateMsg({ state }, msg) {
  const nim = window.nim;
  const { idClient } = msg;
  msg = Object.assign(msg, state.msgsMap[idClient]);
  nim.deleteMsg({
    msg,
    done: function deleteMsgDone(error) {
      onRevocateMsg(error, msg);
    },
  });
}
export function updateLocalMsg({ state }, msg) {
  console.log('dddddd2', msg)
  window.$store.dispatch({
    type: 'im/updateCurrSessionMsgs',
    payload: {
      type: 'replace',
      idClient: msg.idClient,
      msg,
    },
  });
  window.nim.updateLocalMsg({
    idClient: msg.idClient,
    localCustom: msg.localCustom,
  });
  window.$store.dispatch({
    type: 'im/replaceMsg',
    payload: {
      sessionId: msg.sessionId,
      idClient: msg.idClient,
      msg,
    },
  });
}

// 发送普通消息
export function sendMsg(obj) {
  obj = obj || {};
  const type = obj.type || '';
  // const custom = JSON.stringify({
  //   sender: window.$storage.getItem('user'),
  //   sessionId: JSON.parse(window.$storage.getItem('accid2session'))[obj.to],
  //   patientId: window.$storage.getItem('currentPatientId'),
  // });
  const params = {
    scene: obj.scene,
    to: obj.to,
    done: onSendMsgDone,
    needMsgReceipt: obj.needMsgReceipt || false,
    custom: {},
  };

  switch (type) {
    case 'text':
      params.text = obj.text;
      window.nim.sendText(params);
      break;
    case 'tip':
      params.tip = obj.text;
      params.done = sendTipMsgDone;
      // console.log('tipMsg params', params);
      window.nim.sendTipMsg(params);
      break;
  }
}

// 发送文件消息
export function sendFileMsg(obj) {
  const nim = window.nim;
  let { type, fileInput } = obj;
  if (!type && fileInput) {
    type = 'file';
    if (/\.(png|jpg|bmp|jpeg|gif)$/i.test(fileInput.value)) {
      type = 'image';
    } else if (/\.(mov|mp4|ogg|webm)$/i.test(fileInput.value)) {
      type = 'video';
    }
  }
  const data = Object.assign(
    {
      type,
      custom: JSON.stringify({}),
      uploadprogress(data) {
        // console.log(data.percentageText)
      },
      uploaderror() {
        fileInput.value = '';
        console && console.log('上传失败');
      },
      uploaddone(error, file) {
        fileInput.value = '';
        // console.log(error);
        // console.log(file);
      },
      beforesend(msg) {
        // console && console.log('正在发送消息, id=', msg);
      },
      done(error, msg) {
        onSendMsgDone(error, msg);
      },
    },
    obj,
  );
  nim.sendFile(data);
}

export function getHistoryMsgs(state, data) {
  console.log('getHistoryMsgs', data);
  const { scene, to } = data;

  let firstMsg = null;
  if (state.msgs[`${scene}-${to}`]) {
    firstMsg = state.msgs[`${scene}-${to}`][0];
  }
  let options: Store = {
    scene,
    to,
    reverse: false,
    asc: true,
    limit: 20,
    done(error, obj) {
      console.log('error, obj', error, obj);
      if (error) {
        setTimeout(() => {
          getHistoryMsgs(state, data);
        }, 200);
      } else if (obj.msgs) {
        if (obj.msgs.length === 0) {
          window.$store.dispatch({
            type: 'im/SET_NO_MORE_HISTORY_MSGS',
            payload: `${scene}-${to}`,
          });
        } else {
          const msgs = obj.msgs.map((msg) => formatMsg(msg));
          // const filterMsgs = msgs.filter((m) => m.type !== 'notification');
          console.log(999995);
          window.$store.dispatch({
            type: 'im/UPDATE_CURR_SESSION_MSGS',
            payload: {
              type: 'concat',
              msgs,
            },
          });
          //endTime取值是拉取回来的消息列表最上面一条数据的time取值
          // if (filterMsgs.length > 0) {
          //   //历史消息未加载完毕的情况下endTime取值
          //   window.$store.dispatch({
          //     type: 'im/UPDATE_END_TIME',
          //     payload: Object.assign(state.endTime, {
          //       [`team-${to}`]: filterMsgs[0].time,
          //     }),
          //   });
          // } else if (firstMsg) {
          //   //历史消息加载完毕的情况下endTime取值
          //   window.$store.dispatch({
          //     type: 'im/UPDATE_END_TIME',
          //     payload: Object.assign(state.endTime, {
          //       [`team-${to}`]: firstMsg.time,
          //     }),
          //   });
          // }
        }
      }
    },
  };
  if (firstMsg) {
    options.endTime = firstMsg.time || new Date().getTime();
    options.lastMsgId = firstMsg.idServer;
  }
  window.nim.getHistoryMsgs(options);
}

export function resetNoMoreHistoryMsgs(payload) {
  return {
    type: 'im/RESET_NO_MORE_HISTORY_MSGS',
    payload,
  };
}

export function updateCurrSessionMsgs(update_obj, state) {
  const tmp_type = update_obj.type || '';
  console.log('params ========>', update_obj);
  if (tmp_type === 'destroy') {
    // 清空会话消息
    state.currSessionMsgs = [];
    state.currSessionLastMsg = null;
    // updateCurrentSessionId({ type: 'destroy' }, state);
  } else if (tmp_type === 'init') {
    // 初始化会话消息列表
    // state.currSessionMsgs = [...state];
    // console.log('state.currSessionMsgs', state.currSessionMsgs);
    // console.log('UPDATE_CURR_SESSION_MSGS state', state);
    if (state.currSessionId) {
      const sessionId = state.currSessionId;
      console.log('UPDATE_CURR_SESSION_MSGS state.msgs', state.msgs);
      const currSessionMsgs = [].concat(state.msgs[sessionId] || []);

      state.currSessionMsgs = [];
      let lastMsgTime = 0;
      currSessionMsgs.forEach((msg) => {
        if (msg.time - lastMsgTime > 1000 * 60 * 5) {
          lastMsgTime = msg.time;
          const formatMsg = util.formatDate(msg.time, false);
          const tags = state.currSessionMsgs.filter((sessionMsg) => sessionMsg.type === 'timeTag');
          if (tags.every((tag) => tag.text !== formatMsg)) {
            state.currSessionMsgs.push({
              type: 'timeTag',
              text: formatMsg,
            });
          }
        }
        // console.log('UPDATE_CURR_SESSION_MSGS msg', msg);
        state.currSessionMsgs.push(msg);
        // console.log('UPDATE_CURR_SESSION_MSGS state.currSessionMsgs', state.currSessionMsgs);
      });
      checkTeamMsgReceipt(state.currSessionMsgs, state);
    }
  } else if (tmp_type === 'put') {
    // 追加一条消息
    console.log('tmp_type put', update_obj);
    const chatListEl: any = document.getElementById('CHAT_LIST');
    setTimeout(() => {
      chatListEl.scrollTop = 999999;
    }, 300);
    const newMsg = {
      ...update_obj.msg,
      custom: JSON.parse(update_obj.msg.custom),
    };
    if(update_obj.msg.content) {
      newMsg.content = JSON.parse(update_obj.msg.content)
    }
    let lastMsgTime = 0;
    const lenCurrMsgs = state.currSessionMsgs.length;
    if (lenCurrMsgs > 0) {
      lastMsgTime = state.currSessionMsgs[lenCurrMsgs - 1].time;
    }
    if (newMsg) {
      if (newMsg.time - lastMsgTime > 1000 * 60 * 5) {
        // state.currSessionMsgs.push({
        //   type: 'timeTag',
        //   text: util.formatDate(newMsg.time, false),
        // });
        state.currSessionMsgs=[...state.currSessionMsgs,{
          type: 'timeTag',
          text: util.formatDate(newMsg.time, false),
        }]
      }
      // state.currSessionMsgs.push(newMsg);
      const newCurrSessionMsgs=[...state.currSessionMsgs,newMsg].filter(item => item.type!=='timeTag');
      state.currSessionMsgs=[...newCurrSessionMsgs];
      state.shouldReachBottom = true;
      checkTeamMsgReceipt([newMsg], state);
    }
  } else if (tmp_type === 'concat') {
    // 一般用于历史消息拼接
    let currSessionMsgs: any[] = [];
    let lastMsgTime = 0;
    if (update_obj.msgs.length > 0) {
      update_obj.msgs.forEach((msg) => {
        msg.isHistory = true;
        // if (msg.time - lastMsgTime > 1000 * 60 * 5) {
        //   lastMsgTime = msg.time;
        //   currSessionMsgs.push({
        //     type: 'timeTag',
        //     text: util.formatDate(msg.time, false),
        //   });
        // }
        // currSessionMsgs.push(msg);
        currSessionMsgs= [...currSessionMsgs, msg]
      });
      state.currSessionMsgs = [...currSessionMsgs, ...state.currSessionMsgs]
      // currSessionMsgs.reverse();
      // console.log('.......state', state);
      // const sessionId = currSessionMsgs.filter((msg) => msg.sessionId)[0].sessionId;
      // state.msgs[sessionId] = state.msgs[sessionId] || [];
      // console.log('concat', currSessionMsgs);
      // console.log('concat', state.msgs[sessionId]);

      // currSessionMsgs.forEach((msg) => {
      //   if (state.currSessionId === `p2p-${msg.sessionId}`) {
      //     state.currSessionMsgs.unshift(msg);
      //   }
      //   state.msgs[sessionId].unshift(msg);
      // });
      if (update_obj.msgs[0]) {
        state.currSessionLastMsg = update_obj.msgs[0];
      }
      state.shouldReachBottom = false;
      checkTeamMsgReceipt(currSessionMsgs, state);
    }
  } else if (tmp_type === 'replace') {
    const msgLen = state.currSessionMsgs.length;
    const lastMsgIndex = msgLen - 1;
    if (msgLen > 0) {
      for (let i = lastMsgIndex; i >= 0; i--) {
        if (state.currSessionMsgs[i].idClient === update_obj.idClient) {
          state.currSessionMsgs.splice(i, 1, update_obj.msg);
          break;
        }
      }
    }
  }
  return {
    type: 'NOOP',
  };
}

export function updateCurrentSessionId(id_obj, state) {
  const type = id_obj.type || '';
  if (type === 'destroy') {
    state.currSessionId = null;
  } else if (type === 'init') {
    if (id_obj.sessionId && id_obj.sessionId !== state.currSessionId) {
      state.currSessionId = id_obj.sessionId;
    }
  }
}

export function checkTeamMsgReceipt(msgs, state) {
  const result = /team-(\d+)/.exec(state.currSessionId);
  if (!result) {
    return state;
  }
  const teamId = result[1];
  const needToPeceiptList = getMsgNeedToReceipt(state, teamId, msgs);
  if (needToPeceiptList && needToPeceiptList.length > 0) {
    window.nim.sendTeamMsgReceipt({
      teamMsgReceipts: needToPeceiptList,
      done: (err, obj, content) => {
        console.log(`标记群组消息已读${!err ? '成功' : '失败'}`);
        if (!err) {
          updateSentReceipedMap(needToPeceiptList, state);
        }
      },
    });
  }
  updateReceiptQueryList(
    {
      teamId,
      msgs,
    },
    state,
  );
  return Object.assign({}, state);
}

export function updateSentReceipedMap(needToPeceiptList, state) {
  const map_obj = needToPeceiptList;
  if (!map_obj || map_obj.length < 1) {
    return state;
  }
  const teamId = map_obj[0].teamId;
  if (!state.sentReceipedMap[teamId]) {
    state.sentReceipedMap[teamId] = [];
  }
  state.sentReceipedMap[teamId].push(...map_obj.map((msg) => msg.idServer));
}

export function updateReceiptQueryList(list_obj, state) {
  // console.log('gggggggggggg');

  if (state.currReceiptQueryTeamId !== list_obj.teamId) {
    state.receiptQueryList = [];
    state.teamMsgReads = [];
    state.currReceiptQueryTeamId = list_obj.teamId;
  }
  const needQuery = list_obj.msgs
    .filter(
      (msg) =>
        msg.needMsgReceipt &&
        msg.from === state.myInfo.account &&
        !state.receiptQueryList.find((item) => item.idServer === msg.idServer),
    )
    .map((msg) => ({
      teamId: obj.teamId,
      idServer: msg.idServer,
    }));
  if (needQuery.length > 0) {
    state.receiptQueryList.push(...needQuery);
  }
  if (needQuery.length > 0) {
    getTeamMsgReads(needQuery);
  }
}

export function getTeamMsgReads(needQuery) {
  window.nim.getTeamMsgReads({
    teamMsgReceipts: needQuery,
    done: (error, obj, content) => {
      if (error) {
        console.log(`获取群组消息已读${error}`);
      } else {
        console.log('获取群组消息已读：', content);
        window.$store.dispatch({
          type: 'im/UPDATE_TEAM_MSG_READS',
          payload: content,
        });
      }
    },
  });
}

export function toggleReachBottom(isBtm) {
  return {
    type: 'im/TOGGLE_REACH_BOTTOM',
    payload: isBtm,
  };
}

export function clearMsgs() {
  window.nim.deleteAllLocalMsgs({
    done: deleteAllLocalMsgsDone
});
}
function deleteAllLocalMsgsDone(error, obj) {
  console.log(error);
  console.log(obj);
  console.log('删除所有本地消息' + (!error?'成功':'失败'));
}
