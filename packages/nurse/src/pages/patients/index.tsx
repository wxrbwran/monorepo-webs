import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import { useSelector } from 'umi';
import { Organization } from '@/components/Selects';
import XzlTable from 'xzl-web-shared/dist/src/components/XzlTable';
import {
  name, tel, sex, org, dep, checked, imgCount, createTime,
} from './columns';
import styles from './index.scss';

function Patients() {
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  // const nurseSid = '1525';
  const nurseSid = window.$storage.getItem('sid');
  const { isLogin } = useSelector((state: IState) => state.auth);

  const [depOptions, setOptions] = useState({ nurseSid, pageAt: 1 });

  useEffect(() => {
    if (isLogin) {
      console.log('storagesid', window.$storage.getItem('sid'));
      setOptions({
        nurseSid: window.$storage.getItem('sid'),
        pageAt: Number(sessionStorage.getItem('pageAt')) || 1,
      });
    }
  }, [isLogin]);

  const handleSelectChange = (changedValues: string[], allValues: string[]) => {
    console.log('changedValues', changedValues);
    const { organization, department } = allValues;
    setOptions({
      ...depOptions,
      pageAt: 1,
    });
    if (organization) {
      depOptions.orgId = allValues.organization;
    } else {
      delete depOptions.orgId;
    }
    if (department) {
      depOptions.departmentId = allValues.department;
    } else {
      delete depOptions.departmentId;
    }
    setOptions({ ...depOptions });
    // change医院清空科室对应fieldsValue
    if (Object.keys(changedValues).includes('organization')) {
      setFieldsValue({ department: '' });
    }
    // 没机构清空科室参数
    if (!allValues.organization) {
      setOptions({
        ...depOptions,
        pageAt: 1,
      });
    }
  };
  const handleCallback = (selected: string[]) => {
    console.log(selected);
  };
  const handlePagerChange = (pagination: { current: number }) => {
    setOptions({
      ...depOptions,
      pageAt: pagination.current,
    });
    sessionStorage.setItem('pageAt', pagination.current.toString());
  };

  const columns: CommonData[] = [
    name, tel, sex, org, dep, checked, imgCount, createTime,
  ];
  return (
    <div className={styles.patients}>
      <div className={styles.panel}>
        <Form form={form} onValuesChange={handleSelectChange}>
          <div className={styles.select_wrap}>
            <Organization />
          </div>
        </Form>
        {
          isLogin && (
          <XzlTable
            columns={columns}
            dataKey="workOrderInfoList"
            request={window.$api.doctor.getNursePatients}
            depOptions={depOptions}
            handleCallback={handleCallback}
            tableOptions={{
              onChange: handlePagerChange,
              rowSelection: false,
            }}
          />
          )
        }
      </div>
    </div>
  );
}
Patients.title = '患者列表';
export default Patients;
