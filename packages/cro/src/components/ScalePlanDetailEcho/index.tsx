import React, { FC, useState, useEffect } from 'react';
import PlanModal from '@/components/PlanModal';
import { FormOutlined } from '@ant-design/icons';
import iconTime from '@/assets/img/follow-table/icon_time.svg';
import iconCondition from '@/assets/img/follow-table/icon_condition.svg';
import iconFrequency from '@/assets/img/follow-table/icon_frequency.svg';
import iconGroup from '@/assets/img/follow-table/icon_group.svg';
import { typeList, IGroup, sexList, IVal } from '@/utils/consts';
import { useSelector, useLocation } from 'umi';
import * as api from '@/services/api';
import { IState } from 'typings/global';
import { message } from 'antd';
import { getPlanDetail } from '@/utils/tools';
import './index.scss';

interface IProps {
  scaleType: string;
  scaleId?: string;
  addPlans?: (params: { plans: [] }) => void;
  initPlans: any[];
}
const ScalePlanDetailEcho: FC<IProps> = (props) => {
  const { scaleType, scaleId, initPlans, addPlans } = props;
  const projectSid = window.$storage.getItem('projectSid');
  const location = useLocation();
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const groupList = useSelector((state:IGroup)=>state.project.objectiveGroup);
  const [plans, setPlans] = useState<any[]>(initPlans);
  const [val, setVal] = useState<IVal>({});
  const apiName = scaleType === 'CRF' ? 'getCrfScale' : 'getSubjectiveScale';
  useEffect(() => {
    setPlans(initPlans);
  }, [initPlans]);
  //更新计划
  const updatePlan = (params: { plans:[] })=> {
    if (scaleId) {
      // 从量表详情进入，更新计划调用接口
      const id = location.query.id;
      api.subjective.updateScalePlan({
        plan: params.plans,
        scaleId,
        projectNsId,
        projectSid,
      }).then(() => {
        message.success('修改成功');
        setVal({});
        api.subjective[apiName](id).then((res) => {
          setPlans(res.plans);
        });
      })
        .catch((err:string) => {
          message.error(err);
        });
    } else if (addPlans) {
      // 从量表创建进入，更新计划，把计划提交到父组件
      addPlans(params);
    }
  };

  useEffect(()=>{
    //数据反显
    if (plans && plans.length > 0){
      setVal({ ...getPlanDetail(plans, groupList) });
    }
    return () => {
      //不置为空的话不同表之间切换数据会有缓存
      setVal({});
    };
  }, [groupList, plans]);
  return (
    <>
      <div className="table-plan__title">
          <span>{scaleType === 'CRF' ? 'CRF' : '主观'}量表计划</span>
          {
            window.$storage.getItem('isLeader') && window.$storage.getItem('projectStatus') != 1001 && (
              <PlanModal title="修改发送计划"
                scaleId={scaleId}
                plans={plans}
                updatePlan={updatePlan}
                infoIndex={0}
              >
                <FormOutlined />
              </PlanModal>
            )
          }
        </div>
        <div className="table-plan__cont">
          <div className="item">
            <div className="tit">
              <img src={iconTime} alt=""/>
              <span>起始发送时间</span>
            </div>
          <div className="text">{typeList[val.start]}</div>
          </div>
          {
            (val.minAge || ([0, 1].includes(val.sex)) || val.diagnosis || val.treatment) && (
              <div className="item">
                <div className="tit">
                  <img src={iconCondition} alt="" />
                  <span>发送条件</span>
                </div>
                <div className="text">
                  {val.minAge && val.maxAge && <p>年龄：{val.minAge}-{val.maxAge}</p>}
                  {([0, 1].includes(val.sex)) && <p>性别：{sexList[val.sex]}</p>}
                  {val.diagnosis && <p>诊断：{val.diagnosis}</p>}
                  {val.treatment && <p>处理：{val.treatment}</p>}
                </div>
              </div>
            )
          }
          <div className="item">
            <div className="tit">
              <img src={iconFrequency} alt="" />
              <span>发送频率</span>
            </div>
            {val.custom && <div className="text">{val.frequency === 'CUSTOM' ? '第' : '每'}{val.custom.join()}天发送一次</div>}
          </div>
          <div className="item">
            <div className="tit">
              <img src={iconGroup} alt="" />
              <span>发送试验组</span>
            </div>
            <div className="text">{val.projectGroups}</div>
          </div>
        </div>
    </>
  );
};

export default ScalePlanDetailEcho;
