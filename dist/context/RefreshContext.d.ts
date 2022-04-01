import React from "react";
declare const RefreshContext: React.Context<{
    slow: number;
    fast: number;
}>;
declare const RefreshContextProvider: ({ children, fastRefresh, slowRefresh, }: {
    children: React.ReactNode;
    fastRefresh?: number | undefined;
    slowRefresh?: number | undefined;
}) => JSX.Element;
export { RefreshContext, RefreshContextProvider };
