declare type Copied = boolean;
declare type SetCopy = (text: string) => void;
declare const useCopyToClipboard: (timeout?: number) => [Copied, SetCopy];
export default useCopyToClipboard;
