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



  // const sendList = useSelector((state: IState) => state.education.sendList);
  // const [form] = Form.useForm();
  // const [current, setCurrent] = useState(0);
  // const [checked, setChecked] = useState<string>(''); // 选择的要发送的内容的id
  // const [rules, setRules] = useState<IRule>();
  // const [initFormVal, setInitFormVal] = useState({ frequencyType: 'once' });
  const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);
  // const [scopeItems, setScopeItems] = useState([]);


  // 更新状态：列表判断是否已有发送计划使用 暂时先不调用
  // const handleUpdataStatus = (content: any) => {
  //   let statusParams = content;
  //   if (type == 'suifang') {
  //     statusParams = content.map((item) => {
  //       return { ...item, type: 5 };
  //     });
  //   }
  //   api.education.postPublicizeBatchStatus({ content: statusParams });
  // };
  // const onFinish = (values: IValues) => {
  //   console.log('Received values of form:', values);
  //   const result = handleFormatValues(values, rules, isScale, checked, currentOrgInfo.sid, currentOrgInfo.role, scopeItems);
  //   if (result) {
  //     // eslint-disable-next-line @typescript-eslint/naming-convention
  //     const { start, must, should_1, actions } = result;
  //     const content = getCheckedContent(checked.split(','), sendList);
  //     // 提交参数
  //     const params = {
  //       rules: [
  //         {
  //           title: '',
  //           match: {
  //             must: [...start, ...must],
  //             should_1: [...should_1],
  //           },
  //           actions: [...actions],
  //         },
  //       ],
  //       localRules: [
  //         {
  //           content,
  //           ...values,
  //         },
  //       ],
  //       meta: {
  //         // sid: window.$storage.getItem('sid'),
  //         sourceType: isScale ? 2 : 3,
  //         teamLocations: [{
  //           sid: window.$storage.getItem('sid'),
  //           ns: window.$storage.getItem('nsId'),
  //           role: window.$storage.getItem('currRoleId'),
  //           tag: 'operator',
  //         }, {
  //           sid: currentOrgInfo.sid,
  //           ns: currentOrgInfo.nsId,
  //           role: currentOrgInfo.role,
  //           tag: 'ownership',
  //         }],
  //       },
  //     };
  //     console.log('params666', params);
  //     api.education
  //       .sendPlan(params) addPublicizeRules
  //       .then(() => {
  //         // message.success('发送成功')
  //         // history.push('/education/patient/publicize');
  //         handleUpdataStatus(content);
  //         history.goBack();
  //       })
  //       .catch((err: string) => {
  //         console.log('err', err);
  //       });
  //   }
  // };

  // const handleChange = (changedValues: any, allValues: { conditions: { type: string }[] }) => {
  //   console.log('changedValues', changedValues, allValues);
  //   setInitFormVal({ ...allValues });
  //   const disableObj = {
  //     age: false,
  //     sex: false,
  //   };
  //   const vals = allValues.conditions.map((item) => item?.type);
  //   if (vals.includes('age')) {
  //     disableObj.age = true;
  //   }
  //   if (vals.includes('sex')) {
  //     disableObj.sex = true;
  //   }
  //   setDisabled(disableObj);
  // };

  // const changeContent = (ids: string) => {
  //   setChecked(ids);
  // };




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
      message.error('请输入提醒类型');
      setLoading(false);
    } else {
      const ruleList = cloneDeep(infos);
      const ruleDocs = [];
      for (let i = 0; i < ruleList.length; i++) {
        ruleDocs.push(ruleList[i].ruleDoc);
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
      console.log('================= 添加宣教随访参数 ', JSON.stringify(params));

      api.education
        .addPublicizeRules(params)
        .then(() => {
          message.success('添加成功');
          setLoading(false);
          // handleUpdataStatus(content);
          history.push(`/publicize/${type}/detail?name=${formName}`);
        })
        .catch((err: string) => {
          console.log('err', err);
        });
    }
  };

  return (
    <div className={styles.gauge_table}>
      <div className={styles.head}>
        <LeftOutlined className={styles.back} onClick={() => history.push(`/publicize/${type}/detail`)} />
        <div className={styles.table_name}>
          <p className={styles.title}>
            <Input
              placeholder="请输入宣教类型，例：高血压病人宣教"
              onChange={changeFormName}
              style={{ width: 400 }}
            />
          </p>
        </div>
      </div>
      <div className={styles.add} onClick={addInfo}>
        <img src={create} alt="" />
        创建新宣教
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
