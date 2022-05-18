import './index.css';
interface IProps {
    initReportTime?: number;
    isUnknownTime?: boolean;
    type?: string;
    style?: object;
    label?: string;
}
declare function ItemDate(props: IProps): JSX.Element;
export default ItemDate;
