import React, { FC, useState, useEffect } from 'react';
import { Form } from 'antd';
import { useSelector } from 'umi';
import { departmentPatientColumns } from '@/utils/columns';
import { Role } from '@/utils/role';
import { handleSelection } from '@/utils/conditions';
import XzlTable from '@/components/XzlTable';
import PatientLevel xzl-web-shared/src/utils/constsxzl-web-shared/src/components/Selects'/PatientLevel';
import Search xzl-web-shared/src/utils/constsxzl-web-shared/src/components/Selects'/Search';
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
          columns={departmentPatientColumns()}
          dataKey="teams"
          request={window.$api.org.getDepartmentRoles}
          depOptions={tableOptions}
        />
      </div>
    </div>
  );
};
export default DepartmentPatient;
