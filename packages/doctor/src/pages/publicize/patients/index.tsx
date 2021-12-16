import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Table, Spin, message } from 'antd';
import { useSelector, useLocation } from 'umi';
import * as api from '@/services/api';
import { pname, groupName, initAt } from 'xzl-web-shared/src/utils/columns';
import SelectGroup from 'xzl-web-shared/src/components/SelectGroup';
import { Search } from 'xzl-web-shared/src/components/Selects';
import { SearchOutlined } from '@ant-design/icons';
import DiagnosisDetail from '../components/DiagnosisDetail';
import { isEmpty } from 'lodash';
import styles from './index.scss';
// import { handleSelection } from 'xzl-web-shared/src/utils/conditions';

interface IOnSelectChange {
  (selectedRowKeys: React.ReactText[], selectedRows?: Store[]): void;
}
let timer: any = null;
function Patients() {
  const location = useLocation();
  const [form] = Form.useForm();
  const retryTimes = useRef<number>(1);
  const [selectPatient, setSelectPatient] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);
  const groupList = useSelector((state: IState) => state.education.groupList);
  const columns = [pname, groupName, initAt];
  const [dataSource, setDataSource] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  const onSelectChange: IOnSelectChange = (keys: any[]) => {
    setSelectPatient(keys);
  };
  const rowSelection = {
    selectedRowKeys: selectPatient,
    onChange: onSelectChange,
  };
  // 返回条数大于0，继续请求
  // 返回条数为0并且请求次数小于3，则继续请求，否则结束请求
  const fetchPatientList = (actionLogId: string, initTime?: number) => {
    console.log('dataSource.reverse', dataSource.reverse());
    const params = { actionLogId, initTime };
    if (initTime) {
      params.initTime = initTime;
    }
    clearInterval(timer);
    api.education.getPatientsList(params)
      .then((res) => {
        const curInitTime = isEmpty(res.lists) ? initTime : [...res.lists].reverse()?.[0]?.initAt;
        setDataSource((pre) => {
          return [...pre, ...res.lists];
        });
        if (res.lists.length === 0) {
          if (retryTimes.current <= 3) {
            retryTimes.current += 1;
            clearTimeout(timer);
            timer = setTimeout(() => {
              fetchPatientList(actionLogId, curInitTime);
            }, 2000);
          } else {
            clearTimeout(timer);
            setLoading(false);
          }
        } else {
          timer = setTimeout(() => {
            fetchPatientList(actionLogId, curInitTime);
          }, 2000);
        }
      })
      .catch((err: any) => {
        console.log('err', err);
        setLoading(false);
        clearTimeout(timer);
        message.error(err?.result || '加载失败');
      });
  };

  const changeTableOption = (keyword: string, source?: string) => {
    // 首次初始化init id并存起来，
    // 输入关键字会重新请求与关键字相关的id，清空关键字，还用之前存储的init id。
    // 切换机构需要更新存储的init id
    const ruleId = sessionStorage.getItem('ruleId');
    if (ruleId && keyword === '' && source !== 'changeOrg') {
      fetchPatientList(ruleId);
    } else {
      api.education
        .getLogId({ orgNsId: currentOrgInfo.nsId, keyword })
        .then((res) => {
          if (res) {
            fetchPatientList(res?.id);
            if (!ruleId) {
              sessionStorage.setItem('ruleId', res?.id);
            }
          } else {
            clearInterval(timer);
            setDataSource([]);
            setLoading(false);
          }
        })
        .catch((err: string) => {
          console.log('err', err);
        });
    }

  };

  useEffect(() => {
    if (!isEmpty(currentOrgInfo)) {
      changeTableOption(window.$storage.getItem('keyWord'), 'changeOrg');
      retryTimes.current = 1;
      setLoading(true);
    }
  }, [currentOrgInfo]);

  useEffect(() => {
    clearInterval(timer);
    retryTimes.current = 1;
    setLoading(true);
  }, [location]);

  useEffect(() => {
    window.$storage.setItem('keyWord', '');
    return () => {
      window.$storage.setItem('keyWord', '');
      clearTimeout(timer);
      setLoading(false);
      // dispatch({
      //   type: 'education/setCurrentOrgInfo',
      //   payload: {},
      // });
    };
  }, []);

  const refreshList = () => {
    retryTimes.current = 1;
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
      <Form form={form} className="text-right" onValuesChange={handleSelectChange}>
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
            : <SearchOutlined onMouseEnter={() => setShowSearch(true)} className="mr-10" />
        }
        <SelectGroup
          selectPatient={selectPatient}
          refreshList={refreshList}
          request={window.$api.education.postGroupPatient}
          // request={() => {}}
          groupList={groupList}
        >
          加入宣教分组
        </SelectGroup>
      </Form>
      {

        <Table
          // loading={loading}
          rowKey={(record) => record.sid}
          rowSelection={rowSelection}
          columns={[...columns, action]}
          dataSource={dataSource}
          pagination={false}
        />
      }
      {
        loading && <Spin tip="数据量较大，拼命查询中" className={styles.loading_append} />
      }
    </div>
  );
}

export default Patients;
