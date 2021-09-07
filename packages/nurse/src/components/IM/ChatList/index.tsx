import React, {
  FC, useRef, useEffect, useState,
} from 'react';
import { useSelector, useDispatch } from 'umi';
import { PlusCircleOutlined } from '@ant-design/icons';
// import Viewer from 'react-viewer';
import Viewer from '@/components/Viewer';
import * as api from '@/services/api';
// import { Role } from 'xzl-web-shared/src/utils/role';
import { compareMsgs, getFromDoctorInfo } from '@/utils/utils';
import { imMsgType } from '@/utils/tools';
import reCalcAllMessageTime from '@/utils/reCalcAllMessageTime';
// eslint-disable-next-line import/no-cycle
import ChatItem from '../ChatItem';
import styles from './index.scss';

interface IHistory {
  time?: number;
  type?: number | string;
  flow?: string;
  custom?: Object;
  text?: string;
  file?: Object;
  content?: Object;
  sessionId?: string;
}
interface IInfo {
  time: number;
  type: number;
  flow: string;
  body: {
    msg: string;
  };
  ext: Object;
}
interface ISid {
  ext: {
    fromUser: {
      sid: string;
    }
  }
}
export interface IAvatar {
  avatarUrl: string;
  name: string;
  sid: string
}
const ChatList: FC = () => {
  const im = useSelector((state: IState) => state.im);
  const {
    myInfo,
    currSessionMsgs,
    imageVisible,
    images,
    activeImageIndex,
    noMoreHistoryMsgs,
    currSessionId,
    sessions,
    // historyMsgs,
  } = im;
  // 接收人的wcId和sId
  const patientWcId = window.$storage.getItem('patientWcId');
  const patientSid = window.$storage.getItem('patientSid');
  // const [msgs, setMsgs] = useState<any>([]); // 云信当前消息+历史消息
  // const [currMsgs, setCurrMsgs] = useState<any>([]); // 云信当前消息
  const chatList: any = useRef<HTMLUListElement>();
  const [fetching, setFetching] = useState(false);
  const [avatarArr, setAvatarArr] = useState<IAvatar[]>([]); // 存储通过sid拉取的包含有头像的用户信息
  const [sidArr, setSidArr] = useState<string[]>([]); // 存储用于拉取头像信息的sid
  const dispatch = useDispatch();

  const closeImageViewer = () => {
    dispatch({ type: 'im/TOGGLE_VIEWER', payload: { isShow: false } });
  };

  // const handleChatScroll = debounce(() => {
  //   if (chatList.current?.scrollTop <= 20) {

  //   }
  // }, 300);
  const getMsgs = (endTime?: number) => {
    setFetching(true);
    // 过滤出当前会话组成员
    const currSession: IPerson[] = sessions.filter(
      (item: IPerson) => `p2p-${item.sessionId}` === currSessionId,
    );
    // 得到发送者的信息
    const currDoctor = getFromDoctorInfo(currSession[0]);
    const sessionWcId = currDoctor[0]?.wcId;
    const sessionSid = currDoctor[0]?.sid;
    const params = {
      sessionWcId,
      sessionSid,
      associateWcId: patientWcId,
      associateSId: patientSid,
      // nsId,
      sessionId: currSession[0]?.sessionId,
      endTime: endTime || currSessionMsgs[0]?.time,
      limit: 50,
    };
    // 拉取历史消息
    api.im
      .getMsg(params)
      .then(async (res) => {
        setFetching(false);
        if (res.immessageInfos.length === 0) {
          // 上拉加载到没数据的情况
          if (currSessionMsgs.length > 0) {
            dispatch({
              type: 'im/SET_NO_MORE_HISTORY_MSGS',
              payload: currSessionId,
            });
          }
        } else {
          // 动态设置头像，得到包含头像信息的数组
          const originSidArr = res.immessageInfos.map((item:ISid) => item.ext.fromUser.sid);
          const concatSidArr = Array.from(
            new Set([...sidArr, ...originSidArr]),
          );
          setSidArr([...concatSidArr]);
          concatSidArr.forEach((sid:string) => {
            api.im.getUserInfo({ sid }).then((re) => {
              setAvatarArr((pre) => [...pre, re]);
            }).catch((err) => {
              console.log('err', err);
            });
          });
          // 格式化返回数据，设置currSessionMsgs
          // 调达标值103，项目邀请119，项目已同意是120，血压110,
          // 血糖111，帮患者修改服药计划106，绑定医生116， 语音视频118，医生提醒102
          // 主观表114，客观表115, 123app调整用药
          let formatMsgs: IHistory[] = [];
          res.immessageInfos.forEach((item: IInfo) => {
            const {
              time, type, flow, body, ext,
            } = item;
            const formatMsgsItem: IHistory = {};
            formatMsgsItem.time = time;
            formatMsgsItem.type = imMsgType[type];
            formatMsgsItem.flow = flow;
            formatMsgsItem.custom = { ...ext };
            formatMsgsItem.sessionId = ext.sessionId;
            if (type === 0) {
              formatMsgsItem.text = body.msg; // 文字
            } else if ([1, 2, 3, 6].includes(type)) {
              formatMsgsItem.file = { ...body }; // 视频、图片、文件、声音
            } else if (
              [103, 106, 110, 111, 102, 101, 116, 118, 119, 120, 114, 115, 123].includes(type)
            ) {
              formatMsgsItem.type = 'custom';
              formatMsgsItem.content = { ...body }; // 调达标值、调药、血压、医生提醒、医生通知
            } else if (type === 122) {
              formatMsgsItem.type = 'custom';
              formatMsgsItem.content = { ...body }; // 提醒医生
            }
            formatMsgs = [...formatMsgs, formatMsgsItem];
          });

          // 存储拉取的历史消息
          // dispatch({
          //   type: 'im/SET_HISTORY_MSGS',
          //   payload: {
          //     historyMsgs: formatMsgs.sort(compareMsgs('time')),
          //     sessionId: currSessionId,
          //   },
          //   // payload: { historyMsgs: res.immessageInfos, nsId },
          // });
          dispatch({
            type: 'im/UPDATE_CURR_SESSION_MSGS',
            payload: {
              type: 'concat',
              msgs: [...reCalcAllMessageTime(formatMsgs.sort(compareMsgs('time')))],
            },
          });
          // 默认第一次历史消息拉取成功，滚动到最底部
          const chatListEl: any = document.getElementById('CHAT_LIST');
          if (chatListEl && chatList && endTime) {
            setTimeout(() => {
              chatListEl.scrollTop = 999999;
            }, 300);
          }
        }
      })
      .catch((err) => {
        setFetching(false);
        console.log('err', err);
      });
  };
  useEffect(() => {
    if (currSessionId) {
      // 当前会话一切换先清空currSessionMsgs,不然下个会话没消息时，还会渲染出别的会话的消息
      dispatch({
        type: 'im/UPDATE_CURR_SESSION_MSGS',
        payload: { type: 'destroy', sessionId: currSessionId },
      });
      // 默认第一次拿当前时间的时间戳往前拉历史消息
      getMsgs(+new Date());
      // 会话一切换清空noMoreHistoryMsgs，因为每切换会话都需要重新上拉加载历史消息，重新设置noMoreHistoryMsgs值
      dispatch({
        type: 'im/RESET_NO_MORE_HISTORY_MSGS',
        payload: null,
      });
    }
  }, [currSessionId]);

  useEffect(() => () => {
    // 返回患者列表页清空当前会话id
    const payload = { type: 'destroy', sessionId: null };
    dispatch({
      type: 'im/UPDATE_CURR_SESSION_ID',
      payload,
    });
  }, []);

  useEffect(() => {
    if (currSessionMsgs.length > 0) {
      const filterImages = currSessionMsgs
        .filter((msg: { type: string }) => msg.type === 'image')
        .map((msg: { file: { url: string } }) => ({ src: msg.file.url }));
      // 更新state的images
      dispatch({
        type: 'im/UPDATE_IMAGES',
        payload: filterImages,
      });
    }
  }, [currSessionMsgs]);

  return (
    <>
      <ul id="CHAT_LIST" ref={chatList} className={styles.chat_list}>
        {currSessionMsgs.length > 0 && (
          <li className="u-msg item-time none">
            {noMoreHistoryMsgs[currSessionId] ? (
              '已经到顶啦'
            ) : (
              <div onClick={() => getMsgs()}>
                {fetching ? (
                  '加载中'
                ) : (
                  <p>
                    <PlusCircleOutlined />
                    点击加载更多聊天记录
                  </p>
                )}
              </div>
            )}
          </li>
        )}
        {reCalcAllMessageTime(currSessionMsgs).map((msg: Store) => (
          <ChatItem key={msg.time} myInfo={myInfo} rawMsg={msg} avatarArr={avatarArr} />
        ))}
        {/* {
          imVideoData.map((msg: Store) => (
            <ChatItem key={msg.time} myInfo={myInfo} rawMsg={msg} />
          ))
        } */}
      </ul>
      <Viewer
        activeIndex={activeImageIndex}
        visible={imageVisible}
        onClose={closeImageViewer}
        images={images}
      />
    </>
  );
};

export default ChatList;
