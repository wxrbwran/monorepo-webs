import React from 'react';
import { Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'umi';
import { IState } from 'typings/model';
import video from '@/assets/img/im/bar_video.png';
import phone from '@/assets/img/im/bar_tel.png';
import defaultPatientAvatar from '@/assets/img/patientAvatar.jpg';
import { Role } from 'xzl-web-shared/src/utils/role';

function NetcallBtn() {
  const myNetcall = useSelector((state: IState) => state.im.myNetcall);
  const { avatarUrl, name } = useSelector((state: IState) => state.currentPatient);
  // const [type, setType] = useState(1); // 1语音 2视频
  const dispatch = useDispatch();
  const btnList = [
    {
      imgSrc: phone,
      type: 1,
    },
    {
      imgSrc: video,
      type: 2,
    },
  ];
  const handleDoCall = (typeNum: number) => {
    const patientWcId = window.$storage.getItem('patientWcId');
    const patientSid = window.$storage.getItem('patientSid');
    window.$api.im.getSessionGroup({ patientWcId, patientSid }).then((res) => {
      let patientYxAccid: string = '';
      res.groups.forEach((group) => {
        group.infos.forEach((item) => {
          if ([Role.PATIENT.id, Role.PATIENT_VIP.id].includes(item.role)) {
            patientYxAccid = item.accid;
          }
        });
      });
      console.log('患者yx帐号', patientYxAccid);
      dispatch({
        type: 'im/UPDATE_NETCALL_DATA',
        payload: {
          avatar: avatarUrl || defaultPatientAvatar,
          name,
          type: typeNum,
        },
      });
      // setType(typeNum);
      // myNetcall.doCalling(typeNum, 'dev.14333');
      myNetcall.doCalling(typeNum, patientYxAccid);
    });
  };
  return (
    <>
      {btnList.map((item) => (
        <Popconfirm
          key={item.type}
          placement="topRight"
          icon={<></>}
          title={<div className="videoPopInfo">是否拨打给患者？</div>}
          onConfirm={() => handleDoCall(item.type)}
          okText="是"
          cancelText="否"
        >
          <img className="netcall_icon w-20 h-20" src={item.imgSrc} alt="发起音视频通话" />
        </Popconfirm>
      ))}
    </>
  );
}
export default NetcallBtn;
