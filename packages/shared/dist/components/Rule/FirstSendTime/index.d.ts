import React, { FC } from 'react';
import './index.css';
import { IModel } from '../util';
interface IProps {
    choiceModelChange: (choiceModel: IModel) => void;
    popverContent: React.ReactNode;
    choiceModelSource: any;
}
declare const FirstSendTime: FC<IProps>;
export default FirstSendTime;
