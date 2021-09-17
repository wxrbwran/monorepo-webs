declare const storage: {
    storageType: string;
    setType(type: 'sessionStorage' | 'localStorage'): any;
    init(): any;
    getItem(key: string): any;
    setItem(key: string, value: any): any;
    removeItem(key: string): any;
    clear(): any;
};
export default storage;
