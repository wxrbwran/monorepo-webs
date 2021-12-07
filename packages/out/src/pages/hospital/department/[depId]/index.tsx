/**
 *
 */
import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { useSelector, useDispatch } from 'umi';
import DepartmentDoctor from '../components/DepartmentDoctor';
import DepartmemtOperator from '../components/DepartmemtOperator';
import DepartmentPatient from '../components/DepartmentPatient';

import './index.scss';

const { TabPane } = Tabs;

const OrgDepartment: FC = () => {
  const dispatch = useDispatch();
  const departmentTab = useSelector((state: IState) => state.department_tab);
  const [tab, setTab] = useState<string>(departmentTab.tab);
  const handleChangeRole = (activeKey: string) => {
    setTab(activeKey);
    dispatch({
      type: 'department_tab/changeTab',
      payload: {
        tab: activeKey,
        inner: 'list',
      },
    });
  };
  useEffect(() => {
    setTab(departmentTab.tab);
  }, [departmentTab]);
  const isList = departmentTab.inner === 'list';
  return (
    <div className="org_department">
      <div className="department-roles">
        <Tabs
          className="department-roles__tabs tab_btn_18"
          activeKey={tab}
          size="middle"
          onChange={handleChangeRole}
        >
          <TabPane className="" tab="医生" key="doctor">
            <div style={{ display: isList ? 'block' : 'none' }}>
              <DepartmentDoctor />
            </div>
          </TabPane>
          <TabPane className="" tab="护士" key="operator">
            <div style={{ display: isList ? 'block' : 'none' }}>
              <DepartmemtOperator />
            </div>
          </TabPane>
          <TabPane className="" tab="患者" key="patient">
            <DepartmentPatient />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
OrgDepartment.title = '科室信息';

export default OrgDepartment;
