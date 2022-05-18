import { FC } from 'react';
import './index.css';
import { IJcdTabItem } from '../type';
import { IImg } from 'typings/imgStructured';
interface IProps {
    jcdCallbackFns: any;
    setJcdCallbackFns: (params: {
        [type: string]: () => void;
    }) => void;
    images: IImg[];
    groupId: string;
    initData: IJcdTabItem;
    outType: string;
    refreshTabInx: number | null;
    tabInx: number;
}
declare const StructuredJcdTabItem: FC<IProps>;
export default StructuredJcdTabItem;
