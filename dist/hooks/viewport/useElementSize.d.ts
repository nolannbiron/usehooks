interface ElementSize {
    width: number;
    height: number;
}
declare const useElementSize: <T extends HTMLElement>() => [(node: T | undefined) => void, ElementSize];
export default useElementSize;
