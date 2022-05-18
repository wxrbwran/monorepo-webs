import { useState, useEffect, useMemo } from 'react';
import React from 'react';
import SideMenu from '@/components/SideMenu';
import ReplyScale from './components/ReplyScale';
import * as api from '@/services/api';
import { Empty } from 'antd';

export const RuleTypeMap = {
  objective: {
    type: 'OBJECTIVE',
    scaleType: 'OBJECTIVE',
    text: '客观量表',
    sourceType: '7',
    templeType: 'OBJECTIVE_INSPECTION',
  },
  crf: {
    type: 'CRF',
    scaleType: 'CRF',
    text: 'crf量表',
    sourceType: '6',
    templeType: 'CRF_SCALE',
  },
  subjective: {
    type: 'SUBJECTIVE',
    scaleType: 'SUBJECTIVE',
    text: '主观量表',
    sourceType: '5',
    templeType: 'SUBJECTIVE_SCALE',
  },

  visit_objective: {
    type: 'VISIT_OBJECTIVE',
    scaleType: 'VISIT_OBJECTIVE',
    text: '计划外访视客观',
    sourceType: '13', // 计划外访视客观量表提醒
    templeType: 'VISIT_OBJECTIVE_INSPECTION',
  },
  visit_crf: {
    type: 'VISIT_CRF',
    scaleType: 'VISIT_CRF',
    text: '计划外访视CRF',
    sourceType: '12', // 计划外访视CRF量表提醒
    templeType: 'VISIT_CRF_SCALE',
  },
  visit_subjective: {
    type: 'VISIT_SUBJECTIVE',
    scaleType: 'VISIT_SUBJECTIVE',
    text: '计划外访视主观',
    sourceType: '11', //计划外访视主观量表提醒
    templeType: 'VISIT_SUBJECTIVE_SCALE',
  },
};

function Overview() {
  const [scaleList, setScaleList] = useState([]);
  const [scaleGroupId, setScaleGroupId] = useState<string>();
  const [projectList, setProjectList] = useState([]);
  // 获取当前项目量表列表
  const fetchScaleList = async (projectSid: string) => {
    const { scaleGroupInfos } = await api.overview.getScaleGroup({
      projectSid,
      type: RuleTypeMap.subjective.type,
    });
    setScaleList(scaleGroupInfos);
    if (scaleGroupInfos.length > 0) {
      setScaleGroupId(scaleGroupInfos[0].id);
      window.$storage.setItem('scaleGroupId', scaleGroupInfos[0].id);
    }
  };
  useEffect(() => {
    // 获取科研项目列表，然后拿科研项目列表的第0项信息获取对应的主观量表
    api.overview.getProjectList(window.$storage.getItem('nsId')!).then((res) => {
      setProjectList(res.projectInfos);
      if (res.projectInfos.length > 0) {
        const { projectSid, projectNsId } = res.projectInfos[0];
        fetchScaleList(projectSid);
        window.$storage.setItem('projectNsId', projectNsId);
      }
    });
  }, []);

  // 切换项目时获取项目下的主观量表
  const handleChangeTab = (key: string) => {
    fetchScaleList(key);
    const { projectNsId } = projectList.filter(
      (item: { projectSid: string }) => item.projectSid === key,
    )[0];
    window.$storage.setItem('projectNsId', projectNsId);
  };
  // 切换量表
  const changeScaleId = (id: string) => {
    setScaleGroupId(id);
    window.$storage.setItem('scaleGroupId', id);
  };

  const renderReplyScale = useMemo(() => <ReplyScale scaleGroupId={scaleGroupId} />, [
    scaleGroupId,
  ]);
  return (
    <>
      <p className="mb-30 text-blue-500 text-lg">科研数据</p>
      <div
        className={`flex ${projectList?.length > 0 ? '' : 'justify-center items-center'}`}
        style={{ height: '90%' }}
      >
        {projectList?.length > 0 ? (
          <>
            <SideMenu data={projectList} keyName="projectSid" handleChangeTab={handleChangeTab} />
            <div className="flex-1 -mt-35">
              <p className="mb-15 ml-15 text-blue-500 text-sm">全部主观量表</p>
              {scaleList.length > 0 ? (
                <div className="flex ml-30 h-full overflow-auto">
                  <SideMenu data={scaleList} keyName="id" handleChangeTab={changeScaleId} />
                  {scaleGroupId && (
                    <div className="flex-1 overflow-auto -mt-20">{renderReplyScale}</div>
                  )}
                </div>
              ) : (
                '暂无量表'
              )}
            </div>
          </>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
}
export default Overview;
