import './index.css';
interface IProps {
    handleHideCont: () => void;
    refresh: () => void;
    data: any;
    sid: string;
}
declare function ImageList(props: IProps): JSX.Element;
export default ImageList;
