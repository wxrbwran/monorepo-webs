import React, { useState } from 'react';
import { Tabs, Form, Button, message } from 'antd';
import XzlTable from 'xzl-web-shared/src/components/XzlTable';
import { Search } from 'xzl-web-shared/src/components/Selects';
import DoctorRelatedOrg from '@/components/Selects/DoctorRelatedOrg';
import GroupStandard from '../components/group_standard';
import SendFile from '../components/send_file';
import Sex from '../components/sex';
import * as api from '@/services/api';
import { handleSelection } from '@/utils/conditions';
import { noSendPatientColumns, addedPatientColumns } from '@/utils/columns';
import { useSelector } from 'umi';
import '../index.scss';
import { IState } from 'typings/global';
import { SearchOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import { Role } from 'xzl-web-shared/src/utils/role';

const { TabPane } = Tabs;

function Patient() {
  const [form] = Form.useForm();
  const { projectNsId, projectSid, status } = useSelector((state: IState) => state.project.projDetail);
  const [patientSids, setPatientSids] = useState<string[]>([]);
  const [tabStatus, setStatus] = useState<string>('0'); // tab状态
  const [tableOptions, setOptions] = useState({ projectNsId, type: 0 });
  const [showSearch, setShowSearch] = useState(false);

  const refreshList = () => {
    setOptions({ ...tableOptions });
  };

  const handleToggleTab = (key: string) => {
    setStatus(key);
    setOptions({ ...tableOptions, type: +key });
  };

  const handleSelectChange = (_changedValues: string[], allValues: string[]) => {
    console.log('allValues', allValues);
    setOptions({ ...tableOptions, conditions: handleSelection(allValues) });
  };

  const getExperimentName = (record: any) => {
    const members = record.team.members.filter((item) => item.role == Role.RESEARCH_PROJECT.id);
    console.log('============= members members members', JSON.stringify(members));
    if (members.length > 0) {
      const nameList = members.map((item) => item.name);
      console.log('============= nameList nameList nameList', JSON.stringify(nameList));
      return nameList.join(',');
    } else {
      return null;
    }
  };

  //勾选患者/取消勾选患者
  const handleCheckPatient = (selected: boolean, patientSIds: string[], patientWcIds: string[]) => {
    console.log('selected', selected);
    const params = {
      projectNsId,
      patientSIds,
      patientWcIds,
      type: selected ? 1 : 0,
    };
    api.patientManage.postCheckPatient(params).then(res => {
      console.log('勾选成功', res);
    });
  };
  const rowSelection = {
    selectedRowKeys: patientSids,
    onChange: (selectedRowKeys: never[], selectedRows: { sid: string }[]) => {
      const sids: any = [];
      selectedRows.forEach((item: { sid: string }) => {
        sids.push(item.sid);
      });
      setPatientSids(Array.from(new Set(sids)));
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => {
      return ({
        disabled: getExperimentName(record),
      });
    },
    onSelect: (record: any, selected: boolean) => {
      handleCheckPatient(selected, [record.sid], [record.wcId]);
    },
    onSelectAll: (selected: boolean, selectedRows: { sid: string, wcId: string }[]) => {
      const sids: string[] = [];
      const wcIds: string[] = [];
      selectedRows.forEach(item => {
        sids.push(item.sid);
        wcIds.push(item.wcId);
      });
      handleCheckPatient(selected, sids, wcIds);
    },
  };
  const fetchData = (data: any) => {
    const selectArr: string[] = [];
    console.log('data~~~~', data);
    data.dataSource.forEach(item => {
      if (item.checked) {
        selectArr.push(item.sid);
      }
    });
    setPatientSids(selectArr);
  };
  const handleJoinProject = () => {
    api.patientManage.postJoinProject({ projectNsId, sid: projectSid }).then(() => {
      message.success('发送成功');
      refreshList();
    });
  };
  return (
    <div className="patient-manage-cont">
      <div className="title">全部患者</div>
      <div className="tip">
        根据您填写的  <GroupStandard type="join" />、 <GroupStandard type="exclude" /> ，为您筛选勾选出符合条件的患者
      </div>
      <div className="selects">
        筛选：
        <Form form={form} onValuesChange={handleSelectChange}>
          <DoctorRelatedOrg />
          <Sex />
          {
            showSearch
              ?
              <Search form={form} searchKey="searchByName" placeholder="搜索姓名或手机号" focus={true} />
              : <SearchOutlined onMouseEnter={() => setShowSearch(true)} />
          }
        </Form>
      </div>
      <div className="patient-list">
        <Tabs defaultActiveKey="0" onChange={handleToggleTab}>
          <TabPane tab="待邀请" key="0">
          </TabPane>
          <TabPane tab="已邀请" key="1">
          </TabPane>
        </Tabs>
        {
          tabStatus === '0' &&
          <div className="send-btn">
            <Button
              type="primary"
              disabled={patientSids.length === 0 || status !== 1001}
              onClick={debounce(handleJoinProject, 300)}
            >已签署同意书，<br /> 直接加入试验</Button>
            <SendFile
              refreshList={refreshList}
              patientSids={patientSids}
            >
              未签署，发送 <br /> 试验项目书、知情同意书
            </SendFile>
          </div>
        }
        <XzlTable
          columns={tabStatus === '0' ? noSendPatientColumns({ getExperimentName }) : addedPatientColumns()}
          dataKey="teams"
          handleCallback={fetchData}
          category="patientList"
          request={window.$api.patientManage.getPatientList}
          depOptions={tableOptions}
          // noPagination={true}
          tableOptions={{
            rowSelection: tabStatus === '0' ? {
              ...rowSelection,
            } : false,
            // pagination: false,
          }}
        />

      </div>
    </div>
  );
}
export default Patient;
