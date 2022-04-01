import { CSSProperties } from "styled-components";
interface ImageLoadingStyle {
    loading: CSSProperties;
    loaded: CSSProperties;
}
declare const useImageLoader: () => {
    onLoad: () => void;
    css: ImageLoadingStyle;
};
export default useImageLoader;
