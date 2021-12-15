import http from '@/services/http';

export default {
  // 查询诊断
  fetchDisease(data: { name: string }): Promise<any> {
    return http.get(`disease?data=${JSON.stringify(data)}`);
  },
  // 查询患者的诊断列表
  fetchDiagnosis(data: { sid: string }): Promise<any> {
    return http.get(`diagnosis?data=${JSON.stringify(data)}`);
  },
  // 添加诊断
  addDisease(data: CommonData): Promise<any> {
    return http.put('diagnosis', { data });
  },
  // 修改诊断
  patchDisease(data: CommonData): Promise<any> {
    return http.patch('diagnosis?tsId=1123', { data });
  },
  // 删除诊断
  deleteDisease(data: CommonData): Promise<any> {
    return http.delete('diagnosis', { data });
  },

  // 查询处理方式
  fetchTreatment(data: { name: string }): Promise<any> {
    return http.get(`treatment?data=${JSON.stringify(data)}`);
  },
  // 查询患者的处理方式列表
  fetchTreatmentList(data: { sid: string }): Promise < any > {
    return http.get(`diagnosis/treatment?data=${JSON.stringify(data)}`);
  },
  // 添加处理（新增治疗方式）
  addTreatment(data: CommonData): Promise<any> {
    return http.put('diagnosis/treatment', { data });
  },
  // 修改处理（治疗方式）
  patchTreatment(data: CommonData): Promise<any> {
    return http.patch('diagnosis/treatment', { data });
  },
  // 删除处理（治疗方式）
  deleteTreatment(data: CommonData): Promise<any> {
    return http.delete('diagnosis/treatment', { data });
  },
  // 查询支架列表
  fetchStent(data: { name: string }): Promise < any > {
    return http.get(`stent?data=${JSON.stringify(data)}`);
  },
};
