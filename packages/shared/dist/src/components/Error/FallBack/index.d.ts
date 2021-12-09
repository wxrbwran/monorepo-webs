interface IPros {
    error: {
        message: string;
    };
    info: {
        componentStack: string;
    };
}
declare const Fallback: (props: IPros) => JSX.Element;
export default Fallback;
