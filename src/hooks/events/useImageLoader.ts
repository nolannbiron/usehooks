import React from "react";
import { CSSProperties } from "styled-components";


interface ImageLoadingStyle {
    loading: CSSProperties
    loaded: CSSProperties
  }

const useImageLoader = () => {
    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
    
    const onLoad = () => {
        setIsLoaded(true);
    }

    const css: ImageLoadingStyle = {
        // Loading image style
        loading: {
            visibility: isLoaded ? 'hidden' : 'visible',
            filter: 'blur(8px)',
            transition: 'visibility 0ms ease-out 500ms',
        },
        // Image is loaded style
        loaded: {
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 500ms ease-in 0ms',
        }
    }

    
    return {onLoad, css}
}

export default useImageLoader;