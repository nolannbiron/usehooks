declare type LockedBodyReturn = [boolean, (locked: boolean) => void];
declare const useLockedBody: (initialState?: boolean) => LockedBodyReturn;
export default useLockedBody;
