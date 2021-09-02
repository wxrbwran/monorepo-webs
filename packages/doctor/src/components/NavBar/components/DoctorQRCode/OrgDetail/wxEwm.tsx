import React from 'react';
import config from '@/config';
import doctorService from '@/assets/img/nav_bar/doctorService.png';
import styles from '../index.scss';

function OrgDetail() {
  const qrCodeUrlWx = 'https://staff-qrcode-dev.oss-cn-beijing.aliyuncs.com/f95bda39-7741-4cd5-b7fc-5432534d7b53';
  return (
    <div className={styles.doctor} id="wxewm">
      <div className={styles.wxinfo}>
        <div className={styles.right}>
          <img className={styles.avatar} src={config.defaultAvatar} alt="医生头像" />
        </div>
        <div className={styles.left}>
          <div className={styles.name}>
            愚人节哈哈哈
          </div>
          <div>
            主任医师 | 全科
          </div>
          <div>
            心之力医院
          </div>
        </div>
      </div>
      <div className={styles.service}>
        <img src={doctorService} alt="" />
      </div>
      <div className={styles.wxewm}>
        <div className={styles.wxewm_left}>
          <img src={qrCodeUrlWx} alt="" />
        </div>
        <div className={styles.wxewm_right}>
          <p>长按识别小程序码</p>
          <p>签约专属医生</p>
          <p>健康管理从今天开始</p>
        </div>
      </div>
    </div>
  );
}
export default OrgDetail;
