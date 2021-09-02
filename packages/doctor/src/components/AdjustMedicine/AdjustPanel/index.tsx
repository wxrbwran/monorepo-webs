import React, { FC, useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'umi';
import { Form, Input, Button } from 'antd';
import medicineManual from '@/assets/img/icon_medicineManual.svg';
import SearchMedicine from '@/components/SearchMedicine';
import MedicineManual from '@/components/MedicineManual';
import DragModal from '@/components/DragModal';
import { AdviceTitle } from '@/utils/tools';
import { getInitMedicines, formatSubmitData } from '../formatData';
import Plans from '../Plans';
import styles from '../index.scss';

interface IProps {
  handleSaveAdjust: (data: IAdjustMedicinePlan[]) => void;
  handleCancel: () => void;
  handleSetNote?: (val: string) => void;
  showAdvice?: boolean;
}
let uuid = 0;
const AdjustPanel: FC<IProps> = (props) => {
  const {
    handleSaveAdjust, handleCancel, handleSetNote, showAdvice,
  } = props;
  const [form] = Form.useForm();
  const { getFieldValue, setFieldsValue } = form;
  const { currentMedicinePlans } = useSelector((state: IState) => state.medicines);

  const [initMedicinePlans, setInitMedicinePlans] = useState<any>(); // 格式化后药的集合，保存一份最初的值
  const [medicineQueue, setMedicineQueue] = useState<number[]>([]); // 药的集合队列
  const [planQueue, setPlanQueue] = useState<number[][]>([]); // 药的集合，子元素为药的每个计划的初始队列（多剂量）
  const [showTip, setShowTip] = useState(false); // 显示禁忌弹框
  const [date, setDate] = useState(new Date());
  const [newMedicine, setNewMedicine] = useState<IAdjustMedicinePlan[]>([]); // 点击确定后，form数据转成数组格式
  console.log(newMedicine);

  const roleId = window.$storage.getItem('roleId') || '';
  useEffect(() => {
    if (currentMedicinePlans.length > 0) { // 有服药计划，初始化表单和药的队列
      const initData = getInitMedicines(currentMedicinePlans);
      setInitMedicinePlans(initData.initFormVal);
      setFieldsValue({
        ...initData.initFormVal,
      });
      setMedicineQueue(initData.medicineQueue);
      setPlanQueue(initData.planQueue);
      uuid = initData.medicineQueue.length;
    }
  }, []);
  const handleSetField = (key: string, val: any, render?: boolean) => {
    setFieldsValue({
      [key]: val,
    });
    if (render) {
      // 删除时，setFieldsValue更改status，并不会触发渲染，这里主动操作下
      setDate(new Date());
    }
  };
  const handleAddMedicine = () => {
    setFieldsValue({ [`status_${uuid}`]: 'ADD' }); // 设置此条为新加药品
    setFieldsValue({ [`plan_${uuid}_0`]: { status: 'ADD' } }); // 设置此药品的条一个计划状态为新加
    setFieldsValue({ [`unit_${uuid}`]: 1 }); // 设置单位默认值
    setMedicineQueue([...medicineQueue, uuid]); // 队列增加1个
    uuid++;
  };
  const removeMedicine = (index: number) => {
    const { status } = getFieldValue(`status_${index}`);
    if (status === 'ADD') {
      setMedicineQueue([...medicineQueue.filter((i) => i !== index)]);
    } else {
      setFieldsValue({ [`status_${index}`]: 'DELETE' });
      setDate(new Date());
    }
  };
  const refresh = () => { console.log(date); setDate(new Date()); };
  // 提示禁忌-s---暂时没接口先注释掉---回头使用此区域-s
  // const handleSubmit = (values: CommonData) => {
  //   const formatMedicine = formatSubmitData(values, medicineQueue);
  //   if (formatMedicine) { // 检验空值通过
  //     setShowTip(true);
  //     setNewMedicine(formatMedicine);
  //   }
  // };
  // const goOnAdjust = () => {
  //   handleSaveAdjust(newMedicine);
  //   setShowTip(false);
  // };
  // 提示禁忌-e 回头使用此区域-e
  // 提示禁忌有接口后删除此区域-s
  const handleSubmit = (values: CommonData) => {
    const formatMedicine = formatSubmitData(values, medicineQueue);
    if (formatMedicine) { // 检验空值通过
      setNewMedicine(formatMedicine);
      handleSaveAdjust(formatMedicine);
    }
  };
  const goOnAdjust = () => {
    console.log('nnnn');
  };
  // 提示禁忌有接口后删除此区域-e
  return (
    <div className={styles.adjust_medicine}>
      <div className={styles.head}>
        <div className={styles.name}>药名</div>
        <div className={styles.instructions}>说明书</div>
        <div className={styles.dosage}>剂量</div>
        <div className={styles.time}>用药时间</div>
      </div>
      <Form
        name="adjustMedicine"
        onFinish={handleSubmit}
        form={form}
        id="height42"
      >
        {
          medicineQueue.map((item, index) => {
            const status = getFieldValue(`status_${item}`);
            return (
              <div
                className={styles.medicine_item}
                key={item}
                style={{ display: (status === 'DELETE') ? 'none' : 'flex' }}
              >
                <div className={styles.name}>
                  {
                    status === 'NONE' ? (
                      <>
                        <Form.Item
                          name={`name_${item}`}
                          noStyle
                        >
                          <Input type="hidden" />
                        </Form.Item>
                        <span>{getFieldValue(`name_${item}`)}</span>
                      </>
                    ) : (
                      <div className={styles.name}>
                        <SearchMedicine
                          parent={item}
                          refresh={refresh}
                          handleSetField={handleSetField}
                        />
                      </div>
                    )
                  }
                  <Form.Item
                    name={`medicineId_${item}`}
                    noStyle
                  >
                    <Input type="hidden" />
                  </Form.Item>
                  <Form.Item
                    name={`status_${item}`}
                    noStyle
                  >
                    <Input type="hidden" />
                  </Form.Item>
                </div>
                <div className={styles.instructions}>
                  <MedicineManual
                    medicineId={getFieldValue(`medicineId_${item}`)}
                  >
                    <img src={medicineManual} alt="药品说明书" />
                  </MedicineManual>
                </div>
                <Plans
                  parent={item}
                  removeMedicine={removeMedicine}
                  getFieldValue={getFieldValue}
                  handleSetField={handleSetField}
                  refresh={refresh}
                  initPlanQueue={planQueue[index]}
                  medicineStatus={status}
                  initMedicinePlans={initMedicinePlans}
                />
              </div>
            );
          })
        }
        <div className={styles.add_medicine_btn}>
          <span onClick={handleAddMedicine}>
            <PlusOutlined />
            添加新药
          </span>
        </div>
        {
          showAdvice && (
            <div className={styles.advice}>
              <h3>
                { AdviceTitle[roleId] }
              </h3>
              <Input.TextArea
                autoSize={{ minRows: 1, maxRows: 3 }}
                onChange={(e) => handleSetNote(e.target.value)}
              />
            </div>
          )
        }
        <div className="common__btn">
          <Button onClick={handleCancel}>
            退出
          </Button>
          <Button htmlType="submit" type="primary">
            确定
          </Button>
        </div>
      </Form>
      <DragModal
        title="提示"
        width={500}
        visible={showTip}
        onCancel={() => setShowTip(false)}
        wrapClassName="ant-modal-wrap-center"
        okText="继续"
        cancelText="重新调药"
        onOk={goOnAdjust}
      >
        <div style={{ fontSize: 16 }}>
          您好, 该患者111由于高血脂,高血糖,冠状动脉粥样硬化性心脏病,应慎用华法林钠片。由于高血压,高血糖,应禁用华法林钠片。
        </div>
      </DragModal>
    </div>
  );
};
export default AdjustPanel;
