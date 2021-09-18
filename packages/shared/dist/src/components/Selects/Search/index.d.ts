import { FC } from 'react';
interface IProps {
    placeholder?: string;
    searchKey: string;
    form: Store;
    value?: string;
    focus?: boolean;
    width?: number;
}
declare const Search: FC<IProps>;
export default Search;
