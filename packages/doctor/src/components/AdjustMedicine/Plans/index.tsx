import React, { ChangeEvent, FC, useState } from 'react';
import {
  Form, Input, InputNumber, Popconfirm, Select,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { unitFlag, unitFlagRe } from '@/utils/tools';
import MedicineTime from '../MedicineTime';
import styles from '../index.scss';

interface IPlan {
  dosage: number;
  status: string;
  originDosage: number;
  takeTime: string[];
  originTakeTime: string[];
}
interface IProps {
  parent: number;
  removeMedicine: (index: number) => void;
  getFieldValue: (name: string) => string | IPlan;
  handleSetField: (key: string, val: any, render?: boolean) => void;
  refresh: () => void;
  initPlanQueue: number[];
  medicineStatus: string;
  initMedicinePlans: CommonData;
}
const { Option } = Select;

const Plans: FC<IProps> = (props) => {
  const {
    parent, removeMedicine, getFieldValue, handleSetField, refresh,
    initPlanQueue, medicineStatus, initMedicinePlans,
  } = props;

  const [planQueue, setPlanQueue] = useState<number[]>(initPlanQueue || [0]); // 单个药品的服药列表（剂量+时间）
  const [planId, setPlanId] = useState(initPlanQueue?.length || 0);
  const add = () => {
    setPlanQueue([...planQueue, planId]);
    handleSetField(`plan_${parent}_${planId}`, { status: 'ADD' });
    setPlanId((prePlanId: number) => prePlanId + 1);
  };
  const remove = (item: number) => {
    let ifLastItem = 0;
    planQueue.forEach((inx: number) => {
      const { status } = getFieldValue(`plan_${parent}_${inx}`) as IPlan;
      if (status !== 'DELETE') {
        ifLastItem++;
      }
    });
    if (ifLastItem === 1) {
      removeMedicine(parent); // 删除药品
    }
    // 删除药品的某条计划
    // 如果status为ADD新添加的，则直接删除不用留痕。如果为原有药品EDIT或NONE编辑，则将状态置为DELETE
    const { status, originDosage, originTakeTime } = getFieldValue(`plan_${parent}_${item}`) as IPlan;
    if (status === 'ADD') {
      setPlanQueue([...planQueue.filter((i) => i !== item)]);
    } else {
      const planValue: CommonData = {
        status: 'DELETE',
      };
      if (originDosage) planValue.dosage = originDosage;
      if (originTakeTime) planValue.takeTime = originTakeTime;
      handleSetField(`plan_${parent}_${item}`, planValue, true);
      refresh();
    }
  };
  // 此方法只解决修改剂量后更新status,设置最新的剂量与保存原始的剂量
  const handleEdit = (e: ChangeEvent<HTMLInputElement>, queueInx: number) => {
    const currentPlan = (getFieldValue(`plan_${parent}_${queueInx}`) as IPlan);
    const { status, originTakeTime } = currentPlan;
    // 原有药品(状态为none)且原有药品计划状态为（NONE或EDIT）编辑剂量【ps:新加的和删除的都不用再做记录】
    if (medicineStatus === 'NONE' && ['NONE', 'EDIT'].includes(status)) {
      const initOriginDosage = Number(initMedicinePlans[`plan_${parent}_${queueInx}`].dosage);
      if (initOriginDosage === Number(e.target.value)) { // 判断当前剂量和初始原剂量是否相同
        handleSetField(`plan_${parent}_${queueInx}`, {
          ...currentPlan,
          originDosage: null,
          status: originTakeTime ? 'EDIT' : 'NONE',
        });
      } else {
        handleSetField(`plan_${parent}_${queueInx}`, {
          ...currentPlan,
          // 此时用getFieldValue获取剂量，已经是更改后的了。所以原始的剂量就从最开始表单初始值中去取
          originDosage: initOriginDosage,
          status: 'EDIT',
        });
      }
    }
  };
  const disabled = !getFieldValue(`name_${parent}`);
  let showPlus = false;
  let showPlusInx = 999999;
  return (
    <div className={styles.plans}>
      {
        planQueue.map((item, index) => {
          const { takeTime, status } = (getFieldValue(`plan_${parent}_${item}`) as IPlan);
          if (!showPlus && status !== 'DELETE') { showPlus = true; showPlusInx = index; }
          return (
            <div
              className={styles.plans_item}
              key={item}
              style={{
                display: (status === 'DELETE') ? 'none' : 'flex',
              }}
            >
              <div className={styles.dosage}>
                <Form.Item
                  name={[`plan_${parent}_${item}`, 'dosage']}
                  noStyle
                >
                  <InputNumber
                    min={0}
                    disabled={disabled}
                    onBlur={(e) => handleEdit(e, item)}
                  />
                </Form.Item>
                <Form.Item name={[`plan_${parent}_${item}`, 'originDosage']} noStyle>
                  <Input type="hidden" />
                </Form.Item>
                <Form.Item name={[`plan_${parent}_${item}`, 'status']} noStyle>
                  <Input type="hidden" />
                </Form.Item>
                {
                index === 0 && (
                  <span>
                    {
                      medicineStatus === 'NONE'
                        ? (
                          <>
                            <span>{unitFlagRe[getFieldValue(`unit_${parent}`) as string]}</span>
                            <Form.Item name={[`unit_${parent}`]} noStyle>
                              <Input type="hidden" />
                            </Form.Item>
                          </>
                        )
                        : (
                          <Form.Item
                            name={`unit_${parent}`}
                            noStyle
                          >
                            <Select style={{ width: 88 }} disabled={disabled}>
                              {
                                Object.keys(unitFlag).map((key) => (
                                  <Option value={unitFlag[key]} key={key}>{key}</Option>
                                ))
                                }
                            </Select>
                          </Form.Item>
                        )
                    }
                  </span>
                )
              }
              </div>
              <MedicineTime
                parent={parent}
                subIndex={item}
                disabled={disabled}
                handleSetField={handleSetField}
                initSelect={takeTime || []}
                getFieldValue={getFieldValue}
                medicineStatus={medicineStatus}
                planQueue={planQueue}
              />
              <span className={styles.edit_btn}>
                {
                index === showPlusInx
                && !disabled
                && <PlusOutlined className={styles.add_btn} onClick={add} />
              }
                <Popconfirm
                  title="是否删除该条目?"
                  onConfirm={() => remove(item)}
                  okText="删除"
                  cancelText="取消"
                  placement="right"
                >
                  <DeleteOutlined />
                </Popconfirm>
              </span>
            </div>
          );
        })
      }
    </div>
  );
};

export default Plans;
