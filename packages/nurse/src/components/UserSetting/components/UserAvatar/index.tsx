import React from 'react';
import { SafetyCertificateFilled } from '@ant-design/icons';
import config from '@/config';
import styles from './index.scss';

interface IProps {
  avatarUrl?: string;
}
function UserAvatar({ avatarUrl }: IProps) {
  console.log('avatarUrl', avatarUrl);
  return (
    <div className={styles.avatar_wrap}>
      <img className={styles.avatar} src={avatarUrl || config.defaultAvatar} alt="医生头像" />
      <div className={styles.certification}>
        <SafetyCertificateFilled />
        已认证
      </div>
    </div>
  );
}

export default UserAvatar;
