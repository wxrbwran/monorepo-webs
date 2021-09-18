import React, { useState, useEffect, useRef } from 'react';
import HistoryPlan from '../components/history_plan';
import { useSelector, useDispatch } from 'react-redux';
import { IPlanInfos } from '@/utils/consts';
import { FormOutlined } from '@ant-design/icons';
import create from '@/assets/img/create.svg';
import { Input, message } from 'antd';
import SendPlan from '@/components/SendPlan';
import * as api from '@/services/api';
import styles from '../index.scss';

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
    plans: [
      {
        type: '',
        detail: {},
      },
    ],
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
      if (!!id) {
        dispatch({
          type: 'project/fetchObjectiveScale',
          payload: id,
        });
      }
    }
  }, [location]);

  useEffect(() => {
    setInfos([...objectiveScaleList]);
    setScaleName(formName);
    //默认第一次加载时执行
    if (editStatus.length === 0){
      objectiveScaleList.forEach(()=>{
        editStatus.push('lock');
      });
      setEditStatus([...editStatus]);
    }
  }, [objectiveScaleList]);

  const changeFormName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScaleName(e.target.value);
  };
  const handleChangeName = () => {
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
    });
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
  const addPlan = (params: IPlanInfos, index: number) => {
    infos[index] = { ...infos[index], ...params };
    const paraAdd = {
      doctorSid,
      infos: [infos[index]],
      name: '客观量表',
      projectSid,
      projectName,
      projectNsId,
      type: 'OBJECTIVE',
      scaleGroupId: location.query.id,
    };
    api.subjective.addObjectiveScale(paraAdd)
      .then(() => {
        message.success('添加成功');
        setEditStatus([]);
        setInfos([...infos]);
        dispatch({
          type: 'project/fetchObjectiveScale',
          payload: location.query.id,
        });
      })
      .catch((err: string) => {
        message.error(err);
      });
  };

  const handleDelPlan = (item: { scaleId: string; }) => {
    api.subjective.delScale({
      scaleId: item.scaleId,
      scaleGroupId: groupId,
      projectSid: window.$storage.getItem('projectSid'),
      scaleType: 'OBJECTIVE',

    }).then(() => {
      message.success('删除成功');
      dispatch({
        type: 'project/fetchObjectiveScale',
        payload: location.query.id,
      });
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
            {status !== 1001 && <FormOutlined onClick={changeIsEdit} />}
          </p>
        )}
      </div>
      {
        status !== 1001 &&
          <div className={styles.add} onClick={addInfo}>
            <img src={create} alt="" />
            创建新提醒
          </div>
      }
      {infos.map((item: IPlanInfos, index: number) => {
        if (editStatus[index] === 'open') {
          return (
            <SendPlan
              key={index}
              mode="Add"
              onCancel={() => handleCancel(index)}
              infoIndex={index}
              addPlan={addPlan}
              plans={item.plans}
              question={item.questions}
              isDisabled={item.scaleId}
            />
          );
        } else {
          return (
            <HistoryPlan
              infoItem={infos[index]}
              itemIndex={index}
              key={index}
              location={location}
              changeEditStatus={() => changeEditStatus(index)}
              handleDel={() => handleDelPlan(item)}
            />
          );
        }
      })}
    </>
  );
}

export default Detail;
