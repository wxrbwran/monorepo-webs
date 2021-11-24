declare interface ICert {
  qualification: string[];
  badge: string[];
  profession: string[];
}
// 一个任意实体包含的全部属性  任意实体基本信息,包括：机构、医生、患者的所有属性
declare type ISubject = Partial<ISub>;

declare interface ISub {
  wcId: string;
  role: string; // 机构实体角色，代表机构本身
  id: string; // sid
  sid: string; // sid
  avatarUrl: string;
  // 以医生维度，name为医生姓名，机构名是orgName。如果以机构维度，机构名是name。orgName是前端整合数据添加进去的
  name: string;
  sex: number; // 性别 : 0 女， 1 男， 2 其他
  height: number; // 身高
  weight: number; // 体重
  waistline: number; // 腰围
  idNum: string; // 身份证号
  tel: string; // 手机号
  ethnicity: string; // 种族
  birthday: number; // 出生时间 / 机构建立时间  多重属性
  postCode: string; // 邮编
  residencePlace: string; // 居住地址
  domicile: string; // 户籍地址
  address: string; // 实体所在地 （人/机构当前所在地址, 现在住址）  多重属性
  remark: string;
  marriage: string; // 婚姻状况
  education: string; // 教育背景
  email: string; // 邮箱
  bankName: string; // 银行名称
  bankCardNum: string; // 银行卡号
  note: string; // 备注
  // 风险因素
  // {0, "无"}, {1, "高血压"}, {2, "糖尿病"},{3, "高血脂"},{4, "高尿酸"},
  // {5, "冠心病"},{6, "其他(有病但是没有冠心病)}, {7, "肺癌"},{8, "脑卒中"}
  riskFactor: Comment;

  certificates: ICert; // 证件图片信息
  workHospital: string; // 所在医院（实体医院）
  workDepartment: string; // 所在科室，医生所属临床科室名称
  title: string; // 职称
  titleID: string; // 职称ID
  mentor: string; // 导师： 博导、硕导
  biography: string; // 传记、个人简介
  expertise: string; // 专业描述
  achievement: string; // 成就描述
  meetingLecture: string; // 会议演讲
  firstProfessionCompany: string; // 第一执业医院
  firstProfessionBrief: string; // 第一执业医院简介
  belongToGroup: string; // 所属医生集团

  qcCode: string; // 资格证书编码
  qcIssuingDate: string; // 资格证书发放日期
  pcCode: string; // 执业证书编码
  pcIssuingDate: string; // 执业证发放日期
  subjectCode: string; // 医生所属诊疗科目编码
  subjectName: string; // 医生所属诊疗科目名称
  workDepartmentCode: string; // 医生所属临床科室代码
  firstProfessionCompanyCode: string; // 第一执业机构名称代码
  secondProfessionCompany: string; // 第二执业医院
  thirdProfessionCompany: string; // 第三执业医院
  thirdProfessionCompanyCode: string; // 第三执业机构名称代码

  /* 一个机构实体的基本属性 */
  provinceName: string; // 省
  provinceCode: number;
  cityName: string; // 市
  cityCode: number;
  townName: string; // 镇
  townCode: number;
  districtName: string; // 街道
  detailAddress: string; // 详细地址
  isOnlineHos: number; // 是否是线上医院和项目机构 0否 1是
  level: number; // 医生级别 1 2 3
  grade: string; // "甲等" 医院评级
  type: string; // "A级"
  legalPerson: string; // 法人
  employeeNum: number; // 员工数量
  revenue: number; // 年收入
  totalAsset: number; // 总资产
  mainIndustry: string; // 主要行业
  webUrl: string; // 介绍页面地址

  bmi: string;
  uuCode: string; // 动态计算属性 ：用户实体识别码，根据sid计算
  abbreviation: string; // 动态计算属性 ： 用户所在地区的省级行政区域简称

  qrCodeUrl: string; // 二维码url地址

  // ——————————————！自定义！——————————————便于使用，根据实际情况添加的字段
  nsId: string; // teamNSId
  // 以医生维度，name为医生姓名，机构名是orgName。如果以机构维度，机构名是name。
  // orgName是前端整合数据添加进去的,例如患者列表，需要展示机构名称，根据后端数据过滤到机构名追加进去方便使用
  orgName: string; //  teamNSId
  // ——————————————！自定义！——————————————
}
