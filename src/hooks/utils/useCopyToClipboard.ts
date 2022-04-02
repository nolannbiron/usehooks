import React, { useCallback, useEffect } from "react";

type Copied = boolean;
type SetCopy = (text: string) => void;

const useCopyToClipboard = (timeout = 5000): [Copied, SetCopy] => {
  const [isCopied, setIsCopied] = React.useState<Copied>(false);

  const copy: SetCopy = useCallback((text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      setIsCopied(false);
      return;
    }
    navigator.clipboard.writeText(text).then(() => setIsCopied(true)).catch(() => setIsCopied(false));
  }, []);

  useEffect(() => {
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

export default useCopyToClipboard;
