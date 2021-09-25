/// <reference types="react" />
import './index.css';
interface IProps {
    children: string;
    selectPatient: string[];
    refreshList: () => void;
    request: (params: any) => Promise<any>;
    groupList: [];
}
declare function SelectGroup(props: IProps): JSX.Element;
export default SelectGroup;
