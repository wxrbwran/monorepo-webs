import React, { useEffect, useState } from 'react';
import { useSelector } from 'umi';
import NSLabelType from '@/utils/namespace';
// import Title from '../Title';
import DiagnoseList from './DiagnoseList';
import TreatmentList from './TreatmentList';
import styles from './index.scss';

function Operation() {
  useSelector((state: IState) => state.currentPatient.medicalLast);
  const initDep = NSLabelType.CARDIOVASCULAR_DEPARTMENT_TYPE.code;
  const [departmentCategory, setDepartmentCategory] = useState<string>(initDep);
  const [isTumour, setIsTumour] = useState(false); // 是否是肿瘤科
  const department = useSelector((state: IState) => state.currentPatient.department);
  useEffect(() => {
    // console.log('depheiilo', department);
    // 心血管科室
    const departments = [
      NSLabelType.CARDIOVASCULAR_DEPARTMENT_TYPE.code,
      NSLabelType.COMMON_DEPARTMENT_TYPE.code,
      NSLabelType.TUMOUR_DEPARTMENT_TYPE.code,
      NSLabelType.NEUROLOGY_DEPARTMENT_TYPE.code,
    ];
    // department.nsLabels
    if (department?.nsLabels) {
      department.nsLabels.forEach((item) => {
        if (departments.includes(item)) {
          setDepartmentCategory(item);
          if (item === NSLabelType.TUMOUR_DEPARTMENT_TYPE.code) {
            setIsTumour(true);
          }
        }
      });
    }
  }, [department]);
  console.log('科室', departmentCategory);
  return (
    <div className={styles.operation}>
      {/* <Title text="诊断及治疗" /> */}
      <div className={styles.content}>
        <DiagnoseList />
        <TreatmentList isTumour={isTumour} />
      </div>
    </div>
  );
}

export default Operation;
