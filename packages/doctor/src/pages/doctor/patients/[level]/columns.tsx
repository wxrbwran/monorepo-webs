import React from 'react';
import {
  Switch, Badge, Checkbox, message,
} from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { history, getDvaApp } from 'umi';
import { sexList } from '@/utils/tools';
import confirmsOrange from '@/assets/img/doctor_patients/confirms_orange.svg';
import confirmsGreen from '@/assets/img/doctor_patients/confirms_green.svg';
import confirmsRed from '@/assets/img/doctor_patients/confirms_red.svg';
import patientIcon from '@/assets/img/patient.png';
import { Role } from 'xzl-web-shared/src/utils/role';
import * as api from '@/services/api';
import Note from './components/Note';
// import ChangeServicePackage from './components/ChangeServicePackage';
import styles from './index.scss';

export interface IRecord {
  sid: string;
  name: string;
  organizationName: string;
  serviceLevel: string;
  note: string;
  sex: string;
  age: number;
  areaAbbreviation: string;
  riskFactor: string[];
  adviceCount: number;
  pendingConsultationLevel: string;
  imMsgCount: number;
  bindDay: number;
  pendingDoctorAdviceLevel: string;
  expireTimeType: string;
  wcId: string;
  top: number;
  department: object;
  issueCount:number;
  role:string;
  avatarUrl: string;
  isYlPatient: boolean; // 是否是养老患者
  inCro: boolean; // 是否参与了科研项目
  nsOwner: {
    wcId: string;
    sid: string;
  }; // 创建者信息
}
const patientPage = (record: IRecord, actionType?: string, other?: string) => {
  console.log('跳转', record, actionType, other);
  const {
    wcId, sid, department, imMsgCount, issueCount, avatarUrl, name, nsOwner,
  } = record;
  window.$storage.setItem('patientWcId', wcId);
  window.$storage.setItem('patientSid', sid);
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
      nsOwner,
    },
  });
  history.push(`/patient_panel/${record.sid}`);
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
  render: (data: string, record: IRecord) => (
    <div onClick={() => patientPage(record)}>
      <span>
        {data}
        { record.inCro && <img src={patientIcon} alt="" className={styles.tag} /> }
      </span>
    </div>
  ),
};
export const org = {
  title: '机构',
  dataIndex: 'organizationName',
  render: (data: string, record: IRecord) => (
    <div onClick={() => patientPage(record)}>
      {data}
    </div>
  ),
};

export const sex = {
  title: '性别',
  dataIndex: 'sex',
  render: (text: string, record: IRecord) => (
    <div onClick={() => patientPage(record)}>
      {sexList[text]}
    </div>
  ),
};

export const age = {
  title: '年龄(岁)',
  dataIndex: 'age',
  sorter: (a: { age: number }, b: { age: number }) => a.age - b.age,
  render: (text: string, record: IRecord) => (
    <div onClick={() => patientPage(record)}>
      {text}
    </div>
  ),
};

export const address = {
  title: '地区',
  dataIndex: 'provinceName',
  width: 64,
};

export const riskFactor = {
  title: '风险因素',
  dataIndex: 'riskFactor',
};

export const upperDoctor = {
  title: '上级医生',
  dataIndex: 'upperDoctor',
};

export const lowerDoctor = {
  title: '医助',
  dataIndex: 'lowerDoctor',
};

export const issueCount = {
  title: '审核问题',
  dataIndex: 'issueCount',
  className: 'pointer',
  render: (data: string, record: IRecord) => {
    let className = null;
    let bgColor = null;
    let imgSrc = null;
    switch (record.pendingDoctorAdviceLevel) {
      case 'NORMAL':
        className = 'patient-lists--warning';
        bgColor = '#f56a00';
        imgSrc = confirmsOrange;
        break;
      case 'SEVERE':
        className = 'patient-lists--error';
        bgColor = '#f04134';
        imgSrc = confirmsRed;
        break;
      case 'NONE':
      default:
        className = 'patient-lists--success';
        bgColor = '#00a854';
        imgSrc = confirmsGreen;
        break;
    }
    return (
      <Badge
        count={data}
        className={className}
        style={{ backgroundColor: bgColor }}
      >
        <img src={imgSrc} onClick={() => patientPage(record, 'issue')} alt="" />
      </Badge>
    );
  },
};

export const msgCount = {
  title: '消息',
  dataIndex: 'imMsgCount',
  render: (data: number, record: IRecord) => {
    let color = '#00a854';
    if (data > 0) {
      color = '#f56a00';
    }
    return (
      <Badge
        count={record.imMsgCount}
        style={{ backgroundColor: color as string }}
      >
        <span style={{ color: color as string }}>
          <MessageOutlined
            className={styles.msg}
            onClick={() => patientPage(record, 'im')}
          />
        </span>
      </Badge>
    );
  },
};

export const bindDay = {
  title: '免费状态',
  dataIndex: 'bindDay',
  width: 96,
  render: (data: string, record: IRecord) => {
    let className = 'patient-lists--trial';
    let content = '';
    switch (record.expireTimeType) {
      case 'PAYMENTED':
        className = 'patient-lists--already';
        content = '已缴费';
        break;
      default:
        content = `免费中，${data}天`;
        break;
    }
    return (
      <div className={className}>
        {content}
      </div>);
  },
};

// 患者列表end
const handleLevel = (isVip: boolean, record: IRecord, refreshList: () => void) => {
  const params = {
    wcId: record.wcId,
    sRole: isVip ? Role.PATIENT_VIP.id : Role.PATIENT.id,
  };
  api.doctor.postPatientLevel(params).then(() => {
    message.success('修改成功');
    refreshList();
  });
};
export const patientLevel = (refreshList: () => void) => (
  {
    title: '级别',
    dataIndex: 'serviceLevel',
    render: (_text: string, record: IRecord) => (
      <div className="table-operating">
        <Switch
          checkedChildren="VIP"
          unCheckedChildren="普通"
          checked={record.role === Role.PATIENT_VIP.id}
          onChange={(e) => { handleLevel(e, record, refreshList); }}
        />
        {/* PATIENT_VIP */}
      </div>
    ),
  }
);

export const noteC = (refreshList: () => void) => (
  {
    title: '备注',
    dataIndex: 'remark',
    render: (text: string, record: IRecord) => (
      <Note data={record} note={text} refreshList={refreshList} />
    ),
  }
);

const handleSetTop = (
  e:React.ChangeEvent<HTMLInputElement>,
  patientId: string,
  refreshList: () => void,
) => {
  console.log('e, patientId', e, patientId);
  refreshList();
  // api
  //   .patch('/user/patient/top_status', {
  //     patientId,
  //     top: +e.target.checked,
  //   })
  //   .then(() => {
  //     message.success('设置成功');
  //     this.initialPatientLists();
  //   })
  //   .catch((xhr) => {
  //     message.error(xhr);
  //   });
};
export const operate = (refreshList: () => void) => (
  {
    title: '操作',
    dataIndex: '',
    width: 101,
    render: (text: string, record: IRecord) => {
      console.log(text);
      return (
        <Checkbox
          checked={record.top !== 1}
          onChange={(e) => {
            handleSetTop(e, record.id, refreshList);
          }}
        >
          置顶
        </Checkbox>
      );
    },
  }
);
