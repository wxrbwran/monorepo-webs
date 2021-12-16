import React, { FC, useState } from 'react';
import DepHeadDoctors from '../components/DepHeadDoctors';
import { Tabs, Empty } from 'antd';
import XzlTable from 'xzl-web-shared/src/components/XzlTable';
import { name, org,  patientLevel, sex, age, address } from '../patients/[level]/columns';
import { Role } from 'xzl-web-shared/src/utils/role';
import styles from './index.scss';

interface Imenu {
  desc: string;
}
interface IOption {
  pageAt: number;
  sRole?: string;
  targetSId?: string; // 选中医生的sid
  targetNSId: string; // 机构的nsid
}
const { TabPane } = Tabs;
const DepHead: FC = ({ location }) => {
  console.log('=======12133', location);
  const [depOptions, setOptions] = useState<IOption>({ pageAt:1, targetNSId: location.query.depHeadNsId });
  const [curDocRoles, setCurDocRoles] = useState([]);
  const [curTabRole, setTabRole] = useState<string>('');
  const [noDoctor, setNoDoctor] = useState(false);
  const roleObj: { [key: string]: Imenu } = {
    [Role.ALONE_DOCTOR.id]: { desc: '我独立管理' },
    [Role.UPPER_DOCTOR.id]: { desc: '我是主管医生'  },
    [Role.LOWER_DOCTOR.id]: { desc: '我是医生助手' },
    [Role.DIETITIAN.id]: { desc: '我是营养师' },
    [Role.PHARAMCIST.id]: { desc: '我是药师' },
    [Role.KANGFUSHI.id]: { desc: '我是康复师' },
    [Role.PSYCHOLOGIST.id]: { desc: '我是心理医生' },
    [Role.TEAMNURSE.id]: { desc: '我是护士' },
  };

  const handleChangeTabRole = (sRole: string) => {
    setOptions({ ...depOptions, sRole });
    setTabRole(sRole);
  };
  // 切换医生
  const handleChangeDoc = (sid: string) => {
    window.$api.doctor.getDoctorHeadingDoctorRoles(sid).then(res => {
      console.log('====doc', res);
      // res.teams[0] 目前只取teams[0]就可以，后面有别的业务再做区分
      const docRoles = res.teams[0].members.filter((item: ISubject) => !!roleObj[item.role!]);
      setCurDocRoles(docRoles);
      setTabRole(docRoles[0].role);
      setNoDoctor(false);
      setOptions({ ...depOptions, targetSId: sid, sRole: docRoles[0].role });
    });
  };

  const columns = [name, org, patientLevel(() => setOptions({ ...depOptions })), sex, age, address];
  console.log('curDocRoles', curDocRoles);
  return (
    <div className={styles.dep_head}>
      <DepHeadDoctors handleChangeDoc={handleChangeDoc} handleNoData={() => setNoDoctor(true)} />

      {
        !noDoctor ? (
          <div className={styles.patient_panel}>
            <Tabs activeKey={curTabRole} onChange={handleChangeTabRole} size="large">
              { curDocRoles.map((item: ISubject) => <TabPane tab={roleObj[item.role!].desc} key={item.role!} />)}
            </Tabs>
            <div className="p-20">
              {
                depOptions?.sRole && (
                  <XzlTable
                    columns={columns}
                    dataKey="teams"
                    category="patientList"
                    request={window.$api.doctor.getDoctorHeadingPatients}
                    depOptions={depOptions}
                    tableOptions={{
                      // onChange: handlePagerChange,
                      rowSelection: false,
                    }}
                  />
                )
              }
            </div>
          </div>
        ) : <div className={styles.no_data}><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无患者" /></div>
      }
    </div>
  );
};

export default DepHead;
