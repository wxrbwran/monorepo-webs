import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import { useLocation } from 'umi';
import { UserOutlined } from '@ant-design/icons';
import {
  name,
  sex,
  upperDoctor,
  lowerDoctor,
  serviceLevel,
  tel,
} from 'xzl-web-shared/dist/src/utils/columns';
import { Role } from 'xzl-web-shared/dist/src/utils/role';
import { handleSelection } from '@/utils/conditions';
import type { XzlTableCallBackProps } from 'xzl-web-shared/dist/src/components/XzlTable';
import XzlTable from 'xzl-web-shared/dist/src/components/XzlTable';
import { Search } from 'xzl-web-shared/dist/src/components/Selects';
import styles from '../DepartmentDoctor/index.scss';

interface ILocation {
  query: {
    depId?: string;
  };
}
const DepartmentPatient: FC = () => {
  const [form] = Form.useForm();
  const [total, setTotal] = useState<number>(0);
  const location: ILocation = useLocation<ILocation>();
  const [depId, setDepId] = useState(location.query?.depId);

  const [tableOptions, setOptions] = useState<Store>({
    targetNSId: location.query?.depId,
    viewRole: Role.PATIENT.id,
  });
  const handleSelectChange = (_changedValues: string[], allValues: string[]) => {
    setOptions({ ...tableOptions, conditions: handleSelection(allValues) });
  };
  useEffect(() => {
    const urlDepId = location.query?.depId;
    if (urlDepId && depId !== urlDepId) {
      setDepId(urlDepId);
      setOptions({ ...tableOptions, targetNSId: location.query?.depId });
    }
  }, [location]);

  const handleCallback = (data: XzlTableCallBackProps) => {
    setTotal(data.apiData?.total as number);
  };
  return (
    <div>
      <div className="text-right mb-10">
        <div className="inline-block mr-10">
          <UserOutlined />
          {total}
        </div>
      </div>
      <Form className="text-right mb-18" form={form} onValuesChange={handleSelectChange}>
        <Search form={form} placeholder="搜索姓名或手机号" searchKey="searchByName" />
      </Form>
      <div className={styles.content}>
        {!!tableOptions?.targetNSId && (
          <XzlTable
            columns={[name, sex, upperDoctor, lowerDoctor, serviceLevel, tel]}
            dataKey="teams"
            request={window.$api.org.getDepartmentRoles}
            depOptions={tableOptions}
            handleCallback={handleCallback}
            tableOptions={{
              rowSelection: false,
            }}
          />
        )}
      </div>
    </div>
  );
};
export default DepartmentPatient;
