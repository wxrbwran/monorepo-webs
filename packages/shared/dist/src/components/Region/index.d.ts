declare type INumUnd = number | undefined;
declare type IStrUnd = string | undefined;
export interface IRegion {
    provinceName?: IStrUnd;
    cityName?: IStrUnd;
    townName?: IStrUnd;
    address?: IStrUnd;
    provinceCode?: INumUnd;
    townCode?: INumUnd;
    cityCode?: INumUnd;
}
interface Iprops {
    getRegion: (region: IRegion) => void;
    initData: IRegion;
    request: (params: any) => Promise<any>;
}
declare function Region({ getRegion, initData, request }: Iprops): JSX.Element;
export default Region;
