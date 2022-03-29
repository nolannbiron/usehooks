import React, { useEffect } from "react";

export type AsyncStatus = "pending" | "resolved" | "rejected";

interface useAsyncState<T> {
  value: T | null;
  loading: boolean;
  error: any | null;
  status: AsyncStatus;
  execute: () => void;
}

const useAsync = <T>(
  asyncFn: () => Promise<T>,
  immediate = true
): useAsyncState<T> => {
  const [status, setStatus] = React.useState<AsyncStatus>("pending");
  const [value, setValue] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any | null>(null);

  const execute = async () => {
    setLoading(true);
    setError(null);
    setStatus("pending");
    return asyncFn()
      .then((response: any) => {
        setValue(response);
        setStatus("resolved");
      })
      .catch((error: any) => {
        setError(error);
        setStatus("rejected");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { value, loading, error, status, execute };
};

export { useAsync as default };
