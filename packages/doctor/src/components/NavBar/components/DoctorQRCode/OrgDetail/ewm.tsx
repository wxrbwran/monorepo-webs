import React from 'react';
import QRCode from 'qrcode.react';
import config from '@/config';
import iconShowId from '@/assets/img/icon_showid.png';
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
            <img className="w-10 h-10 mr-5" src={iconShowId} alt="" />
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
        {qrCodeUrl && <QRCode id="qrCodeUrl" size={160} value={qrCodeUrl} />}
        {/* <p>患者可通过APP或小程序扫描二维码签约</p> */}
      </div>
      <p className="text-center mt-15 text-gray-800">患者可通过APP或小程序扫描二维码签约</p>
    </div>
  );
}
export default OrgDetail;
