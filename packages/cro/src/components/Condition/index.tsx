import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import ListItem from './ListItem';
import styles from './index.scss';
import { IPlanItem } from '@/utils/consts';
import { useSelector } from 'umi';
import { getConditionDetail, getStandardDetail } from '@/utils/tools';
import { IState } from 'typings/global';
import { Role } from 'xzl-web-shared/dist/src/utils/role';
import { isEmpty } from 'lodash';

let timer:any = null;
const { Option } = Select;

interface IProps{
  type: string;
  isPlan?: Boolean;
  updateSubmitPlan: Function;
  infoItem?: IPlanItem[];
  sendTime?: {
    type: string;
    detail: {
      treatment: string;
    }
  };
}
interface IAbled {
  [key:string]: boolean;
}
interface IInit {
  type: string,
  detail: {
    send?: string;
    diagnosis?: [];
    treatment?: [];
  }
}

function GroupStatic({ type, isPlan, updateSubmitPlan, infoItem, sendTime }:IProps) {
  let initCondition: IInit = {
    type: 'SEND',
    detail: {},
  };
  if (!isPlan) {
    initCondition.detail = { send: 'OTHER' };
  }

  const [disabled, setDisabled] = useState<IAbled>({}); //年龄性别是否禁用状态
  const [conditions, setConditions] = useState([initCondition]);
  const { roleType, status } = useSelector((state: IState) => state.project.projDetail);
  const isLeader = [Role.MAIN_PI.id, Role.PROJECT_LEADER.id].includes(roleType);
  let staticType = [
    {
      key: 'AGE',
      value: '年龄',
    },
    {
      key: 'MEDICINE',
      value: '用药',
    },
    {
      key: 'BASE',
      value: '性别',
    },
    {
      key: 'DIAGNOSIS',
      value: '诊断',
    },
    {
      key: 'TREATMENT',
      value: '处理',
    },
    {
      key: 'OTHER',
      value: '自定义',
    },
  ];
  //添加计划内的发送条件有”处理“项，没有”药品“和“自定义”项；入组标准排除标准内的条件有”药品“项，没有”处理“项
  if (isPlan) {
    staticType = staticType.filter((item) => !['MEDICINE', 'OTHER'].includes(item.key));
  } else {
    staticType = staticType.filter((item) => item.key !== 'TREATMENT');
  }
  //找到发送条件内通过起始发送时间添加的那条处理信息所在索引
  const findIndex = () => {
    let newIndex = 0;
    conditions.forEach((item, index) => {
      if (item.detail.treatment === sendTime.detail.treatment) {
        newIndex = index;
      }
    });
    return newIndex;
  };
  //起始发送时间->患者做处理的时间->处理方式改变
  useEffect(() => {
    const ifHas = conditions.filter((item) => {
      return item?.detail?.treatment === sendTime?.detail?.treatment;
    });
    if (ifHas.length === 0) {
      if (sendTime && sendTime.type) {
        const index = findIndex();
        if (!index) {
          setConditions([...conditions, sendTime]);
        } else {
          conditions[index].detail.treatment = sendTime.detail.treatment;
          setConditions([...conditions]);
        }
      }
    }
  }, [sendTime]);

  //修改conditions
  const handleChange = (value: string, index: number) => {
    conditions[index].detail.send = value;
    setConditions([...conditions]);
  };

  //年龄性别只能添加一次，之后状态禁用
  useEffect(() => {
    const disableObj = {
      AGE: false,
      BASE: false,
    };
    const vals = conditions.map((item) => item.detail.send);
    if (vals.includes('BASE')) {
      disableObj.BASE = true;
    }
    if (vals.includes('AGE')) {
      disableObj.AGE = true;
    }
    setDisabled(disableObj);
    return () => {
      clearTimeout(timer);
      timer = null;
    };
  }, [conditions]);

  useEffect(() => {
    updateSubmitPlan(conditions);
  }, [conditions]);

  useEffect(() => {
    //添加不走这，编辑反显走这
    if (!isPlan && infoItem) {
      if (isEmpty(infoItem)) {
        setConditions([initCondition]);
      } else {
        setConditions([...getStandardDetail(infoItem)]);
      }
    }
    if (infoItem && infoItem.length > 1) {
      setConditions([...getConditionDetail(infoItem)]);
    }
  }, []);

  //添加条件
  const addCondition = () => {
    setConditions([...conditions, initCondition]);
  };

  // 删除条件
  const delCondition = (index: number) => {
    const newConditions = conditions.filter((_, vIndex) => vIndex !== index);
    setConditions([...newConditions]);
  };

  //修改conditions
  const changeStateByValue = (name: string, index: string, value: string) => {
    //ts
    conditions[index].detail[name] = value;
    setConditions([...conditions]);
  };

  return (
    <div className={styles.condition}>
      <div className={isPlan ? `${styles.title} ${styles.is_plan}` : styles.title}>
        <p className={styles.head}>{type}</p>
        {isLeader && status !== 1001 && isPlan && (
          <p
            className={styles.add}
            onClick={addCondition}
            data-testid={type === '纳入标准' ? 'addJoin' : 'addExclude'}
          >
            <PlusSquareOutlined /> 添加条件
          </p>
        )}
      </div>
      {isLeader && status !== 1001
        ? conditions.map((item: { detail: any }, index: number) => (
            <div className={styles.edit} key={index}>
              {isPlan && (
                <Select
                  style={{ width: 290, height: 40 }}
                  onChange={(value: string) => {
                    handleChange(value, index);
                  }}
                  placeholder="请选择选项"
                  value={item.detail.send}
                  data-testid={type === '纳入标准' ? 'selectJoin' : 'selectExclude'}
                >
                  {staticType.map((t) => (
                    <Option value={t.key} key={t.key} disabled={disabled[t.key]}>
                      {t.value}
                    </Option>
                  ))}
                </Select>
              )}
              <ListItem
                planIndex={index}
                planItem={item}
                changeStateByValue={changeStateByValue}
                type={type}
              />
              <DeleteOutlined
                className={styles.icon}
                onClick={() => {
                  delCondition(index);
                }}
                data-testid={type === '纳入标准' ? 'delJoin' : 'delExclude'}
              />
            </div>
        ))
        : '暂无标准'}
      {isLeader && status !== 1001 && !isPlan && (
        <p
          className={styles.add}
          onClick={addCondition}
          data-testid={type === '纳入标准' ? 'addJoin' : 'addExclude'}
        >
          <PlusSquareOutlined /> 添加条件
        </p>
      )}
    </div>
  );
}

export default GroupStatic;
