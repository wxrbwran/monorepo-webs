import http from '@/services/http';

export default {
  // 添加项目终点事件
  addEndEvent(data?: any): Promise<any> {
    return http.post('research/project/end_event',{data});
  },
  // 查看项目终点事件
  fetchEndEvent(projectSid: any): Promise < any > {
    return http.get(`research/end_event/detail/${projectSid}`);
  },
  // 修改项目终点事件
  updateEndEvent(data?: any): Promise < any > {
    return http.patch('research/project/end_event', { data });
  },
  // 查询项目中所有研究者
  fetchResearchers(projectNsId: any): Promise < any > {
    return http.get(`research/project/researchers/${projectNsId}`);
  },
  // 查询项目终点事件统计信息
  fetchEventCountInfo(data?: any): Promise < any > {
    return http.get(`research/project/event_statistics?data=${JSON.stringify(data)}`);
  },
}
