'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var uaParserJs = require('ua-parser-js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function useEventListener(eventName, handler, element) {
    // Create a ref that stores handler
    const savedHandler = React.useRef(handler);
    React.useLayoutEffect(() => {
        savedHandler.current = handler;
    }, [handler]);
    React.useEffect(() => {
        // Define the listening target
        const targetElement = (element === null || element === void 0 ? void 0 : element.current) || window;
        if (!(targetElement && targetElement.addEventListener)) {
            return;
        }
        // Create event listener that calls handler function stored in ref
        const eventListener = (event) => savedHandler.current(event);
        targetElement.addEventListener(eventName, eventListener);
        // Remove event listener on cleanup
        return () => {
            targetElement.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
}

const useHover = (ref) => {
    const [value, setValue] = React__default["default"].useState(false);
    const handleMouseEnter = () => setValue(true);
    const handleMouseLeave = () => setValue(false);
    useEventListener("mouseenter", handleMouseEnter, ref);
    useEventListener("mouseleave", handleMouseLeave, ref);
    return value;
};

const useImageLoader = () => {
    const [isLoaded, setIsLoaded] = React__default["default"].useState(false);
    const onLoad = () => {
        setIsLoaded(true);
    };
    const css = {
        // Loading image style
        loading: {
            visibility: isLoaded ? "hidden" : "visible",
            filter: "blur(8px)",
            transition: "visibility 0ms ease-out 500ms",
        },
        // Image is loaded style
        loaded: {
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 500ms ease-in 0ms",
        },
    };
    return { onLoad, css };
};

const useOnClickOutside = (ref, handler) => {
    useEventListener("mousedown", (event) => {
        const el = ref === null || ref === void 0 ? void 0 : ref.current;
        if (!el || el.contains(event.target)) {
            return;
        }
        handler(event);
    });
};

const useElementSize = () => {
    const [size, setSize] = React__default["default"].useState({
        width: 0,
        height: 0,
    });
    const [element, setElementRef] = React__default["default"].useState(undefined);
    const ref = React.useRef(element);
    const handleSize = React.useCallback(() => {
        var _a, _b;
        setSize({
            width: (_a = element === null || element === void 0 ? void 0 : element.offsetWidth) !== null && _a !== void 0 ? _a : 0,
            height: (_b = element === null || element === void 0 ? void 0 : element.offsetHeight) !== null && _b !== void 0 ? _b : 0,
        });
    }, [element]);
    useEventListener("resize", handleSize, ref);
    React.useEffect(() => {
        handleSize();
    }, [element === null || element === void 0 ? void 0 : element.offsetHeight, element === null || element === void 0 ? void 0 : element.offsetWidth]);
    return [setElementRef, size];
};

const useWindowSize = () => {
    if (typeof window === "undefined") {
        return {
            width: 0,
            height: 0,
        };
    }
    const [width, setWidth] = React__default["default"].useState(window.innerWidth);
    const [height, setHeight] = React__default["default"].useState(window.innerHeight);
    const handleResize = () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    };
    React.useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return { width, height };
};

const useLockedBody = (initialState = false) => {
    const [locked, setLocked] = React__default["default"].useState(initialState);
    React__default["default"].useLayoutEffect(() => {
        if (!locked) {
            return;
        }
        const originalBodyStyle = document.body.style;
        document.body.style.overflow = "hidden";
        const root = document.getElementById("root");
        const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;
        if (scrollBarWidth) {
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        }
        return () => {
            document.body.style.overflow = originalBodyStyle.overflow;
            if (scrollBarWidth) {
                document.body.style.paddingRight = originalBodyStyle.paddingRight;
            }
        };
    }, [locked]);
    React.useEffect(() => {
        if (locked !== initialState) {
            setLocked(initialState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialState]);
    return [locked, setLocked];
};

const VISIBILITY_STATE_SUPPORTED = "visibilityState" in document;
function isWindowVisible() {
    return !VISIBILITY_STATE_SUPPORTED || document.visibilityState !== "hidden";
}
/**
 * Returns whether the window is currently visible to the user.
 */
function useIsWindowVisible() {
    const [focused, setFocused] = React.useState(isWindowVisible());
    const listener = React.useCallback(() => {
        setFocused(isWindowVisible());
    }, [setFocused]);
    React.useEffect(() => {
        if (!VISIBILITY_STATE_SUPPORTED)
            return undefined;
        document.addEventListener("visibilitychange", listener);
        return () => {
            document.removeEventListener("visibilitychange", listener);
        };
    }, [listener]);
    return focused;
}

const useUserAgent = (agent) => {
    const parser = new uaParserJs.UAParser(window.navigator.userAgent);
    const { type } = parser.getDevice();
    return type === agent;
};

function useSessionStorage(key, initialValue) {
    const readValue = React.useCallback(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = sessionStorage.getItem(key);
            if (item) {
                return JSON.parse(item);
            }
            else {
                throw new Error("No value found");
            }
        }
        catch (error) {
            sessionStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue;
        }
    }, [initialValue, key]);
    const [storedValue, setStoredValue] = React.useState(readValue);
    const setValue = React.useCallback((value) => {
        if (typeof window == "undefined") {
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
    const clearValue = React.useCallback(() => {
        if (typeof window == "undefined") {
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
    const readValue = React.useCallback(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = localStorage.getItem(key);
            if (item) {
                return JSON.parse(item);
            }
            else {
                throw new Error("No value found");
            }
        }
        catch (error) {
            localStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue;
        }
    }, [initialValue, key]);
    const [storedValue, setStoredValue] = React.useState(readValue);
    const setValue = React.useCallback((value) => {
        if (typeof window == "undefined") {
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
    const clearValue = React.useCallback(() => {
        if (typeof window == "undefined") {
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

const useBoolean = (initialValue = false) => {
    const [value, setValue] = React__default["default"].useState(initialValue);
    const setTrue = React.useCallback(() => setValue(true), []);
    const setFalse = React.useCallback(() => setValue(false), []);
    const toggle = React.useCallback(() => setValue(!value), []);
    return { value, setTrue, setFalse, toggle };
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const useAsync = (asyncFn, immediate = true) => {
    const [status, setStatus] = React__default["default"].useState("pending");
    const [value, setValue] = React__default["default"].useState(null);
    const [loading, setLoading] = React__default["default"].useState(false);
    const [error, setError] = React__default["default"].useState(null);
    const execute = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        setError(null);
        setStatus("pending");
        return asyncFn()
            .then((response) => {
            setValue(response);
            setStatus("resolved");
        })
            .catch((error) => {
            setError(error);
            setStatus("rejected");
        })
            .finally(() => {
            setLoading(false);
        });
    });
    React.useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);
    return { value, loading, error, status, execute };
};

const useTimeSince = (date, asString, format) => {
    const formatedDate = date instanceof Date ? date : new Date(date);
    const formatedReturnType = asString ? "string" : "number";
    const formated = format
        ? format
        : {
            year: "y",
            month: "m",
            day: "d",
            hour: "h",
            minute: "m",
            second: "s",
        };
    const [timeSince, setTimeSince] = React__default["default"].useState(timeDifference(formatedDate, formated, formatedReturnType));
    React.useEffect(() => {
        setTimeSince(timeDifference(formatedDate, formated, formatedReturnType));
    }, [date, format]);
    return timeSince;
};
function timeDifference(date, format, returnType) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var elapsed = new Date().getTime() - date.getTime();
    if (returnType === "string") {
        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + format.second;
        }
        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + format.minute;
        }
        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + format.hour;
        }
        else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + format.day;
        }
        else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + format.month;
        }
        else {
            return Math.round(elapsed / msPerYear) + format.year;
        }
    }
    else {
        return Math.round(elapsed / 1000);
    }
}

const useCopyToClipboard = (timeout = 1000) => {
    const [isCopied, setIsCopied] = React__default["default"].useState(false);
    const copy = React.useCallback((text) => {
        if (!(navigator === null || navigator === void 0 ? void 0 : navigator.clipboard)) {
            console.warn("Clipboard not supported");
            setIsCopied(false);
            return;
        }
        try {
            navigator.clipboard.writeText(text);
            setIsCopied(true);
        }
        catch (err) {
            setIsCopied(false);
        }
    }, []);
    React.useEffect(() => {
        if (isCopied) {
            const hide = setTimeout(() => {
                setIsCopied(false);
            }, timeout);
            return () => {
                clearTimeout(hide);
            };
        }
        return undefined;
    }, [isCopied, setIsCopied, timeout]);
    return [isCopied, copy];
};

function useToggle(initialState = false) {
    const [state, setState] = React.useState(initialState);
    const toggle = React.useCallback(() => setState((prev) => !prev), []);
    return [state, toggle];
}

function useInterval(callback, delay, leading = true) {
    const savedCallback = React.useRef();
    // Remember the latest callback.
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    React.useEffect(() => {
        function tick() {
            const { current } = savedCallback;
            if (current) {
                current();
            }
        }
        if (delay !== null) {
            if (leading)
                tick();
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
        return undefined;
    }, [delay, leading]);
}

/**
 * Returns the last value of type T that passes a filter function
 * @param value changing value
 * @param filterFn function that determines whether a given value should be considered for the last value
 */
function useLast(value, filterFn) {
    const [last, setLast] = React.useState(filterFn && filterFn(value) ? value : undefined);
    React.useEffect(() => {
        setLast((prev) => {
            const shouldUse = filterFn ? filterFn(value) : true;
            if (shouldUse)
                return value;
            return prev;
        });
    }, [filterFn, value]);
    return last;
}

// modified from https://usehooks.com/usePrevious/
function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = React.useRef();
    // Store current value in ref
    React.useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
}

// modified from https://usehooks.com/useDebounce/
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);
    React.useEffect(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

const FAST_INTERVAL = 10000;
const SLOW_INTERVAL = 60000;
const RefreshContext = React.createContext({ slow: 0, fast: 0 });
// This context maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
const RefreshContextProvider = ({ children, }) => {
    const [slow, setSlow] = React.useState(0);
    const [fast, setFast] = React.useState(0);
    React.useEffect(() => {
        const interval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            setFast((prev) => prev + 1);
        }), FAST_INTERVAL);
        return () => clearInterval(interval);
    }, []);
    React.useEffect(() => {
        const interval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            setSlow((prev) => prev + 1);
        }), SLOW_INTERVAL);
        return () => clearInterval(interval);
    }, []);
    return (React__default["default"].createElement(RefreshContext.Provider, { value: { slow, fast } }, children));
};

