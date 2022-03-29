import { Dispatch, SetStateAction } from "react";
declare type SetValue<T> = Dispatch<SetStateAction<T | undefined>>;
declare function useLocalStorage<T>(key: string, initialValue?: T): [T | undefined, SetValue<T>, any];
export default useLocalStorage;
