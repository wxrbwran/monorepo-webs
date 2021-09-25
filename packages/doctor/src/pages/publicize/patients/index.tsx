import React, { useState } from 'react';
import { Form } from 'antd';
import type { XzlTableCallBackProps } from 'xzl-web-shared/src/components/XzlTable';
import { clName, patientGroup, bindTime } from 'xzl-web-shared/src/utils/columns';
import XzlTable from 'xzl-web-shared/src/components/XzlTable';
import SelectGroup from 'xzl-web-shared/src/components/SelectGroup';
import { Search } from 'xzl-web-shared/src/components/Selects';
import { SearchOutlined } from '@ant-design/icons';
import { handleSelection } from 'xzl-web-shared/src/utils/conditions';

function Patients() {
  const [form] = Form.useForm();
  const [selectPatient, setSelectPatient] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [tableOptions, setOptions] = useState<CommonData>({
    sid: window.$storage.getItem('sid'),
  });
  const columns = [clName, patientGroup, bindTime];

  const handleCallback = (callbackStore: XzlTableCallBackProps) => {
    setSelectPatient(callbackStore.selectedRows);
  };

  const refreshList = () => {
    setOptions({ ...tableOptions }); //刷新列表
    // 刷新分组列表
    //  dispatch({
    //   type: 'project/fetchGroupList',
    //   payload: projectNsId,
    // });
  };

  const handleSelectChange = (_changedValues: string[], allValues: string[]) => {
    setOptions({ ...tableOptions, conditions: handleSelection(allValues) });
  };

  const action = {
    title: '诊断',
    dataIndex: 'operate',
    align: 'center',
    className: 'action',
    render: (_text: string, _record: any) => (
      <div>诊断</div>
    ),
  };

  return (
    <div>
      <Form form={form} className="text-right"  onValuesChange={handleSelectChange}>
        {
          showSearch
            ?
              <Search
                form={form}
                searchKey="searchByName"
                placeholder="搜索姓名或手机号"
                focus={true}
                float='inherit'
              />
            : <SearchOutlined onMouseEnter={() => setShowSearch(true)} className="mr-10"/>
        }
        <SelectGroup
          selectPatient={selectPatient}
          refreshList={refreshList}
          // request={window.$api.patientManage.postGroupPatient}
          request={() => {}}
          groupList={[]}
        >
          加入试验分组
        </SelectGroup>
      </Form>
      <XzlTable
        columns={[...columns, action]}
        category="patientList"
        dataKey="teams"
        // request={window.$api.patientManage.getTestPatients}
        request={() => {}}
        depOptions={tableOptions}
        handleCallback={handleCallback}
        // noPagination={true}
        tableOptions={{
          pagination: false,
        }}
      />
    </div>
  );
}

export default Patients;
