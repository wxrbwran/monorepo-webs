import React, { useState, useEffect } from 'react';
import { Button, message, Modal } from 'antd';
import * as api from '@/services/api';
import { useDispatch, useSelector } from 'react-redux';
import { sexList } from '@/utils/consts';
import draft from '@/assets/img/draft.png';
import DragModal from '@/components/DragModal';
import Condition from '@/components/Condition';
import styles from './index.scss';
import { IConItem, findIndex } from '@/utils/tools';
import { info } from 'console';
import { IState } from 'typings/global';
import { Role } from '@/utils/role';

interface IProps{
  projectSid: string;
}
interface IKey {
  age?: {
    lowerAge: number;
    upperAge: number;
  };
  diagnoseName?: string[];
  gender?: number;
  medicineName?: string[];
  type?: string;
  customize?: string[];
}

enum STANDARD {
  JOIN_CONDITION = '纳入标准',
  EXCLUDE_CONDITION = '排除标准'
}

interface IItem {
  age?: {
    lowerAge: number;
    upperAge: number;
  };
  diagnoseName?: string[];
  gender: string;
  medicineName?: string[];
  type: keyof typeof STANDARD;
  customize?: string[];
}

function GroupStatic({projectSid }:IProps) {
  const dispatch = useDispatch();
  const { projDetail } = useSelector((state: IState) => state.project);
  const [isShowModal, setIsShowModal] = useState(false);
  const [infos, setInfos] = useState([]);
  const [joinPlans, setJoinPlans] = useState<IConItem[]>([]);//原始plans
  const [excludePlans, setExcludePlans] = useState([]);//原始plans
  const [isDraft, setIsDraft] = useState(true);
  const [isShowEdit, setIsShowEdit] = useState(false);

  const toogleSubmit = () => {
    setIsShowModal(true);
  }

  //子组件表单元素值更改，回传回来的值（纳入标准）
  const joinCondition = (plans:[]) => {
    setJoinPlans(plans);
  }

  //子组件表单元素值更改，回传回来的值（排除标准）
  const execludeCondition = (plans:[]) => {
    setExcludePlans(plans);
  }

  const updateCroProject = (newJoinVal:object,newExcludeVal:object,status: number)=> {
    api.detail.updateCroProject({
      // ...projDetail,
      projectSid: projDetail.projectSid,
      detail: {
        ...projDetail.detail,
        joinStandard: {...newJoinVal},
        excludeStandard: {...newExcludeVal},
        standardStatus: status
      },
    }).then((res) => {
      message.success('添加成功');
      getStandard();
    })
    .catch((err) => {
      message.error(err);
    });
  }

  //提交纳入标准排除标准数据
  const handleSave = (status: number) => {
    // setIsShowEdit(false);
    // setIsShowModal(false)
    const newJoinVal = formatPlans(joinPlans, 'JOIN_CONDITION');
    const newExcludeVal = formatPlans(excludePlans, 'EXCLUDE_CONDITION');
    if(Object.keys(newJoinVal).length===0 && Object.keys(newExcludeVal).length===0){
      message.error('纳入标准排除标准不能同时为空')
      return;
    }
    //纳入标准排除标准年龄限制
    if(newJoinVal.age){
      const joinLowerAge = newJoinVal.age.lowerAge;
      const joinUpperAge = newJoinVal.age.upperAge;
      if(!joinLowerAge || !joinUpperAge){
        message.error('请完善年龄信息')
        return;
      }else if(joinLowerAge >= joinUpperAge){
        message.error('请输入正确的年龄范围')
        return;
      }
    }
    if(newExcludeVal.age){
      const excludeLowerAge = newExcludeVal.age.lowerAge;
      const excludeUpperAge = newExcludeVal.age.upperAge;
      if(!excludeLowerAge || !excludeUpperAge){
        message.error('请完善年龄信息')
        return;
      }else if(excludeLowerAge >= excludeUpperAge){
        message.error('请输入正确的年龄范围')
        return;
      }
    }
    updateCroProject(newJoinVal,newExcludeVal,status)
  }

  //查看加入、排除标准
  const getStandard = () => {
    if(projectSid){
      dispatch({
        type: 'project/fetchProjectDetail',
        payload: projectSid,
      });
    }
  }

  useEffect(()=> {
    if(projDetail.detail){
      const { joinStandard, excludeStandard, standardStatus } = projDetail.detail;
      const infos = [joinStandard, excludeStandard, ].filter(item => !!item)
      setInfos([...infos]);
      if(infos.length !== 0){
        setIsDraft([undefined, 1].includes(standardStatus) ? false : true);
        setIsShowEdit([undefined, 1].includes(standardStatus) ? false : true);
      }
    }
    return () => {
      setInfos([]);
      setIsDraft(true);
      setIsShowEdit(false);
    }
  },[projDetail])

  //格式化处理回传回来的值
  const formatPlans = (plans:IPlan[], type: string) => {
    let val:IKey = {}
    let diagnoseName:string[] = [];
    let medicineName:string[] = [];
    let customize:string[] = [];
    plans.forEach((item, index) => {
      const { minAge, maxAge, sex, diagnosis, medicines, other, send } = item.detail;
      switch (send) {
        case 'AGE':
          val.age = {
            lowerAge: minAge | 0,
            upperAge: maxAge | 0
          }
          break;
        case "BASE":
          val.gender = sex
          break;
        case "DIAGNOSIS":
          diagnoseName = [...diagnoseName,diagnosis ]
          if(diagnosis) {val.diagnoseName = diagnoseName}
          break;
        case "MEDICINE":
          medicineName = [...medicineName,medicines ]
          if(medicines) { val.medicineName = medicineName}
          break;
        case "OTHER":
          customize = [...customize,other ]
          if(other) { val.customize = customize}
          break;
      }
    });
    //val如果是{}则不定义type属性
    if(Object.keys(val).length>0) val.type = type
    return val
  }

  const handleDraft = () => {
    Modal.confirm({
      icon: '',
      maskClosable: true,
      content: (
        <div>
          <p>1. 请尽快完成最终版</p>
          <p>2. 草稿不触发逻辑</p>
          <p>3. 草稿内容可以修改</p>
        </div>
      ),
      onOk: () => handleSave(0),
      onCancel: ()=> setIsDraft(true),
      className: isDraft ? styles.draft : ''
    });
  }

  const handleSubmit = () => {
    // setIsDraft(false);
    Modal.confirm({
      icon: '',
      maskClosable: true,
      content: (
        <>保存为最终版后不可修改，请谨慎决定！</>
      ),
      onOk: () => handleSave(1),
      onCancel: ()=> setIsDraft(true),
      className: isDraft ? styles.draft : ''
    });
  }
  const isLeader = [Role.MAIN_PI.id, Role.PROJECT_LEADER.id].includes(projDetail.roleType);
  const isEdit = isLeader && projDetail.status !== 1001;
  return (
    <div className={styles.right_bottom}>
      {isDraft && isShowEdit && infos.length > 0  && (<img src={draft} className={styles.draft_img}/>)}
      {
        isEdit && isDraft && (
          <div className={styles.submit}>
            {
              (!isShowEdit || infos.length === 0) ?
                <>
                  <Button disabled={!isLeader} onClick={handleDraft}>保存草稿</Button>
                  <Button disabled={!isLeader} onClick={handleSubmit}>保存</Button>
                </>
              :
              <div className={styles.detail}>
                <Button type="primary" ghost onClick={()=> setIsShowEdit(false)}>编辑</Button>
              </div>
            }
          </div>
        )
      }
      {/* 两种情况显示：显示编辑按钮的时候；不是草稿的时候 */}
      {
        (isShowEdit || !isDraft) ? (
          infos.map((item:IItem, index)=>(
            <div key={index}>
              <div className={styles.head}>{STANDARD[item.type]}</div>
              <ul className={styles.main}>
                {
                  item.age && (
                    <li>{findIndex(item, 'age')}. <b>年龄:</b>
                      <p className={styles.value}>
                        <span>{item.age.lowerAge}</span>-<span>{item.age.upperAge}</span>
                      </p>
                    </li>
                  )
                }
                {
                  [0,1].includes(+item.gender) && (
                    <li>{findIndex(item, 'gender')}. <b>性别:</b> <p className={styles.value}>{sexList[+item.gender]}</p></li>
                  )
                }
                {
                  item.medicineName && (
                    <li>{findIndex(item, 'medicineName')}. <b>用药:</b> <p className={styles.value}>{item.medicineName.join()}</p></li>
                  )
                }
                {
                  item.diagnoseName && (
                    <li>{findIndex(item, 'diagnoseName')}. <b>诊断:</b> <p className={styles.value}>{item.diagnoseName.join()}</p></li>
                  )
                }
                {
                  item.customize && (
                    <li>
                      {
                        item.customize.map((custo:string, idx)=>(
                        <p className={styles.customize}>{findIndex(item, 'customize')+idx}. {custo}</p>
                        ))
                      }
                    </li>
                  )
                }
              </ul>
            </div>
          ))
        ):
        <>
          <Condition
            type="纳入标准"
            updateSubmitPlan={joinCondition}
            infoItem={projDetail.detail?.joinStandard}
          />
          <Condition
            type="排除标准"
            updateSubmitPlan={execludeCondition}
            infoItem={projDetail.detail?.excludeStandard}
          />
        </>
      }

      { isShowModal && (
        <DragModal
          visible={isShowModal}
          title={null}
          width={336}
          wrapClassName="ant-modal-wrap-center static_modal"
          onCancel={()=> setIsShowModal(false)}
          className={styles.static_modal}
          closable={false}
          onOk={handleSubmit}
          okText= '确认'
          cancelText='取消'
        >
          提交之后不可修改，您确定提交吗？
        </DragModal>
      ) }
    </div>
  )
}

export default GroupStatic;
