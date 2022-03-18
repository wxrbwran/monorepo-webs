import http from '@/services/http';

export default {
  // 获取化验单检查单统计数据接口new
  // fetchImageCountNew(data: any): Promise<any> {
  //   return http.get('image/count/last', { data });
  // },
  // 获取具体类型化验单检查单图片
  // fetchImageDetail(data: any): Promise<any> {
  //   return http.get('image/detail', { data });
  // },
  // // 获取具体类型化验单检查单图片V1版接口
  // fetchImageDetailV1(data: any): Promise<any> {

  //   return http.get('image/detail/v1', { data });
  // },
  // // 修改图片旋转角度
  // patchImageDegree(data: any): Promise<any> {
  //   return http.patch('image/detail', { data });
  // },
  // // 获取自定义指标历史中所有的图片分类
  // fetchImageTypeTabs(data: any): Promise<any> {
  //   return http.get('image/type/last', { data });
  // },
  // // 获取某一项图片分类的所有指标详情
  // fetchImageIndexHistory(data: any): Promise<any> {
  //   return http.get('image/index/history/last', { data });
  // },
  // 获取图片结构化数据指标
  // fetchImageIndex(data: any): Promise<any> {

  //   return http.get('nurse/image/index', { data });
  // },
  // // 保存图片结构化数据指标
  // putImageIndex(data: any): Promise<any> {
  //   return http.put('nurse/image/index', { data });
  // },

  // // 获取图片结构化接口
  // fetchImageIndexCustom(data: any): Promise<any> {
  //   return http.get('nurse/image/index/custom', { data });
  // },
  // // 修改图片结构化数据指标
  // putImageIndexCustom(data: any): Promise<any> {
  //   return http.put('nurse/image/index/custom', { data });
  // },

  // // 获取所有子分类，即检查部位
  // fetchImageSubtypes(): Promise<any> {
  //   return http.get('image/subtypes');
  // },
  // // 搜索图片大分类或者指标
  // fetchImageIndexInfo(data: any): Promise<any> {
  //   return http.get('image/index/info', { data });
  // },
  // // 结构化
  // // 获取图片信息及结构化数据
  // putImage(data: any): Promise<any> {
  //   return http.put('image', { data });
  // },
  fetchImageIndexes(data: any): Promise<any> {
    return http.get(`image/indexes?data=${JSON.stringify(data)}`);
    // return http.get('image/indexes', { data });
  },
  // // 保存图片信息及结构化数据
  // putImageImageIndexes(data: any): Promise<any> {
  //   return http.put('image/indexes', { data });
  // },
  // 获取检查单、其它单据
  fetchImageJcdAndOther(data: any): Promise<any> {
    // return http.get('image/jcd', { data });
    return http.get(`image/jcd?data=${JSON.stringify(data)}`);
  },
  // // 新增检查单、其它单据
  // putImageJcdAndOther(data: any): Promise<any> {
  //   return http.put('image/jcd', { data });
  // },
  // // 获取检查单问题模板
  // fetchImageTopicTemplate(data: any): Promise<any> {
  //   return http.get('image/template', { data });
  // },
  // // 新增检查单问题模板   11.18新增系统/医生检查单
  // putImageTopicTemplate(data: any): Promise<any> {
  //   return http.put('image/template', { data });
  // },
  // // 新增/修改/删除检查单问题
  // postImageTemplate(data: any): Promise<any> {
  //   return http.post('image/template', { data });
  // },
  // // 修改检查单模板名称
  // patchImageTemplateName(data: any): Promise<any> {
  //   return http.patch('image/template', { data });
  // },
  // // 获取检查单检查部位或检查方法
  // fetchImageTemplatePart(): Promise<any> {
  //   return http.get('image/template/part');
  // },
  // // 根据检查部位或检查方法获取检查名称
  // fetchImageTemplateName(data: any): Promise<any> {
  //   return http.get('image/template/name', { data });
  // },
  // 结构化
};
