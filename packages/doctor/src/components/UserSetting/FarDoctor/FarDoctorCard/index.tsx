import React from 'react';
import config from '@/config';
import { btnRender } from '@/utils/button';
import UserBaseInfos from '../../components/UserBaseInfos';
import styles from './index.scss';

interface Iprop {
  close: () => void;
  toggleEdit: () => void;
}
function FarDoctorCard({ close, toggleEdit }: Iprop) {
  console.log(close, toggleEdit);
  return (
    <div className={styles.far_doctor}>
      <div className={styles.info_wrap}>
        <div className={styles.avatar}>
          <img src={config.defaultAvatar} alt="头像" />
        </div>
        <UserBaseInfos userInfo={{}} />
        {/* <h3>尚未填写未来医生信息</h3> */}
      </div>
      <div className={styles.btn}>
        {btnRender({
          okText: '编辑资料',
          onOk: toggleEdit,
          onCancel: close,
        })}
      </div>
    </div>
  );
}

export default FarDoctorCard;
