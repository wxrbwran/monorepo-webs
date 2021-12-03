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
import { fileTypes, getChooseValuesKeyFromRules } from '../../components/TemplateRule/util';
import PlanContent from '../create/PlanContent';

import TemplateRule from '../../components/TemplateRule';


const { TabPane } = Tabs;
const EducationDetail: FC<ILocation> = ({ location }) => {
  const type: string = useParams<{ type: string }>()?.type;
  console.log(99, location);
  const [sendContent, setSendContent] = useState([]);
  // const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);

  const getRules = (docStatusType: number) => {
    api.education
      .getAllRules({
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
      .then((ruleList) => {

        const ids = ruleList.rules.flatMap((ruleDoc) => {
          return (
            ruleDoc.rules[0].actions.flatMap((action) => {
              return action.params.sourceMember.map((source) => source.sourceId);
            })
          );
        });
        console.log('========== ids ids', ids);

        let request = api.education.getScalesSendContents;
        if (type == 'education') {
          request = api.education.getEducationSendContents;
        }
        // 获取所有的图片资源
        request({
          ids: ids.filter((id) => ![null, undefined].includes(id)),
        })
          .then((res) => {

            // 获取所有的图片资源
            const list: any[] = [];
            if (type == 'education') {

              fileTypes.forEach((fileType: any) => {
                if (res.list.filter(p => p.type === fileType.code).length > 0) {
                  list.push(...res.list.filter(p => p.type === fileType.code).map((item) => {
                    return ({
                      ...item,
                      extraFileType: { ...fileType },
                    });
                  }));
                }
              });
            } else {
              const fileType = fileTypes.filter((file) => {
                if (type == 'suifang') {
                  return file.type == 'accompany';
                } else {
                  return file.type == 'crf';
                }
              })[0];
              if (res.list.length > 0) {
                list.push(...res.list.map((item) => {
                  return ({
                    ...item,
                    extraFileType: { ...fileType },
                  });
                }));
              }
            }

            const rules = ruleList.rules.map((rule) => {
              const chooseValues = getChooseValuesKeyFromRules(rule, list);
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
            message.error(err?.result);
          });
      })
      .catch((err) => {
        console.log('========== err', err);
        message.error(err?.result);
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

  const onEditPlan = (editPlan: { ruleDoc: any, chooseValues: any }, _sen: any) => {

    api.education
      .editRules(editPlan.ruleDoc)
      .then(() => {
        message.success('修改成功');
        getRules(0);
        if (plansRef.current) {
          plansRef.current.clearInfos();
        }
      })
      .catch((err: string) => {
        console.log('err', err);
      });
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
