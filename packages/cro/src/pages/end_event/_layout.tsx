import React, { useEffect, useState } from 'react';
import './index.scss';
import ToogleSide from '@/components/ToogleSide';
import SideMenu from './components/side_menu';
import * as api from '@/services/api';
import ScaleTableTab from '@/components/Scale/ScaleTableTab';
import { history, useDispatch } from 'umi';
import { RuleTypeMap } from '../subjective_table/util';

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
function PatientManage(props: IProps) {
  const dispatch = useDispatch();
  const isShowSideMenu = !['/end_event/create'].includes(props.location.pathname); // 创建页面不显示侧边栏
  const [tableList, setTableList] = useState([]);
  // const [urlName, seturlName] = useState('');
  const urlName = '';
  const projectSid = window.$storage.getItem('projectSid');
  useEffect(() => {
    if (!props.location.query.isTemp) {
      api.subjective.getScaleGroup({ projectSid, type: RuleTypeMap.crf.type }).then((res) => {
        setTableList(res.scaleGroupInfos);
      });
    }
  }, []);
  // 创建成功，跳转到所创建的表详情页面
  useEffect(() => {
    const newUrlName = props.location.query.name;
    if (newUrlName && urlName !== newUrlName) {
      console.log('newUrlName', newUrlName);
      api.subjective.getScaleGroup({ projectSid, type: RuleTypeMap.crf.type }).then((res) => {
        setTableList(res.scaleGroupInfos);
        const scaleGroupInfos = res.scaleGroupInfos.filter(
          (item: { name: string }) => item.name === newUrlName,
        );
        if (scaleGroupInfos.length > 0) {
          const id = scaleGroupInfos[0].id;
          history.replace(`/end_event/detail?id=${id}`);
        } else if (res.scaleGroupInfos?.length > 0) {
          const id = res.scaleGroupInfos[0].id;
          history.replace(`/end_event/detail?id=${id}`);
        } else {
          history.replace('/end_event/define');
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
  const showTableTab = !['/end_event/count', '/end_event/define'].includes(props.location.pathname);
  return (
    <div className="end_event_main">
      {isShowSideMenu ? (
        <ToogleSide>
          <SideMenu location={props.location} tableList={tableList} />
          <div style={{ height: '100%' }}>
            {tableList.length > 0 && showTableTab && (
              <ScaleTableTab
                id={props.location.query.id}
                location={props.location}
                scaleType={RuleTypeMap.crf.scaleType}
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
