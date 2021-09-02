import React from 'react';
import QRCode from 'qrcode.react';
import config from '@/config';
import styles from '../index.scss';

interface IProps {
  currentOrg: {
    orgName: string;
    name: string;
    title: string;
    uuCode: string;
    department: {
      name: string;
    };
    avatarUrl: string;
    qrCodeUrl: string;
  }
}
function OrgDetail({ currentOrg }: IProps) {
  const {
    orgName, name, title, uuCode, department, avatarUrl, qrCodeUrl,
  } = currentOrg;
  return (
    <div className={styles.doctor} id="ewm">
      <div className={styles.info}>
        <div className={styles.left}>
          <div className={styles.name}>
            {name}
          </div>
          <div>
            {`${title || ''} ${title && department?.name ? '|' : ''} ${department?.name || ''}`}
          </div>
          <div>
            {orgName}
          </div>
          <div className={styles.show_id}>
            {`医生识别码:${uuCode}`}
          </div>
        </div>
        <div className={styles.right}>
          <img
            className={styles.avatar}
            src={avatarUrl || config.defaultAvatar}
            alt="医生头像"
            crossOrigin="anonymous"
          />
        </div>
      </div>
      <div className={styles.ewm}>
        {qrCodeUrl && <QRCode id="qrCodeUrl" size={200} value={qrCodeUrl} />}
        <p>患者可通过app或小程序扫描二维码签约</p>
      </div>
    </div>
  );
}
export default OrgDetail;
