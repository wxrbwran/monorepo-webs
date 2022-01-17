declare interface IImgStructuredApiData {
  degree: string;
  list: IApiDocumentList[];
  url: string;
  imageId: string; // 自己添加上的属性
}
declare interface IApiDocumentList {
  documentList: IApiDocumentItem[],
  outType: string;
  orgId?: string;
  orgName?: string;
  unknownReport?: boolean;
}
// 后端接口返回的图片单据列表item
declare interface IApiDocumentItem {
  documentId: string; // 单据id
  documentName: string; // 单据name
  documentType: string; // 单据类型：HYD | JCD
  sampleFroms: string[]; // 单据来源：有且仅有一个，此处应该是sampleFrom,目前后端返回的是数据
  indexList: IApiIndexItem[] // 【单据id+单据来源】 下的指标列表
}
// 后端接口返回的图片单据列表里对应的指标列表item（仅列了有用的字段）
declare interface IApiIndexItem {
  advices?: string; // 用户输入的指标建议值
  unit?: string; // 用户输入的指标建议值选择的指标单位
  value?: string; // 用户输入的指标数据
  common: boolean; // 指标是否常用
  indexId: string; // 指标id
  name: string; // 指标name
  source: string; // 指标来源 DOCTOR | SYSTEM
  sourceSid: string; // 指标添加人sid（医生sid或系统用户sid)
  units: string[]; // 指标单位集合
}

// 备注：回显时把以下documentId、documentName、sampleFrom等字段放到外层了，关于指标的放到了indexLst,见接口IApiDocumentItem
// 但通过搜索点击，根据【来源+单据名称】获取指标列表时返回的字段是把上面信息和指标同级展示了

// 根据【来源+单据名称】获取指标列表时返回的字段
declare interface IIndexItem extends IApiIndexItem {
  documentId: string; // 添加指标时需要
  documentName: string; // 添加指标时需要
  sampleFrom: string; // 添加指标时需要
  id: string; // 指标id  ===   api回显的indexId
}

declare interface IStructuredDetailProps {
  imageId: string;
  handleRefresh?: () => void;
  handleClose: () => void;
  hydData: IApiDocumentList[];
  jcdData: ITopicItemApi[];
  tempAll: ITmpList;
  jcdOriginIds: string;
}

// 搜索指标或者单据名称时，返回的item
declare interface ISearchDocumentItem {
  type: 'DOCUMENT' | 'INDEX';
  firstIndex?: string; // 自己添加的
  sampleFrom: string; // 来源
  documentName: string; // 单据（大分类）name
  name: string; // 指标name
  id: string; // 指标id
  documentId: string; // 单据id
  sourceSid: string;
  source: string;
  tabKey?: string;
}

declare interface Ioptions {
  content: string;
  checked?: boolean;
}
declare interface IQuestions {
  question_type?: string; // RADIO  CHECKED...
  isAdd?: boolean; // 是否新添加
  question: string;
  answer: string[];
  options?: string[];
  uuid: string;
}

declare interface ITopicTemplateItemApi {
  createdTime: number;
  question: string;
  answer?: string[];
  question_type: string;
  options?: string[];
  sid: string;
  group: string;
  uuid?: string;
  isAdd?: string;
}
declare interface ITopicItemApi {
  data: ITopicQaItemApi[],
  meta: IMeta;
}

declare interface ITopicQaItemApi {
  answer: any[],
  group: string;
  question: string;
  question_type: string;
  createTime?: number;
  sid?: string;
  options: string[];

  // 自已加的标识
  isAdd?: boolean;
}

declare interface IMeta {
  id?: string;
  createdTime: number;
  title: string;
  sid: string;
  imageId: string;
  method: string;
  part: string;
}
declare interface ITmpList {
  [key: string]: ITopicTemplateItemApi[];
}
