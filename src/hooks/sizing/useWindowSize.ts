import React, { useEffect } from "react";

interface WindowSize {
    width: number;
    height: number;
}

const useWindowSize = (): WindowSize => {

    if(typeof window === "undefined") {
        return {
            width: 0,
            height: 0
        }
    }

    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);

    const handleResize = () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);
    
    return { width, height };
}

export default useWindowSize;