import { IQuestions } from 'typings/imgStructured';
interface IProps {
    changeCallbackFns: (params: ICallbackFn) => void;
    initData: IQuestions[];
    templateId: string;
    isShowEdit: boolean;
    lightKeyWord: string;
}
declare function TopicProblem(props: IProps): JSX.Element;
export default TopicProblem;
