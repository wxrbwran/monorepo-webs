import { FC } from 'react';
interface IProps {
    placeholder?: string;
    searchKey: string;
    form: Store;
    value?: string;
    focus?: boolean;
    width?: number;
    float?: any;
}
declare const Search: FC<IProps>;
export default Search;
