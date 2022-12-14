import React, { useState, useEffect, useRef } from 'react';
import HistoryPlan from '@/components/Scale/ObjectiveHistoryPlan';
import { useSelector, useDispatch } from 'react-redux';
import { IPlanInfos } from '@/utils/consts';
import { FormOutlined } from '@ant-design/icons';
import create from '@/assets/img/create.svg';
import { Input, message } from 'antd';
import * as api from '@/services/api';
import styles from './index.scss';
import ScaleTemplate from '@/components/Scale/ScaleTemplate';
import { IRuleDoc, IChooseValues } from '@/pages/subjective_table/util';

interface IProps {
  location: {
    query: {
      id: string;
    };
    pathname: string;
  };
  scaleType: 'OBJECTIVE' | 'VISIT_OBJECTIVE';
}
interface IState {
  project: {
    objectiveScaleList: IPlanInfos[];
    formName: string;
  };
}
function ObjectiveDetail(props: IProps) {
  const { location, scaleType } = props;
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
    console.log('=============== id id ', id);
    if (groupId !== id) {
      setGroupId(id);
      setIsEdit(false);
      // 解决只要有编辑着没保存着的时候，location一切换到另一个表就有问题，所以置空；
      setEditStatus([]);
      if (!!id) {

        dispatch({
          type: 'project/fetchObjectiveScale',
          payload: { id, scaleType },
        });
      }
    }
  }, [location]);

  useEffect(() => {
    setInfos([...objectiveScaleList]);
    setScaleName(formName);
    console.log('formNameformName', formName);
    //默认第一次加载时执行
    // if (editStatus.length === 0) {
    const statusList: string[] = [];
    objectiveScaleList.forEach(() => {
      statusList.push('lock');
    });
    setEditStatus([...statusList]);
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
      api.subjective.patchScale({
        name: scaleName,
        projectSid: window.$storage.getItem('projectSid'),
        scaleGroupId: location.query.id,
        type: scaleType,
        scaleId: objectiveScaleList.length > 0 ? objectiveScaleList[0].scaleId : '',
      }).then(() => {
        message.success('修改成功');
        // 写入日志
        window.$log.handleOperationLog({
          type: 1,
          copyWriting: '编辑客观检查名称',
          oldParams: { content: formName },
          newParams: { content: scaleName },
          businessType: scaleType === 'OBJECTIVE' ? window.$log.businessType.UPDATE_OBJECTIVE_NAME.code :
            window.$log.businessType.UPDATE_UNPLANNED_OBJECTIVE_NAME.code,
        });
        // 写入日志
        dispatch({
          type: 'project/fetchObjectiveScale',
          payload: { id: location.query.id, scaleType },
        });
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
    if (editStatus.includes('open')) {
      message.error('请先保存上条编辑');
    } else {
      setInfos([{ ...initInfos }, ...infos]);
      setEditStatus(['open', ...editStatus]);
    }
  };
  // 删除计划
  const delPlan = (index: number) => {

    console.log('================ infos before', JSON.stringify(infos), index);
    const deleted = infos.splice(index, 1);
    console.log('================ newInfos after', JSON.stringify(infos));
    console.log('================ newInfos deleted ', JSON.stringify(deleted));

    const newStatus = editStatus.filter((_item, sIndex) => sIndex !== index);
    setInfos([...infos]);
    setEditStatus([...newStatus]);
  };
  // 提醒计划的取消按钮执行操作
  const handleCancel = (index: number) => {

    console.log('================== handleCancel index', index);
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
      type: scaleType,
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
          payload: { id: location.query.id, scaleType },
        });
        // 写入日志
        window.$log.handleOperationLog({
          type: 0,
          copyWriting: params.questions,
          businessType: scaleType === 'OBJECTIVE' ?
            window.$log.businessType.CREATE_OBJECTIVE.code :
            window.$log.businessType.CREATE_UNPLANNED_OBJECTIVE.code,
        });
        // 写入日志
      });
  };

  const handleDelPlan = (item: { scaleId: string; ruleDoc: { id: string } }) => {

    console.log('====================== handleDelPlan ', item);
    api.subjective.delScale({
      scaleId: item.scaleId,
      scaleGroupId: groupId,
      projectSid: window.$storage.getItem('projectSid'),
      scaleType: scaleType,
      ruleId: item?.ruleDoc?.id,
    }).then(() => {
      message.success('删除成功');

      window.$log.handleOperationLog({
        type: 2,
        businessType: scaleType === 'OBJECTIVE' ? window.$log.businessType.DELETE_OBJECTIVE.code : window.$log.businessType.DELETE_UNPLANNED_OBJECTIVE.code,
        copyWriting: '删除客观检查',
        oldParams: { content: item },
      });

      dispatch({
        type: 'project/fetchObjectiveScale',
        payload: { id: location.query.id, scaleType },
      });
    });
  };

  const changeEditStatus = () => {
    setEditStatus([]);
    dispatch({
      type: 'project/fetchObjectiveScale',
      payload: { id: location.query.id, scaleType },
    });
  };

  console.log('================ status', status, (status !== 1001 || scaleType == 'VISIT_OBJECTIVE'));
  return (
    <div className={styles.object_detail}>
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
            {(status !== 1001 || scaleType == 'VISIT_OBJECTIVE') && window.$storage.getItem('isLeader') && <FormOutlined onClick={changeIsEdit} />}
          </p>
        )}
      </div>
      {
        (status !== 1001 || scaleType == 'VISIT_OBJECTIVE') && window.$storage.getItem('isLeader') &&
        <div className={styles.add} onClick={addInfo}>
          <img src={create} alt="" />
          创建新提醒
        </div>
      }
      {infos.map((item: IPlanInfos, index: number) => {
        if (editStatus[index] === 'open') {
          console.log('======================= item, item', JSON.stringify(item));
          return (
            <ScaleTemplate
              mode="Add"
              key={index}
              onCancel={() => handleCancel(index)}
              addPlan={(params) => addPlan(params, index)}
              scaleType={scaleType}
              question={item.questions}
              originRuleDoc={item.ruleDoc}
              chooseValues={item.chooseValues}
            />
          );
        } else {
          return (
            <HistoryPlan
              key={index}
              infoItem={infos[index]}
              itemIndex={index}
              location={location}
              changeEditStatus={changeEditStatus}
              handleDel={() => handleDelPlan(item)}
              scaleType={scaleType}
            />
          );
        }
      })}
    </div>
  );
}

export default ObjectiveDetail;
