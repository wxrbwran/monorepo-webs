import React, { useState, useEffect } from 'react';
import './index.scss';
import ToogleSide from '@/components/ToogleSide';
import SideMenu from './components/side_menu';
import { history } from 'umi';
import * as api from '@/services/api';
import { RuleTypeMap } from '../subjective_table/util';

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
    api.subjective.getScaleGroup({ projectSid, type: RuleTypeMap.objective.type }).then((res) => {
      setTableList(res.scaleGroupInfos);
      if (res.scaleGroupInfos.length > 0) {
        history.replace((`/objective_table/detail?id=${res.scaleGroupInfos[0].id}`));
      }
    });
  }, []);
  // 创建成功，跳转到所创建的表详情页面
  useEffect(() => {
    const newUrlName = props.location.query.name;
    console.log('==================== 跳转到所创建的表详情页面', newUrlName);
    if (newUrlName) {
      api.subjective.getScaleGroup({ projectSid, type: RuleTypeMap.objective.type }).then((res) => {
        if (res.scaleGroupInfos.length > 0) {
          setTableList(res.scaleGroupInfos);
          const id = res.scaleGroupInfos.filter((item: { name: string; }) => item.name === newUrlName)[0].id;
          history.replace((`/objective_table/detail?id=${id}`));
        } else {
          setTableList([]);
          history.replace(('/objective_table'));
        }
      });
    }
  }, [props]);
  const isShowSideMenu = props.location.pathname !== '/objective_table/create'; // 创建页面不显示侧边栏
  return (
    <>
      {
        isShowSideMenu ? (
          <ToogleSide>
            <SideMenu tableList={tableList} location={props.location} />
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
