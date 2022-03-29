import React, { useCallback } from "react";

const useBoolean = (initialValue = false) => {
  const [value, setValue] = React.useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(!value), []);

  return { value, setTrue, setFalse, toggle };
};

export default useBoolean;
