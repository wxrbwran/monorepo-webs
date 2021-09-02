import React, { useEffect, useState } from 'react';
import { EditFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useSelector } from 'umi';
import { Tooltip } from 'antd';
import { sexList } from '@/utils/tools';
import Title from '../Title';
import BaseInfosEdit from '../BaseInfosEdit';
import styles from './index.scss';

function BaseInfos() {
  const [partientSubject, setPatientSubject] = useState<ISubject>({});
  const { isYlPatient } = useSelector((state: IState) => state.currentPatient);
  const [project, setProject] = useState();
  const patientSid = window.$storage.getItem('patientSid');
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
  const fetchPatientProjects = () => {
    window.$api.research.getPatientProjects(patientSid).then((res: any) => {
      let croStr = '';
      res.projectInfos.forEach((item: {name: string}, index: number) => {
        croStr += `${item.name}${index === res.projectInfos.length - 1 ? '' : '、'}`;
      });
      setProject(croStr);
    });
  };
  useEffect(() => {
    fetchPatientInfo();
    fetchPatientProjects();
  }, []);
  const refreshPatientInfo = () => {
    fetchPatientInfo();
  };
  const {
    name, sex, tel, age, height, weight, waistline, birthday, bmi,
    ethnicity, address, detailAddress, buildName, floorName, bedName,
    enterTime,
  } = partientSubject; // 年龄   BMI
  console.log('partientSubject', partientSubject);
  return (
    <div className={styles.base_infos}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title text="基本资料" />
          {
            project && (
              <>
                <span className={styles.tag}>受试者</span>
                <Tooltip placement="bottomRight" title={project}>
                  <span className={styles.cro_project}>
                    {project}
                  </span>
                </Tooltip>
              </>
            )
          }
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
        {
          isYlPatient === 1 && (
            <>
              <div className={styles.item}>
                <p>楼号: </p>
                <span>{buildName || '--'}</span>
              </div>
              <div className={styles.item}>
                <p>楼层: </p>
                <span>{floorName || '--'}</span>
              </div>
              <div className={styles.item}>
                <p>床位: </p>
                <span>{bedName || '--'}</span>
              </div>
              <div className={styles.item}>
                <p>入住日期: </p>
                <span>{(enterTime && dayjs(enterTime).format('YYYY-MM-DD')) || '--'}</span>
              </div>
            </>
          )
      }
      </div>
    </div>
  );
}

export default BaseInfos;
