import { FC } from 'react';
import './index.css';
import { IApiDocumentItem } from 'typings/imgStructured';
interface IProps {
    tabKey: string;
    outType: string;
    initData: {
        documentList: IApiDocumentItem[];
        orgId: string;
        orgName: string;
        outType: string;
        unknownReport?: boolean;
        measuredAt?: number;
    };
    hydCallbackFns: any;
    setHydCallbackFns: (params: {
        [type: string]: () => void;
    }) => void;
}
declare const StructuredDetailHydPanel: FC<IProps>;
export default StructuredDetailHydPanel;
