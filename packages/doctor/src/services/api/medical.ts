import http from '@/services/http';
// import qs from 'qs';
// import { Base64 } from 'xzl-web-shared/dist/utils/base64';

export default {
  // 查询查询最后一次用药达标
  fetchMedicalLast(data: { sid: string }): Promise<any> {
    return http.get('medical/index/last', { data });
  },
  // 医生修改用药达标值
  patchMedicalReference(data: CommonData): Promise<any> {
    return http.patch('medical/reference', { data });
  },
  // 查询用药达标（点击日期查看当前指标的所有数据的图表）
  fetchMedicalIndex(data: { sid: string; indexType: string; wcId: string }): Promise<any> {
    return http.get('medical/index', { data });
  },
  // 修改或添加（其他诊断、四高、病史）信息
  updateDisease(data: CommonData): Promise<any> {
    return http.post('medical_record', { data });
  },
  // 查询（其他诊断、四高、病史）信息
  fetchDiseaseHistory(data: { sid: string }): Promise<any> {
    return http.get('medical_record', { data });
  },

  // 增加一条自定义指标
  addCustomMedical(data: CommonData): Promise<any> {
    return http.put('custom/medical/index', { data });
  },
  // 获取最后一次上传自定义指标情况
  fetchMedicalRecord(data: { sid: string }): Promise<any> {
    return http.get('custom/medical/index/last', { data });
  },
  // 获取所有自定义指标情况历史
  fetchCustomMedicalIndex(data: { sid: string }): Promise<any> {
    return http.get('custom/medical/index', { data });
  },
  // 获取患者用药达标历史
  fetchMedicalIndexHistory(data: CommonData): Promise<any> {
    return http.get('medical/index/history', { data });
  },
  // 获取自定义指标情况历史(其他指标)
  fetchCustomMedicalIndexHistory(data: CommonData): Promise<any> {
    return http.get('custom/medical/index/history', { data });
  },
};
