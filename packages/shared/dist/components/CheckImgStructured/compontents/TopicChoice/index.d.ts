import { IQaItem } from '../type';
import './index.css';
interface IProps {
    changeCallbackFns: (params: ICallbackFn) => void;
    initData: IQaItem[] | undefined;
    templateId: string;
    isShowEdit: boolean;
    lightKeyWord: string;
}
declare function TopicChoice(props: IProps): JSX.Element;
export default TopicChoice;
