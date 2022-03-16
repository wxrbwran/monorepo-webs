import React, { useState, useEffect } from 'react';
import projectDefault from '@/assets/img/default_project.png';
import count from '@/assets/count.png';
import time from '@/assets/time.png';
import * as api from '@/services/api';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Input, Tooltip, message, InputNumber } from 'antd';
import { Role } from 'xzl-web-shared/dist/utils/role';
import styles from './index.scss';
import { CommonData, IState } from 'typings/global';
import { projectLabel } from '@/utils/consts';
import { projectStatus } from '@/utils/consts';
import { handleOperationLog, typeText, businessType } from '@/utils/logReason';

const { TextArea } = Input;
interface IProps {
  projectSid: string;
}

function BaseInfo({ projectSid }: IProps) {

  const dispatch = useDispatch();
  const projDetail = useSelector((state: IState) => state.project.projDetail);
  const [state, setState] = useState();
  const [intro, setIntro] = useState('');
  const [minDay, setMinDay] = useState();

  useEffect(() => {
    if (projectSid) {
      dispatch({
        type: 'project/fetchProjectDetail',
        payload: projectSid,
      });
    }
  }, [projectSid]);

  useEffect(() => {
    setState(projDetail.status);
    setIntro(projDetail.detail?.intro);
    setMinDay(projDetail.detail?.minDays);
  }, [projDetail]);


  const changeIntro = (e: { target: { value: string } }) => {
    setIntro(e.target.value);
  };
  const handleIntroWriteLog = () => {
    const oldData = projDetail.detail?.intro;
    // 老数据为空，为创建，否则为编辑 0:新增 1 修改
    let type = !!oldData ? 1 : 0;
    handleOperationLog({
      type,
      copyWriting: `${typeText[type]}项目介绍`,
      ...type === 0 ? {} : {
        newParams: { content: intro },
        oldParams: { content: oldData },
        businessType: businessType.UPDATE_PROJECT_INTRODUCE.code,
      },
    });
  };
  const handleIntro = () => {
    const prevIntro = projDetail.detail?.intro;
    if (prevIntro !== intro) {
      const params = {
        projectSid,
        detail: { intro },
      };
      api.detail.updateCroProject(params).then((_res) => {
        message.success('更改信息成功');
        handleIntroWriteLog();
        dispatch({
          type: 'project/fetchProjectDetail',
          payload: projectSid,
        });
      }).catch((err) => {
        message.error(err);
      });
    }
  };
  const handleMinDayWriteLog = (newData: number) => {
    const oldData = projDetail.detail?.minDays;
    // 老数据为空，为创建，否则为编辑 0:新增 1 修改
    let type = !!oldData ? 1 : 0;
    handleOperationLog({
      type,
      copyWriting: `${typeText[type]}最小试验天数`,
      ...type === 0 ? {} : {
        newParams: { content: newData },
        oldParams: { content: oldData },
        businessType: businessType.UPDATE_MIN_DAY.code,
      },
    });
  };
  const handleMinDay = (e) => {
    const newDay = Number(e.target.value);
    if (projDetail.detail?.minDays !== newDay) {
      const params = {
        projectSid,
        detail: {  minDays: newDay },
      };
      api.detail.updateCroProject(params).then((_res) => {
        message.success('更改信息成功');
        handleMinDayWriteLog(newDay);
        dispatch({
          type: 'project/fetchProjectDetail',
          payload: projectSid,
        });
      }).catch((err) => {
        message.error(err);
      });
    }
  };
  const { name, detail, createdAt, patientCount, avgDay, label, practiceArea } = projDetail;
  console.log('======11', projDetail);
  return (
    <>
      <div className={styles.left_top}>
        <div className={styles.info}>
          <div>
            <img src={detail?.avatarUrl || projectDefault} alt="" />
          </div>
          <div className={styles.info_right}>
            <p className={styles.head}>{name}</p>
            <div className={styles.date}>
              {/* 1002进行  1003结束 */}
              <span className={`${styles.status} ${styles[+state === 1003 ? 'STOP' : 'RUN']}`}>
                {projectStatus[state]}
              </span>
              <p>创建日期：{!!createdAt ? moment(createdAt).format('YYYY年MM月DD日') : '--'}</p>
            </div>
          </div>
        </div>
        <div className={styles.introduce}>
          <p className={styles.title}><span>·</span> 项目介绍 <span>·</span></p>
          <Tooltip placement="top" title='点击可进行编辑'>
            <TextArea
              data-testid="textarea"
              onChange={changeIntro}
              className={styles.content}
              value={intro}
              onBlur={handleIntro}
              disabled={![Role.MAIN_PI.id, Role.PROJECT_LEADER.id].includes(projDetail.roleType) || projDetail.status === 1001}
            />
          </Tooltip>
        </div>
        <div className={`${styles.introduce} flex`}>
          <div className={styles.left}>
            <p className={styles.title}><span>·</span> 项目周期 <span>·</span></p>
            <p className={styles.content}><span>{detail?.duration}天</span></p>
          </div>
          <div className={styles.right}>
            <p className={styles.title}><span>·</span> 最小试验天数 <span>·</span></p>
            {
              <span>
                <InputNumber
                  min={0}
                  className={minDay ? styles.border_none : ''}
                  onBlur={handleMinDay}
                  onChange={(val) => setMinDay(val)}
                  value={minDay}
                  disabled={![Role.MAIN_PI.id, Role.PROJECT_LEADER.id].includes(projDetail.roleType) || projDetail.status === 1001}
                />
                <span className="ml-5">天</span>
              </span>
            }

          </div>
        </div>
        <div className={`${styles.introduce} flex`}>
          <div className={styles.left}>
            <p className={styles.title}><span>·</span> 项目类型 <span>·</span></p>
            <p className={styles.content}>{projectLabel[label]}</p>
          </div>
          {
            practiceArea &&
            <div className={styles.right}>
              <p className={styles.title}><span>·</span> 所属机构 <span>·</span></p>
              <p className={styles.content}>{practiceArea}</p>
            </div>
          }
        </div>
      </div>
      <div className={styles.left_bottom}>
        <div className={styles.box}>
          <div><img src={count} alt="" /></div>
          <div>
            <p className={styles.num}><span>{patientCount}</span>人</p>
            <p className={styles.text}>项目人数</p>
          </div>
        </div>
        <div className={styles.box}>
          <div><img src={time} alt="" /></div>
          <div>
            <p className={styles.num}><span>{avgDay}</span>天</p>
            <p className={styles.text}>平均入组时间</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BaseInfo;
