import React, { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import { useParams, history } from 'umi';
import * as api from '@/services/api';
import CreateBox from '../../components/create_box';
// import type { IValues } from '../const';
import PlanItem from '../components/PlanItem';

import { Input, message, Tabs } from 'antd';

import styles from './index.scss';
import { sfTypeUrl } from '../../utils';
import { fileTypes, getChooseValuesKeyFromRules } from '../../components/TemplateRule/util';
import PlanContent from '../create/PlanContent';

import TemplateRule from '../../components/TemplateRule';
import { FormOutlined } from '@ant-design/icons';


const { TabPane } = Tabs;
const EducationDetail: FC<ILocation> = ({ location }) => {
  const type: string = useParams<{ type: string }>()?.type;
  const [sendContent, setSendContent] = useState([]);
  const [activeKey, setActiveKey] = useState('0');
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [scaleName, setScaleName] = useState('');
  const [groupId, setGroupId] = useState('');

  const getRules = (docStatusType: string) => {
    setIsEdit(false);
    // 先清空，以防止闪屏
    setSendContent([]);
    api.education
      .getAllRules({
        sourceType: sfTypeUrl?.[type].sourceType,
        docStatusType: docStatusType,
        pageSize: 9999,
        page: 1,
        sourceMembers: [
          {
            sourceId: location.query?.id,
            tag: 'source_group',
          },
        ],
      })
      .then((ruleList) => {

        setScaleName(ruleList.groupName);
        setGroupId(ruleList.groupId);
        const ids = ruleList.rules.flatMap((ruleDoc) => {
          return (
            ruleDoc.rules[0].actions.flatMap((action) => {
              return action.params.sourceMember.map((source) => source.sourceId);
            })
          );
        });

        let request = api.education.getScalesSendContents;
        if (type == 'education') {
          request = api.education.getEducationSendContents;
        }
        // 获取所有的图片资源
        request({
          ids: ids.filter((id) => ![null, undefined].includes(id)),
        })
          .then((res) => {

            // 获取所有的图片资源
            const list: any[] = [];
            if (type == 'education') {

              fileTypes.forEach((fileType: any) => {
                if (res.list.filter(p => p.type === fileType.code).length > 0) {
                  list.push(...res.list.filter(p => p.type === fileType.code).map((item) => {
                    return ({
                      ...item,
                      extraFileType: { ...fileType },
                    });
                  }));
                }
              });
            } else {
              const fileType = fileTypes.filter((file) => {
                if (type == 'suifang') {
                  return file.type == 'accompany';
                } else {
                  return file.type == 'crf';
                }
              })[0];
              if (res.list.length > 0) {
                list.push(...res.list.map((item) => {
                  return ({
                    ...item,
                    extraFileType: { ...fileType },
                  });
                }));
              }
            }

            const rules = ruleList.rules.map((rule) => {
              const chooseValues = getChooseValuesKeyFromRules(rule, list);
              return {
                rule: rule,
                chooseValues: chooseValues,
                status: 'close',
              };
            });
            setLoading(false);
            setSendContent(rules);
          })
          .catch((err: string) => {
            console.log('err', err);
            message.error(err?.result);
          });
      })
      .catch((err) => {
        message.error(err?.result);
      });
  };

  useEffect(() => {
    getRules(activeKey);
  }, [location]);

  const tabChange = (key) => {

    setActiveKey(key);
    getRules(key);
  };

  const onStopSendSuccess = (key) => {
    getRules(key);
  };

  const plansRef = useRef(null);

  //添加条件生成一条空计划
  const addInfo = () => {

    if (activeKey != '0') {
      getRules('0');
    }
    setActiveKey('0');
    if (plansRef.current) {
      plansRef.current.addInfo();
    }
  };

  const onSavePlan = (plan: any) => {
    // 调用接口添加一个plan
    plan.ruleDoc.meta.sourceMembers = [{
      sourceId: location.query?.id,
      tag: 'source_group',
      sourceLocation: 's_contact.t_source_group',
    }];

    api.education
      .appendRules(plan.ruleDoc)
      .then(() => {
        message.success('添加成功');
        setActiveKey('0');
        getRules('0');
        if (plansRef.current) {
          plansRef.current.clearInfos();
        }
      })
      .catch((err) => {
        console.log('err', err);
        message.error(err?.result ?? '添加失败');
      });
  };

  const onPlanChanged = (_plans: any[]) => {
    // setInfos(plans);
  };

  const onEditPlan = (editPlan: { ruleDoc: any, chooseValues: any }, _sen: any) => {

    setLoading(true);

    api.education.deleteScaleRule(editPlan.ruleDoc.id).then(() => {

      delete editPlan.ruleDoc.id;
      api.education.appendRules(editPlan.ruleDoc).then(() => {

        message.success('修改成功');
        setActiveKey('0');
        setTimeout(() => {
          getRules('0');
        }, 1000);
        if (plansRef.current) {
          plansRef.current.clearInfos();
        }
      });
    })
      .catch((err: string) => {
        message.error(err);
      });



    // api.education
    //   .editRules(editPlan.ruleDoc)
    //   .then(() => {
    //     message.success('修改成功');
    //     setActiveKey('0');
    //     setTimeout(() => {
    //       getRules('0');
    //     }, 1000);
    //     if (plansRef.current) {
    //       plansRef.current.clearInfos();
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('err', err);
    //     message.error(err?.result ?? '修改失败');
    //   });
  };

  const onEditClick = (index: number) => {

    sendContent[index].status = 'open';
    setSendContent([...sendContent]);
  };

  const onEditCancel = (index: number) => {
    sendContent[index].status = 'close';
    setSendContent([...sendContent]);
  };

  const changeIsEdit = () => {
    setIsEdit(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
  };

  const changeFormName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScaleName(e.target.value);
  };

  const handleChangeName = () => {
    if (!scaleName) {
      message.error('客观检查名称不能为空');
    } else {
      setIsEdit(false);
      api.education.patchGroupName({
        title: scaleName,
        groupId: groupId,
      }).then(() => {
        message.success('修改成功');
        history.push(`/publicize/${type}/?name=${scaleName}`);
      });
    }
  };

  return (
    <div className={styles.patient_edu}>

      {isEdit ? (
        <p className={styles.title}>
          <Input
            placeholder={`请输入${sfTypeUrl?.[type].text}类型，例：高血压病人${sfTypeUrl?.[type].text}`}
            onChange={changeFormName}
            defaultValue={scaleName}
            style={{ width: 320 }}
            onBlur={handleChangeName}
            ref={inputRef}
          />
        </p>
      ) : (
        <p className={styles.title}>
          {scaleName}
          <FormOutlined onClick={changeIsEdit} />
        </p>
      )}

      <CreateBox onClick={addInfo} />

      <Tabs defaultActiveKey="0" onChange={tabChange} activeKey={activeKey}>
        <TabPane tab="发送中" key="0">
          {
            <PlanContent type={type} onSavePlan={onSavePlan} onPlanChanged={onPlanChanged} ref={plansRef}>
            </PlanContent>
          }
          {sendContent.map((sen, index) => {
            if (sen.status == 'close') {
              return (<PlanItem data={sen} status="sending" stopSendSuccess={() => onStopSendSuccess(0)} onEditClick={() => onEditClick(index)} />);
            } else {
              // 编辑
              return (
                <TemplateRule
                  pageType={type}
                  loading={loading}
                  onCancelClick={() => { onEditCancel(index); }}
                  originRuleDoc={sen.rule}
                  chooseValues={sen.chooseValues}
                  onSaveClick={(data: { ruleDoc: any, chooseValues: any }) => {
                    onEditPlan(data, sen);
                  }}>
                </TemplateRule>
              );
            }
          })}
        </TabPane>
        <TabPane tab="已停止" key="1">
          {sendContent.map((sen) => <PlanItem data={sen} status="stop" stopSendSuccess={() => onStopSendSuccess(1)} />)}
        </TabPane>
      </Tabs>

    </div>
  );
};

export default EducationDetail;
