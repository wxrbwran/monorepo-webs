import React, { useState, useEffect } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { history, useSelector } from 'umi';
import QuestionDetail from '@/components/Scale/QuestionDetail';
import file from '@/assets/img/file.png';
import * as api from '@/services/api';
import { IPlanInfos, IQuestions } from '@/utils/consts';
import styles from './index.scss';
import { IState } from 'typings/global';
import ScaleTemplate from '@/components/Scale/ScaleTemplate';
import { RuleTypeMap } from '@/pages/subjective_table/util';

interface IProps {
  location: {
    query: {
      tempId: string;
      tempName: string;
    }
  }
}

function Template(props: IProps) {
  const { tempId, tempName } = props.location.query;
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);

  //获取模板详情
  useEffect(() => {
    api.subjective.scaleTemplateDtail(tempId).then(res => {
      setName(res.name);
      setQuestions(res.questions);
    });
  }, []);

  //利用模板创建量表成功
  const addPlan = (plans: IPlanInfos) => {

    const params = {
      name,
      ruleDoc: plans.ruleDoc,
      projectSid: window.$storage.getItem('projectSid'),
      type: RuleTypeMap.visit_subjective.type,
      info: { questions },
      projectName: window.$storage.getItem('projectName'),
      projectNsId,
    };
    api.subjective.addScale(params).then(() => {
      message.success('添加成功');
      window.$log.handleOperationLog({
        projectSid: window.$storage.getItem('projectSid'),
        type: 0,
        copyWriting: `创建主观量表 - ${name}`,
      });

      history.push(`/out_plan_visit/subjective/detail?name=${name}`);
    });
  };

  return (
    <div className={styles.template}>
      <LeftOutlined className={styles.back} onClick={() => history.go(-1)} />
      <div className={styles.main}>
        <p className={styles.tmp_title}>
          <img src={file} /><span style={{ fontWeight: 500 }}>{tempName}</span>
          <QuestionDetail scaleName={name} questions={questions} scaleType="subjective">
            <span className={styles.look}>查看详情</span>
          </QuestionDetail>
        </p>
        <ScaleTemplate
          mode='Edit'
          onCancel={() => history.go(-1)}
          addPlan={addPlan}
          scaleType={'VISIT_SUBJECTIVE'}
        />
      </div>
    </div>
  );
}

export default Template;
