const fetchData = (code: string, desc: string) => ({
  code,
  desc,
});

const NSLabelType = {
  GLOBAL: fetchData('global', '根空间标识,可以管理逻辑上所有的机构及其相应的管理员分配'), // 1
  DEFAULT: fetchData('default', '默认系统初始化的机构空间'), // 2
  CHRONIC_DISEASE: fetchData('chronic_disease_space', '管理的业务空间'), // 3
  DEPARTMENT_TYPE: fetchData('department_type', '科室类别空间，区分科室所属类别'), // 4

  DEPARTMENT: fetchData('department', '表示科室空间'), // 5
  NURSE_TEAM: fetchData('nurse_team', '护士团队空间'), // 6
  COUNSELOR_DOCTOR_TEAM: fetchData('counselor_doctor_team', '顾问医生团队空间'), // 7
  CRO_ORG: fetchData('cro_org', '区分CRO业务执行区域的空间'), // 8
  IH_ORG: fetchData('ih_org_space', '线上医院和项目机构'), // 9
  IH_LIN_FEN_ORG: fetchData('ih_lin_fen_org', '临汾市互联网医院机构'), // 10
  IH_XIN_ZHOU_ORG: fetchData('ih_xin_zhou_org', '忻州互联网医院机构'), // 11

  SUPERIOR_ORG: fetchData('superior_org_space', '上级机构所属的空间类型'), // 12
  LOWER_ORG: fetchData('lower_org_space', '下级机构所属的空间类型'), // 13
  CHRONIC_DISEASE_TEAM: fetchData('chronic_disease_team', '管理团队空间'), // 14
  CHRONIC_DISEASE_TEAM_SESSION: fetchData('session_group', '团队成员内部会话组_SPACE'), // 15

  COMMON_DEPARTMENT_TYPE: fetchData('common_department_type', '通用科室'), // 16
  CARDIOVASCULAR_DEPARTMENT_TYPE: fetchData('cardiovascular_department_type', '心血管科'), // 17
  TUMOUR_DEPARTMENT_TYPE: fetchData('tumour_department_type', '肿瘤科'), // 18
  NEUROLOGY_DEPARTMENT_TYPE: fetchData('neurology_department_type', '精神内科'), // 19

  RESEARCH_SINGLE_PROJECT: fetchData('single_project', '单中心科研项目空间'), // 20
  RESEARCH_MULTI_PROJECT: fetchData('multi_project', '多中心科研项目空间'), // 21
  RESEARCH_PATIENT_INVITE: fetchData('research_patient_invite', '科研项目患者邀请空间'), // 22
  RESEARCH_PROJECT_PATIENT: fetchData('research_pro_patient', '科研项目受试者空间'), // 23
  RESEARCH_PATIENT_GROUP: fetchData('research_patient_group', '科研项目患者小组空间'), // 24
  RESEARCH_ORG: fetchData('research_org', '科研项目机构空间'), // 25
  RESEARCH_DEP: fetchData('research_dep', '科研项目科室空间'), // 26
  RESEARCH_PROJECT_DOCTOR: fetchData('research_pro_doc', '科研项目成员医生空间'), // 27
  RESEARCH_PI: fetchData('research_pi', '科研项目PI组空间'), // 28
  RESEARCH_SUB_PI: fetchData('research_sub_pi', '科研项目分PI组空间'), // 29
};

export default NSLabelType;
