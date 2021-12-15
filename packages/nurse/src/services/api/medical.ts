import http from '@/services/http';
// import qs from 'qs';
// import { Base64 } from 'xzl-web-shared/dist/src/utils/base64';

export default {
  // 查询查询最后一次用药达标
  fetchMedicalLast(data: { sid: string }): Promise<any> {
    return http.get(`medical/index/last?data=${JSON.stringify(data)}`);
  },
  // 医生修改用药达标值
  patchMedicalReference(data: CommonData): Promise<any> {
    return http.patch('medical/reference', { data });
  },
  // 查询用药达标（点击日期查看当前指标的所有数据的图表）
  fetchMedicalIndex(data: { sid: string, indexType: string, wcId: string }): Promise < any > {
    return http.get(`medical/index?data=${JSON.stringify(data)}`);
  },
  // 修改或添加（其他诊断、四高、病史）信息
  updateDisease(data: CommonData): Promise<any> {
    return http.post('medical_record', { data });
  },
  // 查询（其他诊断、四高、病史）信息
  fetchDiseaseHistory(data: { sid: string }): Promise < any > {
    return http.get(`medical_record?data=${JSON.stringify(data)}`);
  },
};
