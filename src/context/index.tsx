import React from "react";
import { RefreshContextProvider } from "./RefreshContext";

const UseHooksContext = React.createContext({});

const UseHooksProvider = (children: React.ReactNode) => {
  return (
    <UseHooksContext.Provider value={{}}>
      <RefreshContextProvider>{children}</RefreshContextProvider>
    </UseHooksContext.Provider>
  );
};

export { UseHooksContext, UseHooksProvider };
