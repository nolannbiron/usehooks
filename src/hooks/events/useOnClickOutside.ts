import React, { RefObject } from "react";
import useEventListener from "./useEventListener";

type Handler = (event: MouseEvent | Event) => void;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
): void => {
  useEventListener("mousedown", (event) => {
    const el = ref?.current;

    if (!el || el.contains(event.target as Node)) {
      return;
    }

    handler(event);
  });
};

export default useOnClickOutside;
