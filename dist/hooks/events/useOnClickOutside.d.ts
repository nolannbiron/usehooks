import React, { RefObject } from "react";
declare type Handler = (event: MouseEvent | Event) => void;
declare const useOnClickOutside: <T extends HTMLElement = HTMLElement>(ref: React.RefObject<T>, handler: Handler) => void;
export default useOnClickOutside;
