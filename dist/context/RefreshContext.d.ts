import React from "react";
declare const RefreshContext: React.Context<{
    slow: number;
    fast: number;
}>;
declare const RefreshContextProvider: ({ children, }: {
    children: React.ReactNode;
}) => JSX.Element;
export { RefreshContext, RefreshContextProvider };
