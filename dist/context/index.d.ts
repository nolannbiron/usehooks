import React from "react";
declare const UseHooksContext: React.Context<{}>;
declare const UseHooksProvider: ({ children, config, }: {
    children: React.ReactNode;
    config?: {
        fastRefresh?: number | undefined;
        slowRefresh?: number | undefined;
    } | undefined;
}) => JSX.Element;
export { UseHooksContext, UseHooksProvider };
