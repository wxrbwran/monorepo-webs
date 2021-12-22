export interface IImgStructuredApiData {
    degree: string;
    documentList: IApiDocumentItem[];
    outType: string;
    orgId?: string;
    orgName?: string;
    reportTime?: number;
    unknownReport: boolean;
    url: string;
    imageId: string;
}
export interface IApiDocumentItem {
    documentId: string;
    documentName: string;
    documentType: string;
    sampleFroms: string[];
    indexList: IApiIndexItem[];
}
export interface IApiIndexItem {
    advices?: string;
    unit?: string;
    value?: string;
    common: boolean;
    indexId: string;
    name: string;
    source: string;
    sourceSid: string;
    units: string[];
}
export interface IIndexItem extends IApiIndexItem {
    documentId: string;
    documentName: string;
    sampleFrom: string;
    id: string;
}
export interface IStructuredDetailProps {
    data: IImgStructuredApiData;
    imageId: string;
    handleRefresh?: () => void;
    handleClose: () => void;
}
export interface ISearchDocumentItem {
    firstIndex?: string;
    sampleFrom: string;
    documentName: string;
    name: string;
    id: string;
    documentId: string;
    sourceSid: string;
    source: string;
}
