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
declare namespace SelectGroup {
    var defaultProps: {
        selectPatient: any[];
    };
}
export default SelectGroup;
