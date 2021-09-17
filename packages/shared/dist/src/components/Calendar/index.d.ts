interface Iprops {
    year?: string | number;
    month?: string | number;
    day?: string | number;
    onChange: (dateString: string) => void;
    disabled?: boolean;
    needInit?: boolean;
    value?: any;
}
declare function Calendar1(props: Iprops): JSX.Element;
export default Calendar1;
