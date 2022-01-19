import React, { useState, useEffect, useMemo } from 'react';
import { history, useSelector } from 'umi';
import * as api from '@/services/api';
import { LeftOutlined } from '@ant-design/icons';
import { Input, Button, message } from 'antd';
import { IPlanInfos } from '@/utils/consts';
import create from '@/assets/img/create.svg';
import HistoryPlan from '../ObjectiveHistoryPlan';
import styles from './index.scss';
import { IState } from 'typings/global';
import ScaleTemplate from '@/components/Scale/ScaleTemplate';
import { cloneDeep, isEmpty } from 'lodash';
import { getUrlPreFix } from '@/pages/subjective_table/util';
import dayjs from 'dayjs';

interface IProps {
  location: {
    query: {
      id: string;
    };
    pathname: string;
  };
  scaleType: 'OBJECTIVE' | 'VISIT_OBJECTIVE';
}
function Create({ location, scaleType }: IProps) {

  let initInfos: any = {};
  const projectSid = window.$storage.getItem('projectSid');
  const [infos, setInfos] = useState<IPlanInfos[]>([]);
  const [formName, setFormName] = useState('');
  const [disabled, setDidabled] = useState(true);
  const [status, setEditStatus] = useState<string[]>([]); //open开，为编辑状态
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const [loading, setLoading] = useState(false);

  //添加条件生成一条空计划
  const addInfo = () => {
    setInfos([...infos, { ...initInfos, time: dayjs().valueOf() }]);
    setEditStatus([...status, 'open']);
  };
  useEffect(() => {
    addInfo();
  }, []);
  // 删除条件
  const delPlan = (index: number, item: any) => {

    setInfos((preInfo) => {
      console.log('===================== delPlan  setInfos', JSON.stringify(preInfo), index);

      const newInfos = preInfo.filter((_item, vIndex) => vIndex !== index);
      // const newStatus = status.filter((_item, sIndex) => sIndex !== index);

      // const newIndex = infos.indexOf(item);
      // console.log('===================== newInfos  after', JSON.stringify(newInfos), index, newIndex);
      // setInfos([...newInfos]);
      // setEditStatus([...newStatus]);

      return newInfos;
    });
    console.log('===================== delPlan  after', JSON.stringify(infos), index);
    // const newInfos = infos.filter((_item, vIndex) => vIndex !== index);
    // const newStatus = status.filter((_item, sIndex) => sIndex !== index);

    // const newIndex = infos.indexOf(item);
    // console.log('===================== newInfos  after', JSON.stringify(newInfos), index, newIndex);
    // setInfos([...newInfos]);
    // setEditStatus([...newStatus]);
  };
  //提醒计划的确定按钮回传回来的数据
  const addPlan = (params: IPlanInfos, index: number) => {

    console.log('===================== addPlan', JSON.stringify(params), index);
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
      const ruleList = cloneDeep(infos).filter(item => item.questions !== '');
      for (let i = 0; i < ruleList.length; i++) {
        delete ruleList[i].chooseValues;
      }

      const params = {
        infos: ruleList,
        name: formName,
        type: scaleType,
        projectSid,
        projectName: window.$storage.getItem('projectName'),
        projectNsId,
      };
      console.log('================= 客观检查添加参数', JSON.stringify(params));
      console.log('================= 客观检查添加参数旧==', JSON.stringify(infos));
      api.subjective
        .addObjectiveScale(params)
        .then(() => {
          message.success('添加成功');
          setLoading(false);

          history.push(`/${getUrlPreFix(scaleType)}/detail?name=${formName}`);
        })
        .catch((err: string) => {
          message.error(err);
          setLoading(false);
        });
    }
  };
  //格式化点击编辑需要反显的数据（非编辑状态下也是此数据格式）
  const changeEditStatus = (index: number) => {
    status[index] = 'open';
    setEditStatus([...status]);
  };
  //提醒计划的取消按钮执行操作
  const handleCancel = (index: number, item: any) => {


    console.log('========== infos[index] infos[index]', JSON.stringify(infos));
    //点击取消，如果是空计划，直接删除，如果是编辑的之前的计划则直接更改状态为lock
    // if (infos[index]?.plans?.length === 1) {
    //   delPlan(index);
    // } else {
    //   status[index] = 'lock';
    //   setEditStatus([...status]);
    // }

    // if (isEmpty(infos[index])) {
    delPlan(index, item);
    // } else {
    //   status[index] = 'lock';
    //   setEditStatus([...status]);
    // }

  };



  const ScaleTemplateMemo = useMemo(() => (prop: any) => {


    const item = prop.item;
    const index = prop.index;

    console.log('========= item, ', JSON.stringify(item));
    console.log('========= item, ', index);

    return (
      <ScaleTemplate
        key={item.time}
        mode="Add"
        onCancel={() => handleCancel(index, item)}
        infoIndex={index}
        addPlan={(params) => addPlan(params, index)}
        scaleType={scaleType}
        question={item.questions}
        originRuleDoc={item.ruleDoc}
        chooseValues={item.chooseValues}
      />
    );
  }, []);

  // const ScaleTemplateMemo = useMemo((item: any, index: any) => {
  //   return (
  //     <ScaleTemplate
  //       key={item.time}
  //       mode="Add"
  //       onCancel={() => handleCancel(index, item)}
  //       infoIndex={index}
  //       addPlan={(params) => addPlan(params, index)}
  //       scaleType={scaleType}
  //       question={item.questions}
  //       originRuleDoc={item.ruleDoc}
  //       chooseValues={item.chooseValues}
  //     />
  //   );
  // }, []);

  console.log('===================== render ', JSON.stringify(infos));

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
      {/* {infos.map((item, index) => renderItem(item, index))} */}
      {infos.map((item, index) =>
        status[index] === 'open' ? (
          <div>
            <div>{item.time}</div>
            {/* <ScaleTemplateMemo item={item} index={index}></ScaleTemplateMemo> */}
            <ScaleTemplate
              mode="Add"
              onCancel={() => handleCancel(index, item)}
              infoIndex={index}
              addPlan={(params) => addPlan(params, index)}
              scaleType={scaleType}
              question={item.questions}
              originRuleDoc={item.ruleDoc}
              chooseValues={item.chooseValues}
            />
          </div>
        ) : (
          <HistoryPlan
            infoItem={infos[index]}
            itemIndex={index}
            key={item.time}
            location={location}
            changeEditStatus={() => changeEditStatus(index)}
            handleDel={() => delPlan(index)}
            scaleType={scaleType}
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
