import React from 'react';
import { useSelector } from 'umi';
import cancel from '@/assets/img/im/cancel.png';

// 操作按钮  来电(拒绝/接听) 拨打(取消)  通话中(音量/挂断/关闭麦克风)
// 此页面按钮类型  拒绝、取消、挂断
function BtnEndCall({
  netcallStatus,
}: ImWindowProps) {
  const myNetcall = useSelector((state: IState) => state.im.myNetcall);
  // const [clickFlag, setFlag] = useState(true);
  const handleEndCall = () => {
    // if (clickFlag) {
    // setFlag(false);
    console.log('+++++++++++++++');
    if (netcallStatus === 'accepted') {
      myNetcall.hangup('hangup'); // 挂断
    } else if (netcallStatus === 'incomingCall') {
      myNetcall.reject(); // 拒绝
    } else {
      myNetcall.hangup('cancel'); // 取消
    }
    // setTimeout(() => { setFlag(true); }, 2000);
    // }
  };
  const textObj: CommonData = {
    accepted: '挂断',
    incomingCall: '拒绝',
    comingCall: '取消',
  };
  return (
    <div>
      <img src={cancel} alt="结束通话" onClick={handleEndCall} />
      <div>{textObj[netcallStatus]}</div>
    </div>
  );
}
export default BtnEndCall;
