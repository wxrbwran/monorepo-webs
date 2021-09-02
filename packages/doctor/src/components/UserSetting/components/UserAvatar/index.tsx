import React from 'react';
import { SafetyCertificateFilled } from '@ant-design/icons';
import config from '@/config';
import { accountStatus } from '@/utils/tools';
import styles from './index.scss';

interface IProps {
  avatarUrl?: string;
  status: number;
}
function UserAvatar({ avatarUrl, status }: IProps) {
  return (
    <div className={styles.avatar_wrap}>
      <img className={styles.avatar} src={avatarUrl || config.defaultAvatar} alt="医生头像" />
      <div className={styles.certification}>
        <SafetyCertificateFilled />
        {accountStatus[status]}
      </div>
    </div>
  );
}

export default UserAvatar;
