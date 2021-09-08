interface Iprops {
    yearV: string | number | undefined;
    monthV: string | number | undefined;
    dayV: string | number | undefined;
    disabled: boolean;
    yearListV: number[];
    callback: (value: any, month: any, day: any) => void;
}
declare function DatePicker(props: Iprops): JSX.Element;
export default DatePicker;
