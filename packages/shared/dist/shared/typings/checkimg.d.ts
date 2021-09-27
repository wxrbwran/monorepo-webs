declare interface IImgTypeItems {
    indexId: string;
    name: string;
    abbreviation: string;
    value?: number;
    unit?: string;
    imageType: string;
    imageTypeNew: string;
    unitList: {
        min: number;
        max: number;
        unit?: string;
    }[];
}
export interface IDocmentItem {
    indexList?: IImgTypeItems[];
    sampleFroms?: string[];
    documentId: string;
    documentName: string;
    documentType?: 'HYD';
    source: string;
    common?: boolean;
    firstIndex?: string;
    name?: string;
    id?: string;
    sampleFrom?: string;
    sourceSid?: string;
}
export interface IIndexItemApi {
    advice?: string[];
    common: boolean;
    indexId: string;
    name: string;
    source: string;
    sourceSid: string;
    units?: string[];
    value: string;
    advices: string[];
}
export interface IDocmentItemApi {
    documentId: string;
    documentName: string;
    documentType?: 'HYD';
    sampleFroms: string[];
    indexList: IIndexItemApi[];
}
export interface ITypeItem {
    firstIndex?: string;
    sampleFrom: string;
    documentName: string;
    name: string;
    id: string;
    documentId: string;
    sourceSid: string;
}
export {};
