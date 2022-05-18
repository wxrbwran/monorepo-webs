import './index.css';
import { IQaItem } from '../type';
interface IProps {
    changeCallbackFns: (params: ICallbackFn) => void;
    initData: IQaItem[];
    templateId: string;
    isShowEdit: boolean;
    lightKeyWord: string;
}
declare function DdtkSenior(props: IProps): JSX.Element;
export default DdtkSenior;
