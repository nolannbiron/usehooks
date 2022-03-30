import React, { createRef, useCallback, useEffect, useRef } from "react";
import useEventListener from "../events/useEventListener";

interface ElementSize {
  width: number;
  height: number;
}

const useElementSize = <T extends HTMLElement>(): [
  (node: T | undefined) => void,
  ElementSize
] => {
  const [size, setSize] = React.useState<ElementSize>({
    width: 0,
    height: 0,
  });
  const [element, setElementRef] = React.useState<T | undefined>(undefined);

  const ref = useRef(element);

  const handleSize = useCallback(() => {
    setSize({
      width: element?.offsetWidth ?? 0,
      height: element?.offsetHeight ?? 0,
    });
  }, [element]);

  useEventListener("resize", handleSize, ref);

  useEffect(() => {
    handleSize();
  }, [element?.offsetHeight, element?.offsetWidth]);

  return [setElementRef, size];
};

export default useElementSize;
