/**
 * Created by wuxiaoran on 2019/1/28.
 */
import { FC } from 'react';
import { ModalProps } from 'antd/lib/modal/Modal';
interface IDMProps extends ModalProps {
    title: string;
    extra?: any;
    modalProps: any;
}
declare const AntdModalDrag: FC<IDMProps>;
export default AntdModalDrag;
