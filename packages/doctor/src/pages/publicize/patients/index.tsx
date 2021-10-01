import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'antd';
import { useSelector } from 'umi';
import  * as api from '@/services/api';
import { pname, groupName, initAt } from 'xzl-web-shared/src/utils/columns';
import SelectGroup from 'xzl-web-shared/src/components/SelectGroup';
import { Search } from 'xzl-web-shared/src/components/Selects';
import { SearchOutlined } from '@ant-design/icons';
import DiagnosisDetail from '../components/DiagnosisDetail';
import { isEmpty } from 'lodash';
// import { handleSelection } from 'xzl-web-shared/src/utils/conditions';

interface IOnSelectChange {
  (selectedRowKeys: React.ReactText[], selectedRows?: Store[]): void;
}
let timer: any = null;
let len = [];
function Patients() {
  const [form] = Form.useForm();
  const [selectPatient, setSelectPatient] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const currentOrgInfo = useSelector((state: IState) => state.education.currentOrgInfo);
  const groupList = useSelector((state: IState) => state.education.groupList);
  const columns = [pname, groupName, initAt];
  const [dataSource, setDataSource] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  // const [len, setLen] = useState<number[]>([]);

  const onSelectChange: IOnSelectChange = (keys: any[]) => {
    setSelectPatient(keys);
  };
  const rowSelection = {
    selectedRowKeys: selectPatient,
    onChange: onSelectChange,
  };

  const fetchPatientList = (actionLogId: string) => {
    api.education.getPatientsList({ actionLogId })
      .then((res) => {
        let newLen = [...len, res.lists.length];
        if (len.length === 3){
          len = [res.lists.length];
          newLen = [res.lists.length];
        } else {
          len = [...newLen];
        }
        if (newLen.length === 3){
          if (Array.from(new Set(newLen)).length === 1){
            setDataSource(res.lists);
            setLoading(false);
            clearInterval(timer);
          }
        }
      })
      .catch((err: string) => {
        console.log('err', err);
      });
  };

  const changeTableOption = (keyword: string) => {
    api.education
      .getLogId({ orgNsId: currentOrgInfo.nsId, keyword })
      .then((res) => {
        timer = setInterval(() => {
          fetchPatientList(res?.id);
        }, 2000);
      })
      .catch((err: string) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    if (!isEmpty(currentOrgInfo)){
      changeTableOption(window.$storage.getItem('keyWord'));
    }
  }, [currentOrgInfo]);

  useEffect(() => {
    window.$storage.setItem('keyWord', '');
    return () => {
      window.$storage.setItem('keyWord', '');
      // dispatch({
      //   type: 'education/setCurrentOrgInfo',
      //   payload: {},
      // });
    };
  }, []);

  const refreshList = () => {
    changeTableOption(window.$storage.getItem('keyWord'));
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
                placeholder="搜索姓名或诊断名称"
                focus={true}
                float='inherit'
                width={170}
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
        <Table
          loading={loading}
          rowKey={(record) => record.sid}
          rowSelection={rowSelection}
          columns={[...columns, action]}
          dataSource={dataSource}
        />
      }
    </div>
  );
}

export default Patients;
