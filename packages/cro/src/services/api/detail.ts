import http from '@/services/http';

export default {
  fetchMedicines(data: any): Promise<any> {
    return http.get(`medicine/name?data=${JSON.stringify(data)}`);
  },
  fetchDiagnosis(data: any): Promise<any> {
    return http.get(`disease?data=${JSON.stringify(data)}`);
  },
  // fetchUploadInfo(file: object): Promise<any> {
  //     return http.get(`clinical/form/address?fileName=${file.name}`);
  // },
  fetchUploadInfo(data?: any): Promise<any> {
    return http.get(`cro/file/address?projectSid=${data.projectSid}&fileName=${data.fileName}`);
  },
  fetchTreatment(data: any): Promise<any> {
    return http.get(`treatment?data=${JSON.stringify(data)}`);
  },
  // 获取项目详情
  getCroProjectInfo(value: string): Promise<any> {
    return http.get(`research/project/detail/${value}`);
  },
  // 添加文件
  addProjectFile(data?: any): Promise<any> {
    return http.post('research/project/file', { data });
  },
  // 文件列表
  getProjectFileList(data?: any): Promise<any> {
    return http.get(`research/project/file?data=${JSON.stringify(data)}`);
  },
  // 删除文件
  deleteProfileFile(fileId: string): Promise<any> {
    return http.delete(`research/project/file/${fileId}`);
  },
  //更新项目信息
  updateCroProject(data?: any): Promise<any> {
    return http.patch('research/project', { data });
  },
  //添加加入、排除标准
  addStandard(data?: any): Promise<any> {
    return http.post('cro/project/standard', { data });
  },
  //查看加入、排除标准
  getStandard(value: string): Promise<any> {
    return http.get(`cro/project/standard/${value}`);
  },
  //获取客观量表（检查提醒）
  getObjectiveList(data?: any): Promise<any> {
    return http.get(`research/objective/examination/scale/${data}`);
  },
  //预览文件
  getFileInfo(fileId: any): Promise<any> {
    return http.get(`research/project/file/info/${fileId}`);
  },
};
