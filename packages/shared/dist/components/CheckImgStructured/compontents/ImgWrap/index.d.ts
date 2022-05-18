import { IImg } from '../type';
import './index.css';
interface IProps {
    handleClose: () => void;
    images: IImg[];
}
declare const ImgWrap: (props: IProps) => JSX.Element;
export default ImgWrap;
