import doctorSvg from './img/doctorCount.svg';
import authorizedDoctorCountSvg from './img/authorizedDoctorCount.svg';
import patientSvg from './img/patientCount.svg';
import completedDoctorCountSvg from './img/completedDoctorCount.svg';

const doctorList = {
  doctor: '医生人数',
  patient: '患者人数',
};

const svg: Store = {
  doctorSvg,
  patientSvg,
  authorizedDoctorCountSvg,
  completedDoctorCountSvg,
};
const qualityList = {
  compliance: '达标率',
  timely: '及时率',
};
const dataList = {
  BP: '血压',
  GLU: '血糖',
  BLOOD_FAT: '血脂',
  UA: '血尿酸',
};

export { doctorList, qualityList, dataList, svg };
