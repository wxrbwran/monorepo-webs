import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Table, Spin, message } from 'antd';
import { useSelector, useLocation } from 'umi';
import * as api from '@/services/api';
import { pname, groupName, initAt } from 'xzl-web-shared/dist/utils/columns';
import SelectGroup from 'xzl-web-shared/dist/components/SelectGroup';
import { Search } from 'xzl-web-shared/dist/components/Selects';
// import { SearchOutlined } from '@ant-design/icons';
import DiagnosisDetail from '../components/DiagnosisDetail';
import { isEmpty } from 'lodash';
import styles from './index.scss';
// import { handleSelection } from 'xzl-web-shared/dist/utils/conditions';

interface IOnSelectChange {
  (selectedRowKeys: React.ReactText[], selectedRows?: Store[]): void;
}
let timer: any = null;
// 更新ruleId: 1.点击搜索时 2.切换机构时
// 不更新ruleId: 1.轮询加载列表时 2.切出患者列表tab页时（再切回来要用之前的ruleId）
function Patients() {
  const location = useLocation();
  const [form] = Form.useForm();
  const retryTimes = useRef<number>(1);
  const [selectPatient, setSelectPatient] = useState<string[]>([]);
  // const [showSearch, setShowSearch] = useState(false);
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
  const fetchPatientList = (actionLogId: number, initTime?: number) => {
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

  const fetchRuleId = (keyword?: string) => {
    api.education
      .getLogId({ orgNsId: currentOrgInfo.nsId, keyword })
      .then((res) => {
        if (res) {
          fetchPatientList(res?.id);
          sessionStorage.setItem('ruleId', res?.id);
        } else {
          clearInterval(timer);
          setDataSource([]);
          setLoading(false);
        }
      })
      .catch((err: string) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    if (!isEmpty(currentOrgInfo)) {
      setDataSource([]);
      const prevOrgNsId = sessionStorage.getItem('orgNsId');
      const prevRuleId = sessionStorage.getItem('ruleId');
      // 如果orgNsId与之前存储的相等，并且存在ruleId,那直接请求，（此处是切换tab页面，又切回来 的情况,要用之前的id）
      if (prevOrgNsId ===  currentOrgInfo.nsId && prevRuleId) {
        fetchPatientList(Number(prevRuleId));
      } else {
        fetchRuleId(sessionStorage.getItem('keyWord') || '');
      }
      retryTimes.current = 1;
      setLoading(true);
      sessionStorage.setItem('orgNsId', currentOrgInfo.nsId);
    }
  }, [currentOrgInfo]);

  useEffect(() => {
    clearInterval(timer);
    retryTimes.current = 1;
    setLoading(true);
  }, [location]);

  useEffect(() => {

    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, []);

  const refreshList = () => {
    retryTimes.current = 1;
    fetchPatientList(Number(sessionStorage.getItem('ruleId')));
  };

  const handleSelectChange = (_changedValues: string[], allValues: { keyword: string }) => {
    setDataSource([]);
    retryTimes.current = 1;
    setLoading(true);
    fetchRuleId(allValues.keyword);
    sessionStorage.setItem('keyWord', allValues.keyword);
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
    <div className={styles.publicize_patients}>
      <Form form={form} className="text-right" onValuesChange={handleSelectChange}>
        {
          // showSearch
          //   ?
            <Search
              form={form}
              searchKey="keyword"
              placeholder="搜索姓名或诊断名称"
              focus={false}
              float='inherit'
              width={170}
              value={sessionStorage.getItem('keyWord') || ''}
            />
            // : <SearchOutlined onMouseEnter={() => setShowSearch(true)} className="mr-10" />
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
