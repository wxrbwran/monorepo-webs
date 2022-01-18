import React, { useState, useEffect } from 'react';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import iconTime from '@/assets/img/follow-table/icon_time.svg';
import iconCondition from '@/assets/img/follow-table/icon_condition.svg';
import iconFrequency from '@/assets/img/follow-table/icon_frequency.svg';
import iconGroup from '@/assets/img/follow-table/icon_group.svg';
import iconReply from '@/assets/img/icon_reply.png';
import iconRecord from '@/assets/img/icon_record.png';
import Edit from '@/assets/edit.svg';
import Delete from '@/assets/delete.svg';
import { useSelector } from 'react-redux';
import PlanModal from '@/components/PlanModal';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import Reply from '../ObjectiveReply';
import { message } from 'antd';
import * as api from '@/services/api';
import SendRecord from '../ObjectiveSendRecord';
import styles from './index.scss';
import { getConditionDescriptionFromConditionss, getFrequencyDescriptionFromFrequency, getStartTimeDescriptionFromConditionss, IChooseValues, IRuleDoc } from '@/pages/subjective_table/util';
import { cloneDeep } from 'lodash';
import RichText from '@/components/RichText';

interface IProps {
  infoItem: {
    ruleDoc: IRuleDoc,
    chooseValues: IChooseValues,
  };
  itemIndex: number;
  location: {
    query: {
      id: string;
    };
    pathname: string;
  };
  changeEditStatus: () => void;
  handleDel?: () => void;
  scaleType: 'OBJECTIVE' | 'VISIT_OBJECTIVE';
}

