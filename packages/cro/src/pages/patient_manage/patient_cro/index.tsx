import React, { useState } from 'react';
import { Select, message, Form, Tabs } from 'antd';
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

const Option = Select.Option;
interface IProps {
}
const { TabPane } = Tabs;
function PatientCro({ }: IProps) {
  const [form] = Form.useForm();
  const {projectNsId} = useSelector((state: IState) => state.project.projDetail)
  const [selectPatient, setSelectPatient] = useState<string[]>([]);
  const [tableOptions, setOptions] = useState<CommonData>({projectNsId, status: 1002});
  const [imgVisible, setImgVisible] = useState(false);
  const [imgArr, setImgArr] = useState<string[]>([]);
  const [status, setStatus] = useState<number>(1002); // tab状态
  const dispatch = useDispatch();

  const refreshList = () => {
    setOptions({...tableOptions }) //刷新当前受试者列表
     //刷新试验分组列表
     dispatch({
      type: 'project/fetchGroupList',
      payload: projectNsId,
    });
  }

  const handleStop = (record: any) => {
    const params = {
      projectNsId,
      sid: record.sid,
      status: 1003,
      exitReason: 1,
    }
    api.patientManage.patchPatientStatus(params).then(res => {
      message.success('操作成功');
      refreshList();
    })
  }

  const toggleImg = (record: any) => {
    setImgVisible(true);
    setImgArr([record?.etcNote]);
  }
  const handleSelectChange = (changedValues: string[], allValues: {status: string,patientGroupId: string}) => {
    const { status, patientGroupId } = allValues;
    const params: CommonData = {
      ...tableOptions,
      conditions: []
    }
    if (status) {
      params.conditions=handleSelection({status});
    }
    if (patientGroupId) {
      params.patientGroupId = patientGroupId;
    } else if (params.patientGroupId) {
      delete params.patientGroupId;
    }
    setOptions(params);
  };

  // const columns = [patientCroColumns({
  //   handleStop,
  //   toggleImg,
  // }), patientCroStopColumns()];
  const columns = {
    1002: patientCroColumns({
      handleStop,
      toggleImg,
    }),
    1003: patientCroStopColumns()
  };
  const rowSelection = {
    onChange: (selectedRowKeys: never[], selectedRows: { sid: string }[]) => {
      const patients:any = [];
      selectedRows.forEach((item: { sid: string }) => {
        patients.push(item.sid);
      })
      setSelectPatient(Array.from(new Set(patients)));
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record:{status: number}) => ({
      disabled: record?.status === 1003,
    }),
  }
  const handleToggleTab = (key: string) => {
    setStatus(Number(key));
    setOptions({ ...tableOptions, status: +key });
  }
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
      <div className="patient-list" style={{marginTop: 8}}>
        <Tabs onChange={handleToggleTab}>
          <TabPane tab="进行中" key={1002}>
          </TabPane>
          <TabPane tab="已退出" key={1003}>
          </TabPane>
        </Tabs>

        {
          status === 1002 &&
          <SelectGroup
            selectPatient={selectPatient}
            refreshList={refreshList}
          >
            加入试验分组
          </SelectGroup>
        }
        <XzlTable
          columns={columns[status]}
          category="patientList"
          dataKey="teams"
          request={window.$api.patientManage.getTestPatients}
          depOptions={tableOptions}
          // handleCallback={handleCallback}
          noPagination={true}
          tableOptions={{
            rowSelection: status === 1002 ? {
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
    </div>
  )
}

export default PatientCro;


