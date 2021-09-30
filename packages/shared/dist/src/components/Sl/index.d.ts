/// <reference types="react" />
interface IProps {
    children: string;
    selectPatient: string[];
    refreshList: () => void;
}
declare function SelectGroup(props: IProps): JSX.Element;
export default SelectGroup;
