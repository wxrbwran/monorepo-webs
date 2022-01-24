import { FC, forwardRef, Ref, useImperativeHandle } from 'react';
import React, { useState, useEffect } from 'react';
import TemplateRule from '../../../components/TemplateRule';
import PlanItem from '../../components/PlanItem';
import { isEmpty } from 'lodash';



interface Iprops {

  type: any;
  onSavePlan: (plans: any) => void;
  onPlanChanged: (plans: any[]) => void;
}


const PlanContent: FC<Iprops> = forwardRef(({ type, onSavePlan, onPlanChanged }: Iprops, ref: Ref<any>): JSX.Element => {

  // sfTypeUrl?.[type].type, 
  let initInfos: any = {};
  const [infos, setInfos] = useState<any[]>([]);
  const [status, setEditStatus] = useState<string[]>([]); //open开，为编辑状态

  useImperativeHandle(ref, () => ({
    //第一个参数：暴露哪个ref；第二个参数：暴露什么

    addInfo: () => {
      setInfos([initInfos, ...infos]);
      setEditStatus(['open', ...status]);
    },
    clearInfos: () => {
      setInfos([]);
      setEditStatus([]);
    },
  }));

  useEffect(() => {
    onPlanChanged(infos);
  }, [infos]);

  // useEffect(() => {
  //   setInfos([initInfos, ...infos]);
  //   setEditStatus(['open', ...status]);
  // }, []);

  // 删除条件
  const delPlan = (index: number) => {
    const newInfos = infos.filter((_item, vIndex) => vIndex !== index);
    const newStatus = status.filter((_item, sIndex) => sIndex !== index);
    setInfos([...newInfos]);
    setEditStatus([...newStatus]);
  };
  //提醒计划的确定按钮回传回来的数据
  const addPlan = (params: any, index: number) => {

    console.log('===================== addPlan', JSON.stringify(params), index);
    infos[index] = params;
    setInfos([...infos]);
    status[index] = 'lock';
    setEditStatus([...status]);
    onSavePlan(params);
  };

  //格式化点击编辑需要反显的数据（非编辑状态下也是此数据格式）
  const changeEditStatus = (index: number) => {
    status[index] = 'open';
    setEditStatus([...status]);
  };
  //提醒计划的取消按钮执行操作
  const handleCancel = (index: number) => {
    //点击取消，如果是空计划，直接删除，如果是编辑的之前的计划则直接更改状态为lock
    if (isEmpty(infos[index])) {
      delPlan(index);
    } else {
      status[index] = 'lock';
      setEditStatus([...status]);
    }
  };

  const onRemove = (index: number) => {

    infos.splice(index);
    status.splice(index);
    setInfos([...infos]);
    setEditStatus([...status]);
  };

  return (
    <div>

      {infos.map((item, index) =>

        status[index] === 'open' ? (
          <TemplateRule
            pageType={type}
            onCancelClick={() => { handleCancel(index); }}
            originRuleDoc={item.ruleDoc}
            chooseValues={item.chooseValues}
            onSaveClick={(data: { ruleDoc: any, chooseValues: any }) => {
              addPlan(data, index);
            }}>
          </TemplateRule>
        ) : (
          <PlanItem
            data={{ rule: item.ruleDoc, chooseValues: item.chooseValues }}
            status='add'
            onEditClick={() => changeEditStatus(index)}
            remove={() => onRemove(index)}
          >
          </PlanItem>
          // <PlanItem data={infos[index]} />
        ),
      )}
    </div>


  );
});

export default PlanContent;
