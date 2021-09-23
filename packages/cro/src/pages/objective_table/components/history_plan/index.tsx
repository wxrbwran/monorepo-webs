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
import DragModal from 'xzl-web-shared/src/components/DragModal';
import Reply from '../reply';
import { typeList, IGroup, sexList, IVal, IPlanInfos } from '@/utils/consts';
import { getPlanDetail } from '@/utils/tools';
import { message } from 'antd';
import * as api from '@/services/api';
import { IState } from 'typings/global';
import SendRecord from '../send_record';
import styles from './index.scss';

interface IProps {
  infoItem: IPlanInfos;
  itemIndex: number;
  location: {
    query: {
      id: string;
    };
    pathname: string;
  };
  changeEditStatus: () => void;
  handleDel?: () => void;
}

function HistoryPlan({ infoItem, itemIndex, location, changeEditStatus, handleDel }: IProps) {
  const [reverteData, setReverData] = useState<IVal>({});
  const groupList = useSelector((state: IGroup) => state.project.objectiveGroup);
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const projectSid = window.$storage.getItem('projectSid');
  const [showModal, setShowModal] = useState<boolean>(false);
  const { status } = useSelector((state: IState) =>  state.project.projDetail);

  useEffect(() => {
    //数据格式处理
    if (infoItem.plans && infoItem.plans.length > 0) {
      setReverData({ ...getPlanDetail(infoItem.plans, groupList), remind: infoItem.questions });
    }
  }, [groupList, infoItem]);

  const updatePlan = (params: { plans: [], questions: string }) => {
    api.subjective
      .updateScalePlan({
        plan: params.plans,
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
    if (handleDel){
      handleDel();
    }
  };
  const { minAge, maxAge, sex, diagnosis, treatment, custom, frequency, start } = reverteData;
  return (
    <div className={styles.history_plan}>
      <div className={styles.plan_item}>
        <h2>
          <div className={styles.remind}>
            <span>{itemIndex + 1}、</span>
            <pre>{infoItem.questions}</pre>
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
                  status === 1001 && (
                    <>
                      <Reply scaleId={infoItem.scaleId}>
                        <div className={styles.detail}>
                          <img className={styles.icon_reply} src={iconReply} />
                          <span>回复详情</span>
                        </div>
                      </Reply>
                      <Divider type="vertical" />
                      <SendRecord scaleGroupId={infoItem.scaleId}>
                        <div className={styles.detail}>
                          <img className={styles.icon_reply} src={iconRecord} />
                          <span>发送记录</span>
                        </div>
                      </SendRecord>
                      <Divider type="vertical" />
                    </>
                  )
                }
                <PlanModal
                  title="修改发送计划"
                  location={location}
                  infoIndex={itemIndex}
                  scaleId={infoItem.scaleId}
                  plans={infoItem.plans}
                  question={infoItem.questions}
                  updatePlan={updatePlan}
                >
                  {window.$storage.getItem('isLeader') &&
                  status !== 1001 ? (
                    <p className={styles.detail}>
                      <FormOutlined/>
                      <span className="ml-5">编辑</span>
                    </p>
                    ) : (
                    <></>
                    )}
                </PlanModal>
                {
                  status !== 1001 && window.$storage.getItem('isLeader') && (
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
              <span>起始发送时间</span>
            </div>
            <div className={styles.text}>{typeList[start]}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.tit}>
              <img src={iconFrequency} alt="" />
              <span>发送频率</span>
            </div>
            {custom && (
              <div className={styles.text}>
                {frequency === 'CUSTOM' ? '第' : '每'}
                {custom.join()}天发送一次
              </div>
            )}
          </div>
          <div className={styles.space}></div>
          {(minAge || sex || diagnosis || treatment || sex === 0) && (
            <div className={styles.item}>
              <div className={styles.tit}>
                <img src={iconCondition} alt="" />
                <span>发送条件</span>
              </div>
              <div className={styles.text}>
                {minAge && maxAge && (
                  <p>
                    年龄：{minAge}-{maxAge}
                  </p>
                )}
                {(sex || sex === 0) && <p>性别：{sexList[sex]}</p>}
                {diagnosis && <p>诊断：{diagnosis}</p>}
                {treatment && <p>处理：{treatment}</p>}
              </div>
            </div>
          )}
          <div className={styles.item}>
            <div className={styles.tit}>
              <img src={iconGroup} alt="" />
              <span>发送试验组</span>
            </div>
            <div className={styles.text}>{reverteData.projectGroups}</div>
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
