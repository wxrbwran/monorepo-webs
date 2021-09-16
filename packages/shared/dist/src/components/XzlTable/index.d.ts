import { FC, Key, ReactText } from 'react';
interface IProps {
    columns: Store[];
    dataKey: string;
    request: (params: any) => Promise<any>;
    handleCallback?: (params: any) => void;
    handleCallbackSelectKeys?: (params: Key[]) => void;
    depOptions?: Store;
    tableOptions?: Store;
    category?: string;
    noPagination?: boolean;
    extra?: any;
}
export interface XzlTableCallBackProps {
    selectedRowKeys?: ReactText[];
    currentPage?: number;
    dataSource?: Store[];
}
declare const XzlTable: FC<IProps>;
export default XzlTable;
