import React, { RefObject } from "react";
import useEventListener from "./useEventListener";

const useHover = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>): boolean => {

    const [value, setValue] = React.useState<boolean>(false);


    const handleMouseEnter = () => setValue(true);
    const handleMouseLeave = () => setValue(false);

    useEventListener('mouseenter', handleMouseEnter, ref);
    useEventListener('mouseleave', handleMouseLeave, ref);

    return value
}

export default useHover;