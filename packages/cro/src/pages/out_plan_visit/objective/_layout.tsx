import React, { useState, useEffect } from 'react';
import './index.scss';
import ToogleSide from '@/components/ToogleSide';
import SideMenu from '../components/SideMenu';
import { history } from 'umi';
import * as api from '@/services/api';
import { RuleTypeMap } from '@/pages/subjective_table/util';

interface IProps {
  children: React.ReactElement[];
  location: {
    pathname: string;
    query: {
      id: string;
      name: string;
    }
  };
}
// 如果没有表，打开的是/objective_table页面，展示引导创建表的ui，点击创建，打开新页面（创建页面）
// 如果有表，默认打开第一个表，展示表详情，这里做页面跳转
function ObjectiveTable(props: IProps) {
  const [tableList, setTableList] = useState([]);
  const projectSid = window.$storage.getItem('projectSid');
  useEffect(() => {
    api.subjective.getScaleGroup({ projectSid, type: RuleTypeMap.visit_objective.scaleType }).then((res) => {
      setTableList(res.scaleGroupInfos);
      if (res.scaleGroupInfos.length > 0) {
        history.replace((`/out_plan_visit/objective/detail?id=${res.scaleGroupInfos[0].id}`));
      }
    });
  }, []);
  // 创建成功，跳转到所创建的表详情页面
  useEffect(() => {
    const newUrlName = props.location.query.name;
    console.log('==================== 跳转到所创建的表详情页面', newUrlName);
    if (newUrlName) {
      api.subjective.getScaleGroup({ projectSid, type: RuleTypeMap.visit_objective.scaleType }).then((res) => {

        setTableList(res.scaleGroupInfos);
        const scaleGroupInfos = res.scaleGroupInfos.filter(
          (item: { name: string }) => item.name === newUrlName,
        );
        if (scaleGroupInfos.length > 0) {
          const id = scaleGroupInfos[0].id;
          history.replace((`/out_plan_visit/objective/detail?id=${id}`));
        } else if (res.scaleGroupInfos?.length > 0) {
          const id = res.scaleGroupInfos[0].id;
          history.replace((`/out_plan_visit/objective/detail?id=${id}`));
        } else {
          history.replace(('/out_plan_visit/objective'));
        }
      });
    }
  }, [props]);
  const isShowSideMenu = props.location.pathname !== '/out_plan_visit/objective/create'; // 创建页面不显示侧边栏
  return (
    <>
      {
        isShowSideMenu ? (
          <ToogleSide>
            <SideMenu tableList={tableList} location={props.location} type='visit_objective' />
            <div style={{ height: '100%' }}>
              {props.children}
            </div>
          </ToogleSide>
        ) : (
          <div>{props.children}</div>
        )
      }
    </>

  );
}

export default ObjectiveTable;
