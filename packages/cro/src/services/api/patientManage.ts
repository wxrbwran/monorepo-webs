
import http from '@/services/http';

export default {
  // 获取全部患者
  getPatientList(data: any): Promise<any> {
    return http.get(`research/teams/patient?data=${JSON.stringify(data)}`);
  },
  // 获取受试者列表
  getTestPatients(data: any): Promise<any> {
    return http.get(`research/teams/project/patient?data=${JSON.stringify(data)}`);
  },
  // 全部患者列表医生手动打钩 勾选患者
  postCheckPatient(data: any): Promise<any> {
    return http.post('research/patient/checked', { data });
  },

  // 添加或修改 受试者在项目的给药时间或停止此项目用药时间
  patchPatientMedTimeStatus(data: any): Promise<any> {
    return http.patch('research/project/patient/med_time', { data });
  },
  // research/project/patient/med_time


  //全部患者列表医生去除打钩
  // patchDelCheckPatient(data: any): Promise<any> {
  //   return http.patch('cro/project/check/patient/type', { data });
  // },
  // 创建试验小组
  postAddGroup(data: any): Promise<any> {
    return http.post('research/project/group', { data });
  },
  // 获取小组列表
  getGroupList(projectNsId: any): Promise<any> {
    return http.get(`research/group/${projectNsId}`);
  },
  // 获取入组排除标准列表
  getStandard(projectSid: any): Promise<any> {
    return http.get(`cro/project/standard/${projectSid}`);
  },
  // 查看项目文件列表
  getProjectFile(projectSid: any, data: any): Promise<any> {
    return http.get(`cro/project/file/${projectSid}`, { data });
  },
  // 发送试验项目书、知情同意书 发送项目邀请
  postSendFile(data: any): Promise<any> {
    return http.post('research/project/invite', { data });
  },
  // 私下已签署，直接添加患者为受试者
  postJoinProject(data: any): Promise<any> {
    return http.post('research/project/join/by_doctor', { data });
  },
  // 停止参与试验 更改受试者状态
  patchPatientStatus(data: any): Promise<any> {
    return http.patch('research/project/patient', { data });
  },
  // 向小组添加患者 加入实验分组
  postGroupPatient(data: any): Promise<any> {
    return http.post('research/group/patient', { data });
  },
  // 查询小组内患者
  getGroupPatient(data: any): Promise<any> {
    return http.get(`research/group/patient?data=${JSON.stringify(data)}`);
  },
  //修改试验小组名
  modifyGroup(data: any): Promise<any> {
    return http.patch('research/project/group', { data });
  },
};
