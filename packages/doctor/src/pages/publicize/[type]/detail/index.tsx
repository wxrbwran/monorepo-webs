import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useSelector, useParams } from 'umi';
import * as api from '@/services/api';
import CreateBox from '../../components/create_box';
// import type { IValues } from '../const';
import PlanItem from '../components/PlanItem';

import { Tabs } from 'antd';

import styles from './index.scss';

const { TabPane } = Tabs;
const EducationDetail: FC<ILocation> = ({ location }) => {
  const sourceType: string =  useParams<{ type: string }>()?.type;
  const isScale = location.pathname.includes('suifang');
  const [sendContent, setSendContent] = useState([]);
  const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);

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

  console.log('=====121', location);

  return (
    <div className={styles.patient_edu}>
      <CreateBox toAddress={`/publicize/${sourceType}/create`} />
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        <TabPane tab="发送中" key="1">
          {sendContent.map((sen) =>  <PlanItem data={sen} />)}
        </TabPane>
        <TabPane tab="已停止" key="2">
         {sendContent.map((sen) =>  <PlanItem data={sen} status="stop" />)}
        </TabPane>
      </Tabs>

    </div>
  );
};

export default EducationDetail;
