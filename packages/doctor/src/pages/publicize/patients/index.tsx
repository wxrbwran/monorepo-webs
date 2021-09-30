import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import { useSelector } from 'umi';
import  * as api from '@/services/api';
import type { XzlTableCallBackProps } from 'xzl-web-shared/src/components/XzlTable';
import { pname, groupName, initAt } from 'xzl-web-shared/src/utils/columns';
import XzlTable from 'xzl-web-shared/src/components/XzlTable';
import SelectGroup from 'xzl-web-shared/src/components/SelectGroup';
import { Search } from 'xzl-web-shared/src/components/Selects';
import { SearchOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import DiagnosisDetail from '../components/DiagnosisDetail';
// import { handleSelection } from 'xzl-web-shared/src/utils/conditions';

function Patients() {
  const [form] = Form.useForm();
  const [selectPatient, setSelectPatient] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const currentOrgInfo = useSelector((state: IState) => state.education.currentOrgInfo);
  const [tableOptions, setOptions] = useState<CommonData>({});
  const groupList = useSelector((state: IState) => state.education.groupList);
  const columns = [pname, groupName, initAt];

  const handleCallback = (callbackStore: XzlTableCallBackProps) => {
    console.log('callbackStore', callbackStore);
    setSelectPatient(callbackStore.selectedRowKeys);
  };

  const changeTableOption = (keyword: string) => {
    api.education
      .getLogId({ orgNsId: currentOrgInfo.nsId, keyword })
      .then((res) => {
        if (res?.id){
          setOptions({ actionLogId: res.id });
        } else {
          setOptions({});
        }
      })
      .catch((err: string) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    changeTableOption(window.$storage.getItem('keyWord'));
  }, [currentOrgInfo]);

  useEffect(() => {
    window.$storage.setItem('keyWord', '');
    return () => {
      window.$storage.setItem('keyWord', '');
    };
  }, []);

  const refreshList = () => {
    // setOptions({ ...tableOptions }); //刷新列表
    changeTableOption(window.$storage.getItem('keyWord'));
    // 刷新分组列表
    //  dispatch({
    //   type: 'project/fetchGroupList',
    //   payload: projectNsId,
    // });
  };

  const handleSelectChange = (_changedValues: string[], allValues: { keyword: string }) => {
    changeTableOption(allValues.keyword);
    window.$storage.setItem('keyWord', allValues.keyword);
    // setOptions({ ...tableOptions, keyword: allValues.keyword });
  };

  const action = {
    title: '诊断',
    dataIndex: 'operate',
    align: 'center',
    className: 'action',
    render: (_text: string, record: any) => (
      <DiagnosisDetail sid={record.sid}>
        <Button type="link" className="text-base">查看详情</Button>
      </DiagnosisDetail>
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
                searchKey="keyword"
                placeholder="搜索姓名或手机号"
                focus={true}
                float='inherit'
              />
            : <SearchOutlined onMouseEnter={() => setShowSearch(true)} className="mr-10"/>
        }
        <SelectGroup
          selectPatient={selectPatient}
          refreshList={refreshList}
          request={window.$api.education.postGroupPatient}
          // request={() => {}}
          groupList={groupList}
        >
          加入试验分组
        </SelectGroup>
      </Form>
      {
        <XzlTable
          columns={[...columns, action]}
          dataKey="lists"
          request={!isEmpty(tableOptions) ? window.$api.education.getPatientsList : () => {}}
          // request={() => {}}
          depOptions={tableOptions}
          handleCallback={handleCallback}
          noPagination={true}
          tableOptions={{
            pagination: false,
            timeOut: true,
          }}
        />
      }
    </div>
  );
}

export default Patients;
