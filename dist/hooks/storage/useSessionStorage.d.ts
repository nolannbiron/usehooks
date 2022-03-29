import { Dispatch, SetStateAction } from "react";
declare type SetValue<T> = Dispatch<SetStateAction<T | undefined>>;
declare function useSessionStorage<T>(key: string, initialValue?: T): [T | undefined, SetValue<T>, any];
export default useSessionStorage;
