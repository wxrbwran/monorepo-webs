/// <reference types="react" />
export declare const columnCreator: (title: string, dataIndex: string, customRender?: any) => CommonData;
export declare const clName: CommonData;
export declare const clTitle: CommonData;
export declare const clGoodsPrice: CommonData;
export declare const indexName: CommonData;
export declare const clAvatar: {
    title: string;
    dataIndex: string;
    render: (text: string) => JSX.Element;
};
export declare const clDepartment: {
    title: string;
    dataIndex: string;
    render: (text: {
        name: string;
    }) => string;
};
export declare const indexUnits: {
    title: () => JSX.Element;
    dataIndex: string;
    render: (text: string[]) => JSX.Element;
};
export declare const indexAbbr: {
    title: string;
    dataIndex: string;
    render: (text: string) => JSX.Element;
};
export declare const indexSource: {
    title: string;
    dataIndex: string;
    render: (text: string) => JSX.Element;
};
export declare type SexType = 'MALE' | 'FEMALE';
export declare const avatar: {
    title: string;
    dataIndex: string;
    width: number;
    render: (text: string) => JSX.Element;
};
export declare const navAvatar: (params: Store) => {
    title: string;
    dataIndex: string;
    width: number;
    render: (text: string, record: Store) => JSX.Element;
};
export declare const name: {
    title: string;
    dataIndex: string;
    width: number;
    render: (text: string) => JSX.Element;
};
export declare const navName: (params: Store) => {
    title: string;
    dataIndex: string;
    width: number;
    render: (text: string, record: Store) => JSX.Element;
};
export declare const sex: {
    title: string;
    dataIndex: string;
    key: string;
    width: number;
    render: (text: SexType) => JSX.Element;
};
export declare const age: {
    title: string;
    dataIndex: string;
    width: number;
};
export declare const title: {
    title: string;
    dataIndex: string;
    render: (text: string) => JSX.Element;
};
export declare const upperDoctor: {
    title: string;
    dataIndex: string;
};
export declare const lowerDoctor: {
    title: string;
    dataIndex: string;
};
export declare const province: {
    title: string;
    dataIndex: string;
};
export declare const patientNum: {
    title: string;
    dataIndex: string;
};
export declare const inviteStatus: {
    title: string;
    dataIndex: string;
    render: (text: string) => JSX.Element;
};
export declare const status: {
    title: string;
    dataIndex: string;
    render: (text: number) => JSX.Element;
};
export declare const organizationName: (params: any) => {
    title: string;
    dataIndex: string;
    render: (text: string, record: any) => JSX.Element;
};
export declare const organizationCategory: {
    title: string;
    dataIndex: string;
    render: (text: string) => JSX.Element;
};
export declare const organizationCode: {
    title: string;
    dataIndex: string;
};
export declare const adminName: {
    title: string;
    dataIndex: string;
};
export declare const lowOrgCount: {
    title: string;
    dataIndex: string;
    sorter: boolean;
};
export declare const upOrgCount: {
    title: string;
    dataIndex: string;
    sorter: boolean;
};
export declare const deptCount: {
    title: string;
    dataIndex: string;
    sorter: boolean;
};
export declare const doctorCount: {
    title: string;
    dataIndex: string;
    sorter: boolean;
};
export declare const nurseCount: {
    title: string;
    dataIndex: string;
    sorter: boolean;
};
export declare const patientCount: {
    title: string;
    dataIndex: string;
    sorter: boolean;
};
export declare const doctorName: {
    title: string;
    dataIndex: string;
};
export declare const assistantName: {
    title: string;
    dataIndex: string;
};
export declare const serviceLevel: {
    title: string;
    dataIndex: string;
    render: (text: string) => "VIP" | "普通患者";
};
export declare const tel: {
    title: string;
    dataIndex: string;
};
export declare const role: {
    title: string;
    dataIndex: string;
    render: (text: string) => JSX.Element;
};
export declare const workload: {
    title: string;
    dataIndex: string;
};
export declare const department: {
    title: string;
    dataIndex: string;
    width: number;
    render: (text: any) => JSX.Element;
};
export declare const departmentName: {
    title: string;
    dataIndex: string;
};
export declare const adminDepartment: {
    title: string;
    dataIndex: string;
    width: number;
    render: (text: any) => JSX.Element;
};
export declare const lastMonthWorkload: {
    title: string;
    dataIndex: string;
};
export declare const monthWorkload: {
    title: string;
    dataIndex: string;
};
export declare const organizationNameOut: (params: any) => {
    title: string;
    dataIndex: string;
    align: string;
    mock: string;
    render: (text: string, record: any) => JSX.Element;
};
export declare const orgName: {
    title: string;
    dataIndex: string;
    mock: string;
    align: string;
};
export declare const patientName: {
    title: string;
    dataIndex: string;
    width: number;
    mock: string;
    render: (text: string) => JSX.Element;
};
export declare const crostatus: {
    title: string;
    dataIndex: string;
    mock: string;
    align: string;
    render: (text: number) => any;
};
export declare const orgaName: {
    title: string;
    dataIndex: string;
    mock: string;
    align: string;
};
export declare const sendNumber: {
    title: string;
    dataIndex: string;
    mock: string;
    align: string;
    sorter: (a: {
        deptCount: number;
    }, b: {
        deptCount: number;
    }) => number;
};
export declare const noReplyNumber: {
    title: string;
    dataIndex: string;
    align: string;
    mock: string;
    sorter: (a: {
        noReplyNumber: number;
    }, b: {
        noReplyNumber: number;
    }) => number;
};
