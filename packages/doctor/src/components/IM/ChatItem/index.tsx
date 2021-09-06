import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { Popover } from 'antd';
import classnames from 'classnames';
import { useDispatch } from 'umi';
import { defaultAvatar } from '@/utils/consts';
import { getRole } from '@/utils/utils';
import { Role } from '@/utils/role';
import * as api from '@/services/api';
// eslint-disable-next-line import/no-cycle
import AdjustMedicineCustom from '../AdjustMedicineCustom';
import BloodCustom from '../BloodCustom';
import DoctorTip from '../DoctorTip';
import Project from '../Project';
import ProjectInvite from '../ProjectInvite';
import Scale from '../Scale';
import './index.scss';
import BindCustom from '../BindCustom';
import Video from '../Video';

interface IMsg {
  rawMsg: Store;
  // myInfo: Store;
  avatarArr: IAvatar[];
}
interface IFile {
  dur: number,
  ext: string,
  url: string
}
export interface IAvatar {
  avatarUrl: string;
  name: string;
  sid: string
}

const audio:any = { // 正在播放音频的 audio、target
  $node: null,
  $audio: null,
  timeout: '',
};

const ChatItem: FC<IMsg> = (props) => {
  const { rawMsg, avatarArr } = props;
  const [show, setShow] = useState(false);
  // console.log('rawMsg', JSON.stringify(rawMsg));
  const dispatch = useDispatch();
  const mediaMsg:any = useRef<HTMLInputElement>();
  const item = { ...rawMsg };
  if (item.type === 'text') {
    // 文本消息
    item.showText = item.text;
  } else if (item.type === 'audio') {
    item.width = `${(5.3 + Math.round(item.file.dur / 1000) * 0.03).toFixed(2)}rem`;
    item.audioSrc = item.file.mp3Url;
    item.showText = `<i>${Math.round(item.file.dur / 1000)}"</i> 点击播放`;
  } else if (item.type === 'custom' && item.content.type === 122) {
    if (Array.isArray(item.content?.content)) {
      item.showText = item.content?.content.filter((con: { role: string; }) => [
        Role.UPPER_DOCTOR.id,
        Role.LOWER_DOCTOR.id,
        Role.ALONE_DOCTOR.id,
        Role.NURSE_YL.id,
      ].includes(con.role),
      )[0]?.msg;
    }
  }
  const custom = item.custom || {};
  item.custom = custom;
  item.fromNick = custom.fromUser?.name;
  const filterCurrAvatar = avatarArr.filter((ava) => ava.sid === custom.fromUser?.sid);
  item.avatar = filterCurrAvatar[0]?.avatarUrl;
  // item.avatar = custom.fromUser?.avatarUrl;
  const msg:any = item;

  // 缩略图 视频
  useEffect(() => {
    let media = null;
    if (item.type === 'image') {
      // 图片消息缩略图
      media = new Image();
      media.src = `${item.file.url}?imageView&thumbnail=180x0&quality=85`;
      mediaMsg.current?.appendChild(media);
    } else if (item.type === 'video') {
      if (/(mov|mp4|ogg|webm)/i.test(item.file.ext)) {
        media = document.createElement('video');
        media.src = item.file.url;
        media.width = 640;
        media.height = 480;
        media.autoplay = false;
        media.preload = 'metadata';
        media.controls = true;
        mediaMsg.current?.appendChild(media);
      } else {
        const aLink = document.createElement('a');
        aLink.href = item.file.url;
        aLink.target = '_blank';
        aLink.innerHTML = `<i class="u-icon icon-file"></i>${item.file.name}`;
        mediaMsg.current?.appendChild(aLink);
      }
    }
  }, []);

  // 播放完毕
  const canclePlayAudio = () => {
    if (audio.$node.childNodes[2]) {
      audio.$node.removeChild(audio.$node.childNodes[2]);
    }
    audio.$node.innerHTML += '点击播放';
  };

  // 暂停播放 重新放
  const stopPlayAudio = () => {
    if (audio.$audio) {
      audio.$audio.pause();
      canclePlayAudio();
      clearTimeout(audio.timeout);
      audio.$audio = null;
      audio.$node = null;
      audio.timeout = '';
    }
  };

  const playAudio = (msgItem:{file:IFile, flow: string}, event: any) => {
    let $target;
    if (!~event.target.className.indexOf('msg-audio')) {
      $target = event.target.parentElement;
    } else {
      $target = event.target;
    }
    // 播放中途点击
    if (audio.$audio) {
      const targetChild1 = $target.childNodes[2];
      const sameNode = targetChild1 && targetChild1.tagName === 'IMG';
      stopPlayAudio();
      if (sameNode) {
        return;
      }
    }
    // 时长
    const duration = msgItem.file.dur;
    if (!duration) {
      return;
    }
    // 创建audio
    audio.$audio = document.createElement('audio');
    const $source = document.createElement('source');
    const audioType = msgItem.file.ext;
    $source.src = msgItem.file.url;
    $source.type = `audio/${audioType === 'mp3' ? 'mpeg' : audioType}`;
    audio.$audio.appendChild($source);
    audio.$audio.play();
    audio.$node = $target;
    $target.innerHTML = $target.innerHTML.replace('点击播放',
      '<span>正在播放</span>');
    audio.timeout = setTimeout(() => {
      audio.$audio = null;
      canclePlayAudio();
    }, duration);
  };

  const handleShowImage = () => {
    dispatch({
      type: 'im/TOGGLE_VIEWER',
      payload: { isShow: true, src: msg.file.url },
    });
  };
  const msgRecall = () => {
    api.im.msgRecall(msg.custom?.msgId).then(() => {
      console.log('撤销成功----');
    })
      .catch((err) => {
        console.log('err', err);
      });
    setShow(false);
  };
  // 24小时之内消息可撤回
  const popoverDom = (child: {} | null | undefined) => (
    msg.flow === 'out' && msg.time >= +new Date() - 24 * 60 * 60 * 1000
      ? (
        <Popover
          content={<span onClick={msgRecall} className="text-sm cursor-pointer">撤回</span>}
          title="Title"
          trigger="contextMenu"
          visible={show}
          onVisibleChange={() => setShow(!show)}
        >
          {child}
        </Popover>
      )
      : <>{child}</>
  );
  return (
    <li
      className={`${classnames('u-msg', {
        // 'item-me': msg.from === myInfo.account,
        'item-me': msg.flow === 'out',
        'item-you': msg.flow === 'in',
        'item-tip': msg.type === 'tip',
      })}`}
    >
      {/* 103 调整治疗方案 123app调整用药 119 项目邀请 124CRF量表 */}
      {[103].includes(msg.content?.type)
        ? '' : <div className="time">{msg.displayTimeHeader}</div>}
      {/* {msg.type === 'tip' && <div className="tip">{msg.showText}</div>} */}
      {
        msg?.custom.chatType === 1 && (
          <div className="tip">{`你${msg.flow === 'in' ? '收到' : '发送'}了一条私聊，请在手机上查看`}</div>
        )
      }
      {msg?.type === 'custom' && (
        <>
          {(() => {
            switch (msg.content?.type) {
              case 110:
              case 111:
                return <BloodCustom msg={msg} />;
              case 106:
                return <AdjustMedicineCustom msg={msg} />;
              case 116:
                return <BindCustom msg={msg} />;
              case 102:
                return <DoctorTip msg={msg} />;
              case 118:
                return <Video msg={msg} />;
              case 120:
                return <Project msg={msg} />;
              case 119:
                return <ProjectInvite msg={msg} />;
              case 114:
              case 115:
                return <Scale msg={msg} />;
              case 122:
                return <div className="tip">{msg.showText}</div>;
              case 123:
                return <div className="tip">你发送了一条调药消息，请在手机上查看</div>;
              case 124:
                return <div className="tip">你收到了一个crf量表，请在手机上查看</div>;
              default:
                return '';
            }
          })()}
        </>
      )}
      {(msg.flow === 'in' || msg.flow === 'out') && !['tip', 'custom'].includes(msg.type) && !(msg?.custom.chatType === 1) && (
        <div className="chat__item">
          <div className="chat__item-avatar">
            <img className="icon u-circle" alt="" src={msg.avatar || defaultAvatar} />
          </div>
          <div className="chat__item-content">
            <p className="msg-user">
              {`${msg.fromNick} (${getRole(custom.fromUser?.role)})`}
            </p>
            {msg.type === 'text' && popoverDom(<p className="msg-text">{msg.showText}</p>)}
            {msg.type === 'image' && (
              popoverDom(<p
                className="msg-text image"
                ref={mediaMsg}
                onClick={handleShowImage}
              />)
            )}
            {msg.type === 'video' && (
              popoverDom(<p className="msg-text video" ref={mediaMsg} />)
            )}
            {msg.type === 'audio' && (
              popoverDom(<p
                className="msg-text msg-audio"
                onClick={($event) => playAudio(msg, $event)}
                dangerouslySetInnerHTML={{
                  __html: msg.showText,
                }}
              />)
            )}
            {msg.type === 'file' && (
              <p className="msg-text file">
                <a
                  href={window.nim.packFileDownloadName({
                    url: msg.file.url,
                    name: msg.file.name,
                  })}
                  download={msg.showText}
                >
                  <i className="u-icon icon-file" />
                  {msg.file.name}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default ChatItem;
