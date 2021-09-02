import http from '@/services/http';

export default {
  // 新增指标-图片分类
  putImageIndex(data: CommonData): Promise<any> {
    return http.put('index', { data });
  },

  // 8月17xr接口-s

  // 获取单据列表
  fetchIndexDocument(data: any): Promise<any> {
    return http.get('index/document', { data });
  },
  // 新增单据：检查单or化验单
  putIndexDocument(data: CommonData): Promise<any> {
    return http.put('index/document', { data });
  },
  // 获取指标列表
  fetchIndexDocumentIndex(data: any): Promise<any> {
    return http.get('index/document/index', { data });
  },
  // 新增指标
  putIndexDocumentIndex(data: CommonData): Promise<any> {
    return http.put('index/document/index', { data });
  },
  // 获取样本来源-检查部位
  fetchIndexSampleFrom(data: any): Promise<any> {
    return http.get('index/sampleFrom', { data });
  },
  // 图片审核搜索单据-指标
  fetchIndexSearch(data: CommonData): Promise<any> {
    return http.get('index/search', { data });
  },
  // 更新指标
  patchIndexDocumentIndex(data: CommonData): Promise<any> {
    return http.patch('index/document/index', { data });
  },
  // 删除指标
  deleteIndexDocumentIndex(id: string): Promise<any> {
    return http.delete(`index/document/index/${id}`);
  },
  // 8月17xr接口-e
};
