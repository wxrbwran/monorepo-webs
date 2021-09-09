import React, { useState, useEffect } from 'react';
import  HistoryPlan from '../components/history_plan';
import { useSelector, useDispatch } from 'react-redux';
import { IPlanInfos } from '@/utils/consts';
import styles from '../index.scss';

interface IProps {
  location: {
    query: {
      id: string;
    },
    pathname: string,
  },
}
interface IState {
  project: {
    objectiveScaleList: IPlanInfos[];
    formName: string;
  }
}
function Detail({ location }: IProps) {
  const dispatch = useDispatch();
  const [groupId, setGroupId] = useState('');
  const infos = useSelector((state:IState)=>state.project.objectiveScaleList);
  const formName = useSelector((state:IState)=>state.project.formName);

  useEffect(() => {
    const id = location.query.id;
    if (groupId !== id) {
      setGroupId(id);
      if(!!id){
        dispatch({
          type: 'project/fetchObjectiveScale',
          payload: id,
        });
      }
    }
  }, [location]);

  return (
    <>
        <div className={styles.table_name}>
           <p className={styles.title}>{formName}</p>
        </div>
      {
        infos.map((item:IPlanInfos, index: number)=>(
          <HistoryPlan
            key={index}
            infoItem={item}
            itemIndex={index}
            location={location}
          />
        ))
      }
    </>
  )
}

export default Detail;
