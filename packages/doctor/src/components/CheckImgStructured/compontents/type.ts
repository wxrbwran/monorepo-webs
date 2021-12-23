export interface IAddTopicProps {
  topicType: string; // 问题类型
  actionType: string; // add | edit
  templateId: string; // 单据模板id
  handleDelQuestion: (editGroupId: number) => void;
  handleSaveQuestion: (data: any, actionType: string, editInx?: number) => void;
  isShowEdit: boolean;
  initData?: IQaItem[] | IQaItem; // 编辑数据  填空填是数组，其余是{}
  editGroupInx?: number; // 编辑的groupInx
}
export interface IAddJcdItem {
  part: string;
  method: string
  jcdName: string;
  sid: string;
  source: string;
  id: string;
}

export interface IMeta {
  tabKey: string; // 检查单可重复添加同名字同类型的，此tabKey仅做为前端tab唯一标识使用。
  jcdName: string;
  sid: string;
  source: string;
  part: string;
  method: string;
  id: string;
}

// 检查单每个tab的初始数据init使用
export interface IJcdTabItem {
  meta: IMeta,
  data?: any[];
}

export interface IQaItem {
  question: string;
  question_type: string;
  answer: string[];
  options?: string[];
  group?: string;
  uuid: string;
  action?: string; // ADD EDIT DELETE
  createdTime?: number;
}
