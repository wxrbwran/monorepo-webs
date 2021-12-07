import React, { useState, useEffect } from 'react';
import { useSelector } from 'umi';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { getDurationText } from '@/utils/date';
import VideoStream from './components/VideoStream';
import RemoteAvatar from './components/RemoteAvatar';
import BtnEndCall from './components/BtnEndCall';
import BtnStartCall from './components/BtnStartCall';
import CallStatusText from './components/CallStatusText';
import BtnMike from './components/BtnMike';
import BtnVolume from './components/BtnVolume';
import ToastText from './components/ToastText';
import DeviceSupport from './components/DeviceSupport';
import styles from './index.scss';

let netcallDurationTimer: any = null;
function ImWindow() {
  const {
    netcallStatus, type, avatar, name, toast,
  } = useSelector((state: IState) => state.im.netcallData);
  const myNetcall = useSelector((state: IState) => state.im.myNetcall);
  const [curNetCallStatus, setCurNetCallStatus] = useState(netcallStatus);
  const [remoteBig, setRemoteBig] = useState(false);
  const [durationTimer, setDurationTimer] = useState<string>();
  // console.log('windowwwim');
  // 清除通话时长
  const clearDurationTimer = () => {
    if (netcallDurationTimer) {
      clearInterval(netcallDurationTimer);
      netcallDurationTimer = null;
      setTimeout(() => {
        setDurationTimer('00 : 00');
      }, 2000);
    }
  };
  // 开启更新通话时长
  const startDurationTimer = () => {
    clearDurationTimer();
    const startTime = (new Date()).getTime();
    function timer() {
      const timeText = getDurationText((new Date()).getTime() - startTime);
      setDurationTimer(timeText);
    }
    netcallDurationTimer = setInterval(timer, 1000);
  };
  useEffect(() => {
    clearDurationTimer();
  }, [toast]);
  useEffect(() => {
    if (netcallStatus === 'networkError') {
      if (curNetCallStatus === 'comingCall') {
        myNetcall.hangup('cancel'); // 取消
      } else if (curNetCallStatus === 'accepted') {
        myNetcall.hangup('hangup'); // 挂断
      } else if (curNetCallStatus === 'incomingCall') {
        myNetcall.reject(); // 拒绝
      } else {
        myNetcall.hangup('hangup'); // 挂断
        console.log('异常状态');
      }
      console.log('挂断');
    } else if (netcallStatus !== curNetCallStatus) {
      const startCall = ['comingCall', 'incomingCall'].includes(curNetCallStatus) && netcallStatus === 'accepted';
      // 如果当前status为来电或拨打，props的status为已通话。表示开始通话，开始计时
      if (startCall) {
        startDurationTimer();
      }
      setCurNetCallStatus(netcallStatus);
    }
  }, [netcallStatus]);

  // 通话中，对方挂断，自己挂断 显示通话中的界面(都是已接通之后的状态)
  const onThePhone = ['accepted', 'remoteHangUp', 'currentHangUp'];
  const configProps = {
    type,
    netcallStatus,
    myNetcall,
  };
  const handleToogleSize = () => {
    myNetcall.updateVideoShowSize(true, true, !remoteBig);
    setRemoteBig(!remoteBig);
  };
  return (
    <>
      <DragModal
        className={styles.im_window}
        wrapClassName="ant-modal-wrap-center"
        width="100%"
        visible={!!netcallStatus}
        title=""
        onCancel={() => {}}
        footer={null}
        closable={false}
        destroyOnClose
      >
        <div>
          {
            netcallStatus !== 'webnetError' && (
              <div
                className="im_content"
                style={{
                  width: (type === 2 && onThePhone.includes(netcallStatus)) ? 716 : 300,
                  height: (type === 2 && onThePhone.includes(netcallStatus)) ? 541 : 419,
                }}
              >
                <div className="bg_img" style={{ backgroundImage: `url(${avatar})` }} />
                <div id="v_box" style={{ display: type === 2 && onThePhone.includes(netcallStatus) ? 'block' : 'none' }}>
                  <div
                    className={remoteBig ? 'video_small' : 'video_big'}
                    id="VIDEO_CURRENT"
                  />
                  <div
                    className={remoteBig ? 'video_big' : 'video_small'}
                    id="VIDEO_REMOTE"
                  />
                  <div className="toggle_size" onClick={handleToogleSize} />
                </div>
                <VideoStream {...configProps} />
                <RemoteAvatar {...configProps} avatar={avatar} name={name} />
                <CallStatusText {...configProps} />
                { onThePhone.includes(netcallStatus) && <div className="talk_time">{durationTimer}</div> }
                <div className="operate">
                  <BtnVolume {...configProps} />
                  <BtnEndCall {...configProps} />
                  <BtnStartCall {...configProps} />
                  <BtnMike {...configProps} />
                </div>
                <ToastText toast={toast} />
              </div>
            )
          }
          <DeviceSupport />
        </div>
      </DragModal>
    </>
  );
}

export default ImWindow;
