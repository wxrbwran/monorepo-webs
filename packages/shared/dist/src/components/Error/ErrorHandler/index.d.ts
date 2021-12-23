declare function log(error: any, info: string, props: any): void;
declare function ErrorHandler(Component: any, errorCallback?: typeof log): any;
export default ErrorHandler;
