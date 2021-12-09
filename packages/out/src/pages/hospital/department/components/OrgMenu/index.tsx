import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { useLocation, history } from 'umi';
import { Row, Button, Menu } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import AddEditDepartment from '@/components/AddEditDepartment';
// import DeleteDepOrg from '@/components/DeleteDepOrg';
// import AddEditHospital from '@/components/AddEditHospital';
import styles from './index.scss';
import { isOpenSub as getIsOpenSub, upperOrgNsId } from '@/utils/tools';

const OrgMenu: FC = () => {
  // const dispatch = useDispatch();
  const [departmentList, setDepartmentList] = useState([]);
  const location = useLocation();
  const isOpenSub = getIsOpenSub();
  const getDepList = () => {
    const params = {
      sid: isOpenSub ? sessionStorage.getItem('upperOrgSid') : window.$storage.getItem('sid'),
      nsId: isOpenSub ? upperOrgNsId() : window.$storage.getItem('nsId'),
    };
    window.$api.org.getOrgMenu(params).then(res => {
      const depList = res.departmentInfoList
        .filter((dep: Department) => dep.labels.includes('department'));
      setDepartmentList(depList);
      const urlDepId = location.query?.depId  || depList?.[0].id;
      history.replace(`/hospital/department/list?depId=${urlDepId}`);
    });
  };
  useEffect(() => {
    getDepList();
  }, []);

  const nav2OrgDepartmentPage = (department: Department) => {
    console.log('department', department);
    history.replace(`/hospital/department/list?depId=${department.id}`);
  };
  return (
    <Row justify="start" align ="top" className={styles.org_menu}>
      {
        departmentList.length > 0 && (
          <Menu className="w-full pt-90" defaultSelectedKeys={[location.query?.depId || departmentList[0]?.id]}>
            {departmentList
              .map((department: Department) => (
                <Menu.Item key={department.id} onClick={() => nav2OrgDepartmentPage(department)}>
                  <div className={`flex justify-between items-center ${styles.dep_item}`}>
                    <div className={styles.name} title={department.name}>{department.name}</div>
                    <EditOutlined />
                  </div>
                </Menu.Item>
              ))}
          </Menu>
        )
      }
      {
        !isOpenSub && (
          <div className="pl-16 mt-10">
            <AddEditDepartment mode="add" refresh={getDepList}>
              <Button icon={<PlusOutlined />} type="link" className="px-0">
                增加科室1
              </Button>
            </AddEditDepartment>
          </div>
        )
      }
    </Row>
  );
};

export default OrgMenu;
