/// <reference types="react" />
interface IProps {
    uploadPublicizeRequest: (params: any) => Promise<any>;
    filePrepareRequest: (params: any) => Promise<any>;
}
declare function FileLibrary({ uploadPublicizeRequest, filePrepareRequest }: IProps): JSX.Element;
export default FileLibrary;
