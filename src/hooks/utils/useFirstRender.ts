import { useRef } from "react";

function useFirstRender(): boolean {
  const first = useRef(true);

  if (first.current) {
    first.current = false;

    return true;
  }

  return first.current;
}

export default useFirstRender;
