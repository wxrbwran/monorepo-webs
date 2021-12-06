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
  const pageSize = 10;
  const [loading, setLoading] = useState(true);

  const onSelectChange: IOnSelectChange = (keys: any[]) => {
    setSelectPatient(keys);
  };
  const rowSelection = {
    selectedRowKeys: selectPatient,
    onChange: onSelectChange,
  };
  // 如果返回条数不足10条
  //   1.页码为1并且请求次数小于3，则继续请求第一页，
  //   2.页码大于1，则直接结束请求
  // 等于10条，继续请求
  const fetchPatientList = (actionLogId: string, pageAt: number) => {
    const params = {
      actionLogId,
      pageAt,
      pageSize,
    };
    clearInterval(timer);
    api.education.getPatientsList(params)
      .then((res) => {
        if (pageAt === 1) {
          setDataSource([...res.lists]);
        } else {
          setDataSource((pre) => {
            return [...pre, ...res.lists];
          });
        }
        if (res.lists.length < pageSize) {
          if (pageAt === 1 && retryTimes.current < 3) {
            retryTimes.current += 1;
            clearTimeout(timer);
            timer = setTimeout(() => {
              fetchPatientList(actionLogId, 1);
            }, 2000);
          } else {
            clearTimeout(timer);
            setLoading(false);
          }
        } else {
          fetchPatientList(actionLogId, pageAt + 1);
        }
      })
      .catch((err: any) => {
        console.log('err', err);
        setLoading(false);
        message.error(err?.result || '加载失败');
      });
  };

  const changeTableOption = (keyword: string) => {
    api.education
      .getLogId({ orgNsId: currentOrgInfo.nsId, keyword })
      .then((res) => {
        if (res) {

          fetchPatientList(res?.id, 1);
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
      changeTableOption(window.$storage.getItem('keyWord'));
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
