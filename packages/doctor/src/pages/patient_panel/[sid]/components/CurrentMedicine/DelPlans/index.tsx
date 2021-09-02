/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface IProps {
  plansIndex: number;
  pIndex: number;
  afterAllPlans: IRecord[];
  alfterPlansAction: IPlansAction[];
  updateAllPlans: Function;
  updateDelPlans: Function;
  updateStrengthInfo: Function;
}

function DelPlans(props: IProps) {
  const {
    plansIndex, pIndex, afterAllPlans, alfterPlansAction,
    updateAllPlans, updateDelPlans, updateStrengthInfo,
  } = props;
  const [allPlans, setAllPlans] = useState<IRecord[]>([]);
  const [plansAction, setPlansAction] = useState<IPlansAction[]>([]);
  useEffect(() => {
    setAllPlans(JSON.parse(JSON.stringify(afterAllPlans)));
    setPlansAction(JSON.parse(JSON.stringify(alfterPlansAction)));
  }, [afterAllPlans]);
  // 删除某个药服药计划
  const delPlans = (idx: number, pdx: number) => {
    const { medicineId } = allPlans[idx].medicine;
    if (medicineId) {
      const record = {
        medicine: {
          medicineId,
        },
      };
      updateDelPlans(JSON.parse(JSON.stringify(record)));
    }
    const { planId } = allPlans[idx].plans[pdx];
    const plansLen = allPlans[idx].plans.filter((item) => item.status !== 'DELETE').length;
    // 计划条目数剩余1条(即药品被删除)情况下，现有的药品和新增的药品的数据处理
    if (plansLen === 1) {
      if (planId) {
        // 现有的药品
        plansAction[idx].status = 'DELETE';
        allPlans[idx].status = 'DELETE';
        updateAllPlans([...allPlans], [...plansAction]);
      } else {
        // 新增的药品
        const newPlansAction = plansAction.filter(
          (item: object, index: number) => { console.log(item); return index !== idx; },
        );
        const newAllPlans = allPlans.filter(
          (item: object, index: number) => { console.log(item); return index !== idx; },
        );
        updateAllPlans([...newAllPlans], [...newPlansAction]);
      }
      updateStrengthInfo();
    } else if (plansLen > 1) {
      // 计划条目数多余1条情况下，现有的药品和新增的药品的数据处理
      if (planId) {
        plansAction[idx].plans[pdx].status = 'DELETE';
        allPlans[idx].plans[pdx].status = 'DELETE';
        ['adjustCount', 'adjustCycleDays', 'adjustDate'].forEach((item) => {
          plansAction[idx].plans[pdx][item] = null;
        });
        updateAllPlans([...allPlans], [...plansAction]);
      } else {
        const newPlansAction = plansAction[idx].plans.filter(
          (item: object, index: number) => { console.log(item); return index !== pdx; },
        );
        plansAction[idx].plans = newPlansAction;
        const newOptions = allPlans[idx].plans.filter(
          (item: object, index: number) => { console.log(item); return index !== pdx; },
        );
        allPlans[idx].plans = newOptions;
        updateAllPlans([...allPlans], [...plansAction]);
      }
    }
  };
  return (
    <Popconfirm
      title="是否删除该条目?"
      onConfirm={() => delPlans(plansIndex, pIndex)}
      okText="删除"
      cancelText="取消"
      placement="right"
    >
      <DeleteOutlined />
    </Popconfirm>
  );
}

export default DelPlans;
