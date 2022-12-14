import React, { useState, useRef, useEffect } from 'react';
import { message, Form, Tabs, DatePicker } from 'antd';
import SelectGroup from '../components/select_group';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
import { Table } from 'antd';
import * as api from '@/services/api';
import { handleSelection } from '@/utils/conditions';
import { Status } from 'xzl-web-shared/dist/components/Selects';
import { Group } from '@/components/Selects';
import Viewer from '@/components/Viewer';
import { patientCroColumns, patientCroStopColumns } from '@/utils/columns';
import { useSelector, useDispatch } from 'umi';
import '../index.scss';
import { CommonData, IState } from 'typings/global';
import AddServicePackage from '../../researcher/croservice/components/AddServicePackage';
import ChoiceTeam from '../../researcher/croservice/components/ChoiceTeam';
import distributionTeamPng from '@/assets/img/distribution_team.png';
import { hasPermissions, hasOperationPermissions } from '@/utils/utils';
import IconAutograph from '@/assets/img/icon_autograph.png';
import StopPatientMedicine from '../components/stop_patient_medicine';
import { debounce, cloneDeep } from 'lodash';
import dayjs from 'dayjs';
import GetMedicTime from '../components/get_medic_time';
import { handleTableDataSource, handleTableRowKey } from 'xzl-web-shared/dist/components/XzlTable/util';
interface IProps {
}
const { TabPane } = Tabs;
function PatientCro({ }: IProps) {
  const [form] = Form.useForm();
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const teamMembers = useSelector((state: IState) => state.project.teamMembers);
  const [selectPatient, setSelectPatient] = useState<string[]>([]);
  const initTableOptions = { projectNsId, status: 1002, pageAt: 1, pageSize: 5 };
  // const [tableOptions, setOptions] = useState<CommonData>({ projectNsId, status: 1002 });
  const [imgVisible, setImgVisible] = useState(false);
  const [imgArr, setImgArr] = useState<string[]>([]);
  const [tabStatus, setTabStatus] = useState<number>(1002); // tab??????
  const dispatch = useDispatch();

  const [goingData, setGoingData] = useState<any>([]);
  const [doneData, setDoneData] = useState<any>([]);
  // const [data, setData] = useState<any>([]);
  const totalRef = useRef(0);
  const tableOptionsRef = useRef({ projectNsId, status: 1002, pageAt: 1, pageSize: 5 });


  const [teamShow, setTeamShow] = useState(false);
  const putCroToRecord = useRef();
  // const [selectedRowKeys, setRowKeys] = useState<Key[]>([]);

  const [teamCreateShow, setTeamCreateShow] = useState(false);

  // window.$api.patientManage.getTestPatients

  const getGoingPatientList = async (tableOptions) => {

    const res = await window.$api.patientManage.getTestPatients(tableOptions);
    const handledData = handleTableDataSource('teams', res.teams || res.list, res.category || 'patientList');

    setGoingData((preData) => {
      let newData;
      if (tableOptions.pageAt == 1) {
        newData = [...handledData];
      } else {
        newData = [...preData, ...handledData];
      }
      totalRef.current = newData.length;
      return newData;
    });
    if (totalRef.current < res.total && tableOptionsRef.current.status == 1002) {
      getGoingPatientList({ ...tableOptions, pageAt: tableOptions.pageAt + 1 });
    }
  };

  const getDowningPatientList = async (tableOptions) => {
    const res = await window.$api.patientManage.getTestPatients(tableOptions);
    const handledData = handleTableDataSource('teams', res.teams || res.list, res.category || 'patientList');

    setDoneData((preData) => {
      let newData;
      if (tableOptions.pageAt == 1) {
        newData = [...handledData];
      } else {
        newData = [...preData, ...handledData];
      }
      totalRef.current = newData.length;
      return newData;
    });
    if (totalRef.current < res.total && tableOptionsRef.current.status != 1002) {
      getDowningPatientList({ ...tableOptions, pageAt: tableOptions.pageAt + 1 });
    }
  };

  const getPatientList = async (tableOptions) => {

    tableOptionsRef.current = tableOptions;
    if (tableOptions.pageAt == 1) {
      setGoingData([]);
      setDoneData([]);
    }
    if (tableOptions.status == 1002) {
      getGoingPatientList(tableOptions);
    } else {
      getDowningPatientList(tableOptions);
    }
  };


  useEffect(() => {
    getPatientList({ ...initTableOptions, pageAt: 1 });
  }, []);

  const refreshList = () => {
    // setOptions({ ...initTableOptions }); //???????????????????????????
    // 
    getPatientList({ ...initTableOptions, pageAt: 1 });

    //????????????????????????
    dispatch({
      type: 'project/fetchGroupList',
      payload: projectNsId,
    });
  };

  const refreshDownList = () => {
    // setOptions({ ...initTableOptions }); //???????????????????????????
    // 
    getPatientList({ ...initTableOptions, pageAt: 1 });


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
      message.error('??????????????????');
    }
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
      ...initTableOptions,
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
    // setOptions(params);
    getPatientList(params);
  };

  const operation = {
    title: '??????',
    dataIndex: '',
    render: (_text: any, record: any) => (
      <div className="table-operating">
        {
          record.status === 1002 ? hasOperationPermissions(record.team.members) && (
            <StopPatientMedicine record={record} changeSuccess={() => { refreshList(); }}><span>?????????????????????</span></StopPatientMedicine>
          ) : <span style={{ color: '#C5C5C5' }}>?????????</span>
        }

      </div>
    ),
  };

  const subject = {
    title: '???????????????',
    dataIndex: '',
    render: (_text: any, record: any) => (
      <div>
        {record?.etcNote ? <img style={{ width: '26px', height: '26px' }} src={IconAutograph} onClick={() => toggleImg(record)} /> : '--'}
      </div>
    ),
  };

  const handlePassCert = debounce((record) => {
    distributionTeam(record);
  }, 300);

  const cro = {
    title: '??????cro??????',
    dataIndex: '',
    render: (_text: any, record: any) => (
      <div>
        {record.team.name}
        {
          hasOperationPermissions(record.team.members) &&
          <img style={{ width: '26px', height: '26px', alignSelf: 'center' }} src={distributionTeamPng} onClick={() => { handlePassCert(record); }} />
        }
      </div >
    ),
  };

  const medicineEndTime = {
    title: '???????????????????????????',
    dataIndex: 'ioLocationConfig',
    width: 140,
    align: 'center',
    render: (text: any, record: any) => (
      <>
        {
          hasOperationPermissions(record.team.members) ?
            <div className="table-operating">
              <GetMedicTime isStop={true} record={record} changeSuccess={() => { refreshList(); }}><span>{text?.stopMedTime ? dayjs(text.stopMedTime).format('YYYY-MM-DD HH:mm:ss') : '???'}</span></GetMedicTime>
            </div >
            : <span>{text?.stopMedTime ? dayjs(text.stopMedTime).format('YYYY-MM-DD HH:mm:ss') : '???'}</span>
        }
      </>

    ),
  };
  const medicineStartTime = {
    title: '????????????',
    dataIndex: 'ioLocationConfig',
    width: 140,
    align: 'center',
    render: (text: any, record: any) => (
      <>
        {
          hasOperationPermissions(record.team.members) ?
            <div className="table-operating">
              <GetMedicTime isStop={false} record={record} changeSuccess={() => { refreshList(); }}><span>{text?.startMedTime ? dayjs(text.startMedTime).format('YYYY-MM-DD HH:mm:ss') : '???'}</span></GetMedicTime>
            </div >
            : <span>{text?.startMedTime ? dayjs(text.startMedTime).format('YYYY-MM-DD HH:mm:ss') : '???'}</span>
        }
      </>
    ),
  };

  const patientColums = [...patientCroColumns(), operation, subject, cro, medicineEndTime, medicineStartTime];

  const columns = {
    1002: patientColums,
    1003: patientCroStopColumns(),
  };

  // const onSelectChange: IOnSelectChange = (keys: Key[]) => {
  //   setRowKeys(keys);
  //   // handleCallBackStore({ selectedRowKeys: keys });
  // };
  const rowSelection = {
    // selectedRowKeys,
    onChange: (selectedRowKeys: never[], selectedRows: { sid: string }[]) => {
      // setRowKeys(selectedRowKeys);
      const patients: any = [];
      selectedRows.forEach((item: { sid: string }) => {
        patients.push(item.sid);
      });
      setSelectPatient(Array.from(new Set(patients)));
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: { status: number }) => ({
      // disabled: record?.status === 1003 || !hasOperationPermissions(record.team.members),
    }),
  };

  const handleToggleTab = (key: string) => {
    setTabStatus(Number(key));
    getPatientList({ ...initTableOptions, status: +key, pageAt: 1 });
  };


  return (
    <div className="patient-manage-cont">
      <div className="title">???????????????</div>
      <div className="tip">
        ?????????????????????????????????????????????????????????????????????????????????????????????????????????
      </div>
      <div className="selects">
        ?????????
        <Form form={form} onValuesChange={handleSelectChange}>
          <Status />
          <Group />
        </Form>
      </div>
      <div className="patient-list" style={{ marginTop: 8 }}>
        <Tabs onChange={handleToggleTab}>
          <TabPane tab="?????????" key={1002}>
          </TabPane>
          <TabPane tab="?????????" key={1003}>
          </TabPane>
        </Tabs>

        {
          tabStatus === 1002 && hasPermissions(teamMembers) &&
          <SelectGroup
            selectPatient={selectPatient}
            refreshList={refreshList}
          >
            ??????????????????
          </SelectGroup>
        }
        <Table
          columns={columns[tabStatus]}
          dataSource={tabStatus === 1002 ? goingData : doneData}
          bordered
          rowKey={(record) => handleTableRowKey('teams', record)}
          rowSelection={
            tabStatus === 1002 ? {
              ...rowSelection,
            } : false
          }
          pagination={false}
        // rowSelection={{ columnWidth: 100 }}
        />

        {/* const handledData = handleTableDataSource(dataKey, res[dataKey] || res.list, res.category || category); */}

        {/* <XzlTable
          columns={columns[tabStatus]}
          category="patientList"
          dataKey="teams"
          
          // request={window.$api.patientManage.getTestPatients}
          depOptions={tableOptions}
          // handleCallback={handleCallback}
          noPagination={true}
          tableOptions={{
            rowSelection: tabStatus === 1002 ? {
              ...rowSelection,
            } : false,
            pagination: false,
          }}
        /> */}
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
        <Button type="primary" className="mb-20" onClick={onAddTeam}>+ ???????????????</Button>
      </AddServicePackage> */}

      <AddServicePackage onSaveSuccess={() => { setTeamCreateShow(false); }} edit={false} show={teamCreateShow} onCancel={() => { setTeamCreateShow(false); }} source={undefined} >
        {/* <Button type="primary" className="mb-20" onClick={onAddTeam}>+ ???????????????</Button> */}
      </AddServicePackage>

      <ChoiceTeam onSaveSuccess={debounce(putCroToPatient, 300)} show={teamShow} teamNSId={putCroToRecord?.current?.team?.teamNSId} onCancel={() => { setTeamShow(false); }} onCreateTeam={() => { setTeamShow(false); setTeamCreateShow(true); }}>
        {/* <Button type="primary" className="mb-20" onClick={() => { setTeamShow(true); console.log('====123456'); }}>????????????</Button> */}
      </ChoiceTeam>

    </div>
  );
}

export default PatientCro;


