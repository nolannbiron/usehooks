import React, { useRef, useLayoutEffect, useEffect, useCallback, useState } from 'react';

function useEventListener(eventName, handler, element) {
    // Create a ref that stores handler
    const savedHandler = useRef(handler);
    useLayoutEffect(() => {
        savedHandler.current = handler;
    }, [handler]);
    useEffect(() => {
        // Define the listening target
        const targetElement = (element === null || element === void 0 ? void 0 : element.current) || window;
        if (!(targetElement && targetElement.addEventListener)) {
            return;
        }
        // Create event listener that calls handler function stored in ref
        const eventListener = event => savedHandler.current(event);
        targetElement.addEventListener(eventName, eventListener);
        // Remove event listener on cleanup
        return () => {
            targetElement.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
}

const useElementSize = () => {
    const [size, setSize] = React.useState({
        width: 0,
        height: 0
    });
    const [element, setElementRef] = React.useState(undefined);
    const ref = useRef(element);
    const handleSize = useCallback(() => {
        var _a, _b;
        setSize({
            width: (_a = element === null || element === void 0 ? void 0 : element.offsetWidth) !== null && _a !== void 0 ? _a : 0,
            height: (_b = element === null || element === void 0 ? void 0 : element.offsetHeight) !== null && _b !== void 0 ? _b : 0
        });
    }, [element]);
    useEventListener('resize', handleSize, ref);
    useEffect(() => {
        handleSize();
    }, [element === null || element === void 0 ? void 0 : element.offsetHeight, element === null || element === void 0 ? void 0 : element.offsetWidth]);
    return [setElementRef, size];
};

const useWindowSize = () => {
    if (typeof window === "undefined") {
        return {
            width: 0,
            height: 0
        };
    }
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);
    const handleResize = () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return { width, height };
};

function useSessionStorage(key, initialValue) {
    const readValue = useCallback(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = sessionStorage.getItem(key);
            if (item) {
                return JSON.parse(item);
            }
            else {
                throw new Error('No value found');
            }
        }
        catch (error) {
            sessionStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue;
        }
    }, [initialValue, key]);
    const [storedValue, setStoredValue] = useState(readValue);
    const setValue = useCallback(value => {
        if (typeof window == 'undefined') {
            console.warn(`Tried setting sessionStorage key “${key}” even though environment is not a client`);
        }
        try {
            const newValue = value instanceof Function ? value(storedValue !== null && storedValue !== void 0 ? storedValue : undefined) : value;
            sessionStorage.setItem(key, JSON.stringify(newValue));
            setStoredValue(newValue);
        }
        catch (error) {
            console.warn(`Error setting sessionStorage key “${key}”:`, error);
        }
    }, [key, storedValue]);
    const clearValue = useCallback(() => {
        if (typeof window == 'undefined') {
            console.warn(`Tried clearing sessionStorage key “${key}” even though environment is not a client`);
        }
        try {
            sessionStorage.removeItem(key);
            setStoredValue(undefined);
        }
        catch (error) {
            console.warn(`Error clearing localStorage key “${key}”:`, error);
        }
    }, [key]);
    return [storedValue, setValue, clearValue];
}

function useLocalStorage(key, initialValue) {
    const readValue = useCallback(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = localStorage.getItem(key);
            if (item) {
                return JSON.parse(item);
            }
            else {
                throw new Error('No value found');
            }
        }
        catch (error) {
            localStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue;
        }
    }, [initialValue, key]);
    const [storedValue, setStoredValue] = useState(readValue);
    const setValue = useCallback(value => {
        if (typeof window == 'undefined') {
            console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
        }
        try {
            const newValue = value instanceof Function ? value(storedValue !== null && storedValue !== void 0 ? storedValue : undefined) : value;
            localStorage.setItem(key, JSON.stringify(newValue));
            setStoredValue(newValue);
        }
        catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error);
        }
    }, [key, storedValue]);
    const clearValue = useCallback(() => {
        if (typeof window == 'undefined') {
            console.warn(`Tried clearing localStorage key “${key}” even though environment is not a client`);
        }
        try {
            localStorage.removeItem(key);
            setStoredValue(undefined);
        }
        catch (error) {
            console.warn(`Error clearing localStorage key “${key}”:`, error);
        }
    }, [key]);
    return [storedValue, setValue, clearValue];
}

export { useElementSize, useEventListener, useLocalStorage, useSessionStorage, useWindowSize };
