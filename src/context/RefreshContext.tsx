import React, { useState, useEffect, createContext } from "react";

const FAST_INTERVAL = 10000; // 10sec
const SLOW_INTERVAL = 60000; //1min

const RefreshContext = createContext({ slow: 0, fast: 0 });
// This context maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
const RefreshContextProvider = ({
  children,
  fastRefresh,
  slowRefresh
}: {
  children: React.ReactNode;
  fastRefresh?: number;
  slowRefresh?: number;
}) => {
  fastRefresh = fastRefresh ? fastRefresh : FAST_INTERVAL;
  slowRefresh = slowRefresh ? slowRefresh : SLOW_INTERVAL;
  const [slow, setSlow] = useState(0);
  const [fast, setFast] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      setFast((prev) => prev + 1);
    }, fastRefresh);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      setSlow((prev) => prev + 1);
    }, slowRefresh);
    return () => clearInterval(interval);
  }, []);

  return (
    <RefreshContext.Provider value={{ slow, fast }}>
      {children}
    </RefreshContext.Provider>
  );
};

export { RefreshContext, RefreshContextProvider };
