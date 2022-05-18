import { FC } from 'react';
import './index.css';
interface IProps {
    apiData: any;
    subName?: string;
    form: any;
    getFieldsValue: (key: string) => void;
    formInit: CommonData;
    lightKeyWord: string;
}
declare const IndexTable: FC<IProps>;
export default IndexTable;
