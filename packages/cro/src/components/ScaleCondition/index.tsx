import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import ScaleListItem from './ListItem';
import styles from './index.scss';
import { useSelector } from 'umi';
import { IState } from 'typings/global';
import { Role } from 'xzl-web-shared/src/utils/role';
import { ICondition } from '../../pages/subjective_table/util';

const { Option } = Select;

interface IProps {
  conditions: IItem;
  updateChoseConditions: ([]) => void;
  values: ICondition[];
}

interface IItem {
  name: string;
  type: string;
  level: string;
  description: string;
  value: string | number;
  items: IItem[];
}

function ScaleCondition({ conditions, updateChoseConditions, values }: IProps) {


  const initItems: ICondition = {
    chooseItem: {
      name: '',
      description: '',
    },
    chooseValue: {

    },
  };
  const [disabled, setDisabled] = useState<String[]>([]);//年龄性别是否禁用状态
  const { roleType, status } = useSelector((state: IState) => state.project.projDetail);
  const isLeader = [Role.MAIN_PI.id, Role.PROJECT_LEADER.id].includes(roleType);


  const [choseConditions, setChoseConditions] = useState<ICondition[]>(values);//年龄性别是否禁用状态


  console.log('============================ conditions conditions ', JSON.stringify(choseConditions), status);
  //起始发送时间->患者做处理的时间->处理方式改变
  // useEffect(() => {
  //   const ifHas = conditions.filter(item => {
  //     return item?.detail?.treatment === sendTime?.detail?.treatment
  //   });
  //   if (ifHas.length === 0) {
  //     if (sendTime && sendTime.type) {
  //       const index = findIndex();
  //       if (!index) {
  //         setConditions([...conditions, sendTime]);
  //       } else {
  //         conditions[index].detail.treatment = sendTime.detail.treatment;
  //         setConditions([...conditions]);
  //       }
  //     }
  //   }
  // }, [sendTime])

  useEffect(() => {
    setChoseConditions(values);
  }, [values]);

  //年龄性别只能添加一次，之后状态禁用
  useEffect(() => {
    const disableObj = [];
    const vals = choseConditions.map(item => item.chooseItem.description);
    if (vals.includes('年龄')) { disableObj.push('年龄'); }
    if (vals.includes('性别')) { disableObj.push('性别'); }
    setDisabled(disableObj);

    updateChoseConditions(choseConditions);
  }, [choseConditions]);

  useEffect(() => {
    // updateSubmitPlan(conditions);


  }, [conditions]);

  useEffect(() => {
    //添加不走这，编辑反显走这
    // if (!isPlan && infoItem) {
    //   if (isEmpty(infoItem)) {
    //     setConditions([initCondition])
    //   } else {
    //     setConditions([...getStandardDetail(infoItem)])
    //   }
    // }
    // if (infoItem && infoItem.length > 1) {
    //   setConditions([...getConditionDetail(infoItem)])
    // }
  }, []);

  //修改conditions
  const handleChange = (value: String, index: number) => {


    const choseList = conditions.items.filter(item => item.description == value);
    choseConditions[index].chooseItem = choseList[0];
    choseConditions[index].chooseValue = {};
    setChoseConditions([...choseConditions]);
  };

  //添加条件
  const addCondition = () => {

    setChoseConditions([...choseConditions, initItems]);
    // setConditions([...conditions, initCondition]);
  };

  // 删除条件
  const delCondition = (index: number) => {

    const newChoseConditions = choseConditions.filter((_item, vIndex) => vIndex !== index);
    setChoseConditions([...newChoseConditions]);
  };

  //修改conditions
  const changeStateByValue = () => {

    setChoseConditions([...choseConditions]);
  };

  // true 1002 dev.NeEd4M

  return (
    <div className={styles.condition}>

      <div className={`${styles.title} ${styles.is_plan}`}>
        <p className={styles.head}>发送条件：</p>
        {
          isLeader && status !== 1001 && (
            <p
              className={styles.add}
              onClick={addCondition}
            >
              <PlusSquareOutlined /> 添加条件
            </p>
          )
        }
      </div>
      {
        isLeader && status !== 1001 && conditions?.items ? (
          choseConditions.map((item, index: number) => (
            <div className={styles.edit} key={index}>

              <Select
                style={{ width: 290, height: 40 }}
                onChange={(value: string) => { handleChange(value, index); }}
                placeholder='请选择选项'
                value={item.chooseItem.description}
              >
                {conditions.items.map(con => (
                  <Option
                    value={con.description}
                    key={con.description}
                    disabled={disabled.includes(con.description)}
                  >
                    {con.description}
                  </Option>
                ))}
              </Select>
              <ScaleListItem
                item={item}
                changeStateByValue={changeStateByValue}
              />
              <DeleteOutlined
                className={styles.icon}
                onClick={() => { delCondition(index); }} />
            </div>
          ))
        ) : '暂无标准'
      }
    </div>
  );
}

export default ScaleCondition;
