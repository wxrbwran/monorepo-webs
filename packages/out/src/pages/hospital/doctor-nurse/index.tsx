import type { FC } from 'react';
import React from 'react';
import { Tabs } from 'antd';
import Doctor from './components/DoctorPanel';
import Nurse from './components/NursePanel';
// import { useSelector, useDispatch } from 'umi';

const { TabPane } = Tabs;

const DoctorNurse: FC = () => {
  // const dispatch = useDispatch();
  // const departmentTab = useSelector((state: IState) => state.department_tab);
  // const [tab, setTab] = useState<string>(departmentTab.tab);
  // const handleChangeRole = (activeKey: string) => {
  //   setTab(activeKey);
  //   dispatch({
  //     type: 'department_tab/changeTab',
  //     payload: {
  //       tab: activeKey,
  //       inner: 'list',
  //     },
  //   });
  // };
  // useEffect(() => {
  //   setTab(departmentTab.tab);
  // }, [departmentTab]);
  return (
    <div>
      <Tabs size="large" onChange={() => {}} className="tab_btn_18">
        <TabPane className="" tab="医生" key="doctor">
          <Doctor></Doctor>
        </TabPane>
        <TabPane className="" tab="护士" key="operator">
          <Nurse></Nurse>
        </TabPane>
      </Tabs>
    </div>
  );
};
DoctorNurse.title = '医生护士管理';

export default DoctorNurse;
