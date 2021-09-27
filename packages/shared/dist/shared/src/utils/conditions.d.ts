export declare function getCondition(keyName: string, value: any, operator?: string): {
    var: string;
    value: any;
    operator: string;
};
export declare const handleSelection: (allValues: CommonData) => CommonData[];
interface ICondition {
    var: string;
    operator: string;
    value: string;
}
export declare const initSelectForm: (conditions: ICondition[]) => CommonData;
export {};
