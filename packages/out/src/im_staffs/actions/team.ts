/* eslint-disable */

const store = window.$store;

// 收到群列表及更新群列表接口
export function onTeams(teams) {
  if (!Array.isArray(teams)) {
    teams = [teams];
  }
  console.log('sync teams', teams);
  teams = teams.filter((item) => !!item);
  teams.forEach((team) => {
    if (team.validToCurrentUser === undefined) {
      team.validToCurrentUser = true;
    }
    if (
      team.avatar &&
      team.avatar.indexOf('nim.nosdn.127') > 0 &&
      team.avatar.indexOf('?imageView') === -1
    ) {
      team.avatar += '?imageView&thumbnail=300y300';
    }
  });
  // console.log('onTeams team', teams);

  return {
    type: 'UPDATE_TEAM_LIST',
    payload: teams,
  };
}

// 收到群成员及更新群成员接口
export function onTeamMembers(obj) {
  console.log('onTeamMembers', obj);
  console.log(obj);
  window.$store.dispatch({ type: 'im/UPDATE_TEAM_MEMBERS', payload: obj });
}

export function onCreateTeam(team) {
  onTeams(team);
  onTeamMembers({
    teamId: team.teamId,
    members: [],
    // members: [team.owner]
  });
}

export function onSynCreateTeam(team) {
  onTeams(team);
}

export function onDismissTeam(obj) {
  window.$store.dispatch({
    type: 'im/updateTeamList',
    payload: {
      invalid: { teamId: obj.teamId },
    },
  });
}

export function onUpdateTeam(team) {
  console.log('onUpdateTeam team', team);
  onTeams(team);
}

export function onTeamNotificationMsg({ state }, msg) {
  if (msg.attach.type === 'updateTeam' && msg.attach.team) {
    window.$store.dispatch({
      type: 'im/updateTeamInfo',
      payload: msg.attach.team,
    });
  }
  if (msg.attach.type === 'transferTeam') {
    onTeamMembers({
      teamId: msg.attach.team.teamId,
      members: msg.attach.members,
    });
  }
}

export function onAddTeamMembers(obj) {
  obj.accounts.forEach((account) => {
    // 自己被拉入群时更新群列表
    if (account === store.state.userUID) {
      const team = [obj.team];
      onTeams(team);
    }
  });
  onTeamMembers({
    teamId: obj.team.teamId,
    members: obj.members,
  });
}

export function onRemoveTeamMembers(obj) {
  obj.accounts.forEach((account) => {
    // 自己被移出群时，更新群列表
    if (account === store.state.userUID) {
      obj.team.validToCurrentUser = false;
      const team = [obj.team];
      onTeams(team);
    }
  });
  window.$store.dispatch({
    type: 'im/removeTeamMembersByAccounts',
    payload: {
      teamId: obj.team.teamId,
      accounts: obj.accounts,
    },
  });
}

export function onUpdateTeamMember(teamMember) {
  onTeamMembers({
    teamId: teamMember.teamId,
    members: teamMember,
  });
}

export function onUpdateTeamMembersMute(obj) {
  onTeamMembers({
    teamId: obj.team.teamId,
    members: obj.members,
  });
}

export function onUpdateTeamManagers(obj) {
  onTeamMembers({
    teamId: obj.team.teamId,
    members: obj.members,
  });
}

export function onTeamMsgReceipt(obj) {
  const state = window.$store.getState().im;
  obj.teamMsgReceipts.forEach((item) => {
    if (item.teamId === state.currReceiptQueryTeamId) {
      window.$store.dispatch({
        type: 'im/UPDATE_SINGLE_TEAM_MSG_READ',
        payload: item,
      });
    }
  });
  // console.log('群消息回执通知' + obj);
}

/*
 * 代理nim sdk中对群组的操作方法
 * @functionName  nim sdk中的方法名
 * @options 传递给sdk方法的参数
 */
export function delegateTeamFunction({ state }, { functionName, options }) {
  const nim = window.nim;
  if (functionName && nim[functionName] && typeof nim[functionName] === 'function') {
    nim[functionName](options);
  } else {
    throw `There is not property of '${functionName}' in nim or '${functionName}' is not a function`;
  }
}

export function getTeamMembers(teamId) {
  // console.log('getTeamMembers params', teamId);

  const nim = window.nim;
  if (!nim) {
    // 防止nim未初始化
    // console.log('防止nim未初始化');
    setTimeout(() => {
      getTeamMembers(teamId);
    }, 200);
  }
  nim.getTeamMembers({
    teamId,
    done: (err, obj) => {
      // console.log('getTeamMembers res', obj);
      if (obj.members) {
        onTeamMembers({
          teamId: obj.teamId,
          members: obj.members,
        });
      } else {
        // console.log('obj.members false');
        setTimeout(() => {
          getTeamMembers(teamId);
        }, 200);
      }
    },
  });
  return {
    type: 'NOOP',
  };
}

export function checkTeamMsgReceipt({ state }, msgs) {
  const result = /team-(\d+)/.exec(state.currSessionId);
  if (!result) {
    return null;
  }
  const teamId = result[1];

  const needToPeceiptList = getMsgNeedToReceipt(state, teamId, msgs);
  if (needToPeceiptList && needToPeceiptList.length > 0) {
    nim.sendTeamMsgReceipt({
      teamMsgReceipts: needToPeceiptList,
      done: (err, obj, content) => {
        // console.log('标记群组消息已读' + (!err ? '成功' : '失败'));
        if (!err) {
          window.$store.dispatch({
            type: 'im/updateSentReceipedMap',
            payload: needToPeceiptList,
          });
        }
      },
    });
  }

  window.$store.dispatch({
    type: 'im/updateReceiptQueryList',
    payload: {
      teamId,
      msgs,
    },
  });
}

// 查询需要发送回执的消息
function getMsgNeedToReceipt(state, teamId, msgs) {
  const sentReceipedList = state.sentReceipedMap[teamId] || [];
  const needToReceipt = msgs
    .filter(
      (msg) =>
        // 需要回执，且未发送过
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

export function getTeamMsgReads({ state }, needQuery) {
  nim.getTeamMsgReads({
    teamMsgReceipts: needQuery,
    done: (error, obj, content) => {
      if (error) {
        console.log(`获取群组消息已读${error}`);
      } else {
        // console.log('获取群组消息已读：', content)
        window.$store.dispatch({
          type: 'im/updateTeamMsgReads',
          payload: content,
        });
      }
    },
  });
}
