/// <reference types="react" />
import './index.css';
interface IProps {
    name: string;
    type: string;
    icon: string;
    uploadPublicizeRequest: (params: any) => Promise<any>;
    filePrepareRequest: (params: any) => Promise<any>;
}
declare function SubType({ name, icon, type, uploadPublicizeRequest, filePrepareRequest }: IProps): JSX.Element;
export default SubType;
