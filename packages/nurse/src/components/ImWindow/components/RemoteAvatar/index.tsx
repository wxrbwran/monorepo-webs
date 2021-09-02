import React from 'react';
// 患者头像
// 只有在状态为视频通话，且已经在通话中或者挂断时，不展示患者头像和姓名
type IProps = ImWindowProps & {
  avatar: string;
  name: string;
};
function RemoteAvatar({
  type, netcallStatus, avatar, name,
}: IProps) {
  const onThePhone = ['accepted', 'remoteHangUp', 'currentHangUp'];
  return (
    <>
      {
        (type === 2 && onThePhone.includes(netcallStatus)) ? null : (
          <>
            <div className="head"><img src={avatar} alt="头像" /></div>
            <div className="name">{name}</div>
          </>
        )
      }
    </>
  );
}
export default RemoteAvatar;
