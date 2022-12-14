import type { FC } from 'react';
import React, { useState } from 'react';
import { Card, message, Form, Button, Row, Col } from 'antd';
import { Search } from 'xzl-web-shared/dist/components/Selects';
import type { XzlTableCallBackProps } from 'xzl-web-shared/dist/components/XzlTable';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
// import MoveOutHospital from '@/components/MoveOutHospital';
import ModalForm from '@/components/DragModal/DragModalForm';
import { PlusOutlined } from '@ant-design/icons';
import { handleSelection } from '@/utils/conditions';
import { name, tel, sex, departmentName /* , status */ } from 'xzl-web-shared/dist/utils/columns';
import AddDoctorNurse from '../AddDoctorNurse';
// import AssignDepartment from '../AssignDepartment';
import { Role } from 'xzl-web-shared/dist/utils/role';
import { isOpenSub as getIsOpenSub, upperOrgNsId } from '@/utils/tools';
import * as api from '@/services/api';
import { isEmpty } from 'lodash';

interface IDoctor {
  department?: {
    nsId: string;
  };
  sid: string;
}
const Nurse: FC = () => {
  const [form] = Form.useForm();
  const isOpenSub = getIsOpenSub();
  const { getFieldValue } = form;
  const [selectRows, setSelectRows] = useState<IDoctor[]>([]);
  const initOptions = isOpenSub
    ? {
      targetNSId: upperOrgNsId(),
      viewRole: Role.NURSE.id,
    }
    : {
      sid: window.$storage.getItem('sid'),
      sRole: Role.ORG_ADMIN.id,
      viewRole: Role.NURSE.id,
    };
  const [tableOptions, setOptions] = useState<Store>(initOptions);
  // const handleRefresh = () => {
  //   setOptions({
  //     ...tableOptions,
  //   });
  // };
  // const modalName = {
  //   ...name,
  //   render(text, record) {
  //     return (
  //       <RoleInfo
  //         info={record}
  //         refresh={handleRefresh}
  //         role="nurse"
  //         trigger={<Button type="link">{text}</Button>}
  //       ></RoleInfo>
  //     );
  //   },
  // };
  const columns = [name, tel, sex, departmentName /* , status */];

  const handleSelectChange = (_changedValues: string[], allValues: string[]) => {
    setOptions({ ...tableOptions, conditions: handleSelection(allValues) });
  };
  const handleCallback = (callbackStore: XzlTableCallBackProps) => {
    console.log('callbackStore', callbackStore);
    setSelectRows(callbackStore.selectedRowKeys);
  };
  const refreshList = () => {
    setOptions({ ...tableOptions });
  };

  const handleDelete = async () => {
    const params = {
      member: [],
      orgNSId: window.$storage.getItem('nsId'),
    };
    selectRows.forEach((doctor: IDoctor) => {
      const curDoctor: CommonData = { sid: doctor.sid, sRole: Role.DOCTOR.id };
      if (doctor.department) {
        curDoctor.nsId = doctor.department.nsId;
      }
      params.member.push(curDoctor);
    });
    await api.org.postMoveOrgNurse(params);
    message.success('????????????');
    refreshList();
    return true;
  };
  return (
    <Card bordered={false}>
      <div className="my-10 ">
        <Form form={form} onValuesChange={handleSelectChange}>
          {/* <AccountStatus></AccountStatus> */}
          <div className="float-right">
            {/* <div className="inline-flex items-center h-32 mr-10">
              <UserOutlined className="" />
              <span>2</span>
            </div> */}
            <Search form={form} searchKey="searchByName" value={getFieldValue('searchByName')} />
          </div>
        </Form>
      </div>
      <Row className="mb-10 pt-10" style={{ width: '100%' }}>
        {/* <Col span={15}>
          <Alert message="????????????????????????????????????????????????" type="warning" closable />
        </Col> */}
        {!isOpenSub && (
          <Col span={24} className="text-right">
            <AddDoctorNurse
              role="nurse"
              refresh={refreshList}
              trigger={
                <Button type="link" icon={<PlusOutlined />}>
                  ????????????
                </Button>
              }
            ></AddDoctorNurse>
            {/* <AssignDepartment
              selectId={selectId}
              refresh={refreshList}
              trigger={
                <Button type="ghost" className="ml-10" disabled={isEmpty(selectId)}>
                  ????????????
                </Button>
              }
            ></AssignDepartment> */}

            {/* <MoveOutHospital
              selectId={selectId}
              refresh={refreshList}
              trigger={
                <Button type="primary" danger className="ml-10" disabled={isEmpty(selectId)}>
                  ????????????
                </Button>
              }
            ></MoveOutHospital> */}

            <ModalForm
              title="???????????????"
              trigger={
                <Button type="primary" danger className="ml-10" disabled={isEmpty(selectRows)}>
                  ????????????
                </Button>
              }
              layout="horizontal"
              colon={false}
              modalProps={{
                width: 570,
                okText: '??????',
              }}
              onFinish={handleDelete}
            >
              <p className="text-center text-red-500">???????????????????????????????????????????????????</p>
            </ModalForm>
          </Col>
        )}
      </Row>
      <div className="mb-10 text-right"></div>
      <XzlTable
        columns={columns}
        dataKey="teams"
        request={window.$api.org.getDepartmentRoles}
        depOptions={tableOptions}
        handleCallback={handleCallback}
      ></XzlTable>
    </Card>
  );
};

export default Nurse;
