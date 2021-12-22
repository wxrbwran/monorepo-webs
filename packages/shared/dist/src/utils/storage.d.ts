/**
 * storage再封装
 * 需要在./data中注册后的字段才可以运行存储
 */
declare class Storage {
    storageType: string;
    pre: string;
    constructor(pre?: string, type?: string);
    setType(type: 'sessionStorage' | 'localStorage'): this;
    init(): this;
    getItem(key: string): any;
    setItem(key: string, value: any): any;
    removeItem(key: string): any;
    clear(): any;
}
declare const storage: (pre?: string, type?: string) => Storage;
export default storage;
