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
import { useLocation } from 'umi';
// import { IState } from 'typings/global';
import { message } from 'antd';
import './index.scss';
import { getChooseValuesKeyFromRules, getConditionDescriptionFromConditionss, IChooseValues, IRuleDoc } from '../../pages/subjective_table/util';
import { isEmpty } from 'lodash';


interface IProps {
  scaleType: string;
  scaleId?: string;
  addPlans?: (params: { plans: [] }) => void;
  // initPlans: any[];
  initRule: IRuleDoc;
  groupId?: string;
}
const ScalePlanDetailEcho: FC<IProps> = (props) => {
  const { scaleType, scaleId, initRule, addPlans, groupId } = props;
  // const projectSid = window.$storage.getItem('projectSid');
  const location = useLocation();
  // const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  // const groupList = useSelector((state: IGroup) => state.project.objectiveGroup);
  const [ruleDoc, setRuleDoc] = useState<IRuleDoc>({});
  // const [val, setVal] = useState<IVal>({});
  const apiName = scaleType === 'CRF' ? 'getSubjectiveScaleDetail' : 'getSubjectiveScaleDetail';

  const [chooseValues, setChooseValues] = useState<IChooseValues>({ chooseStartTime: {}, choseConditions: [], choseScope: [], frequency: { custom: [] } });
  const [conditionDescription, setConditionDescription] = useState();


  useEffect(() => {

    if (initRule) {
      setRuleDoc(initRule);
    }

  }, [initRule]);


  useEffect(() => {

    if (!isEmpty(ruleDoc)) {

      const chooseValuesKey = getChooseValuesKeyFromRules(ruleDoc.rules[0]);

      const conditionDes = getConditionDescriptionFromConditionss(chooseValuesKey.choseConditions);
      setChooseValues(chooseValuesKey);
      setConditionDescription(conditionDes);
    }

  }, [ruleDoc]);

  //更新计划
  const updatePlan = (params: { plans: [] }) => {
    if (scaleId) {

      const id = location.query.id;

      api.subjective.deleteScaleRule(params.ruleDoc.id).then(() => {

        delete params.ruleDoc.id;
        api.subjective.addScaleRule(params.ruleDoc).then(() => {

          console.log('================== apiName', apiName);
          api.subjective[apiName](id).then((res) => {

            setRuleDoc(res.ruleDoc);
          });
        });

      })
        .catch((err: string) => {
          message.error(err);
        });
      // 从量表详情进入，更新计划调用接口
      // const id = location.query.id;
      // api.subjective.updateScalePlan({
      //   plan: params.plans,
      //   scaleId,
      //   projectNsId,
      //   projectSid,
      // }).then(() => {
      //   message.success('修改成功');
      //   setVal({});
      //   api.subjective[apiName](id).then((res) => {
      //     // setPlans(res.plans);
      //   });
      // })
      //   .catch((err: string) => {
      //     message.error(err);
      //   });
    } else if (addPlans) {
      // 从量表创建进入，更新计划，把计划提交到父组件
      console.log('============ 从量表创建进入，更新计划，把计划提交到父组件');
      addPlans(params);
    }
  };

  // useEffect(()=>{
  //   //数据反显
  //   if (plans && plans.length > 0){
  //     setVal({ ...getPlanDetail(plans, groupList) });
  //   }
  //   return () => {
  //     //不置为空的话不同表之间切换数据会有缓存
  //     setVal({});
  //   };
  // }, [groupList, plans]);

  const des = chooseValues ? chooseValues.choseScope.map(item => item.description).join(',') : '';

  return (
    <>
      <div className="table-plan__title">
        <span>{scaleType === 'CRF' ? 'CRF' : '主观'}量表计划</span>
        {
          window.$storage.getItem('isLeader')
          && window.$storage.getItem('projectStatus') != 1001
          && !groupId && (
            <PlanModal title="修改发送计划"
              scaleId={scaleId}
              ruleDoc={ruleDoc}
              chooseValues={chooseValues}
              updatePlan={updatePlan}
              infoIndex={0}
              scaleType={scaleType}
            >
              <FormOutlined />
            </PlanModal>
            /* <PlanModal title="修改发送计划"
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
            <span>起始发送时间</span>
          </div>
          <div className="text">{chooseValues.chooseStartTime.description}</div>
        </div>


        {
          (conditionDescription &&
            <div className="item">
              <div className="tit">
                <img src={iconCondition} alt="" />
                <span>发送条件</span>
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
            <span>发送频率</span>
          </div>
          {chooseValues.frequency && <div className="text">{chooseValues.frequency.frequency == 'CUSTOM' ? '第' : '每'}{chooseValues.frequency.custom.join()}天发送一次</div>}
        </div>
        <div className="item">
          <div className="tit">
            <img src={iconGroup} alt="" />
            <span>发送试验组</span>
          </div>
          <div className="text">{des}</div>
        </div>
      </div>
    </>
  );
};

export default ScalePlanDetailEcho;
