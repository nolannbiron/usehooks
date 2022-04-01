import React from "react";
import { RefreshContextProvider } from "./RefreshContext";

const UseHooksContext = React.createContext({});

const UseHooksProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config?: { fastRefresh?: number; slowRefresh?: number };
}) => {
  return (
    <UseHooksContext.Provider value={{}}>
      <RefreshContextProvider {...config}>{children}</RefreshContextProvider>
    </UseHooksContext.Provider>
  );
};

export { UseHooksContext, UseHooksProvider };
