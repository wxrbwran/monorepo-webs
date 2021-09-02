import React from 'react';
// 视频通话中界面
function VideoStream({ type, netcallStatus }: ImWindowProps) {
  const onThePhone = ['accepted', 'remoteHangUp', 'currentHangUp'];
  return (
    <>
      {
        (type === 2 && onThePhone.includes(netcallStatus)) && (
          <div>
            <div className="video_big" id="VIDEO_REMOTE" />
            <div className="video_small" id="VIDEO_CURRENT" />
          </div>
        )
      }
    </>
  );
}
export default VideoStream;
