import http from '@/services/http';

export default {
  // 8月17xr接口-s
  // 获取指标列表
  fetchIndexDocumentIndex(data: any): Promise<any> {
    return http.get(`index/document/index?data=${JSON.stringify(data)}`);
  },
  // 获取样本来源-检查部位
  fetchIndexSampleFrom(data: any): Promise<any> {
    return http.get(`index/sampleFrom?data=${JSON.stringify(data)}`);
  },
  // 图片审核搜索单据-指标
  fetchIndexSearch(data: CommonData): Promise<any> {
    return http.get(`index/search?data=${JSON.stringify(data)}`);
  },
  // 8月17xr接口-e
};
