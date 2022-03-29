import React from "react";

const useBoolean = (initialValue = false) => {
  const [value, setValue] = React.useState(initialValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue(!value);

  return { value, setTrue, setFalse, toggle };
};

export default useBoolean;
