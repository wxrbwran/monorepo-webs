import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { Button, Form, message, Alert, Popconfirm } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation } from 'umi';
import type { XzlTableCallBackProps } from 'xzl-web-shared/dist/components/XzlTable';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
// import MoveOutHospital from '@/components/MoveOutHospital';
import { Search } from 'xzl-web-shared/dist/components/Selects';
import { Role } from 'xzl-web-shared/dist/utils/role';
import { handleSelection } from '@/utils/conditions';
import * as api from '@/services/api';
import { avatar, name, sex, title, patientNum } from 'xzl-web-shared/dist/utils/columns';
import AddDoctor from '@/components/AddDoctor';
import { isOpenSub as getIsOpenSub } from '@/utils/tools';
import { debounce, isEmpty } from 'lodash';

interface ILocation {
  query: {
    depId?: string;
  };
}
const DepartmentDoctor: FC = () => {
  const isOpenSub = getIsOpenSub();
  const [form] = Form.useForm();
  const [total, setTotal] = useState<number>(0);
  const location: ILocation = useLocation<ILocation>();
  const [depId, setDepId] = useState(location.query?.depId);
  const [selectDocs, setSelectDocs] = useState<React.ReactText[]>([]);
  const [tableOptions, setOptions] = useState<Store>({
    targetNSId: location.query?.depId,
    viewRole: Role.DOCTOR.id,
  });
  const [noHeadDoctor, setNotHeadDoctor] = useState(false);
  const fetchDepHeadDoctor = (params) => {
    // getManagementHeadDoctor
    api.management.getManagementHeadDoctor(params).then(res => {
      console.log('=======2', res);
      setNotHeadDoctor(!!isEmpty(res.teams));
    });
  };
  useEffect(() => {
    const urlDepId = location.query?.depId;
    setNotHeadDoctor(null);
    if (urlDepId && depId !== urlDepId) {
      setDepId(urlDepId);
      setOptions({ ...tableOptions, targetNSId: location.query?.depId });
      fetchDepHeadDoctor({ departmentNsId: urlDepId });
    }
  }, [location]);
  const handleCallback = (params: XzlTableCallBackProps) => {
    console.log('handleCallbackparams', params);
    if (params.apiData) {
      setTotal(params.apiData.total!);
    }
  };

  const handleSelectChange = (_changedValues: string[], allValues: string[]) => {
    setOptions({ ...tableOptions, conditions: handleSelection(allValues) });
  };
  const columns = [avatar, name, sex, title, patientNum];
  const refreshList = () => {
    setOptions({ ...tableOptions });
  };

  const handleDelete = debounce(() => {
    const params = {
      departmentNsId: depId,
      orgNSId: window.$storage.getItem('nsId'),
      sRole: Role.DOCTOR.id,
    };
    Promise.all(selectDocs.map(item => api.org.postMoveDepartmentDoctor({ ...params, sid: item }))).then(() => {
      message.success('????????????');
      setOptions({ ...tableOptions });
    }).catch(() => {
      setOptions({ ...tableOptions });
    });
    setSelectDocs([]);
  }, 300);
  const handleChangeDepAdmin = debounce((data) => {
    if (data.depHeadDoctor) {
      const params = {
        wcId: data.depHeadDoctorWcId,
      };
      api.management.deleteManagementHeadDoctor(params).then(() => {
        message.success('?????????????????????');
        setOptions({ ...tableOptions });
        setNotHeadDoctor(true);
      });
    } else {
      const params = {
        departmentNsId: depId,
        sid: data.sid,
      };
      api.management.putManagementHeadDoctor(params).then(() => {
        message.success('?????????????????????');
        setOptions({ ...tableOptions });
        setNotHeadDoctor(false);
      });
    }

  }, 300);
  const action = {
    title: '??????',
    dataIndex: 'operate',
    align: 'center',
    // width: 200,
    className: 'action',
    render: (_text: string, record: any) => (
      <Popconfirm
        title={`?????????${record.depHeadDoctor ? '??????' : '??????'}?????????????????????`}
        onConfirm={() => handleChangeDepAdmin(record)}
        // onCancel={cancel}
        okText="??????"
        cancelText="??????"
        disabled={!!isOpenSub}
      >
        <Button
          type="link"
          disabled={!!isOpenSub}
        >
          {record.depHeadDoctor ? '??????' : '??????'}???????????????
        </Button>
      </Popconfirm>

    ),
  };
  const rowSelection = {
    selectedRowKeys: selectDocs,
    onChange: (selectedRowKeys: never[]) => {
      setSelectDocs(selectedRowKeys);
    },
  };
  return (
    <>
      <div className="text-right mb-10">
        <div className="inline-block mr-10">
          <UserOutlined />
          {total}
        </div>
        {!isOpenSub && (
          <AddDoctor refresh={refreshList}>
            <Button icon={<PlusOutlined />} type="link" size="middle">
              ??????
            </Button>
          </AddDoctor>
        )}
      </div>
      <div className='flex justify-between mb-10'>
        <div>
          { noHeadDoctor && <Alert message="???????????????????????????????????????" type="warning" showIcon closable /> }
        </div>
        <div className="flex">
        <Popconfirm
          title={
            <div>
              <p className="text-base font-bold">???????????????</p>
              <p>???????????????????????????????????????????????????</p>
            </div>
          }
          onConfirm={handleDelete}
          // onCancel={cancel}
          okText="??????"
          cancelText="??????"
          disabled={!!isOpenSub || isEmpty(selectDocs)}
        >
           <Button
            type="primary"
            danger
            disabled={!!isOpenSub || isEmpty(selectDocs)}
            // onClick={() => handleModeDoctor(record)}
          >
            ????????????
          </Button>
        </Popconfirm>
          <Form className="text-right mb-18" style={{ marginLeft: 20 }} form={form} onValuesChange={handleSelectChange}>
            <Search form={form} searchKey="searchByName" width={180} placeholder="????????????????????????" />
          </Form>
        </div>
      </div>
      {!!tableOptions?.targetNSId && (
        <XzlTable
          columns={[...columns, action]}
          dataKey="teams"
          request={window.$api.org.getDepartmentRoles}
          depOptions={tableOptions}
          handleCallback={handleCallback}
          tableOptions={{ rowSelection }}
        />
      )}
    </>
  );
};
export default DepartmentDoctor;
