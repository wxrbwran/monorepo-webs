import { FC } from 'react';
import './index.css';
import { IQuestions } from 'typings/imgStructured';
interface IProps {
    initData: IQuestions[];
    outType: string;
    changeCallbackFns: (params: ICallbackFn) => void;
}
declare const TopicBaseInfo: FC<IProps>;
export default TopicBaseInfo;
