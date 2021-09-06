import http from '@/services/http';

export default {
  //  查询报告（搜索结果表）扩展查询
  fetchSearchReport(data: any): Promise<any> {
    return http.get(`management/patients`, {data});
  },
  // 直接查询
  fetchBaseReport(data: any): Promise<any> {
    return http.get('management/patients/info', {data});
  },
  // 添加字段查询
  postReoprtOther(data: any): Promise<any> {
    return http.post('report/others', { data });
  },
  //  生成报告
  generatorReport(data: any): Promise<any> {
    return http.post('research/report', { data });
  },
  // 搜索历史
  getReportQuery(data: any): Promise<any> {
    return http.get(`research/query_history`, {data});
  },
  // 根据患者sid和图片类型获取url
  getImageUrl(data: any): Promise<any> {
    return http.get(`image/url`, {data});
  },
};

