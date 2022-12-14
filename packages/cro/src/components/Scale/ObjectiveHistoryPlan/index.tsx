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

function HistoryPlan(props: IProps) {
  const { infoItem, itemIndex, location, changeEditStatus, handleDel, scaleType } = props;
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

      setRuleDoc(infoItem.ruleDoc);

      setChooseValues(cloneDeep(infoItem.chooseValues));
      const conditionDes = getConditionDescriptionFromConditionss(infoItem.chooseValues?.choseConditions);
      setConditionDescription(conditionDes);

      const firstTime = getStartTimeDescriptionFromConditionss(infoItem?.chooseValues?.firstTime);
      setFirstTimeStr(firstTime);

      const frequency = getFrequencyDescriptionFromFrequency(infoItem?.chooseValues?.frequency);
      setFrequencyStr(frequency);
    }
  }, [infoItem]);


  const updatePlan = (params: { plans: [], questions: string }) => {
    console.log('--3-3-', props);
    console.log('===================== updatePlan ====== ', params);
    api.subjective
      .updateScalePlan({
        ruleDoc: params.ruleDoc,
        scaleId: infoItem.scaleId,
        projectNsId,
        projectSid,
        questions: params.questions,
      })
      .then(() => {
        message.success('????????????');
        changeEditStatus();
        window.$log.handleOperationLog({
          type: 1,
          businessType: window.$log.businessType.UPDATE_OBJECTIVE_CONTENT.code,
          copyWriting: '???????????????????????????????????????',
          oldParams: {
            content: infoItem,
          },
          newParams: {
            content: params,
          },
        });
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

  return (
    <div className={styles.history_plan}>
      {
        chooseValues ?
          <div className={styles.plan_item}>
            <h2>
              <div className={styles.remind}>
                <span>{itemIndex + 1}???</span>
                <RichText value={infoItem.questions} style={{ height: 'max-content' }} handleChange={(content: any, text: string) => { }} readonly={true} />
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
                              <span>????????????</span>
                            </div>
                          </Reply>
                          <Divider type="vertical" />
                          <SendRecord scaleId={infoItem.scaleId} ruleId={infoItem.ruleDoc?.meta?.docId} scaleType={scaleType}>
                            <div className={styles.detail}>
                              <img className={styles.icon_reply} src={iconRecord} />
                              <span>????????????</span>
                            </div>
                          </SendRecord>
                          <Divider type="vertical" />
                        </>
                      )
                    }
                    <PlanModal title="??????????????????"
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
                          <span className="ml-5">??????</span>
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
                            <DeleteOutlined /> ??????
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
                  <span>??????????????????</span>
                </div>
                <div className={styles.text}>
                  {firstTimeStr}
                  {ruleDoc?.rules?.[0]?.actions?.[0].type === 'block' && <span>(?????????)</span>}
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.tit}>
                  <img src={iconFrequency} alt="" />
                  <span>????????????</span>
                </div>
                {chooseValues?.frequency && <div className={styles.text}>{frequencyStr}</div>}
              </div>
              <div className={styles.space}></div>
              {(conditionDescription &&
                <div className={styles.item}>
                  <div className={styles.tit}>
                    <img src={iconCondition} alt="" />
                    <span>????????????</span>
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
                  <span>???????????????</span>
                </div>
                <div className={styles.text}>{des}</div>
              </div>
            </div>
          </div> :
          <></>
      }

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
            <p className="text-base">????????????????????????????????????????????????????????????????????????</p>
          </DragModal>
        )
      }
    </div>
  );
}

export default HistoryPlan;
