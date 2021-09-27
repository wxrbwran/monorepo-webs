import { Store } from 'antd/lib/form/interface';
export declare type SexType = 'MALE' | 'FEMALE';
export declare const name: {
    title: string;
    dataIndex: string;
    width: number;
    render: (text: string) => JSX.Element;
};
export declare const age: {
    title: string;
    dataIndex: string;
    width: number;
};
export declare const sex: {
    title: string;
    dataIndex: string;
    key: string;
    width: number;
    render: (text: SexType) => JSX.Element;
};
export declare const address: {
    title: string;
    dataIndex: string;
    key: string;
    render: (text: string) => string;
};
export declare const status: {
    title: string;
    dataIndex: string;
    key: string;
    render: (text: string) => JSX.Element;
};
export declare const patientName: {
    title: string;
    dataIndex: string;
    key: string;
};
export declare const patientStatus: {
    title: string;
    dataIndex: string;
    key: string;
    render: (record: any) => JSX.Element;
};
export declare const patientGroup: {
    title: string;
    dataIndex: string;
    key: string;
    render: (record: any) => JSX.Element;
};
export declare const inGroupAt: {
    title: string;
    dataIndex: string;
    key: string;
    render: (text: any) => JSX.Element;
};
export declare const outGroupAt: {
    title: string;
    dataIndex: string;
    key: string;
    render: (text: any, record: any) => JSX.Element;
};
export declare const stopReason: {
    title: string;
    dataIndex: string;
    key: string;
    render: (text: any) => JSX.Element;
};
export declare const testStatus: {
    title: string;
    dataIndex: string;
    key: string;
    render: (record: any) => JSX.Element;
};
export declare const firstProfessionCompany: {
    title: string;
    dataIndex: string;
    key: string;
};
export declare const title: {
    title: string;
    dataIndex: string;
    key: string;
};
export declare const department: {
    title: string;
    dataIndex: string;
    key: string;
};
export declare const role: {
    title: string;
    dataIndex: string;
    key: string;
    render: (text: string) => string | number;
};
export declare const researcherRole: {
    title: string;
    dataIndex: string;
    key: string;
    render: (text: string) => string | number;
};
export declare const tel: {
    title: string;
    dataIndex: string;
    key: string;
};
export declare const patientCount: {
    title: string;
    dataIndex: string;
    key: string;
};
export declare const memberStatus: {
    title: string;
    dataIndex: string;
    key: string;
};
export declare const groupName: {
    title: string;
    dataIndex: string;
    key: string;
};
export declare const researchProjectDoctor: {
    title: string;
    dataIndex: string;
    key: string;
};
export declare const ethnicity: {
    title: string;
    dataIndex: string;
    key: string;
    render: (text: string) => string;
};
export declare const noSendPatientColumns: () => ({
    title: string;
    dataIndex: string;
    width: number;
} | {
    title: string;
    dataIndex: string;
    key: string;
    render: (text: string) => string;
})[];
export declare const addedPatientColumns: () => ({
    title: string;
    dataIndex: string;
    width: number;
} | {
    title: string;
    dataIndex: string;
    key: string;
    render: (text: string) => string;
} | {
    title: string;
    dataIndex: string;
    key: string;
    render: (text: string) => JSX.Element;
})[];
export declare const patientCroColumns: (params: Store) => ({
    title: string;
    dataIndex: string;
    width: number;
    render: (text: string) => JSX.Element;
} | {
    title: string;
    dataIndex: string;
    key: string;
} | {
    title: string;
    dataIndex: string;
    render: (record: any) => JSX.Element;
})[];
export declare const patientCroStopColumns: () => ({
    title: string;
    dataIndex: string;
    width: number;
    render: (text: string) => JSX.Element;
} | {
    title: string;
    dataIndex: string;
    key: string;
})[];
export declare const groupDetailColumns: () => ({
    title: string;
    dataIndex: string;
    width: number;
    render: (text: string) => JSX.Element;
} | {
    title: string;
    dataIndex: string;
    key: string;
})[];
export declare const memberListColumns: ({
    title: string;
    dataIndex: string;
    width: number;
    render: (text: string) => JSX.Element;
} | {
    title: string;
    dataIndex: string;
    key: string;
})[];
export declare const addGroupDoctorListColumns: ({
    title: string;
    dataIndex: string;
    width: number;
    render: (text: string) => JSX.Element;
} | {
    title: string;
    dataIndex: string;
    key: string;
})[];
export declare const doctorName: {
    title: string;
    dataIndex: string;
    width: number;
    render: (text: string) => JSX.Element;
};
export declare const croName: {
    title: string;
    dataIndex: string;
    width: number;
    render: (text: string) => JSX.Element;
};
export declare const eventType: {
    title: string;
    dataIndex: string;
    render: (text: string[]) => JSX.Element;
};
export declare const content: {
    title: string;
    dataIndex: string;
    render: (text: Store[], record: any) => JSX.Element;
};
export declare const createdAt: {
    title: string;
    dataIndex: string;
    width: number;
    render: (text: number) => JSX.Element;
};
export declare const endEventColumns: () => ({
    title: string;
    dataIndex: string;
    width: number;
    render: (text: string) => JSX.Element;
} | {
    title: string;
    dataIndex: string;
    render: (text: string[]) => JSX.Element;
} | {
    title: string;
    dataIndex: string;
    render: (text: Store[], record: any) => JSX.Element;
} | {
    title: string;
    dataIndex: string;
    width: number;
    render: (text: number) => JSX.Element;
})[];
export declare const sendAt: {
    title: string;
    dataIndex: string;
    width: number;
    render: (text: number) => JSX.Element;
};
export declare const Sender: {
    title: string;
    dataIndex: string;
    width: number;
};
export declare const Receiver: {
    title: string;
    dataIndex: string;
    width: number;
};
export declare const replyAt: {
    title: string;
    dataIndex: string;
    width: number;
    render: (text: number) => JSX.Element;
};
