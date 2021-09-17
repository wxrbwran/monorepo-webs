import React, { useState, useEffect } from 'react';
import { history, useDispatch, useSelector } from 'umi';
import BasicInfo from './basic_info';
import UploadFile from './upload_file';
import GroupStatic from './group_static';
import styles from './index.scss';
import { IState } from 'typings/global';

interface IProps{
  location: {
    query: {
      projectSid: string;
    };
  },
}
function ProjectDetail({ location }:IProps) {
  const dispatch = useDispatch();
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail)
  useEffect(() => {
    history.replace((`/proj_detail?projectSid=${window.$storage.getItem('projectSid')}`));
  }, [])
  // 项目切换后，需要重置查询页面的查询范围
  useEffect(() => {
    if (location.query.projectSid) {
      dispatch({
        type: 'query/setQueryScope',
        payload: {
          "nsLabelType":"RESEARCH_PROJECT_PATIENT",
          projectNsId
        }
      });
    }
  }, [location.query.projectSid])
  useEffect(() => {
    if (projectNsId) {
      //获取实验组
      dispatch({
        type: 'project/fetchGroupList',
        payload: projectNsId,
      });
    }
  }, [projectNsId])
  return (
    <div className={styles.detail}>
      <div className={styles.left}>
        <BasicInfo projectSid={location.query.projectSid}/>
      </div>
      <div className={styles.right}>
        <UploadFile/>
        <p className={styles.gutter}></p>
        <GroupStatic projectSid={location.query.projectSid}/>
      </div>
    </div>
  )
}

export default ProjectDetail;
