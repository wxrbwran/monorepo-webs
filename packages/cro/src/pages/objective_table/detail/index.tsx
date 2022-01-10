import React, { useState, useEffect, useRef } from 'react';
import HistoryPlan from '../components/history_plan';
import { useSelector, useDispatch } from 'react-redux';
import { IPlanInfos } from '@/utils/consts';
import { FormOutlined } from '@ant-design/icons';
import create from '@/assets/img/create.svg';
import { Input, message } from 'antd';
import { history } from 'umi';
import * as api from '@/services/api';
import styles from '../index.scss';
import ScaleTemplate from '@/components/ScaleTemplate';
import { IRuleDoc, IChooseValues } from '../../subjective_table/util';

interface IProps {
  location: {
    query: {
      id: string;
    };
    pathname: string;
  };
}
interface IState {
  project: {
    objectiveScaleList: IPlanInfos[];
    formName: string;
  };
}
function Detail({ location }: IProps) {
  let initInfos: IPlanInfos = {
    questions: '',
    scaleId: '',
  };
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [groupId, setGroupId] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const objectiveScaleList = useSelector((state: IState) => state.project.objectiveScaleList);
  const formName = useSelector((state: IState) => state.project.formName);
  const [infos, setInfos] = useState<IPlanInfos[]>([]);
  const [editStatus, setEditStatus] = useState<string[]>([]);//open开，为编辑状态
  const [scaleName, setScaleName] = useState('');
  const doctorSid = localStorage.getItem('xzl-web-doctor_sid');
  const projectSid = window.$storage.getItem('projectSid');
  const projectName = window.$storage.getItem('projectName');
  const { projectNsId, status } = useSelector((state: IState) => state.project.projDetail);

  useEffect(() => {
    const id = location.query.id;
    if (groupId !== id) {
      setGroupId(id);
      setIsEdit(false);
      // 解决只要有编辑着没保存着的时候，location一切换到另一个表就有问题，所以置空；
      setEditStatus([]);
      if (!!id) {
        dispatch({
          type: 'project/fetchObjectiveScale',
          payload: id,
        });
      }
    }
  }, [location]);

  useEffect(() => {

    console.log('================ objectiveScaleList,', JSON.stringify(objectiveScaleList));
    setInfos([...objectiveScaleList]);
    setScaleName(formName);
    //默认第一次加载时执行
    // if (editStatus.length === 0) {
    const statusList: string[] = [];
    objectiveScaleList.forEach(() => {
      statusList.push('lock');
    });
    setEditStatus([...statusList]);

    console.log('================ editStatus,', JSON.stringify(statusList));
    // }
  }, [objectiveScaleList]);

  const changeFormName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScaleName(e.target.value);
  };
  const handleChangeName = () => {
    if (!scaleName) {
      message.error('客观检查名称不能为空');
    } else {
      setIsEdit(false);
      api.subjective.patchSubjectiveScale({
        name: scaleName,
        projectSid: window.$storage.getItem('projectSid'),
        scaleGroupId: location.query.id,
      }).then(() => {
        message.success('修改成功');
        dispatch({
          type: 'project/fetchObjectiveScale',
          payload: location.query.id,
        });
        history.push(`${location.pathname}?name=${scaleName}`);
      });
    }
  };
  const changeIsEdit = () => {
    setIsEdit(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
  };

  //添加条件生成一条空计划
  const addInfo = () => {
    setInfos([initInfos, ...infos]);
    setEditStatus(['open', ...editStatus]);
  };
  // 删除计划
  const delPlan = (index: number) => {
    const newInfos = infos.filter((_item, vIndex) => vIndex !== index);
    const newStatus = editStatus.filter((_item, sIndex) => sIndex !== index);
    setInfos([...newInfos]);
    setEditStatus([...newStatus]);
  };
  // 提醒计划的取消按钮执行操作
  const handleCancel = (index: number) => {
    delPlan(index);
  };
  //提醒计划的确定按钮回传回来的数据
  const addPlan = (params: { ruleDoc: IRuleDoc, question: string, scaleId: string, chooseValues: IChooseValues }, index: number) => {

    const paraAdd = {
      doctorSid,
      infos: [{
        questions: params.questions,
        ruleDoc: params.ruleDoc,
      }],
      name: formName,
      projectSid,
      projectName,
      projectNsId,
      type: 'OBJECTIVE',
      scaleGroupId: location.query.id,
    };
    console.log('====================== rule', JSON.stringify(params.questions));
    api.subjective.addObjectiveScale(paraAdd)
      .then(() => {
        message.success('添加成功');

        infos[index] = params;
        setInfos([...infos]);
        console.log('================ 添加成功 editStatus,', JSON.stringify(editStatus));
        dispatch({
          type: 'project/fetchObjectiveScale',
          payload: location.query.id,
        });
      });
  };

  const handleDelPlan = (item: { scaleId: string; ruleDoc: { id: string } }) => {
    api.subjective.delScale({
      scaleId: item.scaleId,
      scaleGroupId: groupId,
      projectSid: window.$storage.getItem('projectSid'),
      scaleType: 'OBJECTIVE',
      ruleId: item?.ruleDoc?.id,
    }).then(() => {
      message.success('删除成功');
      dispatch({
        type: 'project/fetchObjectiveScale',
        payload: location.query.id,
      });
    });
  };

  const changeEditStatus = () => {
    setEditStatus([]);
    dispatch({
      type: 'project/fetchObjectiveScale',
      payload: location.query.id,
    });
  };

  return (
    <>
      <div className={styles.table_name}>
        {isEdit ? (
          <p className={styles.title}>
            <Input
              placeholder="请输入提醒类型，例：超声类检查提醒"
              onChange={changeFormName}
              defaultValue={formName}
              style={{ width: 320 }}
              onBlur={handleChangeName}
              ref={inputRef}
            />
          </p>
        ) : (
          <p className={styles.title}>
            {formName}
            {status !== 1001 && window.$storage.getItem('isLeader') && <FormOutlined onClick={changeIsEdit} />}
          </p>
        )}
      </div>
      {
        status !== 1001 && window.$storage.getItem('isLeader') &&
        <div className={styles.add} onClick={addInfo}>
          <img src={create} alt="" />
          创建新提醒
        </div>
      }
      {infos.map((item: IPlanInfos, index: number) => {
        if (editStatus[index] === 'open') {
          console.log('======================= item, item', JSON.stringify(item));
          return (
            // <SendPlan
            //   key={index}
            //   mode="Add"
            //   onCancel={() => handleCancel(index)}
            //   infoIndex={index}
            //   addPlan={addPlan}
            //   plans={item.plans}
            //   question={item.questions}
            //   isDisabled={item.scaleId}
            // />
            <ScaleTemplate
              key={index}
              mode="Add"
              onCancel={() => handleCancel(index)}
              addPlan={(params) => addPlan(params, index)}
              scaleType={'OBJECTIVE'}
              question={item.questions}
              originRuleDoc={item.ruleDoc}
              chooseValues={item.chooseValues}
            />
          );
        } else {
          return (
            <HistoryPlan
              infoItem={infos[index]}
              itemIndex={index}
              key={index}
              location={location}
              changeEditStatus={changeEditStatus}
              handleDel={() => handleDelPlan(item)}
            />
          );
        }
      })}
    </>
  );
}

export default Detail;
