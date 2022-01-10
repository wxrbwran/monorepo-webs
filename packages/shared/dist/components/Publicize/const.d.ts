export interface IList {
    content: {
        address: string;
        convertAddress: string;
        cover: string;
        filename: string;
    };
    id: string;
    type: number;
    inSchedule: boolean;
}
export interface IScale {
    id: number;
    title: string;
    subTitle: string;
    question: [];
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
export interface IValues {
    conditions: {
        id: string;
        type: string;
        value: string;
        min: number;
        max: number;
    }[];
    custom: number[];
    frequencyType: string;
    group: string[];
    time: string;
    content?: IList[];
}
export interface IRule {
    condition: {
        items: {
            name: string;
            description: string;
            items: {
                name: string;
            }[];
        }[];
    };
    namespace: {
        name: string;
    };
    start: {
        name: string;
    };
}
export declare const EducationType: {
    video: string;
    accompany: string;
    document: string;
    article: string;
    picture: string;
    audio: string;
};
export declare const AcceptType: {
    video: string;
    document: string;
    picture: string;
    audio: string;
};
export declare const businessType: {
    video: number;
    document: number;
    picture: number;
    audio: number;
};
export declare const sendType: {};
export declare const staticType: {};
export declare const beforeEl: string;
export declare const alfterEl: string;
