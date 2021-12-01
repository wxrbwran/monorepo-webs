import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useParams } from 'umi';
import * as api from '@/services/api';
import CreateBox from '../../components/create_box';
// import type { IValues } from '../const';
import PlanItem from '../components/PlanItem';

import { Tabs } from 'antd';

import styles from './index.scss';
import { sfTypeUrl } from '../../utils';
import { getChooseValuesKeyFromRules } from '../../components/TemplateRule/util';

const { TabPane } = Tabs;
const EducationDetail: FC<ILocation> = ({ location }) => {
  const type: string = useParams<{ type: string }>()?.type;
  console.log(99, location);
  const [sendContent, setSendContent] = useState([]);
  // const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);

  const getRules = (docStatusType: number) => {

    api.education
      .getSendContent({
        sourceType: sfTypeUrl?.[type].sourceType,
        docStatusType: docStatusType,
        pageSize: 9999,
        page: 1,
        sourceMembers: [
          {
            sourceId: location.query?.id,
            sourceTag: 'source_group',
          },
        ],
      })
      .then((res) => {

        const rules = res.rules.map((rule) => {
          const chooseValues = getChooseValuesKeyFromRules(rule);

          // const conditionDes = getConditionDescriptionFromConditionss(chooseValues.choseConditions);
          return {
            rule: rule,
            chooseValues: chooseValues,
            status: 'close',
          };
        });
        setSendContent(rules);
      })
      .catch((err: string) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    getRules(0);
  }, [location]);

  console.log('=====121', location);

  const tabChange = (key) => {

    getRules(key);
    console.log('============ key key', JSON.stringify(key));
  };

  const onStopSendSuccess = (key) => {
    getRules(key);
  };

  return (
    <div className={styles.patient_edu}>
      <CreateBox toAddress={`/publicize/${type}/create`} />

      <Tabs defaultActiveKey="0" onChange={tabChange}>
        <TabPane tab="发送中" key="0">
          {sendContent.map((sen) => {
            if (sen.status == 'close') {
              return (<PlanItem data={sen} stopSendSuccess={() => onStopSendSuccess(0)} />);
            } else {
              // 编辑
              return (<PlanItem data={sen} stopSendSuccess={() => onStopSendSuccess(0)} />);
            }
          })}
        </TabPane>
        <TabPane tab="已停止" key="1">
          {sendContent.map((sen) => <PlanItem data={sen} status="stop" stopSendSuccess={() => onStopSendSuccess(1)} />)}
        </TabPane>
      </Tabs>

    </div>
  );
};

export default EducationDetail;
