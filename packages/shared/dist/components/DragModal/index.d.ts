/**
 * Created by wuxiaoran on 2019/1/28.
 */
import { FC } from 'react';
import { ModalProps } from 'antd/lib/modal/Modal';
import 'antd/lib/modal/style/index.css';
interface IDMProps extends ModalProps {
    title: string;
    extra?: any;
    titleDoubleClick?: () => void;
}
declare const AntdModalDrag: FC<IDMProps>;
export default AntdModalDrag;
