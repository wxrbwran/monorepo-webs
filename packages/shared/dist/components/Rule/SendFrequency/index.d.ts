import { FC } from 'react';
import './index.css';
interface IFrequency {
    frequency: 'NONE' | 'LOOP' | 'CUSTOM';
    custom: {
        day: string;
        time: string;
        content: any[];
    };
}
interface IProps {
    initFrequency: IFrequency;
    onFrequencyChange: (frequency: IFrequency) => void;
}
declare const SendFrequency: FC<IProps>;
export default SendFrequency;
