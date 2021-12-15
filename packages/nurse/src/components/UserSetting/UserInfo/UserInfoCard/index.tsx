import React from 'react';
import QRCode from 'qrcode.react';
import { useSelector } from 'umi';
import { btnRender } from '@/utils/button';
import { defaultAvatar } from 'xzl-web-shared/dist/src/utils/consts';
import UserBaseInfos from '../../components/UserBaseInfos';
import UserAvatar from '../../components/UserAvatar';
import CertificateCard from '../CertificateCard';
import styles from '../index.scss';

interface Iprops {
  handleToggleEdit: () => void;
  onClose: () => void;
}

function UserInfoCard({ handleToggleEdit, onClose }: Iprops) {
  const { userInfo } = useSelector((state:IState) => state.user);
  const qrCodeUrl = 'http://hybrid.test.xzlcorp.com/download?qrcode=olLDlK-8KKVP8-olLDlK-8PObDl';
  return (
    <div className={styles.user_info}>
      <div className={styles.base}>
        <div className={styles.left}>
          <UserAvatar avatarUrl={userInfo.avatarUrl || defaultAvatar} />
          <div className={styles.doctor_code}>
            医生识别码:
            {userInfo.uuCode}
          </div>
          <div className={styles.doctor_ewm}>
            {!!qrCodeUrl && <QRCode size={80} value={userInfo.qrCodeUrl} />}
            <div>医生二维码</div>
          </div>
        </div>
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
