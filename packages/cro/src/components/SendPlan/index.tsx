import React, { useState, useEffect } from 'react';
import { Input, Button, Checkbox, Select, message, InputNumber, Spin } from 'antd';
import * as api from '@/services/api';
import { sendTimeType, sendType, IPlanItem } from '@/utils/consts';
import { filterConditions, formatConditions } from '@/utils/tools';
import { useSelector } from 'umi';
import Condition from '@/components/Condition';
import styles from './index.scss';

const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
let timer: any = null;
interface IProps {
  mode: string;
  onCancel: Function;
  infoIndex: number;
  addPlan: Function;
  plans?: IPlanItem[];
  question?: string;
  isDisabled?: string;
  location?: {
    pathname: string,
  }
}
interface IItem {
  groupName: string;
  groupId: string;
}
interface IState {
  project: {
    objectiveGroup: IItem[];
  };
}

function SendPlan({ onCancel, infoIndex, addPlan, mode, plans, question, isDisabled, location }: IProps) {
  //起始发送时间默认值
  const initStart = {
    type: 'START',
    detail: {
      start: 'ADMISSION_TIME',
    },
  };
  //发送频率默认值
  const initFrequency = {
    type: 'FREQUENCY',
    detail: {
      frequency: 'CUSTOM',
      custom: [''],
    },
  };
  //发送初验组默认值
  const initGroup = {
    type: 'GROUP',
    detail: {
      projectGroups: [],
    },
  };
  const groupList = useSelector((state: IState) => state.project.objectiveGroup);
  const [callBackPlans, setCallBackPlans] = useState([]); //存放子组件”发送条件“回传回来的值
  const [fetching, setFetchStatus] = useState(false); //搜索是否显示loading
  const [treatment, setTreatment] = useState([]); //获取处理方式
  const [remind, setRemind] = useState(''); //问题
  const [sendTime, setSendTime] = useState({}); //存储患者做处理的时间-->处理方式
  const [startTime, setStartTime] = useState(initStart); //起始发送时间
  const [frequency, setFrequency] = useState(initFrequency); //发送频率
  const [group, setGroup] = useState(initGroup); //发送试验组
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //设置编辑反显过来的值
    //plan.length>1而不能设置为>0，是为了满足客观量表’添加提醒‘时
    if (plans && plans.length > 1) {
      console.log('plansss', plans);
      setStartTime(filterConditions(plans, 'START'));
      setFrequency(filterConditions(plans, 'FREQUENCY'));
      setGroup(filterConditions(plans, 'GROUP'));
      if (question) setRemind(question);
    } else {
      setStartTime(initStart);
      setFrequency(initFrequency);
      setGroup(initGroup);
      setRemind('');
    }
  }, [plans]);
  //问题
  const handleChangeRemind = (e: { target: { value: string } }) => {
    setRemind(e.target.value);
  };
  //改变起始发送时间类型
  const handleChangeType = (value: string) => {
    startTime.detail.start = value;
    setStartTime({ ...startTime });
  };
  //更改 患者做处理的时间-->处理方式
  const changeStateByValue = (value: string) => {
    let treatments = {
      type: 'SEND',
      detail: {
        send: 'TREATMENT',
        treatment: '',
      },
    };
    treatments.detail.treatment = value;
    setSendTime(treatments);
  };
  //改变发送频率类型
  const handleGetType = (value: string) => {
    frequency.detail.frequency = value;
    frequency.detail.custom = [''];
    setFrequency({ ...frequency });
  };
  //添加发送频率
  const handleAddDayEdit = () => {
    frequency.detail.custom.push('');
    setFrequency({ ...frequency });
  };
  //修改发送频率
  const handleChangeCustomCycleDay = (e: any, index: number) => {
    frequency.detail.custom[index] = e;
    setFrequency({ ...frequency });
  };
  //删除自定义发送频率
  const handleDeleteDay = (index: number) => {
    frequency.detail.custom.splice(index, 1);
    setFrequency({ ...frequency });
  };
  //循环下发天数
  const handleChangeCycleDay = (day: number) => {
    frequency.detail.custom = [day];
    setFrequency({ ...frequency });
  };
  //子组件”发送条件“更改，回传回来的值
  const sendCondition = (planArr: []) => {
    setCallBackPlans(planArr);
  };
  //发送实验组
  const handleChangeGroup = (checkedValues: any[]) => {
    group.detail.projectGroups = [...checkedValues];
    setGroup({ ...group });
  };
  //格式化’发送试验组‘
  const options = groupList.map((item: IItem) => ({
    label: item.groupName,
    value: item.groupId,
  }));

  options.unshift({
    label: '全部受试者',
    value: 'PROJECT_ALL',
  });
  //确定，回传拼好的数据格式
  const handleSubmit = () => {
    setLoading(true);
    console.log('callBackPlans', callBackPlans);
    const conditionArr = formatConditions(callBackPlans);
    console.log('conditionArr', conditionArr);
    //去重、过滤空数据
    frequency.detail.custom = Array.from(new Set(frequency.detail.custom)).filter((item) => !!item);
    if (group.detail.projectGroups.includes('PROJECT_ALL')) {
      group.detail.projectGroups = ['PROJECT_ALL'];
    }
    const params = {
      plans: [startTime, ...conditionArr, frequency, group],
      questions: remind,
    };
    //年龄限制
    const filterAgeObj = callBackPlans.filter((item) => item.detail.send === 'AGE')[0];
    if (filterAgeObj) {
      const lowerAge = +filterAgeObj.detail.minAge;
      const upperAge = +filterAgeObj.detail.maxAge;
      if (!lowerAge || !upperAge) {
        message.error('请完善年龄信息');
        setLoading(false);
        return;
      } else if (lowerAge >= upperAge) {
        message.error('请输入正确的年龄范围');
        setLoading(false);
        return;
      }
    }
    setLoading(false);
    addPlan(params, infoIndex);
  };
  //取消
  const handCancel = () => {
    onCancel();
  };
  //获取处理方式
  const fetchTreatment = (value: string) => {
    if (value !== '') {
      setFetchStatus(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        api.detail
          .fetchTreatment({ name: value })
          .then((res) => {
            const { treatments } = res;
            if (treatments.length > 0) {
              setTreatment(treatments);
            } else {
              message.info('没有治疗方式信息!');
            }
          })
          .catch((err) => {
            message.error(err);
          });
        setFetchStatus(false);
      }, 800);
    }
  };
  //存在空记录不可提交
  const isEmptyCustom = frequency.detail.custom.length === 1 && !frequency.detail.custom[0];
  const isEmptyGroup = group.detail.projectGroups.length === 0;
  const isShowTextArea = mode === 'Add' || location?.pathname.includes('objective_table/detail');
  const disabled =
  isShowTextArea ? !remind || isEmptyCustom || isEmptyGroup : isEmptyCustom || isEmptyGroup;
  return (
    <div className={mode === 'Add' ? styles.send_plan : `${styles.send_plan} ${styles.edit}`}>
      {isShowTextArea && (
        <TextArea
          placeholder={'请输入提醒内容'}
          className={styles.question}
          onChange={(ev) => handleChangeRemind(ev)}
          value={remind}
          disabled={!!isDisabled}
        />
      )}
      <h2>
        <span className={styles.start}>*</span>起始发送时间：
      </h2>
      <div className={styles.send_time}>
        <Select style={{ width: 180 }} onChange={handleChangeType} value={startTime.detail.start}>
          {sendTimeType.map((item) => (
            <Option value={item.key} key={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        {startTime.detail.start === 'TREATMENT_TIME' && (
          <div className={styles.item_value}>
            <span className={styles.label}>患者做</span>
            <Select
              showSearch
              allowClear
              placeholder="请输入处理方式"
              style={{ width: 237 }}
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={fetchTreatment}
              // value={treatment}
              onChange={(value: string) => {
                changeStateByValue(value);
              }}
            >
              {treatment.map((item: { id: string; name: string }) => (
                <Option key={item.id} value={item.name} title={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
            <span className={styles.after}>的时间</span>
          </div>
        )}
      </div>
      <h2>
        <span className={styles.start}>*</span>发送频率：
      </h2>
      <div className={styles.send_type}>
        <Select style={{ width: 180 }} onChange={handleGetType} value={frequency.detail.frequency}>
          {sendType.map((item) => (
            <Option value={item.key} key={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        {frequency.detail.frequency === 'CUSTOM' ? (
          <div className={styles.self}>
            <div className={styles.self_content}>
              {frequency.detail.custom.map((item: any, index) => (
                <div className={styles.add_item} key={index}>
                  <div className={styles.add_item_left}>
                    <span>第</span>
                    <InputNumber
                      style={{ width: 50 }}
                      min={1}
                      max={9999}
                      value={item}
                      onChange={(e) => handleChangeCustomCycleDay(e, index)}
                    />
                    <span className={styles.info}>天发送一次</span>
                  </div>
                  <div className={styles.self_add}>
                    {index === 0 ? (
                      <Button size="large" onClick={handleAddDayEdit}>
                        添加更多
                      </Button>
                    ) : (
                      <Button size="large" onClick={() => handleDeleteDay(index)}>
                        删除
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.cycle}>
            每{' '}
            <InputNumber
              style={{ width: 50 }}
              min={1}
              max={9999}
              value={frequency.detail.custom[0]}
              onChange={handleChangeCycleDay}
            />{' '}
            天下发一次
          </div>
        )}
      </div>
      <Condition
        type="发送条件："
        isPlan={true}
        updateSubmitPlan={sendCondition}
        infoItem={plans}
        sendTime={sendTime}
      />

      <h2>
        <span className={styles.start}>*</span>发送试验组：
      </h2>
      <CheckboxGroup
        options={options}
        onChange={handleChangeGroup}
        value={group.detail.projectGroups}
      />
      <div className={styles.submit}>
        <Button onClick={handCancel}>取消</Button>
        <Button type="primary" onClick={handleSubmit} disabled={disabled} loading={loading}>
          确定
        </Button>
      </div>
    </div>
  );
}

export default SendPlan;
