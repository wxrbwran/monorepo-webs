export interface IAddTopicProps {
  topicType: string; // 问题类型
  actionType: string; // add | edit
  templateId: string; // 单据模板id
  editInx?: number; // 编辑时传：当前编辑项
  handleDelQuestion: (delInx?: number) => void;
  handleSaveQuestion: (data: any, actionType: string, editInx?: number) => void;
}
export interface IAddJcdItem {
  part: string;
  method: string
  jcdName: string;
  sid: string;
  source: string;
  id: string;
}

// 检查单每个tab的初始数据init使用
export interface IJcdTabItem {
  meta: {
    tabKey: string; // 检查单可重复添加同名字同类型的，此tabKey仅做为前端tab唯一标识使用。
    jcdName: string;
    sid: string;
    source: string;
    part: string;
    method: string;
    id: string;
  },
  data?: any[];
}
