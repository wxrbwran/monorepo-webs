import React, { useState, useEffect } from 'react';
import { Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useParams } from 'umi';
import { Role } from 'xzl-web-shared/src/utils/role';
import {
  Age, Sex, Address, PatientRole, Search,
} from 'xzl-web-shared/src/components/Selects';
import Organization from '@/components/Selects/Organization';
import XzlTable from 'xzl-web-shared/src/components/XzlTable';
import { handleSelection, initSelectForm } from 'xzl-web-shared/src/utils/conditions';
import {
  name,
  org,
  patientLevel,
  sex,
  age,
  address,
  msgCount,
  noteC,
  upperDoctor,
  lowerDoctor,
} from './columns';
import AddPatient from './components/AddPatient';
// import UnBind from './components/UnBind';
import ChangeDoctor from './components/ChangeDoctor';
import styles from './index.scss';

function Patients() {
  const { level } = useParams<{ level: string }>();
  const [form] = Form.useForm();
  const { setFieldsValue, getFieldValue } = form;
  const sRole = Role[`${level.toLocaleUpperCase()}_DOCTOR`].id;

  const getInitOptions = () => {
    let params: CommonData = {};
    const sessionData = sessionStorage.getItem(level);
    if (sessionData) {
      params = JSON.parse(sessionData);
    }
    const { pageAt, conditions } = params;

    const newOptions = {
      sRole,
      pageAt: pageAt || 1,
      conditions: conditions || [],
    };
    return newOptions;
  };

  const [depOptions, setOptions] = useState({ ...getInitOptions() });
  const [pageAt, setPageAt] = useState<number>(1);
  // 切换左侧菜单or刷新页面or从患者详情返回列表页面保留筛选搜索分页条件
  useEffect(() => {
    const newOptions = getInitOptions();
    if (newOptions.conditions.length > 0) {
      setFieldsValue({
        ...initSelectForm(newOptions.conditions),
      });
    } else {
      form.resetFields();
    }
    setPageAt(newOptions?.pageAt || 1);
    setOptions({
      ...newOptions,
    });
  }, [level]);

  const handleSelectChange = (changedValues: string[], allValues: string[]) => {
    console.log('changedValues', changedValues);
    const newConditions = handleSelection(allValues);
    setPageAt(1);
    setOptions({
      ...depOptions,
      pageAt: 1,
      conditions: [...newConditions],
    });
    const localParams = {
      pageAt: 1,
      conditions: newConditions,
    };
    setPageAt(1);
    sessionStorage.setItem(level, JSON.stringify(localParams));
  };
  const handlePagerChange = (pagination: {current: number}) => {
  //  保存分布参数到本地，2保存页码，当修改级别和备注时，需要刷新本页
    setPageAt(pagination.current);
    const localParams = {
      conditions: depOptions.conditions,
      pageAt: pagination.current,
    };
    sessionStorage.setItem(level, JSON.stringify(localParams));
  };

  const refresh = (params: {pageAt: number} = { pageAt }) => {
    setOptions({ ...depOptions, ...params });
  };
  const changeDoctor = {
    title: '更换医生团队',
    dataIndex: 'sid',
    render: (_text: string, record: IRecord) => (
      <ChangeDoctor data={record} curRole={level} refresh={() => refresh({ pageAt: 1 })} />
    ),
  };

  const columns: CommonData[] = [
    name,
    org,
    patientLevel(refresh),
    noteC(refresh),
    sex,
    age,
    address,
    msgCount,
  ];
  if (level === 'lower') {
    columns.push(upperDoctor);
  }
  if (level === 'upper') {
    columns.push(lowerDoctor);
    columns.push(changeDoctor);
  }
  if (level === 'alone') {
    columns.push(changeDoctor);
  }
  return (
    <div className={styles.patients}>
      {/* <div className={styles.header_tab}>
        <div className={styles.active}>患者</div>
        <div>健康教育</div>
      </div> */}
      <div className={styles.panel}>
        <Form form={form} onValuesChange={handleSelectChange}>
          <div className={styles.select_wrap}>
            <Organization />
            <Address />
            <Age />
            <Sex />
            <PatientRole />
          </div>
          <div className={styles.operating}>
            <div className={styles.search}>
              <Search form={form} searchKey="searchByName" value={getFieldValue('searchByName')} />
            </div>
            <div className={styles.btn_wrap}>
              {/* <UnBind selectedPatientId={selectedPatientId} /> */}
              {level === 'alone' && (
                <Button className="m-2" type="primary" icon={<PlusOutlined />}>
                  <AddPatient>添加患者</AddPatient>
                </Button>
              )}
              {/* <Button disabled>群发消息</Button> */}
            </div>
          </div>
        </Form>
        <XzlTable
          columns={columns}
          dataKey="teams"
          category="patientList"
          request={window.$api.doctor.getDoctorPatients}
          depOptions={depOptions}
          tableOptions={{
            onChange: handlePagerChange,
            rowSelection: false,
          }}
        />
      </div>
    </div>
  );
}
Patients.title = '患者列表';
export default Patients;
