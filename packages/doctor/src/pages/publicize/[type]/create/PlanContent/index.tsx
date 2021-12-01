import { FC, forwardRef, useImperativeHandle } from 'react';
import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { history, useSelector } from 'umi';
// import type { IValues, IRule } from '../../const';
// import { handleFormatValues, getCheckedContent } from '../../utils';
import styles from './index.scss';
import * as api from '@/services/api';
import { cloneDeep, isEmpty } from 'lodash';
import TemplateRule from '../../../components/TemplateRule';


const PlanContent: FC<ILocation> = forwardRef(({ location }: ILocation, ref: Ref<any>): JSX.Element => {



  // const PlanContent: FC<ILocation> = ({ location }) => {

  const type = location.pathname.includes('suifang') ? 'suifang' : (location.pathname.includes('education') ? 'education' : 'crf');
  const typeNumber = type == 'education' ? 2 : (type == 'suifang' ? 0 : 1);
  const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);

  let initInfos: any = {};
  const [infos, setInfos] = useState<any[]>([]);
  const [formName, setFormName] = useState('');
  const [disabled, setDidabled] = useState(true);
  const [status, setEditStatus] = useState<string[]>([]); //open开，为编辑状态
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    //第一个参数：暴露哪个ref；第二个参数：暴露什么

    addInfo: () => {
      setInfos([initInfos, ...infos]);
      setEditStatus(['open', ...status]);
    },
    hide: () => {
      setFormName('');
    },
    onPickerConfirm: () => {

    },
  }));


  useEffect(() => {
    setInfos([initInfos, ...infos]);
    setEditStatus(['open', ...status]);
  }, []);
  // 删除条件
  const delPlan = (index: number) => {
    const newInfos = infos.filter((_item, vIndex) => vIndex !== index);
    const newStatus = status.filter((_item, sIndex) => sIndex !== index);
    setInfos([...newInfos]);
    setEditStatus([...newStatus]);
  };
  //提醒计划的确定按钮回传回来的数据
  const addPlan = (params: any, index: number) => {

    console.log('===================== addPlan', JSON.stringify(params), index);
    infos[index] = params;
    setInfos([...infos]);
    status[index] = 'lock';
    setEditStatus([...status]);
    setDidabled(false);
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
        type: typeNumber,
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
          history.goBack();
        })
        .catch((err: string) => {
          console.log('err', err);
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
    if (isEmpty(infos[index])) {
      delPlan(index);
    } else {
      status[index] = 'lock';
      setEditStatus([...status]);
    }
  };

  return (
    <div className={styles.gauge_table}>

      {infos.map((item, index) =>

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
});

export default PlanContent;
