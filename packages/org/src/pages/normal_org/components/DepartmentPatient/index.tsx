import React, { FC, useState, useEffect } from 'react';
import { Form } from 'antd';
import { useSelector } from 'umi';
import {
  name,
  sex,
  upperDoctor,
  lowerDoctor,
  serviceLevel,
  tel,
} from 'xzl-web-shared/src/utils/columns';
import { Role } from 'xzl-web-shared/src/utils/role';
import { handleSelection } from 'xzl-web-shared/src/utils/conditions';

import XzlTable from 'xzl-web-shared/src/components/XzlTable';
import { PatientLevel, Search } from  'xzl-web-shared/src/components/Selects';
// import AddPatient from '../AddPatient';
import styles from '../DepartmentDoctor/index.scss';

// const { confirm } = Modal;
const DepartmentPatient: FC = () => {
  // const dispatch = useDispatch();
  const [form] = Form.useForm();
  const department = useSelector((state: IState) => state.org_menu.department);

  const [tableOptions, setOptions] = useState<Store>({
    targetNSId: department.id,
    viewRole: Role.PATIENT.id,
  });
  const handleSelectChange = (changedValues: string[], allValues: string[]) => {
    setOptions({ ...tableOptions, conditions: handleSelection(allValues) });
  };
  useEffect(() => {
    if (department.id) {
      setOptions({ ...tableOptions, targetNSId: department.id });
    }
  }, [department]);
  return (
    <div>
      {/* <div className={styles.action}>
        <AddPatient>
          <Button className={styles.button} type="primary" ghost size="middle">
            添加
          </Button>
        </AddPatient>
      </div> */}
      <div className={styles.selection}>
        <Form form={form} onValuesChange={handleSelectChange}>
          <PatientLevel />
          <Search form={form} searchKey="searchByName" />
        </Form>
      </div>
      <div className={styles.content}>
        <XzlTable
          columns={[name, sex, upperDoctor, lowerDoctor, serviceLevel, tel]}
          dataKey="teams"
          category={Role.PATIENT.id}
          request={window.$api.org.getDepartmentRoles}
          depOptions={tableOptions}
        />
      </div>
    </div>
  );
};
export default DepartmentPatient;
