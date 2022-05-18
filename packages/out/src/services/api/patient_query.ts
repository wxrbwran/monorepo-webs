import http from '@/services/http';

export default {
  //  查询报告（搜索结果表）扩展查询
  fetchSearchReport(data: any): Promise<any> {
    return http.get('research/patients', { data });
  },
  // 直接查询
  fetchBaseReport(data: any): Promise<any> {
    return http.get(`research/patients/info?data=${JSON.stringify(data)}`);
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
    return http.get(`research/query_history?data=${JSON.stringify(data)}`);
  },
  // 根据患者sid和图片类型获取url
  getImageUrl(data: any): Promise<any> {
    return http.get(`image/url?data=${JSON.stringify(data)}`);
  },
  // 获取所有字段
  fetchFields(type: string): Promise<any> {
    return http.get('template/' + type);
  },
  // 获取填充值域
  fetchKvScope(data: any): Promise<any> {
    return http.get('kv/scope', { data });
  },
  // 动态获取节点
  fetchNodeEl(url: string, data: any): Promise<any> {
    url = url.split('/').filter(a => !!a).join('/');
    // return http.get(`${url}?data=${JSON.stringify(data)}`);
    return http.get(url, { data });
  },
  // 开始查询
  fetchQueryId(data: any): Promise<any> {
    return http.post('rules', { data });
  },
  // 轮循查询
  fetchQueryResult(data: any): Promise<any> {
    return http.get(`research/result/${data}`);
  },
  // 查询结果弹窗详情
  fetchQueryResultDetail(data: any): Promise<any> {
    return http.get('research/statistics/detail', { data });
  },
  // 查询结果弹窗详情
  fetchQueryDetail(data: any): Promise<any> {
    return http.get(`research/result/detail?data=${JSON.stringify(data)}`);
  },
  // 终点事件详情
  fetchEndEventDetail(data: any): Promise<any> {
    return http.get(`research/event_statistics?data=${JSON.stringify(data)}`);
  },
  // 量表类型查看回复内容
  fetchReplyDetail(data: any): Promise<any> {
    return http.get(`research/scale_patient/${data}`);
  },
  // 智能科研查询结果接口
  // 轮循查询
  fetchResearchStatistics(data: any): Promise<any> {
    return http.get('research/statistics', { data });
  },
  // 查询导出
  patchResearchExport(data: any): Promise<any> {
    return http.patch('research/export/excel', { data });
  },
};

