import React, { FC, useState, useEffect } from 'react';
import PlanModal from '@/components/PlanModal';
import { FormOutlined } from '@ant-design/icons';
import iconTime from '@/assets/img/follow-table/icon_time.svg';
import iconCondition from '@/assets/img/follow-table/icon_condition.svg';
import iconFrequency from '@/assets/img/follow-table/icon_frequency.svg';
import iconGroup from '@/assets/img/follow-table/icon_group.svg';
// import { IGroup, IVal } from '@/utils/consts';
// import { IGroup } from '@/utils/consts';
// import { useSelector, useLocation } from 'umi';
import * as api from '@/services/api';
import { useLocation, useSelector } from 'umi';
// import { IState } from 'typings/global';
import { message } from 'antd';
import './index.scss';
import { getChooseValuesKeyFromRules, getConditionDescriptionFromConditionss, getFrequencyDescriptionFromFrequency, getStartTimeDescriptionFromConditionss, IChooseValues, IRuleDoc } from '@/pages/subjective_table/util';
import { isEmpty } from 'lodash';
import { Role } from 'xzl-web-shared/dist/utils/role';
import { cloneDeep } from 'lodash';

interface IProps {
  scaleType: 'CRF' | 'SUBJECTIVE' | 'VISIT_CRF' | 'VISIT_SUBJECTIVE';
  scaleId?: string;
  addPlans?: (params: { plans: [] }) => void;
  // initPlans: any[];
  initRule: IRuleDoc;
  groupId?: string;
  scaleName?: string;
  hideEditBtn?: boolean;
}
const ScalePlanDetailEcho: FC<IProps> = (props) => {
  const { scaleType, scaleId, initRule, addPlans, groupId, scaleName, hideEditBtn } = props;
  console.log('23i2323', props);
  // const projectSid = window.$storage.getItem('projectSid');
  const location = useLocation();
  // const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  // const groupList = useSelector((state: IGroup) => state.project.objectiveGroup);
  const [ruleDoc, setRuleDoc] = useState<IRuleDoc>({});
  // const [val, setVal] = useState<IVal>({});
  const apiName = 'getSubjectiveScaleDetail';

  const [chooseValues, setChooseValues] = useState<IChooseValues>({ firstTime: {}, choseConditions: [], choseScope: [], frequency: { custom: [] } });
  const [conditionDescription, setConditionDescription] = useState();
  const [firstTimeStr, setFirstTimeStr] = useState();
  const [frequencyStr, setFrequencyStr] = useState();
  const { roleType, status } = useSelector((state: IState) => state.project.projDetail);

  useEffect(() => {

    if (initRule) {
      setRuleDoc(cloneDeep(initRule));
    }

  }, [initRule]);


  useEffect(() => {
    if (!isEmpty(ruleDoc)) {

      const chooseValuesKey = getChooseValuesKeyFromRules(ruleDoc);


      console.log('============ chooseValuesKey chooseValuesKey ruleDoc', JSON.stringify(chooseValuesKey));
      const conditionDes = getConditionDescriptionFromConditionss(chooseValuesKey.choseConditions);
      setChooseValues(chooseValuesKey);
      setConditionDescription(conditionDes);

      const firstTime = getStartTimeDescriptionFromConditionss(chooseValuesKey.firstTime);
      setFirstTimeStr(firstTime);

      const frequency = getFrequencyDescriptionFromFrequency(chooseValuesKey.frequency);
      setFrequencyStr(frequency);
    }

  }, [ruleDoc]);

  //????????????
  const updatePlan = (params: { plans: [] }) => {
    if (scaleId) {

      const id = location.query.id;

      api.subjective.deleteScaleRule(params.ruleDoc.id).then(() => {

        delete params.ruleDoc.id;
        api.subjective.addScaleRule(params.ruleDoc).then(() => {

          console.log('================== apiName', apiName);
          api.subjective[apiName](id).then((res) => {
            // ???????????????crf??????????????????????????????
            let businessType =  window.$log.businessType.UPDATE_SUBJECTIVE_PLAN.code;
            if (location.pathname.includes('subjective')) {
              if (location.pathname.includes('out_plan_visit')) {
                businessType = window.$log.businessType.UPDATE_UNPLANNED_SUBJECTIVE_PLAN.code;
              }
            } else {
              if (location.pathname.includes('out_plan_visit')) {
                businessType = window.$log.businessType.UPDATE_UNPLANNED_CRF_PLAN.code;
              } else {
                businessType = window.$log.businessType.UPDATE_CRF_PLAN.code;
              }
            }
            window.$log.handleOperationLog({
              type: 1,
              copyWriting: `??????${scaleName}????????????`,
              businessType: businessType,
              oldParams: { content: {
                ...initRule,
                scaleType,
              } },
              newParams: { content: {
                ...params.ruleDoc,
                scaleType,
              } },
            });
            // ????????????
            setRuleDoc(res.ruleDoc);
          });
        });
      })
        .catch((err: string) => {
          message.error(err);
        });
      // ????????????????????????????????????????????????
      // const id = location.query.id;
      // api.subjective.updateScalePlan({
      //   plan: params.plans,
      //   scaleId,
      //   projectNsId,
      //   projectSid,
      // }).then(() => {
      //   message.success('????????????');
      //   setVal({});
      //   api.subjective[apiName](id).then((res) => {
      //     // setPlans(res.plans);
      //   });
      // })
      //   .catch((err: string) => {
      //     message.error(err);
      //   });
    } else if (addPlans) {
      // ??????????????????????????????????????????????????????????????????
      console.log('============ ??????????????????????????????????????????????????????????????????');
      addPlans(params);
    }
  };

  // useEffect(()=>{
  //   //????????????
  //   if (plans && plans.length > 0){
  //     setVal({ ...getPlanDetail(plans, groupList) });
  //   }
  //   return () => {
  //     //?????????????????????????????????????????????????????????
  //     setVal({});
  //   };
  // }, [groupList, plans]);

  const des = chooseValues ? chooseValues.choseScope.map(item => item.description).join(',') : '';



  const isLeader = [Role.MAIN_PI.id, Role.PROJECT_LEADER.id].includes(roleType);


  return (
    <>
      <div className="table-plan__title">
        <span>{(scaleType === 'CRF' || scaleType == 'VISIT_CRF') ? 'CRF' : '??????'}????????????</span>
        {
          isLeader
          && (status != 1001 || ['VISIT_CRF', 'VISIT_SUBJECTIVE', 'VISIT_OBJECTIVE'].includes(scaleType))
          && !groupId && !hideEditBtn && (
            <PlanModal title="??????????????????"
              scaleId={scaleId}
              ruleDoc={ruleDoc}
              chooseValues={chooseValues}
              updatePlan={updatePlan}
              infoIndex={0}
              scaleType={scaleType}
            >
              <FormOutlined />
            </PlanModal>
            /* <PlanModal title="??????????????????"
            scaleId={scaleId}
            plans={rule}
            chooseValues={}
            updatePlan={updatePlan}
            infoIndex={0}
            >
            <FormOutlined />
            </PlanModal> */
          )
        }
      </div>
      <div className="table-plan__cont">
        <div className="item">
          <div className="tit">
            <img src={iconTime} alt="" />
            <span>??????????????????</span>
          </div>
          <div className="text">
            {firstTimeStr}
            {ruleDoc?.rules?.[0]?.actions?.[0]?.type === 'block' && <span>(?????????)</span>}
          </div>
        </div>


        {
          (conditionDescription &&
            <div className="item">
              <div className="tit">
                <img src={iconCondition} alt="" />
                <span>????????????</span>
              </div>
              <div className="text">
                {conditionDescription.age && <p>{conditionDescription.age}</p>}
                {conditionDescription.sex && <p>{conditionDescription.sex}</p>}
                {conditionDescription.disease && <p>{conditionDescription.disease}</p>}
                {conditionDescription.treatment && <p>{conditionDescription.treatment}</p>}
              </div>
            </div>
          )
        }
        <div className="item">
          <div className="tit">
            <img src={iconFrequency} alt="" />
            <span>????????????</span>
          </div>
          {chooseValues.frequency && <div className="text">{frequencyStr}</div>}
        </div>
        <div className="item">
          <div className="tit">
            <img src={iconGroup} alt="" />
            <span>???????????????</span>
          </div>
          <div className="text">{des}</div>
        </div>
      </div>
    </>
  );
};

export default ScalePlanDetailEcho;
