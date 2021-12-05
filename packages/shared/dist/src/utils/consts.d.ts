export declare const defaultAvatar = "https://staff-avatars-prod.oss-cn-beijing.aliyuncs.com/default-avatar.jpg";
export declare const imConfig: {
    localMsglimit: number;
    useDb: boolean;
    appkey: string;
    url: string;
};
export declare const rolePriceList: {
    text: string;
    key: string;
    extra: string;
}[];
export declare const roleType: string[];
export declare const VIPType: {
    type: string;
    divide: number;
}[];
export declare const doctorRole: {
    [key: string]: string;
};
export declare const gluTab: {
    label: string;
    value: string;
}[];
export declare const imgCheckTypeList: {
    ZD: string;
    THXHDB: string;
    NCG: string;
    CTHCHS: string;
    DBL: string;
    NXSX: string;
    BCG: string;
    GZ: string;
    XZCS: string;
    XGSX: string;
    XDT: string;
    XFYD: string;
    SHQX: string;
    HXD_24H: string;
    JGWX: string;
    YDPB: string;
    XCG: string;
    XY_24H: string;
    XSTLT: string;
    ZDZLS: string;
    OTHER_HY: string;
    OTHER_JC: string;
};
export declare const imageIndexType: CommonData;
export declare const clientType: {
    DOCTOR: string;
    NURSE: string;
    OUTPATIENT: string;
};
export declare const pageSize = 10;
export declare const titleList: string[];
export declare const doctorRelated: {
    biography: string;
    expertise: string;
    achievement: string;
    meetingLecture: string;
    firstProfessionBrief: string;
};
export declare const roleList: {
    OPERATOR: string;
    OPERATOR_ADMIN: string;
    OPERATOR_DEPARTMENT_ADMIN: string;
};
export declare const orgCategroy: {
    ORDINARY: string;
    CLINICAL: string;
};
export declare const sexList: string[];
export declare const provinces: {
    id: number;
    regionName: string;
}[];
export declare const adminRoles: string[];
export declare const labelCol: {
    span: number;
};
export declare const operatorRoles: string[];
export declare const departmentType: {
    text: string;
    key: string;
}[];
export declare const roleTags: string[];
export declare const inviteStatusLists: {
    WAITING: string;
    CONFIRMED: string;
    REFUSED: string;
};
export declare const accountStatus: {
    110: string;
    118: string;
    119: string;
    117: string;
};
export declare const projectStatus: {
    1000: string;
    1001: string;
    1002: string;
    1003: string;
};
export declare const projectInviteStatus: CommonData;
export declare const croLists: {
    1002: string;
    1001: string;
};
export declare const itemWithoutlabel: string[];
export declare const itemWithLabel: {
    key: string;
    label: string;
}[];
export declare const basicInfoTab: Store;
export declare const isInternet: Store;
export declare const orgType: string[];
export declare const orgGrade: string[];
export declare const hospitalLevel: Store;
export declare const hospitalGrade: Store;
export declare const topInfos: Store;
export declare const addtionalMenuList: {
    nurse_team: string;
    counselor_doctor_team: string;
    superior_org_space: string;
    lower_org_space: string;
};
export declare const formItemLayout: {
    labelCol: {
        xs: {
            span: number;
        };
        sm: {
            span: number;
        };
    };
    wrapperCol: {
        xs: {
            span: number;
        };
        sm: {
            span: number;
        };
    };
};
export declare const formItemLayoutWithOutLabel: {
    wrapperCol: {
        xs: {
            span: number;
            offset: number;
        };
        sm: {
            span: number;
            offset: number;
        };
    };
};
export declare const projectDefaultImg: string[];
export declare const statusLists: {
    110: string;
    119: string;
    118: string;
    117: string;
};
declare type docTypeKeys = 'HYD' | 'JCD' | 'OTHER';
export declare const DocumentType: Record<docTypeKeys, string>;
export {};
