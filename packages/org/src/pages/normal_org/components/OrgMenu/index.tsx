import React, { FC, useState, useLayoutEffect } from 'react';
import { useSelector, history, useDispatch } from 'umi';
import { Row, Col, Space, Button, Popover } from 'antd';
import { PlusOutlined, /* DeleteOutlined, */ EditOutlined } from '@ant-design/icons';
import AddEditDepartment from '@/components/AddEditDepartment';
// import DeleteDepOrg from '@/components/DeleteDepOrg';
import AddEditHospital from '@/components/AddEditHospital';
// import { addtionalMenuList } from 'xzl-web-shared/dist/src/utils/consts';

import styles from './index.scss';

const OrgMenu: FC = () => {
  const dispatch = useDispatch();
  const currentOrg = useSelector((state: Store) => state.org.currentOrg);
  const orgMenu = useSelector((state: Store) => state.org_menu);
  const infoByList = useSelector((state: IState) => state.org.infoByList);
  const { departmentInfoList, orgBase } = currentOrg;
  const orgId = infoByList.nsId;
  const [active, setActive] = useState<string>('org');
  useLayoutEffect(() => {
    const { type, department, group } = orgMenu;
    if (type === 'department') {
      setActive(department.id);
    } else if (type === 'group') {
      setActive(group);
    }
  }, []);
  const departmentEditList = ['删除', '编辑'];
  const handleOrgMenuStore = (payload: OrgMenuModelState) => {
    dispatch({
      type: 'org_menu/changeOrgMenu',
      payload,
    });
  };
  const resetDepartmentTab = () => {
    dispatch({
      type: 'department_tab/changeTab',
      payload: { tab: 'doctor', inner: 'list' },
    });
  };
  // const nav2OrgGroupPage = (group: string) => {
  //   const team = `${group}Team`;
  //   setActive(team);
  //   dispatch({
  //     type: 'department_tab/changeTab',
  //     payload: { tab: 'operator', inner: 'list' },
  //   });
  //   handleOrgMenuStore({
  //     type: 'group',
  //     department: undefined,
  //     group: team,
  //   });
  //   history.push(`/normal_org/${orgId}/group/${group}`);
  // };
  const nav2OrgDepartmentPage = (department: Department) => {
    setActive(department.id);
    resetDepartmentTab();
    handleOrgMenuStore({
      type: 'department',
      department,
      group: '',
    });
    history.push(`/normal_org/${orgId}/department/${department.id}`);
  };
  const nav2OrgPage = () => {
    setActive('org');
    resetDepartmentTab();
    handleOrgMenuStore({
      type: 'org',
      department: {},
      group: '',
    });
    history.push(`/normal_org/${orgId}`);
  };
  const modalCretor = (action: string, _level: string, info?: Department) => {
    switch (action) {
      case '编辑':
        return (
          <AddEditDepartment mode="edit" info={info}>
            <Button className={styles.icon_btn} icon={<EditOutlined />} size="small" type="ghost">
              {action}
            </Button>
          </AddEditDepartment>
        );
      // case '删除':
      //   return (
      //     <DeleteDepOrg level={level}>
      //       <Button
      //         className={styles.icon_btn}
      //         icon={<DeleteOutlined />}
      //         size="small"
      //         type="ghost"
      //       >
      //         {action}
      //       </Button>
      //     </DeleteDepOrg>
      //   );
      default:
        return null;
    }
  };
  return (
    <Row justify="start" className={styles.org_menu}>
      <Col flex="auto">
        <Row
          className={`${styles.item} ${active === 'org' ? styles.active : ''}`}
          justify="space-between"
          align="middle"
        >
          <Col onClick={nav2OrgPage} className={styles.name}>
            <Popover
              placement="topLeft"
              title={null}
              className={styles.name}
              content={<div>{orgBase.name}</div>}
            >
              <span>{orgBase.name}</span>
            </Popover>
          </Col>
          <Col>
            <Space>
              <div className="pointer">
                <AddEditDepartment mode="add">
                  <Button
                    className={styles.icon_btn}
                    icon={<PlusOutlined />}
                    size="small"
                    type="ghost"
                  >
                    科室
                  </Button>
                </AddEditDepartment>
              </div>
              <div className="pointer">
                <AddEditHospital
                  mode="edit"
                  info={{ nsId: orgId }}
                  refresh={() => {
                    dispatch({
                      type: 'org/getOrgMenu',
                      payload: {
                        nsId: orgId,
                        sid: infoByList.sid,
                      },
                    });
                  }}
                >
                  <Button
                    className={styles.icon_btn}
                    icon={<EditOutlined />}
                    size="small"
                    type="ghost"
                  >
                    编辑
                  </Button>
                </AddEditHospital>
              </div>
              {/* <div className="pointer">
                <DeleteDepOrg level="org">
                  <Button
                    className={styles.icon_btn}
                    icon={<DeleteOutlined />}
                    size="small"
                    type="ghost"
                  >
                    删除
                  </Button>
                </DeleteDepOrg>
              </div> */}
            </Space>
          </Col>
        </Row>
        {/* 护士团队等 */}
        {/* {Object.keys(addtionalMenuList).map((group) => {
          const [team] = group.split('Team');
          if (currentOrg[group] !== undefined) {
            return (
              <Row
                className={`${styles.item} ${
                  active === group ? styles.active : ''
                }`}
                justify="space-between"
                align="middle"
                onClick={() => nav2OrgGroupPage(team)}
                key={group}
              >
                <Col className={styles.name}>
                  {`${currentOrg[group].name}(${currentOrg[group].count})`}
                </Col>
              </Row>
            );
          }
          return null;
        })} */}
        {departmentInfoList
          .filter((dep: Department) => dep?.labels.includes('department'))
          .map((department: Department) => (
            <Row
              className={`${styles.item} ${active === department.id ? styles.active : ''}`}
              justify="space-between"
              align="middle"
              key={department.id}
              onClick={() => nav2OrgDepartmentPage(department)}
            >
              <Col className={styles.name} title={department.name}>
                {department.name}
              </Col>
              <Col>
                <Space>
                  {departmentEditList.map((action) => (
                    <div className="cursor" key={action}>
                      {modalCretor(action, 'department', department)}
                    </div>
                  ))}
                </Space>
              </Col>
            </Row>
          ))}
      </Col>
    </Row>
  );
};

export default OrgMenu;
