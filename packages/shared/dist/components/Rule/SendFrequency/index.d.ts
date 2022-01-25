import { FC } from 'react';
import './index.css';
interface IFrequency {
    frequency: 'NONE' | 'LOOP' | 'CUSTOM' | 'ADD';
    custom: {
        day: string;
        time?: string;
        content: any[];
        hour?: string;
        min?: string;
    };
}
interface IProps {
    frequencySource: {
        key: 'NONE' | 'LOOP' | 'CUSTOM' | 'ADD';
        value: string;
    }[];
    initFrequency: IFrequency;
    onFrequencyChange: (frequency: IFrequency) => void;
}
declare const SendFrequency: FC<IProps>;
export default SendFrequency;
