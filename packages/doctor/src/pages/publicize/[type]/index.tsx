import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useSelector } from 'umi';
import * as api from '@/services/api';
import { ProfileOutlined } from '@ant-design/icons';
import CreateBox from '../components/create_box';
import ListItem from '../components/ListItem';
// import type { IValues } from '../const';
import ReplyDetail from '../components/reply_detail';
import time from '@/assets/img/suifang/time.svg';
import condition from '@/assets/img/suifang/condition.svg';
import frequency from '@/assets/img/suifang/frequency.svg';
import groupIcon from '@/assets/img/suifang/group.svg';

import styles from './index.scss';

const PatientEducation: FC<ILocation> = ({ location }) => {
  const isScale = location.pathname.includes('suifang');
  const [sendContent, setSendContent] = useState([]);
  const currentOrgInfo = useSelector((state: IState) => state.education.currentOrgInfo);

  useEffect(() => {
    api.education
      .getSendContent({
        sourceType: isScale ? 2 : 3,
        pageSize: 9999,
        page: 1,
        operatorSid: window.$storage.getItem('sid'),
        operatorRole: window.$storage.getItem('currRoleId'),
        operatorNsId: window.$storage.getItem('nsId'),
        ownershipSid: currentOrgInfo.sid,
        ownershipRole: currentOrgInfo.role,
        ownershipNsId: currentOrgInfo.nsId,
      })
      .then((res) => {
        setSendContent(res.rules);
      })
      .catch((err: string) => {
        console.log('err', err);
      });
  }, [currentOrgInfo, location]);

  const type = {
    1: 'video',
    2: 'document',
    3: 'article',
    4: 'picture',
    6: 'audio',
  };

  return (
    <div className={styles.patient_edu}>
      <CreateBox toAddress={`${location.pathname}/create`} />
      {sendContent.map((sen) => {
        const item = sen.localRules[0];
        const { frequencyType, custom, content, group } = item;
        const diagnosisArr = item.conditions.filter((i) => i.type === 'diagnosis');
        const treatmentArr = item.conditions.filter((i) => i.type === 'treatment');
        return (
          <div className={styles.card}>
            <div>
              <div className={`${styles.tit} flex justify-between center`}>
                <p className="text-gray-900 text-base">发送内容</p>
                {isScale && (
                  // <p className="cursor-pointer">
                  //   <ProfileOutlined /> 回复详情
                  // </p>
                  <ReplyDetail id={sen.docId}>
                    <p className="cursor-pointer">
                      <ProfileOutlined /> 回复详情
                    </p>
                  </ReplyDetail>
                )}
              </div>
              <div className={`${styles.block} flex justify-start  items-end flex-wrap`}>
                {content &&
                  content.map((con) => (
                    <ListItem
                      key={con.id}
                      type={type[con?.type] || 'accompany'}
                      item={con}
                      location={location}
                    />
                  ))}
              </div>
              <div className={`${styles.content} flex justify-start items-start flex-wrap`}>
                <div className={styles.item}>
                  <p>
                    <img src={time} alt="" /> 起始发送时间
                  </p>
                  <p className={styles.con}>患者与医院内医生绑定后第二天上午九点</p>
                </div>
                <div className={styles.item}>
                  <p>
                    <img src={frequency} alt="" /> 发送频率
                  </p>
                  <p className={styles.con}>
                    {frequencyType === 'once' ? '第' : '每'}
                    {custom.join()}天发送一次
                  </p>
                </div>
                <div className={styles.item}>
                  <p>
                    <img src={groupIcon} alt="" /> 接收患者
                  </p>
                  <p className={styles.con}>
                    {group.includes('PATIENT_ALL')
                      ? '全部患者'
                      : group}
                  </p>
                </div>
                <div className={styles.item}>
                  <p>
                    <img src={condition} alt="" /> 发送条件
                  </p>
                  {item.conditions.map((i) => (
                    <>
                      {i.type === 'age' && (
                        <p className={styles.con}>
                          年龄：{i.min}-{i.max}
                        </p>
                      )}
                      {i.type === 'sex' && <p className={styles.con}>性别：{i.value}</p>}
                    </>
                  ))}
                  {!!diagnosisArr?.length && (
                    <p className={styles.con}>
                      诊断：{diagnosisArr.map((i) => i.value).join(', ')}
                    </p>
                  )}
                  {!!treatmentArr?.length && (
                    <p className={styles.con}>
                      处理：{treatmentArr.map((i) => i.value).join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PatientEducation;
