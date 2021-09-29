import http from '@/services/http';

export default {
  // 获取化验单检查单统计数据接口new
  fetchImageCountNew(data: any): Promise<any> {
    return http.get(`image/count/last?data=${JSON.stringify(data)}`);
  },
  // 获取具体类型化验单检查单图片
  fetchImageDetail(data: any): Promise<any> {
    return http.get(`image/detail?data=${JSON.stringify(data)}`);
  },
  // 获取具体类型化验单检查单图片new
  fetchImageDetailNew(data: any): Promise<any> {
    return http.get(`image/detail/new?data=${JSON.stringify(data)}`);
  },
  // 修改图片旋转角度
  patchImageDegree(data: CommonData): Promise<any> {
    return http.patch('image/detail', { data });
  },
  // 获取自定义指标历史中所有的图片分类
  fetchImageTypeTabs(data: any): Promise<any> {
    return http.get(`image/type?data=${JSON.stringify(data)}`);
  },
  // 获取某一项图片分类的所有指标详情
  fetchImageIndexHistory(data: any): Promise<any> {
    return http.get(`image/index/history?data=${JSON.stringify(data)}`);
  },
  // 获取图片结构化数据指标
  fetchImageIndex(data: any): Promise<any> {
    return http.get(`nurse/image/index?data=${JSON.stringify(data)}`);
  },
  // 保存图片结构化数据指标
  putImageIndex(data: CommonData): Promise<any> {
    return http.put('nurse/image/index', { data });
  },

  // 获取图片结构化接口
  fetchImageIndexCustom(data: any): Promise<any> {
    return http.get(`nurse/image/index/custom?data=${JSON.stringify(data)}`);
  },
  // 修改图片结构化数据指标
  putImageIndexCustom(data: CommonData): Promise<any> {
    return http.put('nurse/image/index/custom', { data });
  },
  // 获取已审核图片/图片审核列表
  fetchImageList(data: any): Promise<any> {
    return http.get(`nurse/images?data=${JSON.stringify(data)}`);
  },
  // 结构化xr-s
  // 获取图片信息及结构化数据
  putImage(data: CommonData): Promise<any> {
    return http.put('image', { data });
  },
  fetchImageIndexes(data: CommonData): Promise<any> {
    return http.get(`image/indexes?data=${JSON.stringify(data)}`);
  },
  // 保存图片信息及结构化数据
  putImageImageIndexes(data: CommonData): Promise<any> {
    return http.put('image/indexes', { data });
  },
  // 获取检查单、其它单据
  fetchImageJcdAndOther(data: CommonData): Promise<any> {
    return http.get(`image/jcd?data=${JSON.stringify(data)}`);
  },
  // 新增检查单、其它单据
  putImageJcdAndOther(data: CommonData): Promise<any> {
    return http.put('image/jcd', { data });
  },
  // 获取检查单问题模板
  fetchImageTopicTemplate(data: CommonData): Promise<any> {
    return http.get(`image/template?data=${JSON.stringify(data)}`);
  },
  // 新增检查单问题模板
  putImageTopicTemplate(data: CommonData): Promise<any> {
    return http.put('image/template', { data });
  },
  // 结构化xr-s
};
