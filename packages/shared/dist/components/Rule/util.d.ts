export declare const fileTypes: {};
export interface IItem {
    name: string;
    type: string;
    level: string;
    description: string;
    value: string | number;
    items: IItem[];
    starting: boolean;
    operator: string;
}
export declare const sendType: {};
export interface ICondition {
    chooseItem: IItem;
    chooseValue: {
        min: number;
        max: number;
        value: number | string;
        id: string;
    };
}
export interface IRuleDoc {
    meta: IMeta;
    rules: IRule[];
    id: string;
}
export interface IMeta {
    sourceType: number;
    actionId: number;
    teamLocations: [];
    sourceMembers: [];
}
export interface IRule {
    match: {
        should_1: [];
        must: [];
    };
    actions: IAction[];
}
export interface IAction {
    type: string;
    params: {
        period: number;
        unit: string;
        delay: number;
        sourceMember: [];
    };
}
export interface IChooseValues {
    firstTime: any;
    choseConditions: ICondition[];
    choseScope: [];
    frequency: {
        frequency: string;
        custom: [];
    };
}
export interface IModel {
    childItemType: 'select' | 'diy' | 'time' | 'none';
    childItem?: IModel[];
    description: string;
    choiceModel?: IModel;
    inputDay?: number;
    inputHM?: string;
    inputTime?: string;
}
export declare const AfterPatientBind = "\u60A3\u8005\u4E0E\u6211\u7ED1\u5B9A\u65E5\u671F\u540E";
export declare const DIY = "\u81EA\u5B9A\u4E49";
export declare const ImmediatelySend = "\u7ACB\u5373\u53D1\u9001";
export declare const SpecificDate = "\u9009\u62E9\u7279\u5B9A\u65E5\u671F";
export declare const PlanCreatedSendImmediately = "\u8BA1\u5212\u521B\u5EFA\u6210\u529F\u540E\u7ACB\u5373\u53D1\u9001";
export declare const FirstTimeModel: IModel;
export declare function getHierarchyFromItem(originItem: {}): any;
export declare function getChooseValueFromItem(item: any): {
    min: any;
    max: any;
    value?: undefined;
    id?: undefined;
} | {
    value: any;
    min?: undefined;
    max?: undefined;
    id?: undefined;
} | {
    id: any;
    value: any;
    min?: undefined;
    max?: undefined;
};
export declare function changeDescritionWithItem(item: IItem): void;
export declare function deleteStartOrEndSymbol(str: string): any;
export declare function getHMstr(delay: number): string;
export declare function getStartTimeChoiceModel(chooseStartTime: IItem, action: any, ruleDoc: {
    rules: IRule[];
    meta: any;
}, list: any[]): {
    choiceModel: {
        childItemType: string;
        choiceModel: IModel;
        description: string;
    };
    choiceContents: any;
};
export declare function getChooseValuesKeyFromRules(ruleDoc: {
    rules: IRule[];
    meta: any;
}, list: any[]): {
    firstTime: {
        choiceModel: {
            childItemType: string;
            choiceModel: IModel;
            description: string;
        };
        choiceContents: any;
    };
    choseConditions: {};
    choseScope: {};
    frequency: {
        frequency: string;
        custom: {};
    };
};
export declare function getStartTimeDescriptionFromConditionss(firstTime: any): string;
export declare function getConditionDescriptionFromConditionss(conditions: any[]): {
    age: string;
    sex: string;
    disease: any;
    treatment: string;
};
