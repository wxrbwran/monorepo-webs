import { IMeta, IQuestions, ITopicTemplateItemApi } from 'typings/imgStructured';
import { IJcdTabItem } from './type';
export declare const outTypes: CommonData;
export declare const checkboxData: {
    question_type: string;
    question: string;
    answer: any[];
    options: string[];
};
export declare const textData: {
    question_type: string;
    question: string;
    answer: any[];
};
export declare const ddtkData: (uuid: string) => {
    uuid: string;
    question_type: string;
    question: string;
    answer: any[];
};
export declare const ddtkExample: {
    q: string;
    a: string;
}[];
export declare const baseField: CommonData;
export declare const baseFieldReverse: CommonData;
export declare const msg: (content: string, type?: string) => void;
export declare const fetchSubmitData: (questions: IQuestions[], startInx: number | string, clickSaveTime: number, gid?: string) => CommonData[];
export declare const fetchSubmitDataDdtk: (questions: IQuestions[], startInx: number, clickSaveTime: number) => any[];
interface IJcdItem {
    data: {
        data: ITopicTemplateItemApi[];
        groupInx: number;
    }[];
    meta: IMeta;
}
interface IIlist {
    data: ITopicTemplateItemApi[];
    meta: IMeta;
}
export declare const formatJcdSubmitData: (jcdTabList: IJcdItem[], clickSaveTime: number) => {
    jcdList: {
        list: IIlist[];
    };
};
export declare const findPosition: (item: any, topicAll: any[], dimension: number) => void;
export declare const fetchInitData: (initData: IJcdTabItem) => any[];
export declare const formatTempDdtk: (tkTmpList: any[]) => any[][];
export declare const getSource: (source: string, sid: string) => "<span class=\"SYSTEM\">官方</span>" | "<span class=\"ONESELF\">自己</span>" | "<span class=\"OTHERS\">他人</span>";
export declare const DdtkSeniorInlineType: {
    [key: string]: string;
};
export {};
