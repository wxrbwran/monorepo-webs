import { commonData } from 'typings/global';
export declare const localRole: string;
export declare const uid: string;
export declare const pageSize: number;
export declare const initialOrg: Iorg;
export declare enum SEX {
    MALE = "\u7537",
    FEMALE = "\u5973"
}
export declare const sexList: string[];
export declare enum INFO {
    Age = "\u5E74\u9F84",
    Weight = "\u4F53\u91CD",
    Height = "\u8EAB\u9AD8",
    gender = "\u6027\u522B",
    SHQX = "\u751F\u5316\u5168\u9879",
    XCG = "\u8840\u5E38\u89C4",
    BCG = "\u4FBF\u5E38\u89C4",
    XZCS = "\u5FC3\u810F\u8D85\u58F0",
    XDT = "\u5FC3\u7535\u56FE",
    HYPERTENSION = "\u9AD8\u8840\u538B",
    HYPERGLYCEMIA = "\u7CD6\u5C3F\u75C5",
    HYPERLIPEMIA = "\u9AD8\u8102\u8840",
    HYPERURICEMIA = "\u9AD8\u5C3F\u9178",
    fourHigh = "\u56DB\u5927\u4EE3\u8C22"
}
export interface IVal {
    projectGroups?: string;
    frequency?: string;
    custom?: number;
    remind?: string;
    maxAge?: number;
    minAge?: number;
    sex?: number;
    diagnosis?: string;
    treatment?: string;
    start?: string;
}
interface IDetail {
    projectGroups?: [];
    frequency?: string;
    custom?: Array<number>;
    maxAge?: number;
    minAge?: number;
    sex?: string;
    diagnosis?: string;
    treatment?: string;
    send?: string;
    start?: string;
}
export interface IPlanItem {
    detail: IDetail;
    type: string;
}
export interface IPlanInfos {
    plans: [
        {
            type: string;
            detail: IDetail;
        }
    ];
    questions: string;
    scaleId: string;
}
export interface IGroup {
    project: {
        objectiveGroup: {
            groupName: string;
            groupId: string;
        }[];
    };
}
export interface Ioptions {
    content: string;
    checked?: boolean;
}
export interface IQuestions {
    type: string;
    code?: number;
    detail: {
        checkedArr?: string[] | string;
        stem: string | string[];
        options: Ioptions[];
        answer?: string | string[];
    };
}
export interface IStandard {
    type?: string;
    age?: {
        lowerAge: number;
        upperAge: number;
    };
    diagnoseName?: string[];
    gender?: number;
    medicineName?: string[];
    customize?: string[];
}
export declare const sendTimeType: {
    key: string;
    value: string;
}[];
export declare const typeList: {
    ADMISSION_TIME: string;
    TREATMENT_TIME: string;
};
export declare const sendType: {
    key: string;
    value: string;
}[];
export declare const accountStatus: commonData;
export declare const projectDefaultImg: string[];
export declare const queryFields: {
    name: string;
    orgName: string;
    sex: string;
    age: string;
    province: string;
    shqx: string;
    xcg: string;
    bcg: string;
    xzcs: string;
    xdt: string;
    hypertension: string;
    hyperglycemia: string;
    hyperlipemia: string;
    hyperuricemia: string;
};
export declare const columnFields: {
    姓名: string;
    机构: string;
    性别: string;
    年龄: string;
    地区: string;
    生化全项: string;
    血常规: string;
    便常规: string;
    心脏超声: string;
    心电图: string;
    高血压: string;
    糖尿病: string;
    高脂血: string;
    高尿酸: string;
};
export declare const baseOption: {
    label: string;
    value: string;
}[];
export declare const extOptions: {
    label: string;
    value: string;
    key: string;
}[];
export declare const projectLabel: commonData;
export declare const eventList: string[];
export declare const projectStatus: commonData;
export declare const exitReason: string[];
export {};
