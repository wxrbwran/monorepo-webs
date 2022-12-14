import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import * as api from '@/services/api';
import { ProfileOutlined } from '@ant-design/icons';
import CreateBox from '../components/create_box';
import ListItem from '../components/list_item';
// import type { IValues } from '../const';
import ReplyDetail from '../components/reply_detail';
import time from '@/assets/img/time.svg';
import condition from '@/assets/img/condition.svg';
import frequency from '@/assets/img/frequency.svg';
import groupIcon from '@/assets/img/group.svg';

import styles from './index.scss';

const PatientEducation: FC<ILocation> = ({ location }) => {
  const isScale = location.pathname.includes('scale');
  const [sendContent, setSendContent] = useState([]);

  useEffect(() => {
    api.education.getSendContent({
      sourceType: isScale ? 2 : 3,
      pageSize: 9999,
      page: 1,
      operatorSid: window.$storage.getItem('sid'),
      operatorRole: window.$storage.getItem('roleId'),
      operatorNsId: window.$storage.getItem('nsId'),
      ownershipSid: window.$storage.getItem('orgSid'),
      ownershipRole: window.$storage.getItem('orgRole'),
      ownershipNsId: window.$storage.getItem('nsId'),

    }).then((res) => {
      setSendContent(res.rules);
    })
      .catch((err: string) => {
        console.log('err', err);
      });
  }, []);

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
      {
        sendContent.map(sen => {
          const item = sen.localRules[0];
          const { frequencyType, custom, content, group } = item;
          const diagnosisArr = item.conditions.filter((i) => i.type === 'diagnosis');
          const treatmentArr = item.conditions.filter((i) => i.type === 'treatment');
          return (
            <div className={styles.card}>
              <div>
                <div className={`${styles.tit} flex justify-between center`}>
                  <p className="text-gray-900">????????????</p>
                  {isScale && (
                    // <p className="cursor-pointer">
                    //   <ProfileOutlined /> ????????????
                    // </p>
                    <ReplyDetail id={sen.id} scaleId={sen.rules[0].actions[0].params.sourceMember[0].sourceId}>
                      <p className='cursor-pointer'><ProfileOutlined /> ????????????</p>
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
                      <img src={time} alt="" /> ??????????????????
                    </p>
                    <p className={styles.con}>??????????????????????????????????????????????????????</p>
                  </div>
                  <div className={styles.item}>
                    <p>
                      <img src={frequency} alt="" /> ????????????
                    </p>
                    <p className={styles.con}>
                      {frequencyType === 'once' ? '???' : '???'}
                      {custom.join()}???????????????
                    </p>
                  </div>
                  <div className={styles.item}>
                    <p>
                      <img src={groupIcon} alt="" /> ????????????
                    </p>
                    <p className={styles.con}>
                      {
                        group.includes('PATIENT_ALL') ? '????????????' : group.join()
                      }
                    </p>
                  </div>
                  <div className={styles.item}>
                    <p>
                      <img src={condition} alt="" /> ????????????
                    </p>
                    {item.conditions.map((i) => (
                      <>
                        {i.type === 'age' && (
                          <p className={styles.con}>
                            ?????????{i.min}-{i.max}
                          </p>
                        )}
                        {i.type === 'sex' && (
                          <p className={styles.con}>?????????{i.value}</p>
                        )}
                      </>
                    ))}
                    {!!diagnosisArr?.length && (
                      <p className={styles.con}>?????????{diagnosisArr.map((i) => i.value).join(', ')}</p>
                    )}
                    {!!treatmentArr?.length && (
                      <p className={styles.con}>?????????{treatmentArr.map((i) => i.value).join(', ')}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default PatientEducation;
