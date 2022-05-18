import { FC } from 'react';
import './index.css';
import { IImg } from 'typings/imgStructured';
interface IProps {
    groupId: string;
    images: IImg[];
    outType: string;
    initData: any;
    jcdCallbackFns: any;
    setJcdCallbackFns: (params: {
        [type: string]: () => void;
    }) => void;
}
declare const StructuredDetailJcdPanel: FC<IProps>;
export default StructuredDetailJcdPanel;
