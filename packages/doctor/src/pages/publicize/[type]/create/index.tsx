import type { FC } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { Button, message, Input } from 'antd';
import { history, useSelector, useParams } from 'umi';
// import type { IValues, IRule } from '../../const';
// import { handleFormatValues, getCheckedContent } from '../../utils';
import styles from './index.scss';
import * as api from '@/services/api';
// import PlanItem from '../components/PlanItem';
import { LeftOutlined } from '@ant-design/icons';
import create from '@/assets/img/create.svg';
import { cloneDeep } from 'lodash';
import { sfTypeUrl } from '../../utils';
import PlanContent from './PlanContent';
// const { Step } = Steps;
// type IAbled = Record<string, boolean>;

// const EducationCreate: FC<ILocation> = ({ location }) => {

const EducationCreate: FC<ILocation> = ({ }) => {

  // const type = location.pathname.includes('suifang') ? 'suifang' : (location.pathname.includes('education') ? 'education' : 'crf');
  const type: string = useParams<{ type: string }>()?.type;


  const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);


  const [infos, setInfos] = useState<any[]>([]);
  const [formName, setFormName] = useState('');
  const [disabled, setDidabled] = useState(true);
  const plansRef = useRef(null);


  // const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const [loading, setLoading] = useState(false);



  //添加条件生成一条空计划
  const addInfo = () => {

    if (plansRef.current) {
      plansRef.current.addInfo();
    }
  };

  useEffect(() => {
    addInfo(); // 默认有一个plan
  }, []);

  const onSavePlan = (_plans: any) => {

    setDidabled(false);
  };

  const onPlanChanged = (plans: any[]) => {

    setInfos(plans);
  };

  //表单标题
  const changeFormName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormName(e.target.value);
  };
  //量表提交
  const handleSubmit = () => {
    // setLoading(true);
    if (!formName.trim()) {
      message.error(`请输入${sfTypeUrl?.[type].text}类型`);
      setLoading(false);
    } else {
      const ruleList = cloneDeep(infos);
      const ruleDocs = [];
      for (let i = 0; i < ruleList.length; i++) {
        if (ruleList[i].ruleDoc) {
          ruleDocs.push(ruleList[i].ruleDoc);
        }
      }

      const params = {
        ruleDocs: ruleDocs,
        type: sfTypeUrl?.[type].type,
        title: formName,
        operatorSid: window.$storage.getItem('sid'),
        operatorWcId: window.$storage.getItem('nsId'),
        ownershipSid: currentOrgInfo.sid,
        // projectNsId,
      };

      api.education
        .addPublicizeRules(params)
        .then(() => {
          message.success('添加成功');
          setLoading(false);
          // handleUpdataStatus(content);
          history.push(`/publicize/${type}/?name=${formName}`);
        })
        .catch((err: string) => {
          console.log('err', err);
        });
    }
  };

  // publicize/education
  return (
    <div className={styles.gauge_table}>
      <div className={styles.head}>
        <LeftOutlined className={styles.back} onClick={() => history.push(`/publicize/${type}`)} />
        <div className={styles.table_name}>
          <p className={styles.title}>
            <Input
              placeholder={`请输入${sfTypeUrl?.[type].text}类型，例：高血压病人${sfTypeUrl?.[type].text}`}
              onChange={changeFormName}
              style={{ width: 480 }}
            />
          </p>
        </div>
      </div>
      <div className={styles.add} onClick={addInfo}>
        <img src={create} alt="" />
        创建新{sfTypeUrl?.[type].text}
      </div>

      <PlanContent type={type} onSavePlan={onSavePlan} onPlanChanged={onPlanChanged} ref={plansRef}>

      </PlanContent>
      {/* {infos.map((item, index) =>

        status[index] === 'open' ? (
          <TemplateRule
            pageType='education'

            onCancelClick={() => { handleCancel(index); }}
            originRuleDoc={item.ruleDoc}
            chooseValues={item.chooseValues}
            onSaveClick={(data: { ruleDoc: any, chooseValues: any }) => {

              console.log('============= onSaveClick ducation', JSON.stringify(data));
              addPlan(data, index);
            }}>
          </TemplateRule>
        ) : (
          <div onClick={() => changeEditStatus(index)}>
            123
          </div>
          // <PlanItem data={infos[index]} />
        ),
      )} */}
      {infos.length > 0 && (
        <div className={styles.operate}>
          <Button type="primary" onClick={handleSubmit} disabled={disabled} loading={loading}>
            完成
          </Button>
        </div>
      )}
    </div>


  );
};

export default EducationCreate;
