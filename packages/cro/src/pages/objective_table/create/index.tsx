import React, { useState, useEffect } from 'react';
import { history, useSelector } from 'umi';
import * as api from '@/services/api';
import { LeftOutlined } from '@ant-design/icons';
import { Input, Button, message } from 'antd';
import { IPlanInfos } from '@/utils/consts';
import create from '@/assets/img/create.svg';
import SendPlan from '@/components/SendPlan';
import HistoryPlan from '../components/history_plan';
import styles from '../index.scss';
import { IState } from 'typings/global';

interface IProps {
  children: React.ReactElement[];
  location: {
    query: {
      id: string;
    };
    pathname: string;
  };
}
function Create({ location }: IProps) {
  let initInfos: IPlanInfos = {
    plans: [
      {
        type: '',
        detail: {},
      },
    ],
    questions: '',
    scaleId: '',
  };
  const projectSid = window.$storage.getItem('projectSid');
  const [infos, setInfos] = useState<IPlanInfos[]>([]);
  const [formName, setFormName] = useState('');
  const [disabled, setDidabled] = useState(true);
  const [status, setEditStatus] = useState<string[]>([]); //open开，为编辑状态
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const [loading, setLoading] = useState(false);

  //添加条件生成一条空计划
  const addInfo = () => {
    setInfos([initInfos, ...infos]);
    setEditStatus(['open', ...status]);
  };
  useEffect(() => {
    addInfo();
  }, []);
  // 删除条件
  const delPlan = (index: number) => {
    const newInfos = infos.filter((_item, vIndex) => vIndex !== index);
    const newStatus = status.filter((_item, sIndex) => sIndex !== index);
    setInfos([...newInfos]);
    setEditStatus([...newStatus]);
  };
  //提醒计划的确定按钮回传回来的数据
  const addPlan = (params: IPlanInfos, index: number) => {
    infos[index] = params;
    setInfos([...infos]);
    status[index] = 'lock';
    setEditStatus([...status]);
    setDidabled(false);
  };
  //表单标题
  const changeFormName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormName(e.target.value);
  };
  //量表提交
  const handleSubmit = () => {
    setLoading(true);
    if (!formName.trim()) {
      message.error('请输入提醒类型');
      setLoading(false);
    } else {
      console.log(99999);
      api.subjective
        .addObjectiveScale({
          infos,
          name: formName,
          type: 'OBJECTIVE',
          projectSid,
          projectName: window.$storage.getItem('projectName'),
          projectNsId,
        })
        .then(() => {
          message.success('添加成功');
          setLoading(false);
          history.push(`/objective_table/detail?name=${formName}`);
        })
        .catch((err: string) => {
          message.error(err);
        });
    }
  };
  //格式化点击编辑需要反显的数据（非编辑状态下也是此数据格式）
  const changeEditStatus = (index: number) => {
    status[index] = 'open';
    setEditStatus([...status]);
  };
  //提醒计划的取消按钮执行操作
  const handleCancel = (index: number) => {
    //点击取消，如果是空计划，直接删除，如果是编辑的之前的计划则直接更改状态为lock
    if (infos[index].plans.length === 1) {
      delPlan(index);
    } else {
      status[index] = 'lock';
      setEditStatus([...status]);
    }
  };
  return (
    <div className={styles.gauge_table}>
      <div className={styles.head}>
        <LeftOutlined className={styles.back} onClick={() => history.go(-1)} />
        <div className={styles.table_name}>
          <p className={styles.title}>
            <Input
              placeholder="请输入提醒类型，例：超声类检查提醒"
              onChange={changeFormName}
              style={{ width: 400 }}
            />
          </p>
        </div>
      </div>
      <div className={styles.add} onClick={addInfo}>
        <img src={create} alt="" />
        创建新提醒
      </div>
      {infos.map((item, index) =>
        status[index] === 'open' ? (
          <SendPlan
            key={index}
            mode="Add"
            onCancel={() => handleCancel(index)}
            infoIndex={index}
            addPlan={addPlan}
            plans={item.plans}
            question={item.questions}
          />
        ) : (
          <HistoryPlan
            infoItem={infos[index]}
            itemIndex={index}
            key={index}
            location={location}
            changeEditStatus={() => changeEditStatus(index)}
            handleDel={() => delPlan(index)}
          />
        ),
      )}
      {infos.length > 0 && (
        <div className={styles.operate}>
          <Button type="primary" onClick={handleSubmit} disabled={disabled} loading={loading}>
            完成
          </Button>
        </div>
      )}
    </div>
  );
}

export default Create;
