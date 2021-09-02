import React from 'react';
// 来电或者拨打，提示性文案
function CallStatusText({
  type, netcallStatus,
}: ImWindowProps) {
  const dial = ['comingCall', 'rejected', 'callOff', 'noResponse', 'offLine', 'unknownError']; // 主动拨打
  const incomingCall = ['incomingCall', 'reject', 'remoteCallOff', 'onCallerAckSync']; // 被动来电
  const status = ['', '语音', '视频'];
  return (
    <>
      <div>
        { incomingCall.includes(netcallStatus) && (
          <p className="status">
            { `邀请您${status[type]}通话` }
            <span className="dotting" />
          </p>
        ) }
        { dial.includes(netcallStatus) && (
          <p className="status">
            <span>正在等待对方接受邀请</span>
            <span className="dotting" />
          </p>
        ) }
      </div>
    </>
  );
}
export default CallStatusText;
