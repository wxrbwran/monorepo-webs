import React from 'react';
import { useSelector } from 'umi';
import { btnRender } from '@/utils/button';
import UserBaseInfos from '../../components/UserBaseInfos';
import CertificateCard from '../CertificateCard';
import styles from '../index.scss';

interface Iprops {
  handleToggleEdit: () => void;
  onClose: () => void;
}

function UserInfoCard({ handleToggleEdit, onClose }: Iprops) {
  const { userInfo } = useSelector((state:IState) => state.user);
  return (
    <div className={styles.user_info}>
      <div className={styles.base}>
        <UserBaseInfos userInfo={userInfo} />
      </div>
      <CertificateCard userInfo={userInfo} />
      <div className={styles.btn}>
        {btnRender({
          okText: '修改个人资料',
          onOk: handleToggleEdit,
          onCancel: onClose,
        })}
      </div>
    </div>
  );
}

export default UserInfoCard;
