import React, { useEffect, useState } from 'react';
import { EditFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import { sexList } from '@/utils/tools';
import Title from '../Title';
import BaseInfosEdit from '../BaseInfosEdit';
import styles from './index.scss';

function BaseInfos() {
  const [partientSubject, setPatientSubject] = useState<ISubject>({});
  const fetchPatientInfo = () => {
    const params = {
      wcIds: [window.$storage.getItem('patientWcId')],
    };
    window.$api.user.getUserInfo(params).then((res: {wcl :Iwcl[]}) => {
      if (res.wcl[0]?.roles?.[0]?.subject) {
        setPatientSubject(res.wcl[0].roles[0].subject);
        window.$storage.setItem('patientRoleId', res.wcl[0].roles[0].id!);
      }
    });
  };
  useEffect(() => {
    fetchPatientInfo();
  }, []);
  const refreshPatientInfo = () => {
    fetchPatientInfo();
  };
  const {
    name, sex, tel, age, height, weight, waistline, birthday, bmi,
    ethnicity, address, detailAddress,
  } = partientSubject; // 年龄   BMI

  return (
    <div className={styles.base_infos}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title text="基本资料" />
          {/* <span>【正在进行3个临床试验】</span> */}
        </div>
        <BaseInfosEdit partientSubject={partientSubject} refresh={refreshPatientInfo}>
          <div className="rightAddbtn patientEditBtn">
            <EditFilled />
            采集
          </div>
        </BaseInfosEdit>
      </div>
      <div className={styles.content}>
        <div className={styles.item}>
          <p>姓名: </p>
          <span>{name || '--'}</span>
        </div>
        <div className={styles.item}>
          <p>性别: </p>
          <span>{sexList[sex] || '--'}</span>
        </div>
        <div className={styles.item}>
          <p>联系方式: </p>
          <span>{tel || '--'}</span>
        </div>
        <div className={styles.item}>
          <p>年龄: </p>
          <span>{age || '--'}</span>
        </div>
        <div className={styles.item}>
          <p>身高: </p>
          <span>{height ? `${height}cm` : '--'}</span>
        </div>
        <div className={styles.item}>
          <p>体重: </p>
          <span>{weight ? `${weight}kg` : '--'}</span>
        </div>
        <div className={styles.item}>
          <p>腰围: </p>
          <span>{waistline ? `${waistline}cm` : '--'}</span>
        </div>
        <div className={styles.item}>
          <p>生日: </p>
          <span>{(birthday && dayjs(birthday).format('YYYY-MM-DD')) || '--'}</span>
        </div>
        <div className={styles.item}>
          <p>BMI: </p>
          <span>{bmi || '--'}</span>
        </div>
        <div className={styles.item}>
          <p>民族: </p>
          <span>{ethnicity || '--'}</span>
        </div>
        <div className={styles.item}>
          <p>现住址: </p>
          <span>{address || '--'}</span>
        </div>
        <div className={styles.item}>
          <p>详细地址: </p>
          <span>{detailAddress || '--'}</span>
        </div>
      </div>
    </div>
  );
}

export default BaseInfos;
