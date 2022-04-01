export declare type AsyncStatus = "pending" | "resolved" | "rejected";
interface useAsyncState<T> {
    value: T | null;
    loading: boolean;
    error: any | null;
    status: AsyncStatus;
    execute: () => void;
}
declare const useAsync: <T>(asyncFn: () => Promise<T>, immediate?: boolean) => useAsyncState<T>;
export { useAsync as default };
