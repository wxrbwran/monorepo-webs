import React, { useState } from 'react';
import call from '@/assets/img/im/call.png';

// 操作按钮  来电(拒绝/接听) 拨打(取消)  通话中(音量/挂断/关闭麦克风)
// 此页面按钮类型  接听

function BtnStartCall({ netcallStatus, myNetcall, type }: ImWindowProps) {
  const [clickFlag, setFlag] = useState(true);
  const handleStartCall = () => {
    if (clickFlag) {
      setFlag(false);
      myNetcall.accept(type);
    }
    setTimeout(() => {
      setFlag(true);
    }, 1000);
  };
  const incomingCall = ['incomingCall', 'reject', 'remoteCallOff', 'onCallerAckSync']; // 被动来电
  return (
    <>
      {
        incomingCall.includes(netcallStatus) && (
          <div className="accept">
            <img src={call} alt="接听" onClick={handleStartCall} />
            <div>接听</div>
          </div>
        )
      }
    </>
  );
}
export default BtnStartCall;
