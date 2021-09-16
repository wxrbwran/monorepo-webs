export var localRole = localStorage.getItem('xzl-web-doctor_role') || '';
export var uid = window.$storage.getItem('user');
export var pageSize = process.env.NODE_ENV === 'development' ? 3 : 10;
export var initialOrg = {
    organizationId: '',
    organizationName: '',
    role: '',
    roles: [],
    status: '',
    qrCodeUrl: '',
};
export var SEX;
(function (SEX) {
    SEX["MALE"] = "\u7537";
    SEX["FEMALE"] = "\u5973";
})(SEX || (SEX = {}));
export var sexList = ['女', '男', '保密'];
export var INFO;
(function (INFO) {
    INFO["Age"] = "\u5E74\u9F84";
    INFO["Weight"] = "\u4F53\u91CD";
    INFO["Height"] = "\u8EAB\u9AD8";
    INFO["gender"] = "\u6027\u522B";
    INFO["SHQX"] = "\u751F\u5316\u5168\u9879";
    INFO["XCG"] = "\u8840\u5E38\u89C4";
    INFO["BCG"] = "\u4FBF\u5E38\u89C4";
    INFO["XZCS"] = "\u5FC3\u810F\u8D85\u58F0";
    INFO["XDT"] = "\u5FC3\u7535\u56FE";
    INFO["HYPERTENSION"] = "\u9AD8\u8840\u538B";
    INFO["HYPERGLYCEMIA"] = "\u7CD6\u5C3F\u75C5";
    INFO["HYPERLIPEMIA"] = "\u9AD8\u8102\u8840";
    INFO["HYPERURICEMIA"] = "\u9AD8\u5C3F\u9178";
    INFO["fourHigh"] = "\u56DB\u5927\u4EE3\u8C22";
})(INFO || (INFO = {}));
export var sendTimeType = [
    {
        key: 'ADMISSION_TIME',
        value: '患者入组的时间',
    }, {
        key: 'TREATMENT_TIME',
        value: '患者做处理的时间',
    }
];
export var typeList = {
    ADMISSION_TIME: '患者入组的时间',
    TREATMENT_TIME: '患者做处理的时间',
};
export var sendType = [
    {
        key: 'CUSTOM',
        value: '自定义',
    }, {
        key: 'LOOP',
        value: '循环下发',
    }
];
export var accountStatus = {
    1000: '待确认',
    1001: '已拒绝',
    1002: '已加入'
};
export var projectDefaultImg = [
    'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/8e43d72d-5ae5-40c8-9d04-21c777b57b14projectImg1.jpeg',
    'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/d1f6b9bb-b5cf-4d32-96a0-108d2338d382projectImg2.jpeg',
    'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/364a407a-cd3a-4886-8029-c43434f7838dprojectImg3.jpeg',
    'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/5c267f30-ccc7-4d9f-a749-420f3d740a4cprojectImg4.jpeg',
    'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/ee254d65-f014-4c55-a952-6ec4c5ccf04aprojectImg5.jpeg'
];
export var queryFields = {
    name: '姓名',
    orgName: '机构',
    sex: '性别',
    age: '年龄',
    province: '地区',
    shqx: '生化全项',
    xcg: '血常规',
    bcg: '便常规',
    xzcs: '心脏超声',
    xdt: '心电图',
    hypertension: '高血压',
    hyperglycemia: '糖尿病',
    hyperlipemia: '高脂血',
    hyperuricemia: '高尿酸',
};
export var columnFields = {
    姓名: 'name',
    机构: 'orgName',
    性别: 'sex',
    年龄: 'age',
    地区: 'province',
    生化全项: 'shqx',
    血常规: 'xcg',
    便常规: 'bcg',
    心脏超声: 'xzcs',
    心电图: 'xdt',
    高血压: 'hypertension',
    糖尿病: 'hyperglycemia',
    高脂血: 'hyperlipemia',
    高尿酸: 'hyperuricemia'
};
export var baseOption = [
    {
        label: '姓名',
        value: 'name'
    }, {
        label: '机构',
        value: 'orgName'
    }, {
        label: '性别',
        value: 'sex'
    }, {
        label: '年龄',
        value: 'age'
    }, {
        label: '地区',
        value: 'province'
    }
];
export var extOptions = [
    {
        label: '生化全项',
        value: 'shqx',
        key: 'SHQX'
    }, {
        label: '血常规',
        value: 'xcg',
        key: 'XCG'
    }, {
        label: '便常规',
        value: 'bcg',
        key: 'BCG'
    }, {
        label: '心脏超声',
        value: 'xzcs',
        key: 'XZCS'
    }, {
        label: '心电图',
        value: 'xdt',
        key: 'XDT'
    }
    // ,{
    //   label: '高血压',
    //   value: 'hypertension',
    //   key: 'HYPERTENSION'
    // },{
    //   label: '糖尿病',
    //   value: 'hyperglycemia',
    //   key: 'HYPERGLYCEMIA'
    // },{
    //   label: '高脂血',
    //   value: 'hyperlipemia',
    //   key: 'HYPERLIPEMIA'
    // },{
    //   label: '高尿酸',
    //   value: 'hyperuricemia',
    //   key: 'HYPERURICEMIA'
    // }
];
export var projectLabel = {
    'multi_project': '多中心临床试验',
    'single_project': '单中心临床试验'
};
export var eventList = ['', '主要终点事件', '次要终点事件', '不良反应', '严重不良反应事件'];
export var projectStatus = {
    1001: '封闭',
    1002: '进行',
    1003: '结束'
};
export var exitReason = ['受试者主动退出', '研究者停止', '完成试验自动退出'];
