import React, { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import { useParams } from 'umi';
import * as api from '@/services/api';
import CreateBox from '../../components/create_box';
// import type { IValues } from '../const';
import PlanItem from '../components/PlanItem';

import { message, Tabs } from 'antd';

import styles from './index.scss';
import { sfTypeUrl } from '../../utils';
import { getChooseValuesKeyFromRules } from '../../components/TemplateRule/util';
import PlanContent from '../create/PlanContent';
import { cloneDeep } from 'lodash';
import TemplateRule from '../../components/TemplateRule';

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
            tag: 'source_group',
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

  const plansRef = useRef(null);

  //添加条件生成一条空计划
  const addInfo = () => {

    if (plansRef.current) {
      plansRef.current.addInfo();
    }
  };

  const onSavePlan = (plan: any) => {
    // 调用接口添加一个plan
    plan.ruleDoc.meta.sourceMembers = [{
      sourceId: location.query?.id,
      tag: 'source_group',
      sourceLocation: 's_contact.t_source_group',
    }];
    const ruleList = cloneDeep([plan]);
    const ruleDocs = [];
    for (let i = 0; i < ruleList.length; i++) {
      ruleDocs.push(ruleList[i].ruleDoc);
    }

    console.log('================= 添加宣教随访参数 ', JSON.stringify(plan.ruleDoc));

    api.education
      .appendRules(plan.ruleDoc)
      .then(() => {
        message.success('添加成功');
        getRules(0);
        if (plansRef.current) {
          plansRef.current.clearInfos();
        }
      })
      .catch((err: string) => {
        console.log('err', err);
      });

  };

  const onPlanChanged = (_plans: any[]) => {
    // setInfos(plans);
  };

  const onEditPlan = (_editPlan: { ruleDoc: any, chooseValues: any }, _sen: any) => {


  };

  const onEditClick = (index: number) => {

    sendContent[index].status = 'open';
    setSendContent([...sendContent]);
  };

  const onEditCancel = (index: number) => {
    sendContent[index].status = 'close';
    setSendContent([...sendContent]);
  };


  console.log('================= sendContent sendContent', JSON.stringify(sendContent));
  return (
    <div className={styles.patient_edu}>
      <CreateBox onClick={addInfo} />

      <Tabs defaultActiveKey="0" onChange={tabChange}>
        <TabPane tab="发送中" key="0">
          {
            <PlanContent type={type} onSavePlan={onSavePlan} onPlanChanged={onPlanChanged} ref={plansRef}>
            </PlanContent>
          }
          {sendContent.map((sen, index) => {
            if (sen.status == 'close') {
              return (<PlanItem data={sen} status="sending" stopSendSuccess={() => onStopSendSuccess(0)} onEditClick={() => onEditClick(index)} />);
            } else {
              // 编辑
              return (
                <TemplateRule
                  pageType={type}
                  onCancelClick={() => { onEditCancel(index); }}
                  originRuleDoc={sen.rule}
                  chooseValues={sen.chooseValues}
                  onSaveClick={(data: { ruleDoc: any, chooseValues: any }) => {
                    onEditPlan(data, sen);
                  }}>
                </TemplateRule>
              );
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
