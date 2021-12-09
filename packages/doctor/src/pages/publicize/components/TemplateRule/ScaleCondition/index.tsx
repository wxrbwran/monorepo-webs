import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import ScaleListItem from './ListItem';
import styles from './index.scss';
import { ICondition, IItem } from '../util';


const { Option } = Select;

interface IProps {
  conditions: IItem;
  updateChoseConditions: ([]) => void;
  values: ICondition[];
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
  const [choseConditions, setChoseConditions] = useState<ICondition[]>(values);//年龄性别是否禁用状态


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

          <p
            className={styles.add}
            onClick={addCondition}
          >
            <PlusSquareOutlined /> 添加条件
          </p>

        }
      </div>
      {
        conditions?.items ? (
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
