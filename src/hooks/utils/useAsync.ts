import React, { useEffect } from "react";

export const enum AsyncStatus {
  Pending,
  Resolved,
  Rejected,
}

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
  const [status, setStatus] = React.useState<AsyncStatus>(AsyncStatus.Pending);
  const [value, setValue] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any | null>(null);

  const execute = async () => {
    setLoading(true);
    setError(null);

    return asyncFn()
      .then((response: any) => {
        setValue(response);
        setStatus(AsyncStatus.Resolved);
      })
      .catch((error: any) => {
        setError(error);
        setStatus(AsyncStatus.Rejected);
      });
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { value, loading, error, status, execute };
};

export default useAsync;
