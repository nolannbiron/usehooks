declare const useBoolean: (initialValue?: boolean) => {
    value: boolean;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
};
export default useBoolean;