const useRefresh = () => {
    const { fast, slow } = React.useContext(RefreshContext);
    return { fastRefresh: fast, slowRefresh: slow };
};

const UseHooksContext = React__default["default"].createContext({});
const UseHooksProvider = ({ children }) => {
    return (React__default["default"].createElement(UseHooksContext.Provider, { value: {} },
        React__default["default"].createElement(RefreshContextProvider, null, children)));
};

exports.AsyncStatus = useAsync;
exports.UseHooksContext = UseHooksContext;
exports.UseHooksProvider = UseHooksProvider;
exports.useAsync = useAsync;
exports.useBoolean = useBoolean;
exports.useCopyToClipboard = useCopyToClipboard;
exports.useDebounce = useDebounce;
exports.useElementSize = useElementSize;
exports.useEventListener = useEventListener;
exports.useHover = useHover;
exports.useImageLoader = useImageLoader;
exports.useInterval = useInterval;
exports.useIsWindowVisible = useIsWindowVisible;
exports.useLast = useLast;
exports.useLocalStorage = useLocalStorage;
exports.useLockedBody = useLockedBody;
exports.useOnClickOutside = useOnClickOutside;
exports.usePrevious = usePrevious;
exports.useRefresh = useRefresh;
exports.useSessionStorage = useSessionStorage;
exports.useTimeSince = useTimeSince;
exports.useToggle = useToggle;
exports.useUserAgent = useUserAgent;
exports.useWindowSize = useWindowSize;
