import http from '@/services/http';

export default {
  // 获取报告列表
  getReportList(value: string): Promise<any> {
    return http.get(`research/report/${value}`);
  },
  // 导出报告
  getExportReport(data: any): Promise<any> {
    return http.get('export/report', {data});
  },
  // 获取报告详情
  getReportDetail(data: any): Promise<any> {
    return http.get(`research/report_list`, {data});
  },
  //  导出报告
  patchExportReport(data: any): Promise<any> {
    return http.patch('research/export/report', { data });
  },
  //  修改报告表头信息
  patchReportTitle(data: any): Promise<any> {
    return http.delete('research/report/column', { data });
  },
};

