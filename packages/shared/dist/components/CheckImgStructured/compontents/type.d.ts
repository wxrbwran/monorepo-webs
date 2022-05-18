export interface IAddTopicProps {
    topicType: string;
    actionType: string;
    templateId: string;
    handleDelQuestion: (editGroupId: number) => void;
    handleSaveQuestion: (data: any, actionType: string, editInx?: number) => void;
    isShowEdit: boolean;
    initData?: IQaItem[] | IQaItem;
    editGroupInx?: number;
    closeModal?: () => void;
}
export interface IAddJcdItem {
    part: string;
    method: string;
    jcdName: string;
    sid: string;
    source: string;
    id: string;
    creatorSid: string;
}
export interface IMeta {
    tabKey: string;
    jcdName: string;
    sid: string;
    source: string;
    part: string;
    method: string;
    id: string;
    creatorSid: string;
}
export interface IJcdTabItem {
    meta: IMeta;
    data?: any[];
}
export interface IQaItem {
    question: string;
    question_type: string;
    answer: string[];
    options?: string[];
    group?: string;
    uuid: string;
    action?: string;
    createdTime?: number;
}
export declare enum InlineType {
    'INLINE_COMPLETION' = "\u586B\u7A7A\u9898",
    'INLINE_RADIO' = "\u5355\u9009\u9898",
    'INLINE_CHECKBOX' = "\u591A\u9009\u9898",
    'INLINE_DATE' = "\u65E5\u671F"
}
