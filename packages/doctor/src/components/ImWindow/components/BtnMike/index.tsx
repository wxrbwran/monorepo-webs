import React, { useState } from 'react';
import close from '@/assets/img/im/close.png';
import open from '@/assets/img/im/open.png';

// 开启/关闭 麦克风

function BtnMike({ netcallStatus, myNetcall }: ImWindowProps) {
  const [isOpen, setIsOpen] = useState(true);
  const handleToggleMike = () => {
    myNetcall.setDeviceAudioIn(!isOpen);
    setIsOpen(!isOpen);
  };
  const onThePhone = ['accepted', 'remoteHangUp', 'currentHangUp']; // 通话中，对方挂断，自己挂断 显示通话中的界面(都是已接通之后的状态)
  return (
    <>
      {
        onThePhone.includes(netcallStatus) && (
          <div className="mike">
            <img src={isOpen ? open : close} alt="麦克风" onClick={handleToggleMike} />
            <div>
              {isOpen ? '关闭' : '开启'}
              麦克风
            </div>
          </div>
        )
      }
    </>
  );
}
export default BtnMike;
