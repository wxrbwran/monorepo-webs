import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { Card, Alert, Form, Button, Row, Col } from 'antd';
import { Search, AccountStatus } from 'xzl-web-shared/dist/components/Selects';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import type { XzlTableCallBackProps } from 'xzl-web-shared/dist/components/XzlTable';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
import RoleInfo from '@/components/RoleInfo';
import { handleSelection } from '@/utils/conditions';
import { name, tel, sex, title, patientNum, departmentName, status } from 'xzl-web-shared/dist/utils/columns';
// import ModalForm from '@/components/DragModal/DragModalForm';
import AddDoctorNurse from '../AddDoctorNurse';
import { Role } from 'xzl-web-shared/dist/utils/role';
import * as api from '@/services/api';
// import { debounce } from 'lodash';
import { isOpenSub as getIsOpenSub, upperOrgNsId } from '@/utils/tools';

// interface IDoctor {
//   department?: {
//     nsId: string;
//   };
//   sid: string;
// }
const Doctor: FC = () => {
  const [form] = Form.useForm();
  const isOpenSub = getIsOpenSub();
  const { getFieldValue } = form;
  // const [selectRows, setSelectRows] = useState<IDoctor[]>([]);
  const [unReviewedCount, setUnReviewed] = useState<number>(0);
  const [acceptedStateCount, setAcceptedStateCount] = useState<number>(0);
  const initOptions = isOpenSub
    ? {
      targetNSId: upperOrgNsId(),
      viewRole: Role.DOCTOR.id,
    }
    : {
      sid: window.$storage.getItem('sid'),
      sRole: Role.ORG_ADMIN.id,
      viewRole: Role.DOCTOR.id,
    };
  const [tableOptions, setOptions] = useState<Store>(initOptions);
  const getCountStaff = () => {
    const staffNsid = isOpenSub ? upperOrgNsId() : window.$storage.getItem('nsId');
    api.org.getCountStaff(staffNsid!).then((res) => {
      setUnReviewed(res.unReviewedCount);
      setAcceptedStateCount(res.acceptedStateCount);
    });
  };
  const handleRefresh = () => {
    setOptions({
      ...tableOptions,
    });
    getCountStaff(); // ????????????????????????????????????
  };
  const modalName = {
    ...name,
    render(text: string, record) {
      return (
        <RoleInfo
          info={record}
          role="doctor"
          refresh={handleRefresh}
          trigger={<Button type="link">{text}</Button>}
        ></RoleInfo>
      );
    },
  };
  const columns = [modalName, tel, sex, title, patientNum, departmentName, status];

  const handleSelectChange = (_changedValues: string[], allValues: string[]) => {
    const newConditions = handleSelection(allValues);
    setOptions({ ...tableOptions, conditions: [...newConditions] });
  };

  const handleCallback = (callbackStore: XzlTableCallBackProps) => {
    console.log(34343, callbackStore);
    // setSelectRows(callbackStore.selectedRowKeys);
  };
  const refreshList = () => {
    setOptions({ ...tableOptions });
    getCountStaff();
  };

  useEffect(() => {
    getCountStaff();
  }, []);
  // const handleDelete = debounce(() => {
  //   const params = {
  //     member: [],
  //     orgNSId: window.$storage.getItem('nsId'),
  //   };
  //   selectRows.forEach((doctor: IDoctor) => {
  //     const curDoctor: CommonData = { sid: doctor.sid, sRole: Role.DOCTOR.id };
  //     if (doctor.department) {
  //       curDoctor.nsId = doctor.department.nsId;
  //     }
  //     params.member.push(curDoctor);
  //   });
  //   console.log('paramsvvvv', params);
  //   return api.org
  //     .postMoveOrgDoctor(params)
  //     .then(() => {
  //       message.success('????????????');
  //       refreshList();
  //       return true;
  //     })
  //     .catch(() => {
  //       message.error('????????????');
  //       return true;
  //     });
  // }, 300);
  return (
    <Card bordered={false}>
      <div className="my-10">
        <Form form={form} onValuesChange={handleSelectChange}>
          <AccountStatus></AccountStatus>
          <div className="float-right">
            <div className="inline-flex items-center h-32 mr-10">
              <UserOutlined className="" />
              <span>{acceptedStateCount}</span>
            </div>
            <Search form={form} searchKey="searchByName" value={getFieldValue('searchByName')} />
          </div>
        </Form>
      </div>
      <Row className="mb-10 ">
        <Col span={18}>
        {
          !!unReviewedCount && (
            <Alert
              message={`??????${unReviewedCount}??????????????????????????????????????????`}
              type="warning"
              closable
              showIcon
            />
          )
        }
        </Col>
        {!isOpenSub && (
          <Col span={6} className="text-right">
            <AddDoctorNurse
              role="doctor"
              refresh={refreshList}
              trigger={
                <Button type="link" icon={<PlusOutlined />}>
                  ????????????
                </Button>
              }
            ></AddDoctorNurse>
            {/* <ModalForm
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
              onFinish={async () => handleDelete()}
            >
              <p className="text-center text-red-500">???????????????????????????????????????????????????</p>
            </ModalForm> */}
          </Col>
        )}
      </Row>
      <XzlTable
        columns={columns}
        dataKey="teams"
        request={window.$api.org.getDepartmentRoles}
        depOptions={tableOptions}
        handleCallback={handleCallback}
        tableOptions={{ rowSelection: false }}
      />
    </Card>
  );
};

export default Doctor;
