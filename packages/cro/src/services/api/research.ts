import http from '@/services/http';
import { isEmpty } from 'lodash';

export default {
  // 查询成员医生统计信息
  fetchMemberStatistics({ projectNsId }: { projectNsId: string }): Promise<any> {
    return http.get(`research/member/statistics/${projectNsId}`);
  },
  // 查询成员邀请空间的医生（成员列表）
  fetchMemberDoctor(data: any): Promise<any> {
    if (isEmpty(data)) {
      return http.get('research/member/doctor');
    }
    return http.get(`research/member/doctor?data=${JSON.stringify(data)}`);
  },
  // 查询科研机构的所有医生(邀请成员列表)
  fetchProjectDoctor(data: any): Promise<any> {
    return http.get(`research/project/related_doctors?data=${JSON.stringify(data)}`);
  },
  // 查询项目下全部科研机构(邀请成员-》机构列表)
  fetchProjectOrg(projectNsId: any): Promise<any> {
    return http.get(`research/project/organization/${projectNsId}`);
  },
  // 获取医生相关的全部机构列表
  fetchDoctorRelatedOrg(data: any): Promise<any> {
    return http.get('doctor/related_organizations', { data });
  },
  // 查询科研机构下的科室(邀请成员-》科室列表)
  fetchProjectDep({ orgId }: any): Promise<any> {
    return http.get(`research/project/department/${orgId}`);
  },
  // 邀请科研医生
  postInviteDoctor(data?: any): Promise<any> {
    return http.post('research/invite/doctor', { data });
  },

  // 查询成员架构(架构列表)
  fetchMemberFrame(projectNsId: any): Promise<any> {
    return http.get(`research/member/frame/${projectNsId}`);
  },
  // 查询已加入的成员医生列表（添加PI分组，分PI组  - 查询已加入的成员列表接口）
  fetchInviteDoctorList(data: any): Promise<any> {
    return http.get(`research/invite/doctor?data=${JSON.stringify(data)}`);
  },
  // 创建PI试验分组
  postPiGroup(data?: any): Promise<any> {
    return http.post('research/pi/group', { data });
  },
  // 修改PI试验分组
  patchPiGroup(data?: any): Promise<any> {
    return http.patch('research/pi/group', { data });
  },

  // 查询科研系统消息列表
  fetchSysMessage(data: any): Promise<any> {
    return http.get(`research/message?data=${JSON.stringify(data)}`);
  },
  // 更新科研项目提醒状态
  patchSysMessageStatus(data: any): Promise<any> {
    return http.patch('research/project/doctor', { data });
  },

  // 查询PI小组内所有成员
  fetchGroupDetail(data: any): Promise<any> {
    return http.get(`research/group/detail?data=${JSON.stringify(data)}`);
  },
  // 将科研医生加入实验分组
  postGroupDoctor(data?: any): Promise<any> {
    return http.post('research/group/doctor', { data });
  },
  // 修改 为小组指定 组长
  postGroupLeader(data?: any): Promise<any> {
    return http.post('research/group/leader', { data });
  },

  // 查询组织架构
  fetchFrameChart(projectNsId: string): Promise<any> {
    return http.get(`research/frame/chart/${projectNsId}`);
  },

  // 升级成多中心试验
  patchProjectUpgrade(projectSid: string): Promise<any> {
    return http.patch(`research/project/upgrade/${projectSid}`);
  },

  // 获取主观量表发送记录
  fetchSubjectiveRecord(data?: any): Promise<any> {
    return http.get(`research/subjective/record?data=${JSON.stringify(data)}`);
  },
  // 获取CRF量表发送记录
  fetchCrfRecord(data?: any): Promise<any> {
    return http.get(`research/crf/record?data=${JSON.stringify(data)}`);
  },
  // 获取客观检查发送记录
  fetchObjectiveRecord(data?: any): Promise<any> {
    return http.get(`research/objective/record?data=${JSON.stringify(data)}`);
  },

  // 新增操作日志
  postBusinessLog(data?: any): Promise<any> {
    return http.post('research/business/log', { data });
  },
  // 新增操作原因
  postOperationReason(data?: any): Promise<any> {
    return http.post('research/operation/reason', { data });
  },
  // 获取操作日志列表
  fetchLogList(data?: any): Promise<any> {
    return http.get(`research/business/log?data=${JSON.stringify(data)}`);
  },
};

