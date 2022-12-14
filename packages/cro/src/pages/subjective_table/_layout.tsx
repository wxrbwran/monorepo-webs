import React, { useState, useEffect } from 'react';
import './index.scss';
import ToogleSide from '@/components/ToogleSide';
import SideMenu from './components/side_menu';
import ScaleTableTab from '@/components/Scale/ScaleTableTab';
import { history, useDispatch } from 'umi';
import * as api from '@/services/api';
import { RuleTypeMap } from './util';

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
function PatientManage(props: IProps) {
  const dispatch = useDispatch();
  const [tableList, setTableList] = useState([]);
  // const [urlName, seturlName] = useState('');
  const urlName = '';
  const projectSid = window.$storage.getItem('projectSid');
  useEffect(() => {
    if (!props.location.query.isTemp) {
      api.subjective.getScaleGroup({ projectSid, type: RuleTypeMap.subjective.type }).then((res) => {
        setTableList(res.scaleGroupInfos);
        if (res.scaleGroupInfos.length > 0) {
          history.replace(`/subjective_table/detail?id=${res.scaleGroupInfos[0].id}`);
        }
      });
    }
  }, []);
  // 创建成功，跳转到所创建的表详情页面
  useEffect(() => {
    const newUrlName = props.location.query.name;
    if (newUrlName && urlName !== newUrlName) {
      console.log('newUrlName', newUrlName);
      api.subjective.getScaleGroup({ projectSid, type: RuleTypeMap.subjective.type }).then((res) => {
        setTableList(res.scaleGroupInfos);
        const scaleGroupInfos = res.scaleGroupInfos.filter(
          (item: { name: string }) => item.name === newUrlName,
        );
        if (scaleGroupInfos.length > 0) {
          const id = scaleGroupInfos[0].id;
          history.replace(`/subjective_table/detail?id=${id}`);
        } else if (res.scaleGroupInfos?.length > 0) {
          const id = res.scaleGroupInfos[0].id;
          history.replace(`/subjective_table/detail?id=${id}`);
        } else {
          history.replace('/subjective_table');
        }
      });
    }
  }, [props]);
  useEffect(() => {
    dispatch({
      type: 'project/setScaleGroup',
      payload: [...tableList],
    });
  }, [tableList]);
  const isShowSideMenu = ![
    '/subjective_table/guide',
    '/subjective_table/create',
    '/subjective_table/template',
  ].includes(props.location.pathname); // 创建页面不显示侧边栏
  return (
    <div className="subjective-table">
      {isShowSideMenu ? (
        <ToogleSide>
          <SideMenu tableList={tableList} location={props.location} />
          <div style={{ height: '100%' }}>
            {tableList.length > 0 && (
              <ScaleTableTab
                id={props.location.query.id}
                location={props.location}
                scaleType={RuleTypeMap.subjective.scaleType}
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

export default PatientManage;
