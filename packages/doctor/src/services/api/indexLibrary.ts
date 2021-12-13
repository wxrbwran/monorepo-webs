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
  // 新增单据：化验单
  putIndexDocument(data: CommonData): Promise<any> {
    return http.put('index/document', { data });
  },

  // 复制单据：化验单
  copyIndexDocument(data: CommonData): Promise<any> {
    return http.put('index/document/copy', { data });
  },

  // 编辑单据：化验单
  patchIndexDocument(data: CommonData): Promise<any> {
    return http.patch('index/document', { data });
  },

  // 删除单据：化验单
  deleteIndexDocument(id: string) {
    return http.delete(`index/document/${id}`);
  },

  // 搜索指标
  getAllIndex(data: CommonData): Promise<any> {
    return http.get('index/document/allIndex', { data });
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
  fetchIndexSampleFrom(): Promise<any> {
    return http.get('index/sampleFrom');
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
  deleteIndexDocumentIndex(data: CommonData): Promise<any> {
    return http.delete('index/document/index', { data });
  },
  // 同时新增单据及指标
  putIndexDocumentAndIndex(data: CommonData): Promise<any> {
    return http.put('index/documentAndIndex', { data });
  },

  // 根据index获取参考值列表
  getReferencesByIndex(data: CommonData): Promise<any> {
    return http.get('index/references', { data });
  },
  // 8月17xr接口-e
  // 新增单据：检查单
  putImageTemplate(data: CommonData): Promise<any> {
    return http.put('image/template', { data });
  },

  // 获取检查单列表
  fetchImageTemplate(data: CommonData): Promise<any> {
    return http.get('image/template', { data });
  },
  // 新增/修改/删除检查单问题
  handleImageTemplate(data: CommonData): Promise<any> {
    return http.post('image/template', { data });
  },
  // 删除检查单模版
  deleteImageTemplate(id: string) {
    return http.delete(`image/template/${id}`);
  },
  // 修改检查单
  patchImageTemplate(data: CommonData): Promise<any> {
    return http.patch('image/template', { data });
  },
  // 复制单据
  copyImageTemplate(data: CommonData): Promise<any> {
    return http.put('image/template/copy', { data });
  },
};
