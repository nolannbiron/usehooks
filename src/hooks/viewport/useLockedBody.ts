import React, { useEffect, useLayoutEffect } from "react";

type LockedBodyReturn = [boolean, (locked: boolean) => void]

const useLockedBody = (initialState = false): LockedBodyReturn => {

    const [locked, setLocked] = React.useState(initialState);

    React.useLayoutEffect(() => {
        if(!locked){
            return;
        }

        const originalBodyStyle = document.body.style;

        document.body.style.overflow = "hidden";

        const root = document.getElementById('root');
        const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;

        if(scrollBarWidth){
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        }

        return () => {
            document.body.style.overflow = originalBodyStyle.overflow;

            if (scrollBarWidth) {
                document.body.style.paddingRight = originalBodyStyle.paddingRight;
            }
        }

    }, [locked]);

    useEffect(() => {
        if (locked !== initialState) {
            setLocked(initialState)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialState])

    return [locked, setLocked]
}

export default useLockedBody;