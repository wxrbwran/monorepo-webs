import React, { useState, useRef } from 'react';
import { message, Form, Tabs } from 'antd';
import SelectGroup from '../components/select_group';
import XzlTable from 'xzl-web-shared/src/components/XzlTable';
import * as api from '@/services/api';
import { handleSelection } from '@/utils/conditions';
import { Status } from 'xzl-web-shared/src/components/Selects';
import { Group } from '@/components/Selects';
import Viewer from 'react-viewer';
import { patientCroColumns, patientCroStopColumns } from '@/utils/columns';
import { useSelector, useDispatch } from 'umi';
import '../index.scss';
import { CommonData, IState } from 'typings/global';
import AddServicePackage from '../../researcher/croservice/components/AddServicePackage';
import ChoiceTeam from '../../researcher/croservice/components/ChoiceTeam';
import { Role } from 'xzl-web-shared/src/utils/role';
import distributionTeamPng from '@/assets/img/distribution_team.png';
interface IProps {
}
const { TabPane } = Tabs;
function PatientCro({ }: IProps) {
  const [form] = Form.useForm();
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const teamMembers = useSelector((state: IState) => state.project.teamMembers);
  const [selectPatient, setSelectPatient] = useState<string[]>([]);
  const [tableOptions, setOptions] = useState<CommonData>({ projectNsId, status: 1002 });
  const [imgVisible, setImgVisible] = useState(false);
  const [imgArr, setImgArr] = useState<string[]>([]);
  const [tabStatus, setTabStatus] = useState<number>(1002); // tab状态
  const dispatch = useDispatch();

  const [teamShow, setTeamShow] = useState(false);
  const putCroToRecord = useRef();


  const [teamCreateShow, setTeamCreateShow] = useState(false);




  const refreshList = () => {
    setOptions({ ...tableOptions }); //刷新当前受试者列表
    //刷新试验分组列表
    dispatch({
      type: 'project/fetchGroupList',
      payload: projectNsId,
    });
  };

  const putCroToPatient = (team) => {

    console.log('=============  putCroToPatient putCroToPatient', JSON.stringify(team));
    if (team) {
      const parma = {

        pwcId: putCroToRecord.current.wcId,
        toNSId: team.teamNSId,
        toTeamNSLabels: team.teamNSLabels,
      };
      api.service.putCroToPatients(parma).then(() => {

        refreshList();
        setTeamShow(false);
      });
    } else {
      message.error('您未选择团队');
    }
  };

  const handleStop = (record: any) => {
    const params = {
      projectNsId,
      sid: record.sid,
      status: 1003,
      exitReason: 1,
    };
    api.patientManage.patchPatientStatus(params).then(() => {
      message.success('操作成功');
      refreshList();
    });
  };

  const toggleImg = (record: any) => {
    setImgVisible(true);
    setImgArr([record?.etcNote]);
  };

  const distributionTeam = (record: any) => {
    console.log('=============  distributionTeam distributionTeam', JSON.stringify(record));
    putCroToRecord.current = record;
    setTeamShow(true);
  };



  const handleSelectChange = (_changedValues: string[], allValues: { status: string, patientGroupId: string }) => {

    const { status, patientGroupId } = allValues;
    const params: CommonData = {
      ...tableOptions,
      conditions: [],
    };
    if (status) {
      params.conditions = handleSelection({ status });
    }
    if (patientGroupId) {
      params.patientGroupId = patientGroupId;
    } else if (params.patientGroupId) {
      delete params.patientGroupId;
    }
    setOptions(params);
  };


  const patientColums = teamMembers.find((item) => item.role.includes(Role.RESEARCH_PROJECT_DOCTOR.id)) ? [...patientCroColumns({
    handleStop,
    toggleImg,
    distributionTeam,
  }), {
    title: '分配cro团队',
    dataIndex: '',
    render: (_text: any, record: any) => (
      <div>
        {record.team.name}
        <img style={{ width: '26px', height: '26px', alignSelf: 'center' }} src={distributionTeamPng} onClick={() => distributionTeam(record)} />
      </div >
    ),
  }] : patientCroColumns({
    handleStop,
    toggleImg,
    distributionTeam,
  });

  const columns = {
    1002: patientColums,
    1003: patientCroStopColumns(),
  };
  const rowSelection = {
    onChange: (selectedRowKeys: never[], selectedRows: { sid: string }[]) => {
      const patients: any = [];
      selectedRows.forEach((item: { sid: string }) => {
        patients.push(item.sid);
      });
      setSelectPatient(Array.from(new Set(patients)));
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: { status: number }) => ({
      disabled: record?.status === 1003,
    }),
  };
  const handleToggleTab = (key: string) => {
    setTabStatus(Number(key));
    setOptions({ ...tableOptions, status: +key });
  };





  return (
    <div className="patient-manage-cont">
      <div className="title">全部受试者</div>
      <div className="tip">
        展示同意加入试验的全部受试者信息，您可以通过筛选将受试者加入对应分组。
      </div>
      <div className="selects">
        筛选：
        <Form form={form} onValuesChange={handleSelectChange}>
          <Status />
          <Group />
        </Form>
      </div>
      <div className="patient-list" style={{ marginTop: 8 }}>
        <Tabs onChange={handleToggleTab}>
          <TabPane tab="进行中" key={1002}>
          </TabPane>
          <TabPane tab="已退出" key={1003}>
          </TabPane>
        </Tabs>

        {
          tabStatus === 1002 && teamMembers.find((item) => item.role.includes(Role.RESEARCH_PROJECT_DOCTOR.id)) &&
          <SelectGroup
            selectPatient={selectPatient}
            refreshList={refreshList}
          >
            加入试验分组
          </SelectGroup>
        }
        <XzlTable
          columns={columns[tabStatus]}
          category="patientList"
          dataKey="teams"
          request={window.$api.patientManage.getTestPatients}
          depOptions={tableOptions}
          // handleCallback={handleCallback}
          noPagination={true}
          tableOptions={{
            rowSelection: tabStatus === 1002 ? {
              ...rowSelection,
            } : false,
            pagination: false,
          }}
        />
      </div>
      <Viewer
        activeIndex={0}
        visible={imgVisible}
        onClose={() => setImgVisible(false)}
        images={imgArr.map((url) => ({
          src: url,
        }))}
      />
      {/* 
      <AddServicePackage onSaveSuccess={onSaveSuccess} edit={edit} source={source} show={show} onCancel={() => { setShow(false); }}>
        <Button type="primary" className="mb-20" onClick={onAddTeam}>+ 添加新团队</Button>
      </AddServicePackage> */}

      <AddServicePackage onSaveSuccess={() => { setTeamCreateShow(false); }} edit={false} show={teamCreateShow} onCancel={() => { setTeamCreateShow(false); }} source={undefined} >
        {/* <Button type="primary" className="mb-20" onClick={onAddTeam}>+ 添加新团队</Button> */}
      </AddServicePackage>

      <ChoiceTeam onSaveSuccess={putCroToPatient} show={teamShow} teamNSId={putCroToRecord?.current?.team?.teamNSId} onCancel={() => { setTeamShow(false); }} onCreateTeam={() => { setTeamShow(false); setTeamCreateShow(true); }}>
        {/* <Button type="primary" className="mb-20" onClick={() => { setTeamShow(true); console.log('====123456'); }}>选择团队</Button> */}
      </ChoiceTeam>

    </div>
  );
}

export default PatientCro;


