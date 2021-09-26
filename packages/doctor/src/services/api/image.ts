import http from '@/services/http';

export default {
  // 获取化验单检查单统计数据接口new
  fetchImageCountNew(data: any): Promise<any> {
    return http.get('image/count/last', { data });
  },
  // 获取具体类型化验单检查单图片
  fetchImageDetail(data: any): Promise<any> {
    return http.get('image/detail', { data });
  },
  // 获取具体类型化验单检查单图片new
  fetchImageDetailNew(data: any): Promise<any> {
    return http.get('image/detail/new', { data });
  },
  // 修改图片旋转角度
  patchImageDegree(data: CommonData): Promise<any> {
    return http.patch('image/detail', { data });
  },
  // 获取自定义指标历史中所有的图片分类
  fetchImageTypeTabs(data: any): Promise<any> {
    return http.get('image/type/last', { data });
  },
  // 获取某一项图片分类的所有指标详情
  fetchImageIndexHistory(data: any): Promise<any> {
    return http.get('image/index/history/last', { data });
  },
  // 获取图片结构化数据指标
  fetchImageIndex(data: any): Promise<any> {
    return http.get('nurse/image/index', { data });
  },
  // 保存图片结构化数据指标
  putImageIndex(data: CommonData): Promise<any> {
    return http.put('nurse/image/index', { data });
  },

  // 获取图片结构化接口
  fetchImageIndexCustom(data: any): Promise<any> {
    return http.get('nurse/image/index/custom', { data });
  },
  // 修改图片结构化数据指标
  putImageIndexCustom(data: CommonData): Promise<any> {
    return http.put('nurse/image/index/custom', { data });
  },

  // 获取所有子分类，即检查部位
  fetchImageSubtypes(): Promise<any> {
    return http.get('image/subtypes');
  },
  // 搜索图片大分类或者指标
  fetchImageIndexInfo(data: CommonData): Promise<any> {
    return http.get('image/index/info', { data });
  },
  // 结构化
  // 获取图片信息及结构化数据
  putImage(data: CommonData): Promise<any> {
    return http.put('image', { data });
  },
  fetchImageIndexes(data: CommonData): Promise<any> {
    return http.get('image/indexes', { data });
  },
  // 保存图片信息及结构化数据
  putImageImageIndexes(data: CommonData): Promise<any> {
    return http.put('image/indexes', { data });
  },
  // 获取检查单、其它单据
  fetchImageJcdAndOther(data: CommonData): Promise<any> {
    return http.get('image/jcd', { data });
  },
  // 新增检查单、其它单据
  putImageJcdAndOther(data: CommonData): Promise<any> {
    return http.put('image/jcd', { data });
  },
  // 获取检查单问题模板
  fetchImageTopicTemplate(data: CommonData): Promise<any> {
    return http.get('image/template', { data });
  },
  // 新增检查单问题模板
  putImageTopicTemplate(data: CommonData): Promise<any> {
    return http.put('image/template', { data });
  },
  // 结构化
};
