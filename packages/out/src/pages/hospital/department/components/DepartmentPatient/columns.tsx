import { history, getDvaApp } from 'umi';
const patientPage = (props: { record: IRecord, actionType?: string }) => {
  const { record, actionType } = props;
  console.log('跳转', record, actionType);
  const {
    wcId, sid, department, imMsgCount, issueCount, avatarUrl, name, role, upper_wcId, upper_sid,
  } = record;
  console.log('history232', history);
  // 院外不存在这些
  // let imDocInfo = currLoginDoctorInfo;
  // console.log('recordddd', record);
  // // 如果是从左侧科室管理(科主任)，看其他医生患者的详情，那这个currLoginDoctorInfo的wcId要使用科主任角色的wcID
  // if (window.$storage.getItem('role') === 'DEP_HEAD') {
  //   imDocInfo = {
  //     wcId: history.location.query.depHeadWcId,
  //   };
  // }
  // 院外不存在这些
  window.$storage.setItem('patientWcId', wcId);
  window.$storage.setItem('patientSid', sid);
  window.$storage.setItem('patientRoleId', role);
  window.$storage.setItem('patientName', name);
  // eslint-disable-next-line no-underscore-dangle
  getDvaApp()._store.dispatch({
    type: 'currentPatient/saveDeparment',
    payload: department,
  });
  // eslint-disable-next-line no-underscore-dangle
  getDvaApp()._store.dispatch({
    type: 'currentPatient/savePatientDetails',
    payload: {
      actionType: actionType || 'im',
      imMsgCount,
      issueCount,
      name,
      avatarUrl,
      currLoginDoctorInfo: { // 在院外，这里目前存的是members里的上级医生信息
        wcId: upper_wcId,
        sid: upper_sid,
      },
    },
  });
  history.push(`/patient_panel?patientSid=${record.sid}`);
  // eslint-disable-next-line no-underscore-dangle
  getDvaApp()._store.dispatch({
    type: 'currentPatient/savePatientDetails',
    payload: {
      isYlPatient: record.isYlPatient ? 1 : 2, // 1养老患者 2非养老患者
    },
  });
};


export const name = {
  title: '姓名',
  dataIndex: 'name',
  render: (data: string, record: IRecord) => {
    return (
      <div onClick={() => patientPage({ record })} className='text-blue-500 cursor-pointer'>
        <span>
          {data}
          { record.inCro && window.$storage.getItem('role') !== 'DEP_HEAD' && <img src={patientIcon} alt="" className={styles.tag} /> }
        </span>
      </div>
    );
  },
};
