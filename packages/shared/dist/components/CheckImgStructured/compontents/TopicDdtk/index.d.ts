import './index.css';
import { IQaItem, IMeta } from '../type';
interface IProps {
    changeCallbackFns: (params: ICallbackFn) => void;
    initData: IQaItem[];
    templateId: string;
    meta: IMeta;
    isShowEdit: boolean;
    lightKeyWord: string;
}
declare function Ddtk(props: IProps): JSX.Element;
export default Ddtk;