function HistoryPlan({ infoItem, itemIndex, location, changeEditStatus, handleDel, scaleType }: IProps) {
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const projectSid = window.$storage.getItem('projectSid');
  const [showModal, setShowModal] = useState<boolean>(false);
  const { status } = useSelector((state: IState) => state.project.projDetail);


  const [ruleDoc, setRuleDoc] = useState<IRuleDoc>({});
  const [chooseValues, setChooseValues] = useState<IChooseValues>({ firstTime: {}, choseConditions: [], choseScope: [], frequency: { custom: [] } });
  const [conditionDescription, setConditionDescription] = useState();
  const [firstTimeStr, setFirstTimeStr] = useState();
  const [frequencyStr, setFrequencyStr] = useState();

  useEffect(() => {

    if (infoItem) {

      console.log('================ infoItem', JSON.stringify(infoItem));
      setRuleDoc(infoItem.ruleDoc);

      setChooseValues(cloneDeep(infoItem.chooseValues));
      const conditionDes = getConditionDescriptionFromConditionss(infoItem.chooseValues?.choseConditions);
      setConditionDescription(conditionDes);

      console.log('=================== HistoryPlan', JSON.stringify(infoItem));

      const firstTime = getStartTimeDescriptionFromConditionss(infoItem?.chooseValues?.firstTime);
      setFirstTimeStr(firstTime);

      const frequency = getFrequencyDescriptionFromFrequency(infoItem?.chooseValues?.frequency);
      setFrequencyStr(frequency);
    }
  }, [infoItem]);


  const updatePlan = (params: { plans: [], questions: string }) => {

    console.log('===================== updatePlan ====== ', JSON.stringify(params));
    api.subjective
      .updateScalePlan({
        ruleDoc: params.ruleDoc,
        scaleId: infoItem.scaleId,
        projectNsId,
        projectSid,
        questions: params.questions,
      })
      .then(() => {
        message.success('修改成功');
        changeEditStatus();
      })
      .catch((err: string) => {
        message.error(err);
      });
  };
  const onDelPlan = () => {
    setShowModal(!showModal);
    if (handleDel) {
      handleDel();
    }
  };
  const des = chooseValues ? chooseValues.choseScope.map(item => item.description).join(',') : '';

  console.log('================ chooseValues ', JSON.stringify(chooseValues));
  return (
    <div className={styles.history_plan}>
      <div className={styles.plan_item}>
        <h2>
          <div className={styles.remind}>
            <span>{itemIndex + 1}、</span>
            <RichText value={infoItem.questions} style={{ height: '60px' }} handleChange={(content: any, text: string) => { }} readonly={true} />
          </div>
          <p className={styles.operate}>
            {location.pathname.includes('create') && (
              <>
                <img src={Delete} alt="" onClick={handleDel} />
                <span className={styles.split}></span>
              </>
            )}
            {location.pathname.includes('detail') ? (
              <>
                {
                  (status === 1001 || scaleType == 'VISIT_OBJECTIVE') && (
                    <>
                      <Reply scaleId={infoItem.scaleId} scaleType={scaleType}>
                        <div className={styles.detail}>
                          <img className={styles.icon_reply} src={iconReply} />
                          <span>回复详情</span>
                        </div>
                      </Reply>
                      <Divider type="vertical" />
                      <SendRecord scaleId={infoItem.scaleId} ruleId={infoItem.ruleDoc.id} scaleType={scaleType}>
                        <div className={styles.detail}>
                          <img className={styles.icon_reply} src={iconRecord} />
                          <span>发送记录</span>
                        </div>
                      </SendRecord>
                      <Divider type="vertical" />
                    </>
                  )
                }
                <PlanModal title="修改发送计划"
                  scaleId={infoItem.scaleId}
                  ruleDoc={ruleDoc}
                  chooseValues={chooseValues}
                  updatePlan={updatePlan}
                  infoIndex={itemIndex}
                  scaleType={scaleType}
                  question={infoItem.questions}
                >
                  {window.$storage.getItem('isLeader') &&
                    (status !== 1001 || scaleType == 'VISIT_OBJECTIVE') ? (
                    <p className={styles.detail}>
                      <FormOutlined />
                      <span className="ml-5">编辑</span>
                    </p>
                    ) : (
                    <></>
                    )}
                </PlanModal>
                {
                  (status !== 1001 || scaleType == 'VISIT_OBJECTIVE') && window.$storage.getItem('isLeader') && (
                    <>
                      <Divider type="vertical" />
                      <p className={`${styles.detail} inline-block text-base cursor-pointer`} onClick={() => setShowModal(!showModal)}>
                        <DeleteOutlined /> 删除
                      </p>
                    </>
                  )
                }

              </>
            ) : (
              <img src={Edit} alt="" onClick={changeEditStatus} />
            )}
          </p>
        </h2>
        <div className={styles.plan__cont}>
          <div className={styles.item}>
            <div className={styles.tit}>
              <img src={iconTime} alt="" />
              <span>首次发送时间</span>
            </div>
            <div className={styles.text}>{firstTimeStr}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.tit}>
              <img src={iconFrequency} alt="" />
              <span>发送频率</span>
            </div>
            {chooseValues?.frequency && <div className={styles.text}>{frequencyStr}</div>}
          </div>
          <div className={styles.space}></div>
          {(conditionDescription &&
            <div className={styles.item}>
              <div className={styles.tit}>
                <img src={iconCondition} alt="" />
                <span>发送条件</span>
              </div>
              <div className={styles.text}>
                {conditionDescription.age && <p>{conditionDescription.age}</p>}
                {conditionDescription.sex && <p>{conditionDescription.sex}</p>}
                {conditionDescription.disease && <p>{conditionDescription.disease}</p>}
                {conditionDescription.treatment && <p>{conditionDescription.treatment}</p>}
              </div>
            </div>
          )}
          <div className={styles.item}>
            <div className={styles.tit}>
              <img src={iconGroup} alt="" />
              <span>发送试验组</span>
            </div>
            <div className={styles.text}>{des}</div>
          </div>
        </div>
      </div>
      {
        showModal && (
          <DragModal
            width={480}
            visible={showModal}
            onCancel={() => setShowModal(!showModal)}
            title=""
            // footer={null}
            onOk={onDelPlan}
          >
            <p className="text-base">确认后提醒消失（不可找回，实在紧急需要后台找回）</p>
          </DragModal>
        )
      }
    </div>
  );
}

export default HistoryPlan;
