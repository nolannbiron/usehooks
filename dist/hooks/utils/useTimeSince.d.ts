interface TimeSinceFormatOptions {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
}
declare type ReturnTypes = string | number;
declare const useTimeSince: (date: Date | string, asString?: boolean | undefined, format?: TimeSinceFormatOptions | undefined) => ReturnTypes;
export default useTimeSince;
