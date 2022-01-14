import React, { useState, useEffect } from 'react';
import './index.scss';
import ToogleSide from '@/components/ToogleSide';
import SideMenu from '../components/SideMenu';
import ScaleTableTab from '@/components/Scale/ScaleTableTab';
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
      isTemp?: string;
      ruleId: string;
    };
  };
}
// 如果没有随访表，打开的是/subjective_table页面，展示引导创建表的ui，点击创建，打开新页面（创建页面）
// 如果有表，默认打开第一个表，展示表详情，这里做页面跳转
function OutPlanVisitSubjective(props: IProps) {
  const [tableList, setTableList] = useState([]);
  // const [urlName, seturlName] = useState('');
  const urlName = '';
  const projectSid = window.$storage.getItem('projectSid');
  useEffect(() => {
    if (!props.location.query.isTemp) {
      api.subjective.getScaleGroup({ projectSid, type: RuleTypeMap.visit_subjective.type }).then((res) => {
        setTableList(res.scaleGroupInfos);
        if (res.scaleGroupInfos.length > 0) {
          history.replace(`/out_plan_visit/subjective/detail?id=${res.scaleGroupInfos[0].id}`);
        }
      });
    }
  }, []);
  // 创建成功，跳转到所创建的表详情页面
  useEffect(() => {
    const newUrlName = props.location.query.name;
    if (newUrlName && urlName !== newUrlName) {
      console.log('newUrlName', newUrlName);
      api.subjective.getScaleGroup({ projectSid, type: RuleTypeMap.visit_subjective.type }).then((res) => {
        setTableList(res.scaleGroupInfos);
        const scaleGroupInfos = res.scaleGroupInfos.filter(
          (item: { name: string }) => item.name === newUrlName,
        );
        if (scaleGroupInfos.length > 0) {
          const id = scaleGroupInfos[0].id;
          history.replace(`/out_plan_visit/subjective/detail?id=${id}`);
        } else {
          history.replace('/out_plan_visit/subjective');
        }
      });
    }
  }, [props]);
  // useEffect(() => {
  //   dispatch({
  //     type: 'project/setScaleGroup',
  //     payload: [...tableList],
  //   });
  // }, [tableList]);
  const isShowSideMenu = ![
    '/out_plan_visit/subjective/guide',
    '/out_plan_visit/subjective/create',
    '/out_plan_visit/subjective/template',
  ].includes(props.location.pathname); // 创建页面不显示侧边栏
  return (
    <div className="subjective-table">
      {isShowSideMenu ? (
        <ToogleSide>
          <SideMenu tableList={tableList} location={props.location} type='visit_subjective' />
          <div style={{ height: '100%' }}>
            {tableList.length > 0 && (
              <ScaleTableTab
                id={props.location.query.id}
                location={props.location}
                scaleType={RuleTypeMap.visit_subjective.scaleType}
              />
            )}
            {props.children}
          </div>
        </ToogleSide>
      ) : (
        <div>{props.children}</div>
      )}
    </div>
  );
}

export default OutPlanVisitSubjective;
