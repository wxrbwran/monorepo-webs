import React, { useState } from 'react';
import { Slider } from 'antd';
import mute from '@/assets/img/im/mute.png';
import volume from '@/assets/img/im/volume.png';

// 调整音量
function BtnVolume({ netcallStatus, myNetcall }: ImWindowProps) {
  const [isMute, setIsMute] = useState(false); // 是否静音
  const [showSlider, setShowSlider] = useState(false);
  const [volumeVal, setVolume] = useState(100);
  const handleToggleVolume = () => {
    if (isMute) {
      const v = (255 * (volumeVal / 100)).toFixed(2);
      myNetcall.setDeviceVolume(v);
    } else {
      myNetcall.setDeviceVolume(0);
    }
    setIsMute(!isMute);
  };
  const handleVolume = (val: number) => {
    console.log('val11', val);
    const v = (255 * (volumeVal / 100)).toFixed(2);
    myNetcall.setDeviceVolume(v);
    setVolume(val);
    setIsMute(false);
  };

  // 通话中，对方挂断，自己挂断 显示通话中的界面(都是已接通之后的状态)
  const onThePhone = ['accepted', 'remoteHangUp', 'currentHangUp'];
  return (
    <>
      {
        onThePhone.includes(netcallStatus) && (
          <div className="volume" onMouseEnter={() => setShowSlider(true)} onMouseLeave={() => setShowSlider(false)}>
            <div
              className="slider_wrap"
              style={{ display: showSlider ? 'block' : 'none' }}
            >
              <div className="slider_bar">
                <Slider
                  vertical
                  value={volumeVal}
                  tooltipVisible
                  tooltipPlacement="top"
                  tipFormatter={(val) => `${val}%`}
                  onChange={handleVolume}
                />
              </div>
            </div>
            <div className="img_icon">
              <img src={isMute ? mute : volume} alt="音量" onClick={handleToggleVolume} />
            </div>
            <div> 音量 </div>
          </div>
        )
      }
    </>
  );
}
export default BtnVolume;
