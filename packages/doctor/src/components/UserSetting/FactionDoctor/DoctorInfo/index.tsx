import React from 'react';
import config from '@/config';
import styles from './index.scss';

function DoctorInfo({ currDetail }: ISubject) {
  const {
    avatarUrl,
    name,
    title,
    biography,
    expertise,
    achievement,
    meetingLecture,
  } = currDetail;
  return (
    <div className={styles.faction__info}>
      <div className={styles.top}>
        <img src={avatarUrl || config.defaultAvatar} alt="" />
        <h3>{name}</h3>
        <div>
          {title}
        </div>
      </div>
      <div>
        <div className={styles.item}>
          <h4>个人简介: </h4>
          <p>{biography}</p>
        </div>
        <div className={styles.item}>
          <h4>擅长领域: </h4>
          <p>{expertise}</p>
        </div>
        <div className={styles.item}>
          <h4>科研成果: </h4>
          <p>{achievement}</p>
        </div>
        <div className={styles.item}>
          <h4>会议与讲课: </h4>
          <p>{meetingLecture}</p>
        </div>
        <div className={styles.item}>
          <h4>所在医院: </h4>
          {/* <p>心之力</p> */}
        </div>
      </div>
    </div>
  );
}

export default DoctorInfo;
